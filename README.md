HATCH-AND-BATCH
Recipe Video Storage & Retrieval App

---

## OVERVIEW

Hatch-and-Batch is a lightweight app designed to help users store, organize, and quickly retrieve recipe videos using Google Drive and Google Sheets as its backend.

Instead of cluttered folders or lost links, the app provides a simple system where videos are uploaded, tagged, and made searchable through a clean interface.

---

## CORE IDEA

The app separates storage and metadata:

* Google Drive → stores the actual recipe videos
* Google Sheets → stores structured metadata (name, tags, notes, link)

Hatch-and-Batch acts as the bridge between them, allowing users to upload, search, and view recipes seamlessly.

---

## FEATURES

1. Upload Recipe Videos
2. Tag and categorize recipes
3. Search recipes instantly
4. View stored videos directly from Google Drive
5. Lightweight system using familiar Google tools

---

## HOW IT WORKS

## UPLOAD FLOW

1. User opens the app
2. Selects "Upload"
3. Uploads a video to Google Drive
4. Copies the generated Drive link
5. Pastes the link into the app
6. Adds:

   * Recipe name
   * Tags
   * (Optional) notes
7. App saves metadata into Google Sheets

Result:
The recipe is now stored and searchable.

## SEARCH FLOW

1. User opens the app
2. Types a keyword (name or tag) in the search bar
3. App queries Google Sheets
4. Matching results are returned
5. User sees:

   * Recipe name
   * Tags
6. User taps a recipe
7. App opens the video via Google Drive link

Result:
The recipe video is instantly accessible.

---

## DATA STRUCTURE

Google Drive:

* Stores raw video files

Google Sheets:

* Recipe Name
* Tags
* Notes
* Google Drive Link

---

## SYSTEM FLOW SUMMARY

User Action → App → Google Sheets (search metadata)
→ Google Drive (store / retrieve video)

---

## USE CASES

* Personal recipe collections
* Cooking content creators
* Meal prep planners
* Family recipe archives

---

## FUTURE IMPROVEMENTS

* Auto-upload without manual link copying
* Thumbnail previews for videos
* Advanced filtering (by tag, date, category)
* User accounts and syncing
* AI-based recipe tagging

---

## PROJECT NAME ORIGIN

"Hatch" represents creating or adding new recipes.
"Batch" represents organizing and retrieving them efficiently.

---

## END
