process.env.NODE_ENV = 'production'

import { performance } from 'node:perf_hooks'

import('./app.js').then(async ({ raw }) => {
  let start = performance.now()
  let str
  async function run() {
    for (let i = 0; i < 1000; i++) {
      str = await raw()
    }
  }

  await run()
  console.log(`time: ${(performance.now() - start).toFixed(2)}ms`)
})
