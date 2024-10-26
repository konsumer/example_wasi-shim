import { PreopenDirectory, File } from '@bjorn3/browser_wasi_shim'
import fs from './fs_promises.js'

function basename (str, sep = '/') {
  return str.substr(str.lastIndexOf(sep) + 1)
}

// get all files in fs as PreopenDirectory
export default async function getPreopens () {
  const all = await fs.readdir('/', { recursive: true })
  const dirs = (await Promise.all(all.map(async path => {
    const i = await fs.lstatSync(path)
    return { path, dir: i.isDirectory() }
  }))).filter(f => f.dir).map(f => f.path)
  const out = []
  for (const dir of dirs) {
    const files = all.filter(f => f.startsWith(dir) && !dirs.includes(f) && !f.replace(new RegExp(`^${dir}/`), '').includes('/'))
    if (files.length) {
      out.push(new PreopenDirectory(`./${dir}`, await Promise.all(files.map(async f => [basename(f), new File(await fs.readFile(f))]))))
    }
  }
  return out
}
