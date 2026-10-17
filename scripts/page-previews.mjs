// scripts/page-previews.mjs
//
// WHAT THIS DOES
// Social-media bots (LinkedIn, X, WhatsApp, Pinterest) don't run JavaScript,
// so on a single-page app they only ever see build/index.html, and every link
// shows the homepage card. After `vite build`, this script makes one copy of
// build/index.html per page (e.g. build/tools/ClimateZoneMap/index.html) with
// that page's own title, description, image and URL. Hostinger serves the
// real file when it exists, so bots get the right card. People still get the
// normal React app (every copy loads the same JavaScript).
//
// It also writes build/sitemap.xml so Google can find every page.
//
// HOW TO EDIT
// - To change a page's wording: edit its line in PAGES below.
// - To add a page: copy a line, change path/title/desc.
// - Optional per-page image: add  image: '/images/og/my-tool.png'
//   (1200 x 630 px, placed in public/images/og/).
// HOW TO UNDO
// Delete this file and remove " && node scripts/page-previews.mjs" from the
// "build" line in package.json.

import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://schematically.org'
const BUILD_DIR = process.env.BUILD_DIR || 'build'
const DEFAULT_IMAGE = '/og-image.png'

const NBC_PARTS = [
  'Integrated Approach',
  'Definitions',
  'Administration',
  'Development Control Rules and General Building Requirements',
  'Fire and Life Safety',
  'Building Materials',
  'Structural Design',
  'Construction Management, Practices and Safety',
  'Building Services',
  'Plumbing Services',
  'Landscape Development, Signs and Outdoor Display Structures',
  'Approach to Sustainability',
  'Asset and Facility Management',
]

const BRANDS = [
  ['Jaquar', 'Jaquar', 'Sanitaryware & Bathroom Fittings'],
  ['Nuvocotto', 'Nuvocotto', 'Terracotta Building Products'],
  ['Tostem', 'TOSTEM', 'Aluminium Doors, Windows & Facades'],
  ['Vox', 'VOX', 'Ceilings, Wall Panels, Facades & Flooring'],
  ['Danpal', 'Danpal', 'Translucent Daylighting Systems'],
  ['Artize', 'Artize', 'Luxury Bath Fittings'],
  ['CarbonCraft', 'CarbonCraft', 'Carbon-Upcycled Tiles & Surfaces'],
  ['Toto', 'TOTO', 'Sanitaryware, WASHLET & Bath Fittings'],
  ['Salamander', 'Salamander', 'uPVC Windows & Doors'],
  ['Sumai', 'Sumai', 'Engineered Wooden Doors'],
]

const PAGES = [
  // ---- Tools ----
  { path: '/tools', title: 'Free Architecture Tools', desc: 'Free calculators and maps for architects in India: sanitation, light & ventilation, fire safety, parking, climate zones, elevators, area and steel.' },
  { path: '/tools/CodeCompliance', title: 'Code & Compliance Tools', desc: 'Free calculators to check Indian building-code compliance: sanitary fixtures, light & ventilation, fire safety, parking and airport height limits.' },
  { path: '/tools/DesignPlanning', title: 'Design & Planning Tools', desc: 'Free design aids for architects: climate zone map, EPW weather file finder, scale converter, area statement and elevator planner.' },
  { path: '/tools/MaterialQuantity', title: 'Material & Quantity Tools', desc: 'Estimate structural steel weight and cost by Indian Standard section with the free Schematically metal calculator.' },
  { path: '/tools/SanReq', title: 'Sanitation Norms Calculator', desc: 'Work out the WCs, urinals, washbasins and other sanitary fixtures a building needs, by occupancy type.' },
  { path: '/tools/NaturalLightVentCalc', title: 'Natural Light & Ventilation Calculator', desc: 'Check window and opening areas against natural lighting and ventilation requirements for habitable rooms.' },
  { path: '/tools/FireLifeSafety', title: 'Fire & Life Safety Checker', desc: 'Check fire escape and fire & life safety compliance for buildings in India.' },
  { path: '/tools/ParkingNorms', title: 'Parking Norms Calculator', desc: 'Calculate the parking a building needs, by land use.' },
  { path: '/tools/ColourCodedZoningMap', title: 'Airport Height Check (CCZM), Bengaluru', desc: "Check the maximum permissible building height near Bengaluru's airports using the AAI Colour Coded Zoning Map." },
  { path: '/tools/ClimateZoneMap', title: 'Climate Zone Map of India', desc: 'Interactive Köppen-Geiger and NBC climate zone map of India, with Tier I & II cities mapped.' },
  { path: '/tools/WeatherFileFinder', title: 'EPW Weather File Finder for India', desc: 'EPW weather files and ASHRAE climate zones for 443 Indian weather stations, ready for Ladybug, Honeybee and energy modelling.' },
  { path: '/tools/ScaleCalc', title: 'Drawing Scale Calculator', desc: 'Convert between real-world dimensions and drawing scale units such as 1:50, 1:100 and 1:500.' },
  { path: '/tools/AreaStatement', title: 'Area Statement Guide', desc: 'Occupancy-wise classification and area breakdown logic for built-up and carpet area statements.' },
  { path: '/tools/ElevatorPlanner', title: 'Elevator Planner', desc: 'Plan lift size and the number of elevators for a building, by use and occupancy.' },
  { path: '/tools/MetalCalc', title: 'Steel & Metal Weight Calculator', desc: 'Estimate the weight and cost of structural steel from Indian Standard section tables: ISHB, ISWB, hollow sections and more.' },

  // ---- Knowledge ----
  { path: '/resources', title: 'Knowledge Resources for Architects', desc: 'The National Building Code of India (Parts 0–12), state model building byelaws and Bengaluru height byelaws, free in one place.' },
  { path: '/resources/NBC', title: 'National Building Code of India 2016', desc: 'Read every part of the National Building Code of India (NBC 2016), Parts 0 to 12, free online.' },
  // Sidebar links use "NbcPart0" (not "NBCPart0"), so that is the address people copy and share.
  ...NBC_PARTS.map((name, n) => ({
    path: `/resources/NBC/NbcPart${n}`,
    title: `NBC Part ${n}: ${name}`,
    desc: `Read Part ${n} of the National Building Code of India 2016 (${name}), free online on Schematically.`,
  })),
  { path: '/resources/StateByelaws', title: 'State-wise Model Building Byelaws', desc: 'Explore how model building byelaws vary across Indian states.' },
  { path: '/resources/HeightByelaws', title: 'Building Height Byelaws, Bengaluru', desc: 'Local (BBMP / RMP-2015) and aerodrome (AAI) building height controls in Bengaluru, and how they combine.' },

  // ---- Material Library ----
  { path: '/assets', title: 'Architecture Products Library', desc: 'Browse building products for architects in India by category, material and use: doors, windows, facades, roofing, tiles and bath fittings.' },
  { path: '/assets/Library', title: 'Asset Library', desc: 'Search, filter and download drawings, images, 3D models and CAD files for architecture projects.' },
  ...BRANDS.map(([slug, brand, category]) => ({
    path: `/assets/${slug}`,
    title: `${brand}: ${category}`,
    desc: `${brand} ${category.toLowerCase()} for architects: product range, materials, uses and specifications.`,
  })),

  // ---- About ----
  { path: '/about', title: 'About Akshay Kamath', desc: 'Akshay Kamath, architect and developer of Schematically: free tools, knowledge and materials for architects in India.' },
  { path: '/about/ProjectAtlas', title: 'Project Atlas: Portfolio Map', desc: 'Interactive portfolio map of real estate projects across Bengaluru, with planning boundaries and zones.' },
  { path: '/donate', title: 'Support Schematically', desc: "Help keep Schematically's tools, code references and material library free for architects and students." },
]

// ---------------------------------------------------------------------------

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Replace the content="..." of one meta tag. Stops the build if the tag is
// missing, so a broken preview never gets deployed silently.
function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`page-previews: <meta ${attr}="${key}"> not found in index.html`)
  return html.replace(re, `$1${esc(value)}$2`)
}

const template = fs.readFileSync(path.join(BUILD_DIR, 'index.html'), 'utf8')
if (!/<title>[^<]*<\/title>/.test(template)) throw new Error('page-previews: <title> not found in index.html')

for (const page of PAGES) {
  if (page.desc.length > 160) console.warn(`page-previews: description over 160 characters for ${page.path}`)

  // Folder copies are served by Apache as /path/ (with a trailing slash),
  // so that is the canonical address.
  const url = `${SITE}${page.path}/`
  const title = `${page.title} | Schematically`
  const image = `${SITE}${page.image || DEFAULT_IMAGE}`

  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = setMeta(html, 'name', 'description', page.desc)
  html = setMeta(html, 'property', 'og:title', title)
  html = setMeta(html, 'property', 'og:description', page.desc)
  html = setMeta(html, 'property', 'og:image', image)
  html = setMeta(html, 'name', 'twitter:title', title)
  html = setMeta(html, 'name', 'twitter:description', page.desc)
  html = setMeta(html, 'name', 'twitter:image', image)
  html = html.replace(
    '</head>',
    `  <meta property="og:url" content="${esc(url)}" />\n    <link rel="canonical" href="${esc(url)}" />\n  </head>`
  )

  const outDir = path.join(BUILD_DIR, ...page.path.split('/').filter(Boolean))
  fs.mkdirSync(outDir, { recursive: true })
  fs.writeFileSync(path.join(outDir, 'index.html'), html)
}

// Sitemap: homepage + every page above.
const today = new Date().toISOString().slice(0, 10)
const urls = [`${SITE}/`, ...PAGES.map((p) => `${SITE}${p.path}/`)]
const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  urls.map((u) => `  <url><loc>${esc(u)}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  '\n</urlset>\n'
fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemap)

console.log(`page-previews: wrote ${PAGES.length} page previews + sitemap.xml`)
