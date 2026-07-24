import BLOB_ASSET_URLS from './blobAssetUrls'

const assetUrl = (file) => BLOB_ASSET_URLS[file] ?? `/assets/${file}`

const widthSet = (name, extension, widths) => widths
  .map(width => `${assetUrl(`${name}-${width}.${extension}`)} ${width}w`)
  .join(', ')

const densitySet = (baseFile, retinaFile) => `${assetUrl(baseFile)} 1x, ${assetUrl(retinaFile)} 2x`

const responsivePhoto = ({ name, fallback = 'jpg', widths, sizes }) => ({
  src: assetUrl(`${name}.${fallback}`),
  srcSet: widthSet(name, fallback, widths),
  webpSrcSet: widthSet(name, 'webp', widths),
  avifSrcSet: widthSet(name, 'avif', widths),
  sizes,
})

export const HERO_IMAGES = {
  hero1: responsivePhoto({
    name: 'hero-1',
    widths: [1600, 2560, 3440],
    sizes: '100vw',
  }),
  hero2: responsivePhoto({
    name: 'hero-2',
    widths: [1600, 2560, 3440],
    sizes: '100vw',
  }),
  hero3: responsivePhoto({
    name: 'hero-3',
    widths: [1600, 2560, 3440],
    sizes: '100vw',
  }),
  hero4: responsivePhoto({
    name: 'hero-4',
    widths: [1600, 2560, 3440],
    sizes: '100vw',
  }),
}

export const HANDSHAKE_IMAGE = responsivePhoto({
  name: 'handshake',
  widths: [720, 1200, 1600],
  sizes: '(max-width: 900px) calc(100vw - 2.5rem), 50vw',
})

export const DENSITY_IMAGES = {
  colorLogo: {
    src: assetUrl('logo-color.png'),
    srcSet: densitySet('logo-color.png', 'logo-color@2x.png'),
  },
  whiteLogo: {
    src: assetUrl('logo-white.png'),
    srcSet: densitySet('logo-white.png', 'logo-white@2x.png'),
  },
  programIcon: {
    src: assetUrl('icon-program-mgmt.png'),
    srcSet: densitySet('icon-program-mgmt.png', 'icon-program-mgmt@2x.png'),
  },
  softwareIcon: {
    src: assetUrl('icon-software-dev.png'),
    srcSet: densitySet('icon-software-dev.png', 'icon-software-dev@2x.png'),
  },
  infrastructureIcon: {
    src: assetUrl('icon-infrastructure.png'),
    srcSet: densitySet('icon-infrastructure.png', 'icon-infrastructure@2x.png'),
  },
}

const ASSETS = {
  'handshake.jpg': HANDSHAKE_IMAGE.src,
  'hero-1.jpg': HERO_IMAGES.hero1.src,
  'hero-2.jpg': HERO_IMAGES.hero2.src,
  'hero-3.jpg': HERO_IMAGES.hero3.src,
  'hero-4.jpg': HERO_IMAGES.hero4.src,
  'icon-infrastructure.png': DENSITY_IMAGES.infrastructureIcon.src,
  'icon-program-mgmt.png': DENSITY_IMAGES.programIcon.src,
  'icon-software-dev.png': DENSITY_IMAGES.softwareIcon.src,
  'logo-color.png': DENSITY_IMAGES.colorLogo.src,
  'logo-white.png': DENSITY_IMAGES.whiteLogo.src,
}

export default ASSETS
