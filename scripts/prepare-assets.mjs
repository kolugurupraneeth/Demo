import { mkdir, readFile, writeFile } from 'node:fs/promises'
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

  let output = pipeline.clone().sharpen({ sigma: 1.05, m1: 0.9, m2: 1.1, x1: 2, y2: 10, y3: 18 })

  if (format === 'jpg') {
    output = output.jpeg({ quality: 88, mozjpeg: true, progressive: true, chromaSubsampling: '4:4:4', ...options })
  }

  if (format === 'webp') {
    output = output.webp({ quality: 86, effort: 5, ...options })
  }

  if (format === 'avif') {
    output = output.avif({ quality: 60, effort: 6, chromaSubsampling: '4:4:4', ...options })
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
}) => {
  const input = await source()
  const image = sharp(input, { animated: false }).rotate()
  const metadata = await image.metadata()
  const aspectRatio = metadata.width / metadata.height

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

await generateResponsiveSet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/04/Home-page-slider-image1.jpg'),
  name: 'hero-1',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
})

await generateResponsiveSet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/12/Home-page-slider-image2.jpg'),
  name: 'hero-2',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
})

await generateResponsiveSet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/12/Home-page-slider-image3.jpg'),
  name: 'hero-3',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
})

await generateResponsiveSet({
  source: () => localAsset('reference/original-site/wp-content/uploads/2019/12/Home-page-slider-image4.jpg'),
  name: 'hero-4',
  widths: [1600, 2560, 3440],
  baseFormat: 'jpg',
  extraFormats: ['webp', 'avif'],
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

await writeFile(
  resolve(projectRoot, 'src/config/blobAssetUrls.js'),
  'const BLOB_ASSET_URLS = {}\n\nexport default BLOB_ASSET_URLS\n',
)

console.log(`Prepared optimized assets in ${outputDir}`)

