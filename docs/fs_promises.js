import { fs as fsOrig } from '@zenfs/core'

export function promisify (f) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback (err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      }
      args.push(callback)
      f.call(this, ...args)
    })
  }
}

// this builds a nice promise-based fs
// not really needed, but cooler
// includes all the Sync versions, too
const fs = {}
for (const f of Object.keys(fsOrig)) {
  const n = f.replace(/Sync$/, '')
  if (f.endsWith('Sync') && fsOrig[n]) {
    fs[n] = promisify(fsOrig[n])
    fs[f] = fsOrig[f]
  } else {
    fs[f] = fsOrig[f]
  }
}

export default fs
