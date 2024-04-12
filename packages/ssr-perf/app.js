import {
  ssrRenderAttrs,
  ssrInterpolate,
  ssrRenderList,
  ssrRenderComponent,
  ssrRenderSuspense,
  renderToNodeStream,
  renderToString,
} from 'vue/server-renderer'
import { useSSRContext, ref, withAsyncContext, createSSRApp } from 'vue'
const _sfc_main$2 = {
  __name: 'Entry',
  __ssrInlineRender: true,
  props: {
    entry: Object,
  },
  setup(__props) {
    const props = __props
    return (_ctx, _push, _parent, _attrs) => {
      _push(
        `<tr${ssrRenderAttrs(_attrs)}><td>${ssrInterpolate(props.entry.id)}</td><td>${ssrInterpolate(props.entry.name)}</td></tr>`,
      )
    }
  },
}
const _sfc_setup$2 = _sfc_main$2.setup
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/components/Entry.vue',
  )
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0
}
const data = Array(1e3)
  .fill(0)
  .map((_, i) => ({
    id: crypto.randomUUID(),
    name: crypto.randomUUID(),
  }))
function testData() {
  return new Promise(res => setImmediate(() => res(data)))
}
const _sfc_main$1 = {
  __name: 'Table',
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore
    const data2 = ref(
      (([__temp, __restore] = withAsyncContext(() => testData())),
      (__temp = await __temp),
      __restore(),
      __temp),
    )
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<table${ssrRenderAttrs(_attrs)}><tbody><!--[-->`)
      ssrRenderList(data2.value, entry => {
        _push(
          ssrRenderComponent(
            _sfc_main$2,
            {
              key: entry.id,
              entry,
            },
            null,
            _parent,
          ),
        )
      })
      _push(`<!--]--></tbody></table>`)
    }
  },
}
const _sfc_setup$1 = _sfc_main$1.setup
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/components/Table.vue',
  )
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0
}
const _sfc_main = {
  __name: 'App',
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          _push(ssrRenderComponent(_sfc_main$1, null, null, _parent))
        },
        _: 1,
      })
    }
  },
}
const _sfc_setup = _sfc_main.setup
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add(
    'src/App.vue',
  )
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0
}
function createApp() {
  const app = createSSRApp(_sfc_main)
  return { app }
}
async function buildStreamHandler() {
  return async function handler(_, res) {
    const { app } = createApp()
    const ctx = {}
    const stream = renderToNodeStream(app, ctx)
    res.setHeader('content-type', 'text/html')
    stream.pipe(res)
  }
}
async function buildHandler() {
  return async function handler(_, res) {
    const { app } = createApp()
    const ctx = {}
    res.setHeader('content-type', 'text/html')
    res.end(await renderToString(app, ctx))
  }
}
function raw() {
  const { app } = createApp()
  const ctx = {}
  return renderToString(app, ctx)
}
export { buildHandler, buildStreamHandler, raw }
