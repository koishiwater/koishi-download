import type { Category, CategoryId, Resource } from '@/types'

export const categories: Category[] = [
  { id: 'course', name: '课程资料', icon: '📚', desc: '课件、笔记、复习提纲与真题' },
  { id: 'template', name: '文档模板', icon: '📄', desc: '实验报告、论文、简历、表格模板' },
  { id: 'software', name: '软件工具', icon: '🧰', desc: '学习与办公常用软件的离线安装包' },
  { id: 'ebook', name: '电子书', icon: '📖', desc: '教材配套源码、词汇表与拓展阅读' },
  { id: 'media', name: '影音素材', icon: '🎬', desc: '壁纸、图标、音视频素材包' },
  { id: 'other', name: '其他', icon: '📦', desc: '校园地图、实用工具等杂项资源' },
]

export const categoryMap: Record<CategoryId, Category> = categories.reduce(
  (acc, category) => {
    acc[category.id] = category
    return acc
  },
  {} as Record<CategoryId, Category>,
)

export const resources: Resource[] = [
  {
    id: 'phys-lab-report',
    title: '大学物理实验报告模板合集',
    summary:
      '覆盖力学、电磁学、光学三大板块共 18 个实验的完整报告模板，含误差分析与数据处理范例，直接改数据即可提交。',
    category: 'template',
    tags: ['实验报告', 'Word', '大物'],
    version: '2026 春季版',
    updatedAt: '2026-10-28',
    downloads: 18432,
    files: [
      {
        name: '大学物理实验报告模板（Word）.docx',
        format: 'docx',
        size: 2411724,
        path: 'template/phys-lab-report/report-template.docx',
        sha256: 'c6976fbfa65e1c1f25a96357f292844b1553032bbb451a8e89ae569fdf05d2e0',
      },
      {
        name: '实验数据处理辅助表.xlsx',
        format: 'xlsx',
        size: 486912,
        path: 'template/phys-lab-report/data-sheet.xlsx',
        sha256: 'ba01eebfc9f96a4df6146c475f30956921b375d1bf1ff7d24bc6c65782677819',
      },
      {
        name: '全套模板打包.zip',
        format: 'zip',
        size: 3180544,
        path: 'template/phys-lab-report/all-in-one.zip',
        sha256: '02e1c17b04389627a4a8cbb6b37a53ab5e4220025181f1db20489aa93b5caef4',
      },
    ],
  },
  {
    id: 'dsa-final-notes',
    title: '数据结构期末复习笔记（含真题解析）',
    summary:
      '按考点整理的 68 页复习笔记，线性表、树、图、排序与查找全部配手绘图解，附 5 套历年期末真题及详细解答。',
    category: 'course',
    tags: ['数据结构', '期末复习', '真题'],
    version: '第 3 版',
    updatedAt: '2026-10-25',
    downloads: 27691,
    files: [
      {
        name: '数据结构复习笔记.pdf',
        format: 'pdf',
        size: 8912896,
        path: 'course/dsa-final-notes/notes.pdf',
        sha256: '17570540e28661f9b9328e147483b7b9ecf232174c7ea92af2a499b2f73c8559',
      },
      {
        name: '历年真题与解析.pdf',
        format: 'pdf',
        size: 4404019,
        path: 'course/dsa-final-notes/past-exams.pdf',
        sha256: '5d5af2d73a9a4789da16a002a523ca6be673de19f731e521be7a7ef8e91831a0',
      },
    ],
  },
  {
    id: 'cqu-campus-map',
    title: '重庆大学三校区高清地图',
    summary:
      'A、B、C 校区完整平面图，标注全部教学楼、食堂、宿舍与校车乘车点，提供 4K 位图与可打印 PDF 两种格式。',
    category: 'other',
    tags: ['校园地图', '新生指南', '打印版'],
    updatedAt: '2026-09-14',
    downloads: 9127,
    files: [
      {
        name: '重大校园地图 4K.png',
        format: 'png',
        size: 5242880,
        path: 'other/campus-map/map-4k.png',
        sha256: 'c99fb28bd7de36b167eda910c074a0df8332b5a4e5620f48199f4eefe9b3b887',
      },
      {
        name: '重大校园地图（打印版）.pdf',
        format: 'pdf',
        size: 1887437,
        path: 'other/campus-map/map-print.pdf',
        sha256: '9a3939e4b94ab0ee1b0e82d35f4e640e12ce980d26829bac4663d9e8e5646595',
      },
    ],
  },
  {
    id: 'vscode-portable-kit',
    title: 'VS Code 便携配置包（含常用插件）',
    summary:
      '解压即用的 VS Code 便携版配置，预装 Vue、Python、C/C++、Markdown 等 20 个高频插件与一套中文字体主题，离线也能装。',
    category: 'software',
    tags: ['VS Code', '开发环境', '离线安装'],
    version: 'v1.96',
    updatedAt: '2026-10-30',
    downloads: 15306,
    files: [
      {
        name: 'vscode-portable-kit-win-x64.zip',
        format: 'zip',
        size: 96468992,
        path: 'software/vscode-portable/vscode-portable-win-x64.zip',
        sha256: 'fc9dc299c2f22f0ed355fde96f87e6ad070dc5879079ce490e32def8de31af76',
      },
    ],
  },
  {
    id: 'gpa-calculator',
    title: '绩点 / 学分自动换算表',
    summary:
      '录入成绩与学分后自动计算加权平均分与 GPA，内置 4.0 与 5.0 两套换算规则，支持四年成绩汇总与学期对比图。',
    category: 'template',
    tags: ['绩点', 'Excel', '学业规划'],
    version: 'v2.4',
    updatedAt: '2026-10-18',
    downloads: 22058,
    files: [
      {
        name: '绩点自动换算表.xlsx',
        format: 'xlsx',
        size: 192512,
        path: 'template/gpa-calculator/gpa-calculator.xlsx',
        sha256: '1f21b1787f284822c34f5e670bcda8e1c71c2aa67638a36e243ac51828baf6bf',
      },
    ],
  },
  {
    id: 'python-crash-code',
    title: '《Python 编程：从入门到实践》配套源码',
    summary:
      '全书 20 章示例代码与三个实战项目（外星人入侵、数据可视化、Web 应用）完整工程，附逐行中文注释。',
    category: 'ebook',
    tags: ['Python', '源码', '实战项目'],
    version: '第 3 版',
    updatedAt: '2026-09-02',
    downloads: 31440,
    files: [
      {
        name: 'python-crash-course-code.zip',
        format: 'zip',
        size: 12582912,
        path: 'ebook/python-crash/code.zip',
        sha256: '6c662f54c5a1e950bc6f13fc97a361777e5e5783af3d0f3a96931df2776a8b74',
      },
    ],
  },
  {
    id: 'thesis-latex-template',
    title: '本科毕业论文 LaTeX 模板',
    summary:
      '严格的封面、页眉页脚、参考文献格式，符合本科学位论文排版要求，附带示例章节与参考文献库，Overleaf 可直接编译。',
    category: 'template',
    tags: ['毕业论文', 'LaTeX', '排版'],
    version: '2026 修订版',
    updatedAt: '2026-10-08',
    downloads: 7735,
    files: [
      {
        name: 'thesis-latex-template.zip',
        format: 'zip',
        size: 4718592,
        path: 'template/thesis-latex/thesis-template.zip',
        sha256: 'd62943779544d37fd3494924ca87ec7b0b7bcd8933d133b88096f2a4a6ad5f00',
      },
    ],
  },
  {
    id: 'cet-vocabulary',
    title: '四六级高频词汇速记表',
    summary:
      '按考频分级的 3200 核心词，每词配真题例句与联想记忆法，A4 双面排版，打印后可直接背诵。',
    category: 'ebook',
    tags: ['四六级', '词汇', '打印版'],
    updatedAt: '2026-10-12',
    downloads: 26913,
    files: [
      {
        name: '四六级高频词汇速记表.pdf',
        format: 'pdf',
        size: 3355443,
        path: 'ebook/cet-vocab/high-frequency.pdf',
        sha256: '6c30e113893f5d72e3571d62163f76aca063682e187ba3a338e86b12a9674c2f',
      },
    ],
  },
  {
    id: 'obs-studio',
    title: 'OBS Studio 录屏与直播工具',
    summary:
      '开源免费的录屏 / 直播软件，内置课程录制预设（1080p 60fps 硬件编码），解压即用，已去除联网更新提示。',
    category: 'software',
    tags: ['录屏', '直播', 'Windows'],
    version: 'v31.0.2',
    updatedAt: '2026-10-21',
    downloads: 12089,
    files: [
      {
        name: 'OBS-Studio-31.0.2-Windows-x64.exe',
        format: 'exe',
        size: 168820736,
        path: 'software/obs-studio/OBS-Studio-31.0.2-Windows-x64.exe',
        sha256: '5654f127da5733da2b5c474fc13f3b3f0d10afb185f6de8b3738bdf376b5ad22',
      },
    ],
  },
  {
    id: 'campus-wallpaper-pack',
    title: '重大校园风光 4K 壁纸包',
    summary: '40 张横向 4K 校园摄影作品，涵盖图书馆、虎溪银杏、钟塔与夜景，含手机竖屏版本，可自由用于个人设备。',
    category: 'media',
    tags: ['壁纸', '4K', '校园'],
    updatedAt: '2026-08-30',
    downloads: 6674,
    files: [
      {
        name: 'campus-wallpaper-4k.zip',
        format: 'zip',
        size: 214748364,
        path: 'media/wallpaper/campus-4k.zip',
        sha256: '5b1fcf4c7436285f79c501dbc5082d9427124789636411f3fd5f4fffb34bcc5a',
      },
    ],
  },
]

export const resourceMap = new Map(resources.map((resource) => [resource.id, resource]))
