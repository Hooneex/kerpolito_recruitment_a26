# Ker(PoliTo) Recruitment Microsite

A static, single-page recruitment website for Ker(PoliTo), designed around the Autumn 2026 recruitment campaign. It uses only HTML, CSS and vanilla JavaScript, with no build step or paid service.

## Open the site locally

Double-click `index.html` to open it in your browser.

For the most accurate local preview, you can also serve the folder with any simple static server. For example, from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Update links and recruitment dates

All cycle-specific information is in one file:

```text
js/config.js
```

Edit the `window.KER_CONFIG` object to update:

- campaign name;
- Open Meeting date, time, room and venue;
- application deadline date and time;
- application, Instagram, Telegram, TikTok, YouTube, Linktree and email links.

The links supplied for the Autumn 2026 campaign are already configured. Update the values in this file when a channel or recruitment form changes.

The two **Save to calendar** buttons use the standard `.ics` files in `assets/calendar/`. Update those two files together with the displayed dates when the recruitment cycle changes.

## Social icons

The white social logos are lightweight inline SVG symbols in `index.html`, based on the monochrome Simple Icons artwork. No external icon library or runtime request is required.

## Team photos

The supplied Team photographs are included as lightweight WebP files in:

```text
assets/images/
```

The postcard strip is defined in `index.html`. To replace a photograph, update its image file and keep the same filename, or change the corresponding `src` and `alt` attributes.

## Logo

The supplied white Ker(PoliTo) logo is included at:

```text
assets/images/kerpolito-logo.png
```

It has only been trimmed to remove transparent empty space; its proportions and artwork have not been changed. Replace this file while keeping the same filename if the official master asset is updated.

The favicon is stored at:

```text
assets/icons/favicon.svg
```

## Publish for free with GitHub Pages

1. Create a GitHub repository and upload the full contents of this folder.
2. Make sure `index.html` is in the repository root.
3. Open the repository on GitHub.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the **main** branch and **/(root)** folder.
7. Click **Save**.

GitHub will provide the public site URL after deployment. No build command, backend or paid hosting is required.

## Project structure

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js
│   └── main.js
├── assets/
│   ├── images/
│   │   ├── kerpolito-logo.png
│   │   └── team-*.webp
│   ├── calendar/
│   │   ├── open-meeting.ics
│   │   └── application-deadline.ics
│   └── icons/
│       └── favicon.svg
└── README.md
```
