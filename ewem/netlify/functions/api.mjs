// Server-side authorization. Everyone can READ. Only the owner can UPLOAD / DELETE.
import { getStore } from "@netlify/blobs";
import crypto from "node:crypto";

export const config = { path: "/api/*" };

const PASSWORD = process.env.OWNER_PASSWORD;      // set in Netlify dashboard
const SECRET   = process.env.TOKEN_SECRET;        // long random string, set in Netlify dashboard
const MAX_BYTES = 5.5 * 1024 * 1024;              // Netlify function body limit is ~6 MB
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000;          // login lasts 2 hours

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json" } });

const sign = (payload) => crypto.createHmac("sha256", SECRET).update(payload).digest("hex");

function makeToken() {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${sign(exp)}`;
}
function validToken(req) {
  const h = req.headers.get("authorization") || "";
  const t = h.startsWith("Bearer ") ? h.slice(7) : "";
  const [exp, sig] = t.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = Buffer.from(sign(exp));
  const got = Buffer.from(sig);
  return good.length === got.length && crypto.timingSafeEqual(good, got);
}
function safeEq(a, b) {
  const x = crypto.createHash("sha256").update(String(a)).digest();
  const y = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(x, y);
}
const cleanName = (n) => String(n || "file").replace(/[^\w.\- ]+/g, "_").slice(0, 120);
const cleanId = (s) => String(s || "").replace(/[^\w\-]+/g, "").slice(0, 60);

export default async (req) => {
  if (!PASSWORD || !SECRET) return json({ error: "Server not configured" }, 500);
  const url = new URL(req.url);
  const parts = url.pathname.replace(/^\/api\//, "").split("/").filter(Boolean);
  const store = getStore("portfolio");

  // ---- LOGIN ----
  if (req.method === "POST" && parts[0] === "login") {
    const body = await req.json().catch(() => ({}));
    if (!safeEq(body.password ?? "", PASSWORD)) {
      await new Promise((r) => setTimeout(r, 1200));   // slow down guessing
      return json({ error: "Wrong password" }, 401);
    }
    return json({ token: makeToken() });
  }

  // ---- READ (public): list files of an assignment ----
  if (req.method === "GET" && parts[0] === "files" && parts[1]) {
    const id = cleanId(parts[1]);
    const { blobs } = await store.list({ prefix: `${id}/` });
    const items = await Promise.all(blobs.map(async (b) => {
      const m = (await store.getMetadata(b.key))?.metadata || {};
      return { key: b.key, name: m.name, type: m.type, size: m.size, uploadedAt: m.uploadedAt };
    }));
    return json(items);
  }

  // ---- READ (public): download one file ----
  if (req.method === "GET" && parts[0] === "file") {
    const key = decodeURIComponent(parts.slice(1).join("/"));
    const res = await store.getWithMetadata(key, { type: "arrayBuffer" });
    if (!res) return json({ error: "Not found" }, 404);
    return new Response(res.data, {
      headers: {
        "content-type": res.metadata?.type || "application/octet-stream",
        "content-disposition": `inline; filename="${cleanName(res.metadata?.name)}"`,
        "x-content-type-options": "nosniff",
      },
    });
  }

  // ---- everything below needs the owner token ----
  if (!validToken(req)) return json({ error: "Unauthorized" }, 401);

  // UPLOAD:  POST /api/files/<assignmentId>?name=report.pdf   (raw file body)
  if (req.method === "POST" && parts[0] === "files" && parts[1]) {
    const id = cleanId(parts[1]);
    const buf = await req.arrayBuffer();
    if (buf.byteLength > MAX_BYTES) return json({ error: "File too large (max ~5 MB)" }, 413);
    const name = cleanName(url.searchParams.get("name"));
    const key = `${id}/${Date.now()}-${name}`;
    await store.set(key, buf, {
      metadata: {
        name,
        type: req.headers.get("content-type") || "application/octet-stream",
        size: buf.byteLength,
        uploadedAt: new Date().toISOString(),
      },
    });
    return json({ ok: true, key });
  }

  // DELETE:  DELETE /api/file/<key>
  if (req.method === "DELETE" && parts[0] === "file") {
    await store.delete(decodeURIComponent(parts.slice(1).join("/")));
    return json({ ok: true });
  }

  return json({ error: "Not found" }, 404);
};
