/* Drop this <script> into your index.html (replace your old toggleEdit/upload/remove/export logic).
   Security lives in netlify/functions/api.mjs - this file only talks to it. */
const OWN = { token: sessionStorage.getItem("ownerToken") || "" };
const isOwner = () => !!OWN.token;

function applyOwnerUI() {
  // owner-only controls are hidden for visitors (real protection is on the server)
  document.querySelectorAll("#ex, #ub").forEach(el => el.classList.toggle("hide", !isOwner()));
  const link = document.getElementById("ownerLink");
  if (link) link.textContent = isOwner() ? "Owner: log out" : "Owner login";
}

async function toggleEdit() {                      // footer link calls this
  if (isOwner()) { OWN.token = ""; sessionStorage.removeItem("ownerToken"); applyOwnerUI(); return render?.(); }
  const password = prompt("Owner password:");
  if (!password) return;
  const r = await fetch("/api/login", { method: "POST", body: JSON.stringify({ password }) });
  if (!r.ok) return toast?.("Wrong password");
  OWN.token = (await r.json()).token;
  sessionStorage.setItem("ownerToken", OWN.token);
  applyOwnerUI(); render?.();
}

const authHdr = () => ({ Authorization: "Bearer " + OWN.token });

async function listFiles(assignmentId) {           // public
  const r = await fetch("/api/files/" + encodeURIComponent(assignmentId));
  return r.ok ? r.json() : [];
}
const fileUrl = (key) => "/api/file/" + encodeURIComponent(key);   // public view/download

async function uploadFiles(assignmentId, fileList) {               // owner only
  for (const f of fileList) {
    const r = await fetch(`/api/files/${encodeURIComponent(assignmentId)}?name=${encodeURIComponent(f.name)}`,
      { method: "POST", headers: { ...authHdr(), "Content-Type": f.type || "application/octet-stream" }, body: f });
    if (r.status === 401) { OWN.token = ""; sessionStorage.removeItem("ownerToken"); applyOwnerUI(); return toast?.("Session expired, log in again"); }
    if (!r.ok) toast?.((await r.json()).error || "Upload failed");
  }
}
async function removeFile(key) {                                   // owner only
  if (!confirm("Delete this file permanently?")) return;
  await fetch(fileUrl(key), { method: "DELETE", headers: authHdr() });
}
document.addEventListener("DOMContentLoaded", applyOwnerUI);
