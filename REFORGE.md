# ReForge / Solstice pilot

Local branch: `reforge/solstice-pilot`, based on `fa3618d`. No remote changes are made by the pilot scripts.

This adds two native blocks, `campaign-hero` and `campaign-cards`, plus an opt-in `solstice` theme. They implement the original ReForge campaign's text/image/CTA and repeatable-card structures. Existing `hero` and `cards` contracts remain intact. `scripts/aem.js` is unchanged. `scripts/scripts.js` loads the optional theme and tolerates a main-only local draft, so the pilot runs the project's real section/block loading lifecycle.

Authoring examples are in `authoring/campaign-samples.html`; machine-readable contracts live beside each new block in `authoring.json`. These are reviewed local contracts, not evidence of a completed authenticated DA round trip.

From this directory:

```powershell
npm.cmd ci
npm.cmd exec --yes --package=@adobe/aem-cli@16.22.16 -- aem up --no-open --no-livereload --port 3000 --url https://main--eds2--gowtham432.aem.page --html-folder drafts --html-mount /
```

From the parent ReForge workspace, with its Python dependencies available:

```powershell
python scripts/eds_pilot.py --approve-reuse --install-drafts
```

Open `http://localhost:3000/solstice/index` or `/solstice/offers`. The full original static export is in `fixtures/source-sites/campaign-a` in ReForge. Generated `drafts/` content is explicit local authored markup; all decoration uses real `head.html`, `scripts/scripts.js`, `scripts/aem.js`, block JS/CSS and project fonts. It is not hosted DA content. Header/footer integration, the calculator and the existing accordion's mapping remain manual gaps.

Generated DA source documents are under ReForge's `out/eds-pilot/documents/solstice/`. They contain editable block tables and Metadata, not decorated runtime HTML. Review image URLs before authenticated DA import: local `/campaign-assets/` references must become URLs served by the reviewed code-preview branch or DA-uploaded images. Add/import the content through your authenticated DA session, preview it, then change a heading, CTA and image in DA and confirm the rendered changes. The published home page identifies Document Authoring; direct DA source access returned 403 from this environment. No token is stored, requested in chat, or embedded in code.

Targeted new-block lint:

```powershell
npm.cmd exec -- eslint blocks/campaign-hero/campaign-hero.js blocks/campaign-cards/campaign-cards.js
npm.cmd exec -- stylelint blocks/campaign-hero/campaign-hero.css blocks/campaign-cards/campaign-cards.css styles/solstice.css
```

The checkout's baseline `npm run lint` already fails on existing files (Windows CRLF and existing JS/style violations). `npm ci` reported 14 dependency advisories in the existing lockfile. These are recorded separately from pilot-code checks; this change does not bulk-upgrade dependencies or reformat the existing codebase.
