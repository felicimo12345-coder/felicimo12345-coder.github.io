# 张哲 · 个人主页

用 React 19 + Vite 7 手写的单页作品集。暗色、玻璃质感，PC 优先（版心 1700px）。

- **在线地址**：https://felicimo12345-coder.github.io/
- **技术栈**：React 19 · Vite 7 · 原生 CSS（无 UI 框架）· three.js（按需分包）· framer-motion · Lenis
- **第三方组件**：React Bits 的 FluxLines / DotField / CircularGallery / ScrollExpand / Lanyard /
  GooeyNav / SpecularButton，均改写过类名以脱离 Tailwind，着色器与交互逻辑未改动；
  MagicBento（卡片光效）与 CardSwap（项目页堆叠）是按官方参数签名重写的，见下节
- **部署**：GitHub Actions 自动构建并发布到 Pages，见 `.github/workflows/deploy.yml`

## 本地运行

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # 产物在 dist/
npm run preview  # 生产产物预览 http://127.0.0.1:4173
```

> 视觉验收请用 `preview`（生产构建）。dev 模式下 React StrictMode 会双调用 effect，
> 站内三个 WebGL 背景会因上下文被提前销毁而整块变白。

## 目录

```
src/
  data/site.js      全站文案与项目数据（改内容只动这里）
  sections/         Hero / Opening / Profile / Work / Others / Capabilities / Contact
  components/       Reveal、ProximityText、CardSwap、Lightbox、SkillIcon、Lanyard…
  styles/           base.css（变量与基础）· sections.css（区块）
public/assets/      图片、视频、科研手册页
```

## 视觉系统（v2 · 黑紫）

参考 `_ref/zhangzhe-site`（PuHuiTi 版）与 Figma 原稿重做的一层皮：

| 项 | 值 |
| --- | --- |
| 底色 | `#09090b`，面板 `#111015` / `#15131a` |
| 主色 | `#c8a7ff`（lilac），浅色块 `#e4d4ff`，深 `#8b6bc4` |
| 文字 | `#eeeaf5` / `#aaa2b3` / `#817a8b` |
| 描边 | `rgba(229,212,252,.16)`，细线 `.09` |
| 中文 | 阿里巴巴普惠体 3.0（45/55/65/75/85/105/115 七档），`local()` 引用 |
| 拉丁正文 | Inter Tight |
| 拉丁展示 | **Anton**（压缩体 / OFL，`@fontsource/anton`，随包分发） |
| 点缀 | Instrument Serif |

三个技法：

1. **镂空字** —— `.knock`：`color: transparent` + `-webkit-text-stroke`，用于首屏 `ZHANG ZHE` 与收尾页 `Let's talk`。
2. **几何倾斜** —— `.skew`：`skewX(-6deg)`。CJK 没有真斜体，用 transform 做才不会出现伪斜体变形（`font-synthesis: none`）。
3. **网格 mesh** —— 首屏 96px 细网格 + 右侧遮罩淡出，给纯黑底一层结构感。
4. **字标锁定（lockup）** —— 首屏标题不是一行字，是三件套：
   竖排中文「张 / 哲」+ 压缩体拉丁 + **超大首字母 Z**（`grid-row: span 2` 跨两行，
   `1.56em`），第二行「ZHE」做镂空。这是参考图里 `B` + `RAND INTRODUCTION` 的做法，
   改字号时三者的比例会自动跟着走。
5. **仪表行** —— 标题下方的 `///////` 斜线 + 斜杠分隔的角色 + 圆形箭头，模仿设计图纸的标注行。

字体说明：`@font-face` 只写 `local()`，**不内嵌也不分发字体文件**，访问者本机没装普惠体会退到 Noto Sans SC / 微软雅黑。商用网页嵌入授权需要另行确认。

## 第三方视觉组件

| 组件 | 来源 | 用途 |
| --- | --- | --- |
| `FluxLines` | React Bits · `backgrounds/flux-lines` | 「个人优势」区块背景，WebGL2 磁流体光带，鼠标靠近会卷曲、点击起漩涡 |
| `MagicBento` | React Bits · `MagicBento` 的效果重写 | 能力卡片：跟随光标的边框光 + 聚光 + 点击波纹 |
| `DotField` | React Bits · `backgrounds/dot-field` | **全局背景**：固定层点阵渐变（#5227FF → #FF9FFC），光标处有透镜隆起 |
| `CircularGallery` | React Bits · `components/circular-gallery` | 研究手册的 8 页 3D 环形画廊，点击任意一页开灯箱（←/→ 翻页、Esc 关闭） |
| `ScrollExpand` | React Bits · `components/scroll-expand` | 首屏之后的「开场页」：小窗随滚动张开到满屏，末段浮出宣言文字 |
| `Lanyard` | React Bits · `components/lanyard` | 个人简介左侧的挂牌：布料 + 卡片的物理模拟，可拖拽甩动。依赖 `three`（vanilla，非 R3F） |
| `GooeyNav` | React Bits · `components/gooey-nav`（CSS 版） | 顶部导航：WebGL2 药丸 + 点击时液滴/粘连效果，不支持 WebGL2 时退化为 CSS 药丸。高亮由滚动位置驱动 |
| `SpecularButton` | React Bits · `components/specular-button`（CSS 版） | 项目卡里的「打开在线 Demo」入口：WebGL2 高光描边，跟随鼠标；本站加了 `href`，传了就渲染 `<a>` |
| `CardSwap` | React Bits · `CardSwap` 的效果重写 | 项目页堆叠轮播：磨砂玻璃外框 + 标题条，自动/滚轮/拖拽三种翻页，点击开灯箱 |

**关于 MagicBento**：官方版本是 57KB 的 Tailwind + Hugeicons 演示网格，自带 mock 内容，
直接搬进来会吃掉你现有的能力文案，还会多带两个图标依赖。所以按它的**参数签名**
（`columns / rowHeight / gap / radius / enableBorderGlow / enableSpotlight / spotlightRadius / clickEffect`）
重写了一份 100 行的等价实现，卡片内容由 `children` 决定，零依赖。

`FluxLines` 是原样接入的，只把 Tailwind 类名换成本项目的类名。

## 首屏素材

- `public/assets/hero-reel.mp4` —— 1280×646 / 15s / 4.6MB（H.264、无音轨、faststart）。
  由 `jimeng-*.mp4` 裁掉顶部 74px「AI 生成」水印后重编码：`crop=1280:646:0:74`，`-crf 21`。
- `public/assets/hero-poster.webp` —— 视频首帧，用于首屏首绘，避免黑屏。
- 首屏滤镜 `brightness(.88) saturate(.82)`：比之前调亮，因为这版素材的卖点是地面那圈紫光。

需要重新裁切时（本机没有 ffmpeg，用 npm 里的静态二进制）：

```bash
cd .tmp && npm i ffmpeg-static
./node_modules/ffmpeg-static/ffmpeg.exe -i src.mp4 -vf "crop=1280:646:0:74"   -an -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart out.mp4
```

## 项目卡片：CardSwap

每个项目不再是单张封面，而是**作品集页面堆叠轮播**：

| 项目 | 页数 | 素材 |
| --- | --- | --- |
| MEROY | 7 | `public/assets/projects/meroy/01-07.webp` |
| AUTOTHERAPY | 6 | `public/assets/projects/auto/01-06.webp` |
| SWIFT | 5 | `public/assets/projects/airv/01-05.webp` |
| THIRD QUADRANT | 2 | `public/assets/projects/tq/01-02.webp` |

- 卡片框按作品集页面原始比例 **1920×678（2.832:1）** 裁，不再是 16:10。
- `CardSwap` 自写（官方版依赖 @hugeicons）。视觉是**磨砂玻璃卡片堆**：每张卡 = 玻璃外框
  （`backdrop-filter: blur(18px)` + 内外描边）→ 标题条（`MEROY · P01`）→ 圆角图片；
  后面的卡绕**底边**缩放并上移，露出等高的标题条，所以非当前页也一直可见。
- 卡堆高度 = `peek + cardH`，由容器宽度实时换算（`ResizeObserver`），不需要外部给 width/height。
- **三种翻页**：自动（4.6s，悬停暂停）／**滚轮**（指针在卡片上滚，一格一页，380ms 锁）／
  **按住左键上下拖拽**（阻尼 0.6 跟手，过 56px 松手翻页；拖过 5px 即抑制 click，不会误开灯箱）。
- 根节点带 `data-lenis-prevent-wheel`：站点用 Lenis 接管滚轮，不声明的话会「翻页 + 页面一起滚」。
  滚轮只在卡片区域被拦下，移到别处照常滚页面。
- 点击任意一张 → 灯箱（`Lightbox.jsx`，portal 到 body）：`←` `→` 翻页、`Esc` / 遮罩关闭、底部计数。
- 媒体区的彩色进度条已移除。

## 文字靠近动效：ProximityText

`src/components/ProximityText.jsx`，全局只挂一个 `pointermove` + 一个 rAF，
光标进入元素外扩 `radius` 才开始逐字计算，字符位置在进入时缓存、不做逐帧测量。

- **拉丁文**：走真可变字重（Inter Tight Variable 的 `wght` 轴），基础字重 +280。
- **中文 / 已 ≥700 的字重**：普惠体是静态字重、`wght` 轴没有上抬空间，改用靠近发亮的柔光
  （lilac `text-shadow`），不假装能做字重插值。
- 已覆盖：三个区块标题、项目卡片标题/kicker/中文名、能力卡标题、科研手册标题、收尾邮箱。
  正文段落刻意不加——逐字包 span 会影响选词、行内间距与复制。

## 个人简介：挂牌 + 技能

### 挂牌（Lanyard）

`public/assets/lanyard-front.webp` 由 `portrait.webp` 按卡片比例 **1024×1440（1.6:2.25）**
cover 裁出（纵向从 y≈17 起，保住头部和「Hi I am」那组字）。React Bits 的 Lanyard 是纯 vanilla
three.js（无 R3F / rapier），但会拉进 520KB 的 `three`，所以：

- `React.lazy` + 动态 import → 独立 chunk（`Lanyard-*.js`），首屏 bundle 不变（480KB）；
- `IntersectionObserver`（rootMargin 320px）到这一屏附近才挂载，之前显示同图的静态占位；
- 挂载 1.5s 后如果没有 canvas（WebGL 不可用），退回静态占位，不让栏目空掉。

容器 `.lanyard-stage` 顶部有一层 15% 的 mask 渐隐，因为挂带是从画布上边缘「穿出去」的，
不淡出的话会看到一条硬切边。卡片宽度恒为容器的 72%（组件内部 `minimumWidth = width / 0.72` 取景），
所以想改卡片大小要改容器宽度，改 `size` 在竖版比例下不起作用。

### 技能

`SkillIcon.jsx` 里的品牌图形取自 simple-icons（CC0），只内联 path 数据，无运行时依赖；
KeyShot（光圈叶片）与 Procreate（叶形笔触）simple-icons 未收录，用手绘几何。
填充图形统一加了 0.3 的描边，小尺寸下细节不会糊掉。
Rhino 的犀牛头细节最密，单独放大到 38px，其余 32px。

## 性能约定（改代码前先读这段）

首屏传输从 **9.06MB / 32 请求** 降到 **2.31MB / 8 请求**，靠的是下面几条，改动时不要破坏：

| 约定 | 原因 |
| --- | --- |
| 首屏只允许 `hero-poster.webp` 预加载 | 视频 1.9MB 会自己加载；海报 8KB 负责第一帧 |
| 项目页图 `.cs__media img` 必须 `loading="lazy"` | 20 张共 2.7MB，卡片是滚到才看的 |
| 科研手册画廊要等近视口再挂载 | 8 张页面图是 WebGL 纹理，本来会在首屏就拉 |
| 全屏点阵 `maxDevicePixelRatio={1.5}` | 低频图案 2x 无收益，少画 44% 像素 |
| Lanyard 用 `requestIdleCallback` 挂载 | three.js 建场景是一次 ~0.7s 主线程阻塞，不能塞进滚动 |
| 卡片/图文不要加全屏 `backdrop-filter` | 会把内部 img 一起并入合成层，图片发糊 |
| 视觉验收用 `npm run preview` | dev 下 StrictMode 会二次挂载，几个 WebGL 背景会变白 |

视频再压一档（`-crf 30`）能到 1.5MB，但暗部会有轻微 banding，不建议。


## 跑起来

```bash
cd portfolio
npm install      # 第一次才需要
npm run dev      # 打开 http://127.0.0.1:5173
```

打包预览：

```bash
npm run build
npm run preview  # http://127.0.0.1:4173
```

> 项目路径含中文和空格，Windows 下 `node_modules/.bin` 的批处理脚本会解析失败，
> 所以 `package.json` 里的脚本改成直接 `node ./node_modules/vite/bin/vite.js`，
> 这样在任意目录名里都能跑。

## 怎么改内容

| 想改什么 | 改哪里 |
| --- | --- |
| 名字、简介、联系方式、教育/实习经历、数字 | `src/data/site.js` → `profile` |
| 项目（标题、简介、指标、配色、封面图） | `src/data/site.js` → `projects` |
| 能力卡片 | `src/data/site.js` → `capabilities` |
| 导航项 | `src/data/site.js` → `nav` |
| 图片 / 视频素材 | 丢进 `public/assets/`，文件名写进 `site.js` |
| 颜色、字号、间距 | `src/styles/base.css` 顶部的 `:root` 变量 |
| 各模块布局 | `src/styles/sections.css` |

**加一个项目**：在 `projects` 数组里复制一段对象，改 `no / slug / title / cn / cover / accent`，
`group` 填 `design` 或 `research` 就自动归到对应分组，卡片交替左右排版会自动算。

## 页面顺序

0. **Hero** — 视频背景 + 字标锁定（张/哲 · Z + HANG/ZHE）
0.5. **Opening** — ScrollExpand 开场页：作品集封面 DESIGN FOR EUDAEMONIA 从 68% 画框张开到满屏（滚动 1.1 屏）
1. **Profile** — 挂牌肖像（Lanyard）+ 自我介绍 + 三项数据 + 四列信息带（教育/经历/联系方式/技能）+ 荣誉奖项带（11 项，两列）
2. **Work** — A 设计型 4 个项目 · B 其他项目 & 管理（3 个企业横向项目 + 2 段组织经历）· C 研究型手册
3. **Skills** — MagicBento 能力卡片 + FluxLines 背景
4. **Contact** — 整屏收尾

## 结构

```
src/
  data/site.js          全站内容（唯一需要经常动的文件）
  sections/             Hero / Profile / Work / Capabilities / Contact
  components/Reveal.jsx 滚动入场包装组件
  styles/base.css       token、排版、导航、按钮
  styles/sections.css   各模块布局
public/assets/          图片与视频
```

## 技术要点

- **平滑滚动**：Lenis（`lerp: 0.085`），站内锚点统一走 `lenis.scrollTo`，手感和滚轮一致。
- **入场动效**：Framer Motion `whileInView`，只播一次；`prefers-reduced-motion` 下自动关闭。
- **首屏视差**：`useScroll` 驱动视频缩放与文字位移，滚动时自然让位。
- **玻璃质感**：只在导航和按钮上用 `backdrop-filter`，控制在两层以内，避免 GPU 掉帧。
- **构建**：`base: './'`，产物可放任意子路径，GitHub Pages 项目页直接可用。

## 部署到 GitHub Pages

1. 新建仓库，把 `portfolio/` 里的内容推到 `main`
2. 仓库 Settings → Pages → Source 选 GitHub Actions
3. 加一个 `.github/workflows/deploy.yml`（vite build → 上传 `dist`）

需要我直接生成这个 workflow 的话说一声。

## 待补（v1 要做的事）

- [x] **联系方式**：已按简历补全 `1952733175@qq.com` / `188-6856-3498`（微信同号）/ GitHub，Figma 链接已移除
- [x] **学业数据**：排名 `1/57`、GPA `3.99/4.0`（原稿误写为 01/58，已更正）
- [x] **实习经历**：已加入「美的 · 洗烘机 · 2026.03—04」；「2025 阿里巴巴」仍然保留，**待你确认是否属实**
- [x] **荣誉奖项**：已加到个人经历右侧的 Honors 区块
- [x] **数据第三项**：`04 跨领域精选项目` → `保研 / 同济大学`
- [ ] **个人照**：现在用的是作品集里裁出来的图，边缘有文字残留，需要一张干净的半身照
- [ ] **项目封面**：`mobility-hero.webp` 左上角有原稿残留文字，需要重新导出
- [ ] 项目数据核对：`N = 5`、`Cd 0.272 → 0.201` 是否可公开
- [ ] 移动端适配（当前只做了 1180px 的降级，没有专门做手机版）
- [ ] 项目详情页（现在卡片只能外链到 Demo，点标题不会进内页）
- [x] **研究型项目**：换成「科研成长路径」手册（8 页，图片来自 `public/assets/research/`，原图 4200×5940 已压到 900×1273 webp）
