# Wedding Invitation — React JS + Tailwind CSS

A converted version of the attached project: React with JavaScript and JSX, Tailwind CSS 4 for styling inside components, and GSAP for the gate-opening animation. The original images, Arabic text, fonts, icons, and animation settings were kept as they were, with no redesign of the interface.

## Running the Project

Use Node.js 22.12 or newer (or 20.19 or newer within the 20 series). From inside the project folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To build the production version and try it out:

```bash
npm run build
npm run preview
```

You can also use the package manager pinned in the project, `pnpm@11.25.0`, with the included lock file:

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm build
```

## Code Structure

```text
src/
├── assets/images/          # All the original project images
├── components/
│   ├── opening/            # The gate and the invitation-opening seal
│   ├── hero/               # Main image, letters, butterflies, and date details
│   ├── details/            # Invitation card, calendar, countdown, and photo gallery
│   ├── layout/             # Page layout and footer
│   └── ui/                 # Icons
├── constants/              # Couple data, date, and GSAP settings
├── hooks/                  # Invitation opening and scroll locking
├── pages/HomePage/         # Assembly of the page sections
├── utils/                  # Reduced-motion preference support
└── index.css               # Tailwind import, fonts, theme, animations, and global reset only
```

## What Changed?

Component styling moved from traditional CSS classes to Tailwind utilities in `className`, including gradients, shadows, `before` and `after` elements, and small-screen responsiveness. Exact values use Tailwind arbitrary values to preserve the original sizes and colors. The states for invitation opening, the active image, and the selected day use conditional classes in React.

The `src/index.css` file is not a component styling file; it only contains the font and Tailwind imports, the definition of fonts and the seal and butterfly animations inside `@theme`, and the global reset. CSS variables inside `style` are reserved for dynamic values that come from JavaScript, such as image URLs and butterfly positions, and are not a substitute for Tailwind in styling components.

## Customizing the Invitation

Change the names and the date from `src/constants/couple.js`; the letters update automatically. Change the venue details from `src/components/details/SaveTheDateSection.jsx`. Adjust the gate speed from `src/constants/animation.js`, the invitation text from `DetailsSection.jsx`, and the images and their captions from `WeddingGallerySection.jsx`.

Images are stored locally inside the project, and fonts are loaded from Google Fonts as in the original, so an internet connection is required to load the fonts. The countdown uses the browser's local time zone, as in the original project. The gate, photo gallery, and butterflies respect the reduced-motion setting.

## Gentle Auto-Scroll

After the cover finishes opening, the page waits two seconds and then starts scrolling down automatically at 24 pixels per second. Starting and resuming ease in over 1.6 seconds with no sudden jump, and the scroll slows down near the end of the page and then stops.

On desktop, scrolling pauses for as long as the mouse pointer is over the page and resumes when it leaves; if the pointer stays over the invitation after clicking the cover, move it out of the page so the auto-scroll can start. On mobile, it pauses while the screen is touched and resumes after the finger is lifted. Press-and-hold, manual scrolling, the mouse wheel, and scroll buttons also stop the motion, and manual control is never blocked. Hidden tabs or the reduced-motion setting also stop the auto-scroll.

The delay, speed, and resume duration can be adjusted in `src/constants/scroll.js`; the implementation is in `src/hooks/shared/useAutoScroll.js`. No additional libraries are used, and neither the page design nor the cover fix has changed.