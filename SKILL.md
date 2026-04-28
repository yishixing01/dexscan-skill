---
name: dexscan-skill
description: >
  使用此技能获取链上市场数据：代币行情、牛人榜、社交热度、信号。

  **触发场景**：
  - 用户提到 dexscan
  - 用户提到代币行情、价格、市值、成交量、流动性、涨跌幅、持币地址数
  - 用户提到代币信号、首次信号推送最大涨幅、信号推送
  - 用户提到代币热度、热度排行榜、KOL讨论
  - 用户提到聪明钱、牛人榜
---

# DexScan 技能说明

## 目录结构

```
dexscan-skill/
├── SKILL.md              # 主技能文件（当前文件）
├── package.json          # npm 包配置
├── README.md             # 说明文档
├── scripts/
│   ├── dexscan.js        # API 调用脚本（get/post封装+签名认证）
│   └── install.js        # 安装脚本
├── references/
│   ├── signal.md         # 代币信号接口文档
│   ├── market.md         # 行情接口文档
│   ├── address.md         # 地址情况接口文档
│   ├── address-rank.md    # 地址牛人榜接口文档
│   └── heat.md           # 热度接口文档
├── assets/               # 资源文件目录
└── evals/
    └── signal-evals.json # 测试用例
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

// 行情模块 - 代币排行查询
await dexscan.queryCoinRank({ chainName: 'SOL', bar: '1h', page: 1, pageSize: 20 });

// 行情模块 - 交易活动列表
await dexscan.queryTradeScroll({ chainName: 'SOL', tokenContractAddress: 'xxx' });

// 地址情况模块 - 地址交易历史
await dexscan.queryAddressTradeScroll({ chainName: 'SOL', address: 'xxx' });

// 地址情况模块 - 地址盈亏分析
await dexscan.queryAddressList({ chainName: 'SOL', address: 'xxx' });
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

## 模块接口文档

- **代币信号模块**：详见 [references/signal.md](references/signal.md)
  - 信号列表查询（分页，游标方式）
  - 信号排行榜查询（TOP10）
- **行情模块**：详见 [references/market.md](references/market.md)
  - 代币排行查询（coin-rank）
  - 交易活动列表（trade-scroll）
  - 流动性变化列表（liquid-scroll）
  - 代币盈利列表（pnl-coin-list）
  - 开发者代币列表（developer-scroll）
  - 代币统计信息（coin-summary）
  - 代币信息（coin-info）
  - K线历史数据（kline-historical）
  - Meme代币排行（meme-rank）
  - Meme支持DEX列表（meme-dexs）
- **地址情况模块**：详见 [references/address.md](references/address.md)
  - 地址交易历史（address-trade-scroll）
  - 地址盈亏分析（address-list）
  - 地址资产组合（address-asset-top）
  - 地址开发者代币（developer-page）
- **地址牛人榜模块**：详见 [references/address-rank.md](references/address-rank.md)
- **热度模块**：详见 [references/heat.md](references/heat.md)
  - 社交热度列表（coin-heat-page）
  - 最新热度数据（coin-last-heat）
  - 推文热度数据（twitter-tweets-heat）