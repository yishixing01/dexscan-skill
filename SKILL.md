---
name: dexscan-skill
description: >
  DexScan 加密货币行情与信号分析工具。用于查询代币行情、代币信号监控。

  **触发场景**：
  - 用户提到代币行情、代币价格、市值、持有人数
  - 用户提到代币信号、买入信号、卖出信号、信号推送
  - 用户提到 DexScan、dexscan、行情数据
  - 用户问"什么代币在涨"、"最近有什么信号"、"查询代币"
  - 用户要求查询某个链的代币行情或信号数据

  **主要功能**：
  1. 代币行情：代币价格、市值、24h交易量、流动性等
  2. 代币信号：买入/卖出信号、信号列表查询、信号排行榜

  **注意**：优先调用 scripts/dexscan.js 中的 API 方法获取数据，参考 references/ 目录下的接口文档。
  链名称必须使用枚举值：SOL, BSC, Base, ETH, Polygon, Arbitrum, Optimism, Avalanche, Monad, SUI
---

# DexScan 技能说明

## 目录结构

```
dexscan-skill/
├── SKILL.md              # 主技能文件（当前文件）
├── scripts/
│   └── dexscan.js        # API 调用脚本（get/post封装+签名认证）
├── references/
│   └── signal-api.md     # 代币信号接口文档（信号列表查询、信号排行榜）
├── assets/               # 资源文件目录
└── evals/
    └── evals.json        # 测试用例
```

## API 调用方式

所有 API 调用通过 `scripts/dexscan.js` 导出的方法实现：

```javascript
const dexscan = require('./scripts/dexscan.js');

// 信号列表查询（游标分页）
await dexscan.querySignalList({ chainName: 'SOL' });
await dexscan.querySignalList({ chainName: 'SOL', cursor: { address: 'xxx', signalTime: 1234567890 } });

// 信号排行榜查询
await dexscan.querySignalRank({ chainName: 'SOL' });
```

## 认证机制

API 请求头包含签名认证：
- `ACCESS-KEY`：
  - js文件全局变量默认值（最高优先级）：`e562239ecfd845a4bf3b4cad533f8d2b`
  - 操作系统环境变量：`DEXSCAN-ACCESS-KEY`
- `ACCESS-TIMESTAMP`：当前毫秒时间戳
- `ACCESS-SIGN`：`HMAC-SHA256(ACCESS-KEY + ":" + ACCESS-TIMESTAMP)` 的 Base64 编码

SECRET-KEY：
- js文件全局变量默认值（最高优先级）：`de7b589f7628452c84f90ff370facfb3`
- 操作系统环境变量：`DEXSCAN-SECRET-KEY`

## 支持的链名称

必须使用以下链名称之一：`SOL, BSC, Base, ETH, Polygon, Arbitrum, Optimism, Avalanche, Monad, SUI`

详见 `references/signal-api.md`

## 模块接口文档

- **代币信号模块**：详见 [references/signal-api.md](references/signal-api.md)
  - 信号列表查询（分页，游标方式）
  - 信号排行榜查询（TOP10）
- **地址牛人榜模块**：详见 [references/address-rank-api.md](references/address-rank-api.md)
- **热度模块**：详见 [references/heat-api.md](references/heat-api.md)
  - 社交热度列表（coin-heat-page）
  - 最新热度数据（coin-last-heat）
  - 推文热度数据（twitter-tweets-heat）