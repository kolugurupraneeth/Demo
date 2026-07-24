import { mkdir, readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'

const projectRoot = resolve(new URL('..', import.meta.url).pathname)
const outputDir = resolve(projectRoot, 'public/assets')

const remoteAsset = async (url) => Buffer.from(await fetch(url).then((response) => {
  if (!response.ok) throw new Error(`Failed to download ${url}: ${response.status}`)
  return response.arrayBuffer()
}))

const localAsset = async (filePath) => readFile(resolve(projectRoot, filePath))

const ensureParent = async (filePath) => mkdir(dirname(filePath), { recursive: true })

const writeImage = async (pipeline, filePath, format, options = {}) => {
  await ensureParent(filePath)

  let output = pipeline.clone()
    .modulate({ saturation: 1.35, brightness: 1.02 })
    .linear(1.12, -12)
    .sharpen({ sigma: 0.9, m1: 1.2, m2: 1.5, x1: 2, y2: 12, y3: 20 })

  if (format === 'jpg') {
    output = output.jpeg({ quality: 90, mozjpeg: true, progressive: true, chromaSubsampling: '4:4:4', ...options })
  }

  if (format === 'webp') {
    output = output.webp({ quality: 88, effort: 5, ...options })
  }

  if (format === 'avif') {
    output = output.avif({ quality: 65, effort: 6, chromaSubsampling: '4:4:4', ...options })
  }

  if (format === 'png') {
    output = output.png({ compressionLevel: 9, palette: false, ...options })
  }

  await output.toFile(filePath)
}

const generateResponsiveSet = async ({
  source,
  name,
  widths,
  baseFormat,
  extraFormats,
  fit = 'cover',
  position = 'centre',
  cropRatio = null, // width/height — set to cap output height (e.g. 1920/900 for hero)
}) => {
  const input = await source()
  const image = sharp(input, { animated: false }).rotate()
  const metadata = await image.metadata()
  const aspectRatio = cropRatio ?? metadata.width / metadata.height

  for (const width of widths) {
    const height = Math.round(width / aspectRatio)
    const resized = image.resize({ width, height, fit, position, withoutEnlargement: false })

    await writeImage(resized, resolve(outputDir, `${name}-${width}.${baseFormat}`), baseFormat)

    for (const format of extraFormats) {
      await writeImage(resized, resolve(outputDir, `${name}-${width}.${format}`), format)
    }
  }

  const baseWidth = widths.includes(2560) ? 2560 : widths[Math.floor(widths.length / 2)]
  const baseHeight = Math.round(baseWidth / aspectRatio)

  await writeImage(
    image.resize({ width: baseWidth, height: baseHeight, fit, position, withoutEnlargement: false }),
    resolve(outputDir, `${name}.${baseFormat}`),
    baseFormat,
  )
}

const generateDensitySet = async ({ source, name, baseFormat, widths }) => {
  const input = await source()
  const image = sharp(input, { animated: false }).rotate()
  const metadata = await image.metadata()
  const aspectRatio = metadata.width / metadata.height

  for (const width of widths) {
    const height = Math.round(width / aspectRatio)
    await writeImage(
      image.resize({ width, height, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 }, withoutEnlargement: false }),
      resolve(outputDir, `${name}${width === widths[0] ? '' : '@2x'}.${baseFormat}`),
      baseFormat,
    )
  }
}

await mkdir(outputDir, { recursive: true })

// hero-1: Amravati data center – clean white rack corridor (CC BY-SA 4.0, Wikimedia)
await generateResponsiveSet({
  source: () => remoteAsset('https://commons.wikimedia.org/wiki/Special:FilePath/Racks_Amravati_Data_Center.jpg'),
  name: 'hero-1',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
  cropRatio: 1920 / 900,
  position: 'centre',
})

// hero-2: US Capitol at Dusk (public domain, Wikimedia Commons)
await generateResponsiveSet({
  source: () => remoteAsset('https://upload.wikimedia.org/wikipedia/commons/6/64/Capitol_at_Dusk_2.jpg'),
  name: 'hero-2',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
  cropRatio: 1920 / 900,
  position: 'centre',
})

// hero-3: Vietnam Veterans Memorial ceremony – honor guard & flags, Washington DC (CC BY-SA 4.0)
await generateResponsiveSet({
  source: () => remoteAsset('https://commons.wikimedia.org/wiki/Special:FilePath/Ceremony_honoring_Vietnam_War_veterans_at_the_Vietnam_Veterans_Memorial_in_Washington,_March_29,_2025_-_9.jpg'),
  name: 'hero-3',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
  cropRatio: 1920 / 900,
  position: 'centre',
})

// hero-4: Vietnam Veterans Memorial – wreath & Washington Monument (CC BY-SA 4.0)
await generateResponsiveSet({
  source: () => remoteAsset('https://commons.wikimedia.org/wiki/Special:FilePath/Ceremony_honoring_Vietnam_War_veterans_at_the_Vietnam_Veterans_Memorial_in_Washington,_March_29,_2025_-_5.jpg'),
  name: 'hero-4',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
  cropRatio: 1920 / 900,
  position: 'centre',
})

await generateResponsiveSet({
  source: () => remoteAsset('https://hiedqvskzea5mr20.public.blob.vercel-storage.com/kjb-assets/handshake.jpg'),
  name: 'handshake',
  widths: [720, 1200, 1600],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
})

await generateDensitySet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/03/KJB_Solutions_logo-horizonal.png'),
  name: 'logo-color',
  baseFormat: 'png',
  widths: [485, 970],
})

await generateDensitySet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/12/KJB_Solutions-white.png'),
  name: 'logo-white',
  baseFormat: 'png',
  widths: [514, 1028],
})

await generateDensitySet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/04/homepage-icons-program-management.png'),
  name: 'icon-program-mgmt',
  baseFormat: 'png',
  widths: [133, 266],
})

await generateDensitySet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/04/homepage-icons-software-dev.png'),
  name: 'icon-software-dev',
  baseFormat: 'png',
  widths: [133, 266],
})

await generateDensitySet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/04/homepage-icons-infrastucture.png'),
  name: 'icon-infrastructure',
  baseFormat: 'png',
  widths: [133, 266],
})

console.log(`Prepared optimized assets in ${outputDir}`)
console.log('Run `npm run assets:upload` to push to Vercel Blob and update blobAssetUrls.js')

