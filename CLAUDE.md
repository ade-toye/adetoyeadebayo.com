# CLAUDE.md — Portfolio Build Plan

## Who this is for
Adetoye Adebayo. Rising junior, Computer Science @ Tufts (Class of 2028), minors in Economics and Entrepreneurship. Co-founder and COO, Tamam Health (offline-first electronic health record platform for South Sudan's public hospital system). Developer, JumboCode (Tufts' student-run software studio for nonprofits). MLT Fellow, Laidlaw Scholar (ran a 17,000-observation field study on labor market bias with Professor Laura Gee), NSBE Secretary, SEO EDGE Fellow, ColorStack member. From Lagos, Nigeria.

## Repo
github.com/ade-toye/adetoyeadebayo.com (new repo, name matches the domain on purpose)

## What we're building
A Minecraft-inspired personal portfolio site, aiming for tight visual and structural fidelity to https://danielomoregie.com/, same layout proportions, same font style, same UI chrome patterns, not just loose inspiration. The implementation is still 100% original: every line of code, every asset, and all copy is Adetoye's own, do not scrape or directly reuse that site's actual source code, images, fonts, or audio files. Match the look and feel closely, just build it from scratch.

## Tech stack
- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, no separate config file needed)
- skinview3d for the animated 3D character viewer (bundles its own Three.js dependency)
- React Router for section routing
- Deploy: GitHub Actions → GitHub Pages, custom domain adetoyeadebayo.com
- `vite.config.ts` should set `base: "/"` explicitly

## Typography
Two font families, used consistently everywhere, not just on the hero:
- Pixel/blocky font for all UI chrome (hero title, nav buttons, section headers, loading-screen logo, character nameplate): **"Minecraft" by Craftron Gaming**, self-hosted at `public/fonts/minecraft.woff2` (2.6KB woff2, verified full a–z/A–Z/0–9 coverage in-browser). Locked in Phase 3 — see Locked technical decisions for sourcing details and the corrupt-file gotcha.
- Caveat (already in use) stays as the handwritten font for the rotating side note only, that one's a good match already, don't change it.

## Theme
Professional Minecraft-inspired. Not childish, not a gimmick.
- One-pager (locked Phase 10): the viewport is the page. `html, body { height: 100%; overflow: hidden }` — no scrolling anywhere, on any route. Content added in future phases must fit the viewport (or manage its own internal scroll region deliberately).
- Dark pixel/blocky UI. Card layout styled like inventory slots.
- Pixel font for headers only (the "Minecraft" UI typeface, see Typography). Clean, legible sans-serif for body copy, recruiters need to actually read this.
- Subtle game language: nav styled like a hotbar, project cards as "item" cards, achievements section with an unlock feel. Restraint over cuteness.
- Fast load, real content, no dead ends, no filler pages.

## Sections
Top-level nav matches the reference site's structure: four stacked buttons, same position and style, not a five-item menu.
- About (routes to /whoami content: personal intro)
- Experience (routes to /quests content: Tamam Health, JumboCode, Laidlaw research)
- Projects (routes to /builds content: Tamam Health, HireKapture, FoodLink, Arith image compressor, TransitFlow Simulator)
- GitHub (Phase 8, replaces Contact in the nav to match the reference: external link to the GitHub profile, new tab)

The /contact route still exists (email + resume downloads land there in the content phase) but is not a nav button; LinkedIn is covered by the button under the character.

The /whoami, /inventory, /quests, /achievements, /builds language stays as in-page flavor text, section subheadings, or URL slugs, not as the primary four visible nav buttons. Achievements and skills/inventory can be subsections within About or Experience rather than standalone top-level nav items, keep the visible button count at four to match the reference structure.

## Hero
Name displayed: Adetoye Adebayo (full name, no nickname). Rendered as Toye's pre-made logo image (Phase 7): `public/images/adetoye-logo.png`, an 832×79 transparent-background PNG, shown inside the `<h1>` with `alt` carrying the name. Width `clamp(320px, 68vw, 1200px)` + `image-rendering: pixelated` — measures exactly the reference title's 1163px at a 1710px viewport. The `.text-3d` CSS extrusion is no longer used by the hero but stays for section headers.
Tagline: removed from the hero display (Phase 6, Toye's call) — the line ("Computer Science, Economics & Entrepreneurship @ Tufts '28 • COO @ Tamam Health") stays in src/data/site.ts for reuse on About/Contact.
Side note: small handwritten-style text next to the 3D title, yellow, matching the reference site's positioning (diagonal, near the title, not a separate headline). Cycles continuously through the list (~3.5s interval, random starting entry): "Proud Naija boy!", "Manchester United 4L". Keep the list in src/data/site.ts so more can be added later.

## About paragraph
I'm Adetoye Adebayo, a rising junior at Tufts studying Computer Science with minors in Economics and Entrepreneurship. I'm the co-founder and COO of Tamam Health, an offline-first electronic health record platform we're building for South Sudan's public hospital system, and I develop for JumboCode, Tufts' student-run software studio for nonprofits. I've also run a 17,000-observation field study on labor market bias through the Laidlaw Foundation. Originally from Lagos, Nigeria, I care about building technology that actually reaches the people who need it most, especially across healthcare, finance and emerging markets. (Wording updated Phase 12: "finance" replaced "education", and no em dashes anywhere in site copy, Toye's rule - use commas or hyphens instead.)

The About page includes a small rotating photo carousel next to the bio text (dot-indicator pagination), confirmed as a pattern on the reference site. Use `public/images/headshot.jpg` as the first slide, remaining slides from `public/images/about/`.

## About page (Player Info panel) — built Phase 11
`/about` renders as a full-viewport modal-style panel (`PagePanel`, reusable for Experience/Projects later): header bar with "[ ABOUT ME ]" left and an "× Close" control right — Close returns home, Escape does too, and `.mc-close` (gray, red on hover) is the sitewide pattern for every modal close control. Left: `PhotoCarousel` (headshot first, then `public/images/about/*`; overlaid centered chevrons, caption strip on the photo, square-dot pagination + "X / N — use ‹ › to browse" counter, all computed from the slide array in `site.about.photos`). Right: yellow "// LABEL" pixel headers — PLAYER INFO (name + full bio from this file), EDUCATION (Tufts, B.S. CS + minors, May 2028), INTERESTS ("Playing soccer, Traveling, Minecraft, listening to music and hanging out with friends."), SKILL INVENTORY (`SkillChips` grid: Python, JavaScript, TypeScript, C++, C, HTML, CSS — the language set from github.com/ade-toye), and a wide "[,] View Resume" button opening a dropdown with Resume (SWE) / Resume (PM) → the Google Drive links above, new tab. Photo captions (Phase 12): "That's me." / "Won 10k at Tufts New Venture Comp" / "First time in Paris" / "Take me back to turkey". The panel body is an internal scroll region (sanctioned exception to the one-pager rule). Typography exception (Phase 12, Toye's call): panel body copy (bio, education detail, interests) renders in the pixel font like the reference, smaller and non-bold vs the name — overriding the sans-serif body rule inside this panel. Experience/Projects/Contact reuse the same `PagePanel` frame and sizing.

## Experience page (Experience Log) — complete Phase 15
`/experience` renders in the `PagePanel` frame: "[ EXPERIENCE LOG ]" header, then an instruction line ("Hover over a card for the full rundown.", original wording). 2x2 `ExperienceCard` grid (single column on mobile, cards h-[530px] there so the longest description fits) from `site.experience`: Tamam Health / Co-Founder & COO (green #5aa53e), Coderina EdTech / Teaching Assistant (orange #e2622c), JumboCode / Software Developer (blue #4a8fe0), Laidlaw Research / Research Scholar (purple #8b5cf6) — full copy, dates, locations, and 5 tags each live in `site.experience` (supplied by Toye, Phase 15; his copy uses en dashes in date ranges, which are allowed — the ban is em dashes). Front state: colored left-edge accent, centered org (white pixel) / role (accent color) / dates / location / "[ hover to see more ]". Hover motion (matched to `_assets/screenshots/flip_motion.mov`): a real 3D flip — `perspective: 1100px`, inner wrapper `rotateY(180deg)` on hover/focus-within, `transition: transform 0.3s ease-in-out` (duration measured from the video at ~6 frames @20fps), both faces `backface-visibility: hidden`. Gotcha: the back face's pre-rotation cancels the parent's flip, so its accent bar must be **right**-anchored to land on the right edge like the reference. Only the hovered card flips; keyboard focus flips too (a11y); prefers-reduced-motion swaps instantly.

## Contact page — built Phase 17
`/contact` renders in the `PagePanel` frame: "// EMAIL" (mailto link), "// RESUME" (`ResumeDropdown`), "// LINKS" (LinkedIn + GitHub stone buttons). All values from `site.contact` / `site.resumeDrive`. Tap targets: resume button 48px, menu items 44px, LinkedIn 44px.

## Responsive rules (locked Phase 17)
- Below 768px the CharacterWidget (and its LinkedIn button) is hidden, so `LinkedInButton` (shared component) relocates directly beneath every visible "View Resume" button via `md:hidden` (About panel; Contact shows it always in LINKS). On bare Home below 768px there is deliberately no LinkedIn button. At exactly 768px the widget version appears and the relocated one hides — the classes are complementary, no double/none state.
- Experience cards on touch devices: tap toggles the flip (`onPointerUp` gated to `pointerType === 'touch'`, so mouse hover stays pure). Keyboard flip uses `group-focus-visible`, NOT `group-focus-within` — tap-focus on the tabIndex card would otherwise hold the flip open forever (`:focus-visible` only matches keyboard focus). Tailwind v4's hover variants are already `(hover: hover)`-gated, so sticky-hover on touch isn't an issue.
- Carousel chevrons 40×40px; verified no horizontal scroll on any route at 375/768/1280.

## Projects page — complete Phase 16
`/projects` renders in the `PagePanel` frame: "[ PROJECTS ]" header + red-hover Close. Five full-width cards stacked vertically (NOT a grid), in this order with these accents: Tamam Health 🏥 green #5aa53e, HireKapture 📋 cyan #22b8cf, FoodLink (via JumboCode) 🍽️ blue #4a8fe0, Arith 🗜️ orange #e2622c, TransitFlow Simulator 🚦 purple #8b5cf6. Full titles/icons/dates/tags/bullets live verbatim in `site.projects` (supplied by Toye, Phase 16 — TransitFlow has two bullets, the rest three; do not pad or trim them). Card layout: icon + bold white title left with gray right-aligned dates on the same row, tag chips bordered AND colored in the card's accent, then arrow-marked (▸, accent-colored) bullets. Five cards exceed one viewport: the panel body scrolls internally while the header/Close stay fixed — this is a hard requirement, verified by programmatic + wheel scrolling in the review loop (page-level scroll stays locked at 0 per the one-pager rule).

## Achievements (Phase 12)
Minecraft advancement-style toasts: `AchievementsProvider` + `useAchievements().unlock(id)`, entries in `site.achievements`. Toast slides in top-right (trophy icon, yellow title, white subtitle), holds **7s** if the visitor stays on the page, but **navigating away dismisses it immediately** (Phase 13: each toast records the `window.location.pathname` that earned it; a location change to any other path starts the slide-out). Gotcha: read the pathname from `window.location` at unlock time, NOT from a ref synced via a provider effect — the page's unlock effect (child) runs before the provider's sync effect (parent), so the ref still holds the previous route and every SPA-navigation toast self-dismisses instantly. Fires on **every** page open (Phase 14, Toye's spec, replacing the earlier once-per-session rule); unlocks fired while the loading screen is up are queued and flushed ~400ms after it dismisses (otherwise a deep link's toast plays out invisibly behind the z-50 overlay). Achievements: About → "Getting to know me" / "Opened About"; Experience → "We getting hired!" / "Opened Experience"; Projects → "Inventory check" / "Opened Projects". StrictMode gotcha: dismissal timers must be scheduled from toast state in an effect, not inside unlock, or the simulated remount clears them while the dedupe blocks re-arming. NOTE: Toye's reference screenshot for this toast never came through — current styling follows the classic Minecraft advancement pattern and still needs his 1:1 comparison.

## Resume
Two versions exist since Adetoye is recruiting for both tracks. Recommended: bundle the actual files at `public/resume/Toye_Adebayo_SWE_Resume.pdf` and `public/resume/Toye_Adebayo_PM_Resume.pdf` and link to those directly, self-hosted is more reliable than an external link since there's no risk of a Google Drive permissions error blocking a recruiter. Show both as separate labeled downloads ("Resume (SWE)" / "Resume (PM)"). Drive versions exist as a fallback reference if self-hosting isn't wired up yet (labels corrected Phase 12 — they were swapped in earlier notes): [SWE resume](https://drive.google.com/file/d/1Qzv1dxenbyXmLR1NCDdFN-mXhJycxOuY/view?usp=sharing), [PM resume](https://drive.google.com/file/d/1r5d3dmCbmAjFsB6HSBVoDZGvqKkuY6q_/view?usp=sharing).

## Contact
GitHub: https://github.com/ade-toye
LinkedIn: https://www.linkedin.com/in/adetoye-adebayo/
Email: adebayo_adetoye@yahoo.com

## Review loop (run after every phase, non-negotiable)
Before declaring any phase complete, switch into senior-engineer code-review mode and audit what was just built:
- Run `pnpm run build` and `pnpm run dev`. Zero build errors, zero console errors or warnings.
- Any skinview3d viewer, event listener, interval, or subscription must be cleaned up on unmount. skinview3d specifically leaks WebGL contexts if `.dispose()` isn't called, this matters in a router-based SPA where CharacterWidget could mount/unmount on navigation.
- Responsive check at 375px, 768px, 1280px.
- Accessibility check: alt text, keyboard nav, visible focus states, aria-labels on icon-only buttons (the gear icon, etc.), color contrast.
- No placeholder, lorem-ipsum, or TODO content left behind.
- No hardcoded values that should be props, config, or pulled from this file.
- Audio: browsers block autoplay-with-sound without a user gesture. Both toggles default **ON** (Phase 7), and **both persist in localStorage** (`mc-sound-fx` / `mc-nature`, Phase 9) so a reload keeps the visitor's choice. Nature's initial `.play()` is typically rejected by autoplay policy — that rejection keeps the toggle ON and arms retry listeners (`pointerdown`/`keydown`/`click`, capture phase) that start playback on the first gesture anywhere. The retry must stay armed until a `play()` **succeeds** (one-shot listeners get consumed by a rejected early attempt); only give up and flip the toggle OFF when `el.error` is set (a genuine media failure) — StrictMode's dev double-mount rejects with AbortError, so rejection-type sniffing is unreliable. While Nature is wanted-but-locked, `AudioUnlockHint` shows a small "Click anywhere to enable sound" pixel toast (bottom-center) that self-dismisses when playback starts; it also fires one gesture-free retry when the loading screen dismisses, which succeeds for origins where Chrome's media-engagement heuristics permit autoplay. **Accept the hard limit: no site can start audible sound on a fresh load before the session's first interaction — don't chase "auto-play on reload" beyond this design.** Testing gotcha: headless Chrome falsely reports `navigator.userActivation.isActive` at load and ignores `--autoplay-policy`, so blocked-flow tests must shim `HTMLMediaElement.play` with an input-tracking init script (see the drive13 pattern).
- If this phase touched routing: GitHub Pages serves static files, so a direct link or refresh on a non-root route (e.g. adetoyeadebayo.com/about) will 404 unless handled. Confirm a fix (404.html redirect trick, or HashRouter) is in place before the deployment phase, don't discover this at launch.
- Anything modeled on the reference site must be screenshot-verified before it's called done: screenshot the built result, place it side-by-side against the matching reference screenshot (crops from `_assets/screenshots/`), and iterate until visually aligned — don't sign off from code reading alone.
List every issue found, fix it, rebuild, then confirm clean before moving to the next phase.

## Project: HireKapture
Chrome extension that logs job applications (role, company, link, deadline, status) into Google Sheets. Built with JavaScript, Chrome Extension APIs, and the Google Sheets API. Confirmed real, include on /builds and /quests.

## Character / skin viewer
- Custom 64x64 Minecraft-style skin already made, lives at `public/skins/minecraft_skin.png`. Swappable any time by just replacing the file, nothing else changes.
- `skinview3d.SkinViewer` wrapped in `src/components/CharacterWidget.tsx`, fixed bottom-LEFT (confirmed from reference screenshots, not bottom-right), hidden on small screens if it competes with mobile layout.
- Nameplate label floats above the character's head, reads "Toye" (not the full name), matching the reference's first-name-only pattern. Styled in the site's pixel UI font (see Typography), not skinview3d's default tag styling, if the native nameTag option can't be restyled with a custom font, replace it with a small custom HTML overlay positioned above the character instead.
- No continuous auto-rotation. `autoRotate` stays off. Body and legs are governed only by the WalkingAnimation, they should never spin or rotate on their own.
- Cursor-tracking is head-only: rotate the head bone/object toward pointer position within a small clamped range (a glance, not a spin). The rest of the body does not react to the cursor. Easing is 0.35/frame (Phase 8) — near-instant tracking with just enough smoothing not to jitter; don't drop it back to sluggish values.
- Reasonable starting defaults: `animation = new WalkingAnimation()` with `speed ≈ 0.8`, `zoom ≈ 0.85`, `fov ≈ 45`. Tune to taste.
- Animation is set on the viewer instance and is fully independent of which skin PNG is loaded. Never couple animation logic to the skin file.
- For a stronger afro silhouette: exaggerate the outer "hat/hair" overlay layer on the skin texture rather than relying on the base head layer alone. A custom .glb voxel model via Blockbench is a possible later upgrade but is out of scope for the initial build.

## UI chrome (confirmed from reference screenshots)
- Homepage background (locked Phase 9): looping Minecraft-biome video, homepage only (`BackgroundVideo` inside Home), `fixed inset-0 object-cover` so it fills every viewport (narrow screens crop in tighter), muted+playsInline+loop+autoplay, frozen on frame one under prefers-reduced-motion, with a `bg-black/30` scrim above it for text contrast. Encoding matters: browsers need H.264/yuv420p MP4 (the original HEVC .MOV won't play in Firefox), audio track stripped, `-movflags +faststart` so playback starts before the download finishes. Re-encode recipe: `ffmpeg -i src -an -c:v libx264 -preset slow -crf 28 -vf "scale=1280:-2,fps=30" -pix_fmt yuv420p -movflags +faststart out.mp4` (ffmpeg-static via npm; system only has avconvert, which can't hit sane bitrates).
- Hero: giant blocky 3D-styled name text as the page title, with a small handwritten-style side note next to it, see the Hero section above for exact content.
- Settings gear icon, top-right, opens an OPTIONS panel styled like Minecraft's pause/options screen: two independent toggles (SOUND FX, NATURE) and a DONE button. The panel is compact (~208px wide) and anchored to the top-right corner over the gear — not centered, and the page behind is not dimmed (matches reference). Click-outside and Escape both close it.
- Two independently toggleable audio channels: Sound FX (short click/UI sounds on nav interaction) and Nature (looping ambient background track). Sourced from free/CC0 libraries (Kenney.nl / Pixabay / Freesound), not extracted from the reference site. Files already in place at `public/sounds/minecraft_click.mp3` (Sound FX) and `public/sounds/background.mp3` (Nature).
- Footer: copyright line bottom-left, version tag bottom-right (e.g. v1.0.0). LinkedIn button (Phase 8): labeled "LinkedIn" with the blue in-badge icon, `.mc-button-light` style, sits directly under the character inside CharacterWidget (so it's hidden below `md` with it), opens the profile in a new tab.
- Loading screen (locked Phase 6): centered logo block on solid black — a wide rectangular **orange** box (`--color-mc-load: #d97706`, deliberately not the reference's exact orange; the site-wide accent elsewhere stays green) with two-tier pixel-font text ("ADETOYE" large, "STUDIOS" smaller beneath). Below: a status line that cycles every ~1.1s through "Crafting portfolio…", "Building projects…", "Mining emerald…", "Spawning resume…" (list in src/data/site.ts), a horizontal progress bar in the same orange, and a small muted copyright line. Timing (locked Phase 4): shows for a **minimum of 5 seconds** even if the scene is ready sooner; if loading genuinely takes longer, it waits for the scene instead of cutting off. A separate ~10s failure-safety timeout recovers from a load that never settles (hung request / broken WebGL) — two independent mechanisms in App.tsx (`LOADING_MIN_MS`, `LOADING_FAILSAFE_MS`), don't merge them.

## Asset inventory (final locations inside the Vite project)
All of these should live under `public/`, not loose in a staging folder:
- `public/skins/minecraft_skin.png` — character skin
- `public/sounds/minecraft_click.mp3` — Sound FX
- `public/sounds/background.mp3` — Nature/ambient loop
- `public/videos/minecraft_biome_background_v2.mp4` — homepage background loop (1080p H.264, CRF 20 ≈ visually transparent, ~23MB, audio stripped, +faststart). Sources archived in `_assets/`: `minecraft_biome_background_v2.mov` (525MB original, Phase 10) and the older `minecraft_biome_background.MOV`. Versioned filename on purpose: replacing footage under the same URL leaves repeat visitors watching the browser-cached old video. NOTE: never park assets in `dist/` — it's wiped by every build (both videos were originally dropped there).
- `public/images/adetoye-logo.png` — hero title logo (832×79 transparent PNG)
- `public/images/headshot.jpg` — primary About photo
- `public/images/about/` — remaining carousel photos (converted from HEIC, see note below)
- `public/resume/Toye_Adebayo_SWE_Resume.pdf`
- `public/resume/Toye_Adebayo_PM_Resume.pdf`
- Favicon (Phase 19): `public/favicon-face.svg` + `favicon-32x32.png` + `favicon-16x16.png` + `favicon.ico` (16/32/48 frames) — all four generated from the same source pixels: the skin's 8×8 face tile (base layer x8-16,y8-16 composited with the hat/hair overlay x40-48,y8-16), nearest-neighbor/exact-color only, no anti-aliasing. The old Vite default (`favicon.svg`, purple Vite mark) is deleted, not just unreferenced — confirmed 404 on that path in the built `dist/`. Regenerate with the composite-then-nearest-neighbor recipe above if the skin changes; hand-roll the `.ico` (raw PNG-frame container via `struct`) rather than Pillow's multi-size `save(sizes=...)`, which silently LANCZOS-blurs frames resized from the base image instead of using the crisp per-size source.

Note: some source photos are `.HEIC` (Apple's format), which most browsers other than Safari can't render. Convert to `.jpg` before placing in `public/images/about/`. On Mac, no extra install needed: `sips -s format jpeg Picture3.HEIC --out Picture3.jpg`.

## Locked technical decisions (don't relitigate these in future sessions)
- Pixel/heading font (locked Phase 3): **"Minecraft" by Craftron Gaming**, MIT-licensed via the South-Paw/typeface-minecraft packaging, self-hosted at `public/fonts/minecraft.woff2`. The known-good file is the copy bundled inside skinview3d (`node_modules/skinview3d/assets/minecraft.woff2`) — the woff2 on South-Paw/typeface-minecraft's master branch is **corrupt** (Chrome's OTS sanitizer rejects it: "cmap: Range glyph reference too high"), so don't re-download from there. Bonus: it's the exact family skinview3d's `NameTagObject` defaults to, so the nameplate renders in it via the `font: '48px Minecraft'` option with no extra wiring. Monocraft (v3.0) was removed with this change.
- Nav buttons (locked Phase 7): light stone-gray `.mc-button-light` (gradient + bevel), sized to the reference exactly — 617×62px buttons, 21px gap, 21px font at a 1710px viewport (`max-w-[38.5rem]`, `py-[18px]`, `text-[21px]`). The dark `.mc-button` variant remains for the gear/modal.
- Button hover (locked Phase 8): `.mc-button-light:hover` turns Minecraft-green (gradient #69b754→#47903a) — every future button using that class (project cards, page buttons) inherits it automatically. The settings gear gets `cursor: pointer` only, no hover tint (`.mc-button-nohover`, declared after `.mc-button:hover` so it wins at equal specificity).
- Character nameplate (locked Phase 3, resized Phase 7): native skinview3d `NameTagObject` with the custom font, no HTML overlay needed. `height: 3` + canvas height 300 so "Toye" never clips. Head-only cursor tracking is a `WalkingAnimation` subclass (`GlancingWalkAnimation` in CharacterWidget.tsx) that applies eased, clamped head-rotation offsets *after* `super.animate()` runs — required because WalkingAnimation's head-bob writes head rotation every frame and would otherwise overwrite the glance.
- GitHub Pages 404-redirect fix (public/404.html + decode snippet in index.html) was already added in Phase 1, ahead of the original schedule. Phase 10 just verifies it against the production build, doesn't need to re-implement it.
- Bundle is ~756KB / ~205KB gzipped, almost entirely three.js via skinview3d. Acceptable for now. Lazy-loading CharacterWidget is a reasonable later optimization, not urgent.
- Click sound (locked Phase 6): played via **Web Audio** (pre-fetched, decoded with an OfflineAudioContext at mount, leading silence auto-trimmed, `AudioBufferSourceNode` per click), NOT an `<audio>` element — the media-element pipeline adds audible click-to-sound latency. The live `AudioContext` is created inside the first click handler so Chrome logs no autoplay warning. Nature remains an `<audio loop preload="none">` element.

## Keeping this file current
Whenever a phase locks in a real technical decision (a font choice, a library version, a workaround for a bug), update CLAUDE.md directly as part of that phase, don't leave it for Adetoye to manually transcribe back in later. This file should reflect the actual state of the project at all times.

## Build rules
- Work in small steps. One section or component per pass.
- Explain planned file changes before editing.
- Build reusable components (Navbar, Hero, SectionWrapper, MinecraftCard, CharacterWidget, Footer), don't one-off everything.
- Run `pnpm run build` (or `npm run build`) after major changes. Don't move to the next section on a broken build.
- Mobile-first responsive. Test at roughly 375px, 768px, and 1280px.
- Accessibility: semantic HTML, alt text on images, keyboard-navigable nav, respect `prefers-reduced-motion` for the 3D viewer and any animated transitions.
- Token discipline: reference this file instead of re-explaining project context each session. Don't regenerate whole files for small tweaks, use targeted edits. Use screenshots over long text descriptions when matching a visual reference.
- Never invent or add biographical facts, project details, or numbers that aren't already in this file. If something's missing, ask Adetoye rather than guessing. (Note: Alnylam and any lab skills like HPLC/ELISA were floated by ChatGPT and confirmed false, never reintroduce them.)

## Deployment
- LIVE (Phase 18): `.github/workflows/deploy.yml` — checkout + **configure-pages@v5 with `enablement: true`** (creates the Pages site from the workflow; without it, deploy-pages 404s on a repo where Pages was never enabled — that was the first deploy failure) + setup-node 22 (npm cache) + `npm ci` + `npm run build`, then upload-pages-artifact/deploy-pages with `pages: write` + `id-token: write` permissions and a cancel-in-progress concurrency group. No CNAME file in the repo. Verified live on https://adetoyeadebayo.com: HTTPS 200, assets 200, deep links serve 404.html with the redirect script (correct mechanism). NEVER commit `_assets/` — it holds >500MB raw video sources, is gitignored (Phase 18), and once bloated a push past GitHub's limits (fixed by rewriting the unpushed commits with filter-branch).
- Deep links verified against the real production build (dist/ served with true GitHub Pages semantics: unknown path → 404.html + HTTP 404): /about, /experience, /projects, /contact all bounce through the redirect and render with correct URLs. EXPECTED: each deep link logs one console error ("Failed to load resource: 404") for the initial document request — that IS the spa-github-pages mechanism and will appear on the live site; it is not a defect. The review-loop "zero console errors" rule carves out this one exception.
- Experience cards: front-state hint reads "[ hover to see more ]" at md+ and "[ click to see more ]" below md (Phase 18).
- GitHub Actions workflow builds and deploys `dist/` to GitHub Pages on every push to `main`.
- Custom domain (adetoyeadebayo.com) is set in repo Settings → Pages, not via a CNAME file in the repo (Actions-based deploys don't use one).
- DNS on GoDaddy: four A records on `@` pointing to GitHub Pages' IPs (185.199.108.153, .109.153, .110.153, .111.153), plus a CNAME on `www` pointing to `ade-toye.github.io`.


To access the screenshots and recordings for reference, go to the screenshots folder. 