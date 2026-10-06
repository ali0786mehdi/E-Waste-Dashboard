# E-Waste & Management: Student Portfolio Dashboard

A single-page dashboard that collects all the assignments I submitted for the subject **E-Waste & Management**, so they can be reviewed and graded from one link.

## Student Details

| | |
|---|---|
| **Name** | Ali Mehdi Mirza |
| **Roll No.** | 24102C0054 |
| **Class** | TE CMPN C |
| **Subject** | E-Waste & Management |
| **Professor** | Aniket Kundu |

## How to Use (for the Professor)

1. Open the dashboard link.
2. Each card is one assignment, with a headline, a short description and its original portal title.
3. Click **View my work →** on a card to open the actual submission in a new tab.
4. Every assignment listed was marked **Handed in** on the college portal.

## Assignments Included

| # | Submitted | Headline | Portal Title |
|---|-----------|----------|--------------|
| 1 | 24 Jul | Five Toxic Chemicals Hiding in Our Gadgets | Toxic Chemicals_Any 5 |
| 2 | 28 Jul | Reclaiming Elements: How Precious Metals Return from Waste | Assignment 3_Elemental Recovery Process Update |
| 3 | 19 Aug | A Patent-Ready Upgrade to E-Waste Recovery | E Waste Recovery Process_Modification for Design Patent |
| 4 | 2 Sep | Who Plays by the Rules? Indian Companies and E-Waste Law | Indian Companies Following E waste Rules_Comparative Study |
| 5 | 6 Sep | Novel Idea Pitch Deck: Turning E-Waste into Opportunity | Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C |
| 6 | 9 Sep | Campus Campaign: Making Our College E-Waste Smart | Campaign For E Waste in Campus_Class Activity |
| 7 | 29 Sep | Building Green: LEED-Certified Buildings Across India | LEED Certification of Green Buildings in India |

## Project Structure

```
ewaste-dashboard.html   # the complete dashboard (HTML, CSS and JS in one file)
README.md               # this file
```

## Features

- Responsive layout for phone, tablet and desktop
- Automatic light and dark mode
- Summary stats: assignments handed in, work links live, submission window
- Each assignment opens its work in a new tab

## Updating the Links

Open `ewaste-dashboard.html` and find the `A` array near the bottom. Paste each work link into the matching `link:""` field:

```js
{ d:"24 Jul", ..., link:"https://drive.google.com/your-link-here" }
```

Make sure each link is shared as **"Anyone with the link can view"** so the professor can open it without requesting access.

## Tech Stack

HTML5, CSS3 and vanilla JavaScript. There are no external dependencies.

---

*Prepared by Ali Mehdi Mirza (24102C0054) for Prof. Aniket Kundu.*
