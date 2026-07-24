import { put } from '@vercel/blob'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { extname, join } from 'path'

const ASSETS_DIR = new URL('../public/assets/', import.meta.url).pathname
const MANIFEST_PATH = new URL('../src/config/blobAssetUrls.js', import.meta.url).pathname

const MIME = {
  '.avif': 'image/avif',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
}

const token = process.env.BLOB_READ_WRITE_TOKEN
if (!token) {
  console.error('BLOB_READ_WRITE_TOKEN is not set')
  process.exit(1)
}

const files = readdirSync(ASSETS_DIR).filter(f => MIME[extname(f)])
const result = {}

for (const file of files) {
  const path = join(ASSETS_DIR, file)
  const body = readFileSync(path)
  const contentType = MIME[extname(file)]
  console.log(`Uploading ${file}…`)
  const blob = await put(`kjb-assets/${file}`, body, {
    access: 'public',
    allowOverwrite: true,
    contentType,
    token,
  })
  result[file] = blob.url
  console.log(`  → ${blob.url}`)
}

const config = `const ASSETS = ${JSON.stringify(result, null, 2)}

export default ASSETS
`

writeFileSync(MANIFEST_PATH, config)
console.log(`\nWrote ${MANIFEST_PATH}`)
