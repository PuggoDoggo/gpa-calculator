# 全局规则

## 沟通
- 中文回复
- 称呼用户为"博士"
- 尊重事实比尊重我更重要，如果我犯错请直接指正

## 工作方式
- 遵循 KISS 原则，非必要不要过度设计
- 实现简单可维护，不需要考虑太多防御性边界条件
- 渐进式开发，通过多轮对话完成需求
- 收到需求后：先调研 → 出方案 → 我审核 → 拆解 TODO → 执行
- 不明确的要求，先向我确认再继续
- 从最本质的角度，用第一性原理分析问题
- 优先使用工具解决问题

## 代码风格
- 不要在代码和注释中使用 emoji
- 单文件不超过 500 行，职责单一
- 优先使用已有模式，不要发明新写法

## 方案文档规范
- 方案/设计文档只写架构、流程、表结构描述，**不写代码**
- 代码示例没有意义：设计阶段写的代码到实现时必然要改
- 表结构用文字描述字段和类型，不用 SQL DDL
- 流程用文字或 Mermaid 图，不用伪代码
- 配置用表格描述字段含义，不用 JSON/YAML 示例

## Git
- Conventional commits：feat: / fix: / refactor: / docs:
- 小而聚焦的提交，不要一次改太多

## Skills
- 全局 Skills 在 ~/.claude/skills/ 目录下
- 遇到相关场景或触发词时，先读取对应 skill 文件再执行
- 可用 Skills：

| Skill | 触发词 | 说明 |
|-------|--------|------|
| deploy | "部署""deploy""上线""发布" | 识别项目→读凭证→执行部署→验证 |
| project-init | "新项目""初始化项目" | GitHub+CF+凭证+hooks+CLAUDE.md 全套 |
| cloudflare-ops | "wrangler""worker""d1""pages" | CF Worker/D1/Pages/Secrets 运维命令 |
| docs-lookup | "查文档""看文档" | WebFetch 官方文档，替代 MCP |
| verification-loop | "验证""检查""review" | git状态+语法+构建+安全+diff审查 |
| continuous-learning | 会话结束时自动 | 提取可复用模式存为 learned skill |
| strategic-compact | 逻辑边界时自动 | 在合适时机建议 compact |
| iterative-retrieval | 复杂检索时自动 | 分步搜索，最多3轮定位相关文件 |
| playwright-skill | "截图""浏览器""测试页面""screenshot" | 写Playwright脚本→执行→返回截图，替代Playwright MCP |
| markitdown | "转换""convert""读PDF""读文档" | PDF/DOCX/PPTX/XLSX/图片→Markdown，用markitdown CLI |
| rust-dev | "cargo""rust""clippy" | Rust开发checklist：cargo命令/Worker Rust/错误处理/性能 |
| frontend-design | "前端""UI""页面设计""landing page" | 反AI味前端设计：大胆风格/字体/配色/动效，Anthropic官方 |
| agent-browser | "浏览器""打开网页""截图""填表" | 轻量浏览器CLI，Snapshot+Refs，省93% token，Vercel Labs |
| openclaw-pr | "openclaw""刷PR""开源贡献""contributor" | OpenClaw项目PR贡献：选题/修复/测试/提交/bot应对 |
| content-formatter | "小红书""公众号""排版""长图""发文章" | Markdown→小红书长图+公众号HTML，AI调用输出自包含HTML |
| html-to-png | "导出PNG""截图导出""HTML转图片""生成长图""批量截图" | HTML页面批量导出PNG，Puppeteer无头浏览器渲染，2x高清 |
| platform-content | "适配""跨平台""多平台发布" | 平台内容适配：确认平台/受众/语气→独立适配→自审 |
| writing-x-posts | "写推文""tweet""thread""X内容" | X/Twitter写作框架：8种hook模式+4套thread框架+40个示例 |
| x-impact-checker | "推文打分""X评分""tweet优化" | X内容影响力评分：19信号100分制+bad/better/best改进建议 |
| humanizer | "人味""去AI味""humanize" | 去AI写作痕迹：Wikipedia 24种AI模式检测+灵魂注入，短文本友好 |
| not-ai-writer | "反AI""authentic""自然写作" | 反AI写作全套：200+词表+burstiness/perplexity+20+转换示例，长文适用 |
| llm-api | "调API""用GPT""用Opus""批量处理""清洗""翻译" | 88code双后端，GPT-5.3-codex + Opus，批量脏活省上下文 |
| knowledge-base | "知识库""导入知识库""查知识库""新建知识库" | LightRAG本地知识库管理：创建/导入/查询/维护 |
| tech-presentation | "路演""PPT""技术架构演示""slide" | 亮色高对比度HTML路演PPT：完整CSS框架+JS翻页+slide模板+说服性叙事结构 |

## Commands（斜杠命令）
- `/tdd` — 强制 TDD 流程：RED→GREEN→REFACTOR
- `/code-review` — 代码审查，按 CRITICAL/HIGH/MEDIUM 分级
- `/verify` — 提交前验证：build+语法+测试+安全+git状态
- `/checkpoint` — 工作流检查点：保存/验证/对比状态

## Rules（自动执行）
- `~/.claude/rules/testing.md` — TDD + 80%覆盖率
- `~/.claude/rules/git-workflow.md` — 分支+提交+PR规范
- `~/.claude/rules/security.md` — 安全编码约束

## 凭证管理
- 所有项目凭证统一存放在 ~/.claude/credentials/，按项目目录名分文件夹
- 需要凭证时去 ~/.claude/credentials/{项目名}/credentials.md 查找
- 共享服务凭证在 ~/.claude/credentials/_Shared/
- 初始化新项目时，第一步提醒用户创建 ~/.claude/credentials/{项目名}/credentials.md

## Cloudflare 部署
- Cloudflare Global API Key 拥有全部权限，可用于 wrangler 部署
- 部署命令格式：`CLOUDFLARE_API_KEY={Global API Key} CLOUDFLARE_EMAIL={账号邮箱} npx wrangler pages deploy dist --project-name={项目名}`
- 不需要单独创建 API Token，Global API Key 能做任何事情

## 工具使用
- 被要求调研或分析外部内容时，始终优先使用 WebSearch/WebFetch -- 除非被明确要求，否则不要搜索本地代码库
- 不要将本地项目探索与网络调研混淆

## 项目规范
- 当项目有已建立的工作流、Skill 或规范（如已有的 Puppeteer 脚本、MCP 服务器、自定义 Skill）时，始终使用这些而不是发明新方案
- 在写新脚本之前先检查 .claude/skills/ 和 MCP 服务器

## 角色边界
- 区分架构模式和实现模式
- 在讨论架构、策略或规划时 -- 除非被明确要求，否则不要编写或执行代码
- 如果用户说"规划"、"设计"、"分析"或"头脑风暴"，保持在讨论模式

## 内容写作
- 进行内容写作任务时：在起草之前先询问目标受众的专业水平和期望的语气
- 永远不要假设受众是技术人员
- 对于中文社交媒体平台（小红书、微信、Linux.do），匹配每个平台特定的文化和语气
- 不要跨平台复用同一种声音

## 翻译与本地化
- 翻译或本地化项目时，在开始之前系统性地扫描所有内容文件（包括视频脚本、测试数据、README 文件和文档）
- 先呈现完整清单供用户审批，然后再开始工作

## 安全红线
- 永远不要在代码或输出中暴露 API key、token、密码
- 不要把 .env 文件提交到 git
- credentials 目录下的内容绝不输出到终端、日志或代码中
