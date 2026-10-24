import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter-tight'
import '@fontsource/anton/400.css'
import './styles/base.css'
import './styles/sections.css'
import './styles/gooey.css'
import './styles/specular.css'
import App from './App.jsx'

// 这里刻意不套 <React.StrictMode>：
// 站内三个 WebGL 背景（DotField / FluxLines / CircularGallery）在 cleanup 里都会调用
// WEBGL_lose_context 主动销毁上下文。StrictMode 在开发环境会把 effect 执行两次
// （挂载 → 销毁 → 再挂载），第二次拿到的还是同一个已失效的 canvas 上下文，
// 结果画布整块变成白色 —— 也就是开发环境里「个人优势背景不见了、科研路径空白」的原因。
// 生产构建本来就不会双调用，所以关掉 StrictMode 不影响线上行为。
createRoot(document.getElementById('root')).render(<App />)
