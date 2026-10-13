# E-Waste & Management: Student Portfolio Dashboard

A single-page dashboard that brings together all assignments submitted for the **E-Waste & Management** subject. It provides a centralized location for reviewing assignment details and accessing the original submissions through a single link.

## Live Dashboard

**[Open E-Waste & Management Dashboard](https://ewem.netlify.app/)**

The dashboard is hosted on Netlify and provides direct access to the assignment submissions.

## Student Details

| Field | Details |
|---|---|
| **Name** | Ali Mehdi Mirza |
| **Roll No.** | 24102C0054 |
| **Class** | TE CMPN C |
| **Subject** | E-Waste & Management |
| **Professor** | Aniket Kundu |

## How to Use (For the Professor)

1. Open the [live dashboard](https://ewem.netlify.app/).
2. Browse the assignment cards to view each assignment's headline, description, and original college portal title.
3. Click **View my work →** on a card to open the corresponding submission in a new tab.
4. All listed assignments were marked **Handed in** on the college portal.

## Assignments Included

| # | Submission Date | Headline | Original Portal Title |
|---|---|---|---|
| 1 | 24 Jul | Five Toxic Chemicals Hiding in Our Gadgets | Toxic Chemicals_Any 5 |
| 2 | 28 Jul | Reclaiming Elements: How Precious Metals Return from Waste | Assignment 3_Elemental Recovery Process Update |
| 3 | 19 Aug | A Patent-Ready Upgrade to E-Waste Recovery | E Waste Recovery Process_Modification for Design Patent |
| 4 | 2 Sep | Who Plays by the Rules? Indian Companies and E-Waste Law | Indian Companies Following E waste Rules_Comparative Study |
| 5 | 6 Sep | Novel Idea Pitch Deck: Turning E-Waste into Opportunity | Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C |
| 6 | 9 Sep | Campus Campaign: Making Our College E-Waste Smart | Campaign For E Waste in Campus_Class Activity |
| 7 | 29 Sep | Building Green: LEED-Certified Buildings Across India | LEED Certification of Green Buildings in India |

## Features

- **Centralized portfolio:** All seven assignments are accessible from one dashboard.
- **Responsive design:** Supports phones, tablets, and desktop screens.
- **Automatic theme support:** Adapts to light and dark mode.
- **Assignment overview:** Displays submission information and summary statistics.
- **Direct submission access:** Opens the corresponding assignment in a new browser tab.
- **Netlify hosting:** Provides a shareable link for convenient academic review.

## Project Structure

```text
ewaste-dashboard.html   # Complete dashboard (HTML, CSS and JavaScript)
README.md               # Project documentation
```

## Updating Assignment Links

To update the submission links, open `ewaste-dashboard.html` and locate the `A` array near the bottom of the file.

Update the corresponding `link` field for the assignment you want to modify:

```javascript
{
  d: "24 Jul",
  // Other assignment details
  link: "https://drive.google.com/your-link-here"
}
```

**Important:** Ensure each Google Drive or other external submission link has the appropriate viewing permissions. For Google Drive, select **Anyone with the link — Viewer** if the professor needs to access the submission without requesting permission.

## Tech Stack

- **HTML5** — Page structure
- **CSS3** — Styling and responsive layout
- **Vanilla JavaScript** — Dashboard functionality and assignment navigation
- **Netlify** — Hosting and deployment

The dashboard uses no external dependencies.

## Purpose

This project organizes academic submissions into a single, accessible portfolio, making it easier for the professor to review the submitted work without navigating through multiple individual links.

---

*Prepared by Ali Mehdi Mirza (24102C0054) for Prof. Aniket Kundu as part of the E-Waste & Management subject.*
