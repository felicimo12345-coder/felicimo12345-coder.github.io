// ─────────────────────────────────────────────────────────────
// 全站内容源：改文案、加项目、换图片，只需要动这个文件。
// 图片放在 public/assets/ 下，这里写文件名即可。
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: '张哲',
  latin: 'ZHANG ZHE',
  roles: ['产品设计', 'AI 原型', '前端实现'],
  kicker: 'PRODUCT · AI · INTERACTION',
  tagline: '从设计概念到可交互原型，让想法真正运行起来。',
  straight: 'From a messy brief to a clickable prototype — end to end.',
  intro: [
    '华南理工大学产品设计本科在读，专业排名 1/57，已获得同济大学设计创意学院推免拟录取资格。关注智能交互、AI 驱动的产品体验与技术辅助设计。',
    '项目实践涵盖智能服务系统、VR 情绪疗愈、未来交通工具及交互原型开发。熟悉从需求分析、方案设计到原型实现的工作流程，并尝试结合用户测试、EEG 数据分析与 CFD 仿真，为设计决策提供依据。',
  ],
  location: '广州 · 中国',
  year: '2026',
  email: '1952733175@qq.com',
  phone: '188-6856-3498',
  wechat: '188-6856-3498',
  links: [
    { label: 'GitHub', value: 'felicimo12345-coder', href: 'https://github.com/felicimo12345-coder' },
    {
      label: 'APP DEMO',
      value: 'RK1-APP-REMAKE',
      href: 'https://felicimo12345-coder.github.io/RK1-APP-REMAKE/',
    },
  ],
  contacts: [
    { label: 'Phone', value: '188-6856-3498', href: 'tel:+8618868563498' },
    { label: 'WeChat', value: '188-6856-3498' },
    { label: 'GitHub', value: 'felicimo12345-coder', href: 'https://github.com/felicimo12345-coder' },
  ],
  stats: [
    { value: '1', sub: '/57', label: '专业排名' },
    { value: '3.99', sub: '/4.0', label: 'GPA' },
    { value: '保研', sub: '', label: '同济大学' },
  ],
  education: [
    { date: '2023 — 2027', title: '华南理工大学', note: '产品设计 · 本科' },
    { date: '2024', title: 'University of the Arts London', note: 'Design Management 学习项目' },
  ],
  experience: [
    { date: '2026.03—04', title: '美的 · 洗烘机', note: '产品实习 · 行业调研与体验分析' },
    { date: '2025', title: '阿里巴巴', note: '产品与设计方向实习' },
    { date: '2024', title: 'BMW × Tongji', note: '未来出行设计工作坊 · 团队第三' },
  ],
  // 专业技能：三组文字 + 一排工具图标（icon 对应 SkillIcon 的 key）
  skills: [
    { group: '产品/研究', items: ['竞品分析', '访谈/问卷', '用户画像', 'USM', '需求拆解'] },
    { group: '交互/原型', items: ['Figma', 'User Flow', 'Wireframe', 'UI/UX', 'Unity'] },
    { group: '技术/视觉', items: ['HTML/CSS/JS', 'AI Agent', 'Ps/Ai', 'Blender'] },
  ],
  tools: [
    { name: 'Blender', icon: 'blender' },
    { name: 'Rhino', icon: 'rhinoceros' },
    { name: 'KeyShot', icon: 'keyshot' },
    { name: 'Arduino', icon: 'arduino' },
    { name: 'Procreate', icon: 'procreate' },
    { name: 'Illustrator', icon: 'adobeillustrator' },
    { name: 'Photoshop', icon: 'adobephotoshop' },
    { name: 'ChatGPT', icon: 'openai' },
    { name: 'Unity', icon: 'unity' },
    { name: 'Gemini', icon: 'googlegemini' },
  ],
  honors: [
    { year: '2024—25', name: '国家奖学金 × 2 · 校三好学生 × 2', level: '国家级', tier: 'national' },
    { year: '2025', name: '全国大学生英语竞赛（NECCS）', level: '国家级特等奖', tier: 'national' },
    { year: '2025', name: '第十六届蓝桥杯 · 文创设计赛道', level: '国家级三等奖', tier: 'national' },
    { year: '2025', name: '米兰设计周 · 中国高校设计学科师生优秀作品展', level: '省级三等奖', tier: 'provincial' },
    { year: '2026', name: '未来设计师 · 全国高校数字艺术设计大赛（NCDA）', level: '省级二等奖', tier: 'provincial' },
    { year: '2026', name: '第十七届蓝桥杯 · 工业设计赛道', level: '省级二等奖', tier: 'provincial' },
    { year: '2024', name: '全国大学生工业设计大赛', level: '省级二等奖', tier: 'provincial' },
    { year: '2025', name: '英国 G-CROSS', level: '铜奖', tier: 'intl' },
    { year: '2024', name: '第六届香港当代设计奖', level: '铜奖', tier: 'intl' },
    { year: '2025', name: '日本 CADA', level: '铜奖', tier: 'intl' },
    {
      year: '2025',
      name: '第 30 届中国日报社「21 世纪杯」全国英语演讲比赛',
      level: '校级一等奖',
      tier: 'school',
    },
  ],}

export const projects = [
  {
    no: '01',
    slug: 'meroy',
    group: 'design',
    kicker: 'PRODUCT / SERVICE / AI AGENT',
    title: 'MEROY',
    cn: '爱诊 · 窝诊一体式代诊机器人',
    teaser:
      '针对宠物就诊过程中的运输负担与服务信任问题，整合居家宠窝、移动运输舱与候诊空间，并通过 AI 问诊交互与过程可视化，探索连续、可控的宠物代诊服务体验。',
    cover: './assets/projects/meroy/01.webp',
    pages: [
      './assets/projects/meroy/01.webp',
      './assets/projects/meroy/02.webp',
      './assets/projects/meroy/03.webp',
      './assets/projects/meroy/04.webp',
      './assets/projects/meroy/05.webp',
      './assets/projects/meroy/06.webp',
      './assets/projects/meroy/07.webp'
    ],
    accent: '#e2ac70',
    period: '2025.09 — 2026.01',
    role: '项目组长 / 建模与前端开发',
    meta: ['N = 5 探索性用户测试', '蓝桥杯 · 省级二等奖'],
    metrics: [
      { v: 'SUS 77.5', k: '可用性量表得分' },
      { v: '100%', k: '建模与开发' },
      { v: 'LIVE', k: '在线交互 Demo' },
    ],
    note: '我关注代诊服务中的信任建立：让用户看得见服务进程，也能随时介入关键决策。',
    href: 'https://felicimo12345-coder.github.io/RK1-APP-REMAKE/',
  },
  {
    no: '02',
    slug: 'autotherapy',
    group: 'design',
    kicker: 'VR / EEG / HCI RESEARCH',
    title: 'AUTOTHERAPY',
    cn: '已愈 · VR 情绪疗愈研究',
    teaser:
      '针对高校心理支持服务中认知度与实际使用率之间的落差，设计低多边形风格的沉浸式 VR 情绪疗愈场景，并结合 EEG 前后测与主观评价，探索其短时情绪调节效果。',
    cover: './assets/projects/auto/01.webp',
    pages: [
      './assets/projects/auto/01.webp',
      './assets/projects/auto/02.webp',
      './assets/projects/auto/03.webp',
      './assets/projects/auto/04.webp',
      './assets/projects/auto/05.webp',
      './assets/projects/auto/06.webp'
    ],
    accent: '#bea0f6',
    period: '2025.04 — 2026.05',
    role: '项目负责人 / 场景设计与实验研究',
    meta: ['HCII 2026 · Springer LNCS', 'EEGLAB 前后测分析'],
    metrics: [
      { v: 'VR+EEG', k: '主客观结合' },
      { v: 'PRE/POST', k: '实验设计' },
      { v: 'HCII', k: '论文一作' },
    ],
    note: '通过 EEG 与主观评价交叉分析，识别 VR 体验后的变化，同时明确探索性研究与临床疗效验证的边界。',
  },
  {
    no: '03',
    slug: 'air-v',
    group: 'design',
    kicker: 'FUTURE MOBILITY / eVTOL',
    title: 'SWIFT',
    cn: '享境 · 住行一体的未来载具',
    teaser:
      '面向低空出行与周末短途休闲场景，探索融合飞行、休憩与居住功能的 2.5 层复合座舱。结合 AI 辅助外观探索、三维建模与 CFD 仿真，对不同机体构型的气动表现进行量化比较。',
    cover: './assets/projects/airv/01.webp',
    pages: [
      './assets/projects/airv/01.webp',
      './assets/projects/airv/02.webp',
      './assets/projects/airv/03.webp',
      './assets/projects/airv/04.webp',
      './assets/projects/airv/05.webp'
    ],
    accent: '#e1d15a',
    period: '2026.04—2026.08',
    role: '独立项目 / 概念、建模与仿真',
    meta: ['Blender + SimScale', 'NCDA · 省级二等奖'],
    metrics: [
      { v: '−26.1%', k: '构型对比 · Cd 变化' },
      { v: '−26.3%', k: '构型对比 · 总阻力变化' },
      { v: '2.5 层', k: '复合座舱布局' },
    ],
    note: '通过 CFD 对不同机体构型进行比较，让外观设计获得可量化的气动性能参考。',
  },
  {
    no: '04',
    slug: 'third-quadrant',
    group: 'design',
    kicker: 'WORKSHOP / CABIN / CMF',
    title: 'THIRD QUADRANT',
    cn: '第三象限 · 数字游民出行概念',
    teaser: 'BMW 工作坊里的一版数字游民概念：全景旋转座舱 + 办公/休憩可切换。',
    cover: './assets/projects/tq/01.webp',
    pages: [
      './assets/projects/tq/01.webp',
      './assets/projects/tq/02.webp'
    ],
    accent: '#a6b7f2',
    period: '2024',
    role: 'BMW × Tongji Workshop / 团队概念共创',
    meta: ['数字游民出行与座舱设计'],
    metrics: [
      { v: '3 种', k: '使用情境' },
      { v: 'TOP 3', k: '工作坊评比' },
      { v: '360°', k: '旋转座舱' },
    ],
    note: '从出行延伸到驻留，重新思考交通工具如何承载工作与日常生活。',
  },
]


// 研究型项目：独立研究手册（8 页，可点击翻页）
export const researchFeature = {
  no: 'C / 01',
  en: 'RESEARCH HANDBOOK',
  cn: '科研成长路径',
  latin: 'MY RESEARCH JOURNEY — 2023 / 2026',
  desc: '2023 到 2026 的科研轨迹，做成一本能翻的手册：从跟组做背景调研（4/4），到独立完成研究设计与实验（1/1），再到主导 HCII 2026 的核心研究（一作）。具体承担责任与事务详见具体页面。',
  pageCount: 8,
  metrics: [
    { v: '05', k: '研究成果' },
    { v: '03', k: '第一作者' },
    { v: '08', k: '手册页数' },
  ],
}

export const capabilities = [
  {
    no: '01',
    mark: '◎',
    title: 'PRODUCT SYSTEMS',
    cn: '产品与服务系统',
    body: '以 MEROY 为例，整合服务流程、宠物舱体与 Web 端交互设计，将分散的使用场景串联为完整的服务体验。',
    tags: ['PRODUCT', 'SERVICE', 'PROTOTYPE'],
  },
  {
    no: '02',
    mark: '↗',
    title: 'AI PROTOTYPING',
    cn: 'AI 交互与原型',
    body: '结合 LLM API 与前端开发，实现可交互的 AI 问诊原型，并完成在线部署，让设计方案能够被实际体验。',
    tags: ['LLM API', 'FRONTEND', 'HUMAN–AI'],
  },
  {
    no: '03',
    mark: '✳',
    title: 'RESEARCH & HCI',
    cn: '研究与验证',
    body: '开展 N=5 探索性用户测试、VR 项目 EEG 前后测与 EEGLAB 数据分析，并以第一作者发表 HCII 2026 研究论文。',
    tags: ['EEG', 'UX STUDY', 'EXPERIMENT'],
  },
  {
    no: '04',
    mark: '⌁',
    title: 'MOBILITY & 3D',
    cn: '出行与三维表达',
    body: '使用 Blender 等工具进行三维建模与可视化表达，并结合 SimScale CFD 仿真比较机体构型，以数据辅助设计迭代。',
    tags: ['MOBILITY', '3D', 'SIMULATION'],
  },
]

// 其他项目 & 管理：企业横向项目 + 组织 / 管理经历
export const others = {
  // 企业横向项目：字段用 rows 数组，允许每个项目有各自的标签
  // （第三个是大创课题，标签是「研究目标」而不是「项目目标」）
  enterprise: [
    {
      title: '美的 · 洗碗机碗篮与收纳结构',
      rows: [
        { k: '项目指导', v: '冉蓓主任（副系主任）' },
        {
          k: '项目目标',
          v: '围绕 800mm 宽洗碗机的碗篮收纳效率、人机操作体验与内部空间利用，探索适配中式餐具的结构优化方案。',
        },
        {
          k: '个人贡献',
          v: '参与竞品及线下使用调研，整理用户操作问题与现有结构特点，完成概念草图、初代产品三维建模及方案渲染。',
        },
      ],
    },
    {
      title: '温氏食品 · 鸡跑跑 & 猪滚滚 IP 衍生产品',
      rows: [
        { k: '项目指导', v: '杨静教授' },
        {
          k: '项目目标',
          v: '围绕品牌 IP 与实际使用场景，探索 AI 辅助产品设计的方法，完成露营与餐厨双场景的衍生产品概念开发。',
        },
        {
          k: '个人贡献',
          v: '参与企业需求梳理与阶段性方案汇报，利用 AI 工具辅助需求分析、创意探索及方案表达，形成双场景产品设计提案。',
        },
      ],
    },
    {
      title: '省级大创 · VR 情绪疗愈与 EEG 评估',
      rows: [
        { k: '项目指导', v: '郭伟副研究员' },
        {
          k: '研究目标',
          v: '结合风格化场景与物理模拟，探索 VR 沉浸式体验对抑郁倾向大学生短时情绪调节的影响。',
        },
        {
          k: '个人贡献',
          v: '作为项目负责人，统筹研究推进；参与文献研究、实验设计、VR 场景构建、EEG 数据分析及论文撰写，完成省级项目结题与研究成果发表。',
        },
      ],
    },
  ],
  roles: [
    {
      date: '2024.04 — 2027.06',
      title: '元设计工作室',
      post: '团队管理与招新',
      desc: '主导 2025—2026 年度科研与竞赛进度管理及招新，跟进多届成员的任务分工与衔接；在工作室十年传统之上，重建了跨届成员的协作方式。',
    },
    {
      date: '2023.09 — 2027.06',
      title: '班级学业管理与班集体建设',
      post: '连续 3 年学习委员',
      desc: '与班长、团支书协同推进班级建设，针对学习主动性不足建立「同伴互助 + 节点管控」机制（DDL 跟踪、风险预警、及时反馈）。班级专业前 5 占 4 人、推免 10 人中 7 人出自本班，获 2025 年度「校园十佳班集体」。',
    },
  ],
}

export const nav = [
  { label: 'Index', href: '#top' },
  { label: 'Profile', href: '#profile' },
  { label: 'Work', href: '#work' },
  { label: 'Others', href: '#others' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
