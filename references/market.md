# 行情接口

> **认证说明**：所有接口认证信息详见 SKILL.md 文档

## 1. 分页查询代币排行

**接口地址**: `POST /v3/base/market/coin-rank`

**接口描述**: 按时间粒度分页查询代币排行榜，支持过滤和排序

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名，ALL查全链 | true | string |
| bar | 时间粒度（5m/1h/4h/24h） | true | string |
| page | 页数 | false | number |
| pageSize | 页大小 | false | number |
| order | 排序 | false | array |
| -> column | 排序字段 | true | string |
| -> asc | 是否正序 | true | boolean |
| minValue | 成交额最小值 | false | number |
| maxValue | 成交额最大值 | false | number |
| minLiquid | 流动性最小值 | false | number |
| maxLiquid | 流动性最大值 | false | number |
| minPriceChange | 涨跌幅最小值 | false | number |
| maxPriceChange | 涨跌幅最大值 | false | number |
| minMarketCap | 市值最小值 | false | number |
| maxMarketCap | 市值最大值 | false | number |
| minTradeCount | 交易笔数最小值 | false | number |
| maxTradeCount | 交易笔数最大值 | false | number |
| minAddressCount | 活跃地址数最小值 | false | number |
| maxAddressCount | 活跃地址数最大值 | false | number |
| minHolderCount | 持币地址数最小值 | false | number |
| maxHolderCount | 持币地址数最大值 | false | number |
| minCreateTime | 创建时间最小值（时间戳ms） | false | number |
| maxCreateTime | 创建时间最大值（时间戳ms） | false | number |
| onlyMeme | 只看Meme币 | false | boolean |
| hideHigh | 隐藏高风险 | false | boolean |
| hideStable | 隐藏稳定币 | false | boolean |
| unit | 单位 | false | string |
| minCreateDuration | 创建时长最小值（秒） | false | number |
| maxCreateDuration | 创建时长最大值（秒） | false | number |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| total | 总数 | true | number |
| list | 列表 | true | array |
| -> chainName | 链名 | true | string |
| -> tokenAddressBase | 代币合约地址 | true | string |
| -> symbol | 代币符号 | true | string |
| -> icon | 代币图标 | false | string |
| -> createTime | 创建时间（时间戳ms） | false | number |
| -> totalSupply | 总供应量 | false | number |
| -> liquid | 流动性 | false | number |
| -> holderCount | 持币地址数 | false | number |
| -> marketCap | 市值 | false | number |
| -> bar | 时间粒度 | true | string |
| -> windowStart | 窗口开始时间 | false | number |
| -> windowEnd | 窗口结束时间 | false | number |
| -> openPrice | 开盘价 | false | number |
| -> closePrice | 收盘价 | false | number |
| -> high | 最高价 | false | number |
| -> low | 最低价 | false | number |
| -> priceChange | 涨跌幅 | false | number |
| -> buyVolume | 买入量 | false | number |
| -> sellVolume | 卖出量 | false | number |
| -> volume | 成交量 | false | number |
| -> buyValue | 买入额 | false | number |
| -> sellValue | 卖出额 | false | number |
| -> value | 成交额 | false | number |
| -> buyTradeCount | 买单数 | false | number |
| -> sellTradeCount | 卖单数 | false | number |
| -> tradeCount | 总交易数 | false | number |
| -> buyAddressCount | 买入地址数 | false | number |
| -> sellAddressCount | 卖出地址数 | false | number |
| -> addressCount | 总活跃地址数 | false | number |
| -> memeDex | Meme发射平台 | false | string |
| -> riskLevel | 风险等级（NONE/LOW/MEDIUM/HIGH） | false | string |

**响应示例**:

```json
{
    "code": 200,
    "data": {
        "total": 1000,
        "list": [
            {
                "chainName": "SOL",
                "tokenAddressBase": "So11111111111111111111111111111111111111112",
                "symbol": "SOL",
                "icon": "https://static.dexscan.trade/images/logo/sol.png",
                "createTime": 1609459200000,
                "bar": "1h",
                "windowStart": 1776121200000,
                "windowEnd": 1776124800000,
                "openPrice": 135.5,
                "closePrice": 138.2,
                "high": 139.0,
                "low": 134.8,
                "priceChange": 0.0199,
                "volume": 1234567.89,
                "value": 168999999.99,
                "buyTradeCount": 52341,
                "sellTradeCount": 48203,
                "tradeCount": 100544,
                "marketCap": 65000000000,
                "liquid": 980000000,
                "holderCount": 4500000,
                "riskLevel": "NONE"
            }
        ]
    },
    "msg": "操作成功",
    "reqId": "2043948786527789057"
}
```

---

## 2. 游标查询交易活动列表

**接口地址**: `POST /v3/base/market/trade-scroll`

**接口描述**: 游标分页查询指定代币的链上交易记录

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |
| swapTypes | 交易类型（1-买入，2-卖出） | false | array |
| minValue | 成交额最小值（USD） | false | number |
| maxValue | 成交额最大值（USD） | false | number |
| address | 按钱包地址筛选 | false | string |
| begin | 起始时间戳（毫秒） | false | number |
| end | 截止时间戳（毫秒） | false | number |
| dexEnum | DEX类型枚举值 | false | number |
| timeDesc | 是否时间倒序 | false | boolean |
| size | 每页数量，默认50 | false | number |
| cursor | 游标，首次不传 | false | object |
| -> blockTime | 区块时间戳（毫秒） | true | number |
| -> blockHeight | 区块高度 | true | number |
| -> transIndex | 交易内事件索引 | true | number |
| -> instIndex | 指令索引 | true | number |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| cursor | 下一页游标 | false | object |
| -> blockTime | 区块时间戳（毫秒） | true | number |
| -> blockHeight | 区块高度 | true | number |
| -> transIndex | 交易内事件索引 | true | number |
| -> instIndex | 指令索引 | true | number |
| list | 交易列表 | false | array |
| -> transHash | 交易Hash | true | string |
| -> blockTime | 区块时间戳（毫秒） | true | number |
| -> blockHeight | 区块高度 | true | number |
| -> transIndex | 交易内事件索引 | true | number |
| -> instIndex | 指令索引 | true | number |
| -> swapType | 交易类型（1-买入，2-卖出） | true | number |
| -> address | 钱包地址 | true | string |
| -> baseAddress | 代币地址 | true | string |
| -> baseSymbol | 代币符号 | true | string |
| -> baseAmount | 代币数量 | true | number |
| -> quoteAddress | 报价代币地址 | true | string |
| -> quoteSymbol | 报价代币符号 | true | string |
| -> quoteAmount | 报价代币数量 | true | number |
| -> price | 成交价格 | true | number |
| -> value | 成交价值（USD） | true | number |
| -> dexEnum | DEX类型枚举 | false | number |
| -> dexAddress | DEX地址 | false | string |
| -> poolAddress | 池子地址 | false | string |
| -> tagInfo | 地址标签信息 | false | object |
| --> address | 地址 | true | string |
| --> name | 名称 | true | string |
| --> url | 主页链接 | true | string |
| --> icon | 头像 | true | string |
| --> fans | 粉丝数 | true | number |
| --> tag | 标签 | true | string |
| -> tags | 交易标签（DEV/KOL/TOP10/SNIPER/NEW） | false | array |

**响应示例**:

```json
{
    "code": 200,
    "data": {
        "cursor": {
            "blockTime": 1776124800000,
            "blockHeight": 325000000,
            "transIndex": 5,
            "instIndex": 0
        },
        "list": [
            {
                "transHash": "5UUH9RTDiSpq6HKS6bp4NdU9PNJpXRXuiw6ShBTBhgH2abc",
                "blockTime": 1776124900000,
                "blockHeight": 325000001,
                "transIndex": 3,
                "instIndex": 0,
                "swapType": 1,
                "address": "AoTXYoy7kPLCx2DHJq35wiPV8aLKVYF2ShhcZS3XYk9H",
                "baseAddress": "So11111111111111111111111111111111111111112",
                "baseSymbol": "SOL",
                "baseAmount": 10.5,
                "quoteAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                "quoteSymbol": "USDC",
                "quoteAmount": 1450.25,
                "price": 138.12,
                "value": 1450.25,
                "dexEnum": 1,
                "dexAddress": "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP",
                "poolAddress": "HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ",
                "tagInfo": null,
                "tags": []
            }
        ]
    },
    "msg": "操作成功",
    "reqId": "2043948786527789058"
}
```

---

## 3. 游标查询流动性变化列表

**接口地址**: `POST /v3/base/market/liquid-scroll`

**接口描述**: 游标分页查询指定代币的流动性添加/移除记录

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |
| swapTypes | 流动性变更类型（1-添加，2-移除） | false | array |
| minValue | 总额最小值（USD） | false | number |
| maxValue | 总额最大值（USD） | false | number |
| address | 按钱包地址筛选 | false | string |
| begin | 起始时间戳（毫秒） | false | number |
| end | 截止时间戳（毫秒） | false | number |
| dexEnum | DEX类型枚举值 | false | number |
| timeDesc | 是否时间倒序 | false | boolean |
| size | 每页数量，默认50 | false | number |
| cursor | 游标，首次不传 | false | object |
| -> blockTime | 区块时间戳（毫秒） | true | number |
| -> blockHeight | 区块高度 | true | number |
| -> transIndex | 交易内事件索引 | true | number |
| -> instIndex | 指令索引 | true | number |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| cursor | 下一页游标 | false | object |
| list | 流动性记录列表 | false | array |
| -> transHash | 交易Hash | true | string |
| -> blockTime | 区块时间戳（毫秒） | true | number |
| -> blockHeight | 区块高度 | true | number |
| -> transIndex | 交易内事件索引 | true | number |
| -> instIndex | 指令索引 | true | number |
| -> swapType | 变更类型（1-添加，2-移除） | true | number |
| -> address | 钱包地址 | true | string |
| -> poolAddress | 池子地址 | false | string |
| -> dexEnum | DEX类型枚举 | false | number |
| -> dexName | DEX名称 | false | string |
| -> dexIcon | DEX图标 | false | string |
| -> dexAddress | DEX地址 | false | string |
| -> value | 成交价值（USD） | false | number |
| -> tokens | 涉及代币列表 | false | array |
| --> tokenContractAddress | 代币合约地址 | true | string |
| --> symbol | 代币符号 | true | string |
| --> amount | 代币数量 | true | number |

**响应示例**:

```json
{
    "code": 200,
    "data": {
        "cursor": {
            "blockTime": 1776124800000,
            "blockHeight": 325000000,
            "transIndex": 2,
            "instIndex": 0
        },
        "list": [
            {
                "transHash": "3xyzABCDEFGH1234567890abcdefghijklmnopqrstuvwxyz",
                "blockTime": 1776124900000,
                "blockHeight": 325000001,
                "transIndex": 1,
                "instIndex": 0,
                "swapType": 1,
                "address": "AoTXYoy7kPLCx2DHJq35wiPV8aLKVYF2ShhcZS3XYk9H",
                "poolAddress": "HJPjoWUrhoZzkNfRpHuieeFk9WcZWjwy6PBjZ81ngndJ",
                "dexEnum": 1,
                "dexName": "Raydium",
                "dexIcon": "https://static.dexscan.trade/dex/raydium.png",
                "dexAddress": "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP",
                "value": 5000.00,
                "tokens": [
                    {
                        "tokenContractAddress": "So11111111111111111111111111111111111111112",
                        "symbol": "SOL",
                        "amount": 36.2
                    },
                    {
                        "tokenContractAddress": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
                        "symbol": "USDC",
                        "amount": 5000.0
                    }
                ]
            }
        ]
    },
    "msg": "操作成功",
    "reqId": "2043948786527789059"
}
```

---

## 4. 查询代币盈利列表

**接口地址**: `POST /v3/base/market/pnl-coin-list`

**接口描述**: 查询指定代币的持仓地址盈亏数据列表

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |
| type | 地址类型筛选（DEV/KOL/TOP10/SNIPER/NEW） | false | string |
| holderList | true时按持仓量排序返回Holder列表 | false | boolean |
| addresses | 批量钱包地址列表，最多10个 | false | array |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| address | 钱包地址 | true | string |
| baseAddress | 代币合约地址 | true | string |
| chainName | 链名 | false | string |
| symbol | 代币符号 | false | string |
| icon | 代币图标 | false | string |
| price | 当前价格 | false | number |
| balance | 当前持仓数量 | false | number |
| balanceValue | 当前持仓价值（USD） | false | number |
| beginTime | 首次买入时间戳 | false | number |
| latestBeginTime | 最近一次买入时间戳 | false | number |
| latestTime | 最近交易时间戳 | false | number |
| buyAmount | 总买入数量 | false | number |
| buyAmountDeposit | 总买入数量（含转入） | false | number |
| buyValue | 总买入金额（USD） | false | number |
| buyValueDeposit | 总买入金额（含转入，USD） | false | number |
| buyNumber | 买入次数 | false | number |
| buyAvgPrice | 平均买入价格 | false | number |
| sellAmount | 总卖出数量 | false | number |
| sellValue | 总卖出金额（USD） | false | number |
| sellNumber | 卖出次数 | false | number |
| sellAvgPrice | 平均卖出价格 | false | number |
| realizedPnl | 已实现盈亏（USD） | false | number |
| realizedPnlRatio | 已实现盈亏比例 | false | number |
| unrealizedPnl | 未实现盈亏（USD） | false | number |
| unrealizedPnlRatio | 未实现盈亏比例 | false | number |
| totalPnl | 总盈亏（USD） | false | number |
| totalPnlRatio | 总盈亏比例 | false | number |
| totalSupply | 代币总供应量 | false | number |
| nativeBalance | 原生代币余额 | false | number |
| sourceAddress | 资金来源地址 | false | string |
| sourceTime | 资金来源时间戳 | false | number |
| riskLevel | 风险等级（NONE/LOW/MEDIUM/HIGH） | false | string |
| holdingPeriod | 持仓时长（毫秒） | false | number |
| tagInfo | 地址标签信息 | false | object |
| -> address | 地址 | true | string |
| -> name | 名称 | true | string |
| -> url | 主页链接 | true | string |
| -> icon | 头像 | true | string |
| -> fans | 粉丝数 | true | number |
| -> tag | 标签 | true | string |
| tags | 地址类型标签（DEV/KOL/TOP10/SNIPER/NEW） | false | array |

**响应示例**:

```json
{
    "code": 200,
    "data": [
        {
            "address": "AoTXYoy7kPLCx2DHJq35wiPV8aLKVYF2ShhcZS3XYk9H",
            "baseAddress": "So11111111111111111111111111111111111111112",
            "chainName": "SOL",
            "symbol": "SOL",
            "icon": "https://static.dexscan.trade/images/logo/sol.png",
            "price": 138.12,
            "balance": 1500.0,
            "balanceValue": 207180.0,
            "beginTime": 1700000000000,
            "latestBeginTime": 1776000000000,
            "latestTime": 1776124900000,
            "buyAmount": 2000.0,
            "buyValue": 250000.0,
            "buyNumber": 5,
            "buyAvgPrice": 125.0,
            "sellAmount": 500.0,
            "sellValue": 65000.0,
            "sellNumber": 2,
            "sellAvgPrice": 130.0,
            "realizedPnl": 2500.0,
            "realizedPnlRatio": 0.04,
            "unrealizedPnl": 19680.0,
            "unrealizedPnlRatio": 0.105,
            "totalPnl": 22180.0,
            "totalPnlRatio": 0.1,
            "riskLevel": "NONE",
            "holdingPeriod": 76124900000,
            "tagInfo": {
                "address": "AoTXYoy7kPLCx2DHJq35wiPV8aLKVYF2ShhcZS3XYk9H",
                "name": "ST.",
                "url": "https://x.com/sleektimmy",
                "icon": "https://static.dexscan.trade/kol/sleektimmy.png",
                "fans": 24757,
                "tag": "kol"
            },
            "tags": ["KOL"]
        }
    ],
    "msg": "操作成功",
    "reqId": "2043948786527789060"
}
```

---

## 5. 游标查询开发者代币列表

**接口地址**: `POST /v3/base/market/developer-scroll`

**接口描述**: 游标分页查询指定代币的关联开发者创建的代币列表

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |
| size | 每页数量，默认30 | false | number |
| cursor | 游标（创建时间戳ms），首次不传 | false | number |
| needStats | 是否返回开发者统计数据 | false | boolean |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| cursor | 下一页游标（创建时间戳ms） | false | number |
| list | 代币列表 | false | array |
| -> chainName | 链名 | true | string |
| -> tokenAddressBase | 代币合约地址 | true | string |
| -> symbol | 代币符号 | true | string |
| -> name | 代币名称 | true | string |
| -> icon | 代币图标 | false | string |
| -> creator | 创建者地址 | false | string |
| -> price | 当前价格 | false | number |
| -> priceChange | 24h涨跌幅 | false | number |
| -> marketCap | 市值 | false | number |
| -> liquid | 流动性 | false | number |
| -> volume | 24h成交量 | false | number |
| -> value | 24h成交额 | false | number |
| -> totalSupply | 总供应量 | false | number |
| -> holderCount | 持币地址数 | false | number |
| -> createTime | 创建时间戳 | false | number |
| -> creatorBalance | 创建者持仓数量 | false | number |
| -> creatorBalanceRatio | 开发者持仓比例（0~1） | false | number |
| -> top10BalanceSum | Top10持仓合计 | false | number |
| -> tradeCount | 总交易笔数 | false | number |
| -> telegram | Telegram链接 | false | string |
| -> twitter | Twitter链接 | false | string |
| -> website | 官网链接 | false | string |
| -> kolCount | KOL持仓地址数 | false | number |
| -> newCount | 新钱包持仓地址数 | false | number |
| -> migrateFinished | 是否完成迁移 | false | boolean |
| -> migrateProgress | 迁移进度（0~1） | false | number |
| -> riskTag | 风险标签信息 | false | object |
| --> address | 代币地址 | true | string |
| --> chainName | 链名 | true | string |
| --> level | 风险等级（NONE/LOW/MEDIUM/HIGH） | true | string |
| --> riskTags | 风险标签列表 | false | array |
| ---> id | 标签ID | true | number |
| ---> tag | 标签标识 | true | string |
| ---> riskLevel | 风险等级 | true | string |
| ---> zhCn | 中文描述 | true | string |
| stats | 开发者统计（needStats=true时返回） | false | object |
| -> creator | 开发者地址 | true | string |
| -> sourceTime | 资金来源时间 | false | number |
| -> sourceAddress | 资金来源地址 | false | string |
| -> total | 创建代币总数 | false | number |
| -> migrated | 已迁移数量 | false | number |
| -> nonMigrated | 未迁移数量 | false | number |
| -> topMarketCap | 市值最高的代币 | false | object |
| -> lastCreateCoin | 最新创建的代币 | false | object |

---

## 6. 查询代币近期统计信息

**接口地址**: `POST /v3/base/market/coin-summary`

**接口描述**: 查询代币近期统计信息

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |
| bars | 时间粒度列表 | false | array |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenAddressBase | 代币合约地址 | true | string |
| symbol | 代币符号 | true | string |
| name | 代币名称 | true | string |
| icon | 代币图标 | false | string |
| price | 当前价格 | false | number |
| priceChange | 涨跌幅 | false | number |
| marketCap | 市值 | false | number |
| liquid | 流动性 | false | number |
| volume | 成交量 | false | number |
| value | 成交额 | false | number |
| buyVolume | 买入量 | false | number |
| sellVolume | 卖出量 | false | number |
| buyValue | 买入额 | false | number |
| sellValue | 卖出额 | false | number |
| buyTradeCount | 买单数 | false | number |
| sellTradeCount | 卖单数 | false | number |
| tradeCount | 总交易数 | false | number |
| buyAddressCount | 买入地址数 | false | number |
| sellAddressCount | 卖出地址数 | false | number |
| addressCount | 总活跃地址数 | false | number |
| holderCount | 持币地址数 | false | number |

---

## 7. 查询代币信息

**接口地址**: `POST /v3/base/market/coin-info`

**接口描述**: 查询代币详细信息

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenAddressBase | 代币合约地址 | true | string |
| symbol | 代币符号 | true | string |
| name | 代币名称 | true | string |
| decimals | 代币精度 | true | number |
| icon | 代币图标 | false | string |
| totalSupply | 总供应量 | false | number |
| owner | 所有者地址 | false | string |
| createTime | 创建时间（时间戳ms） | false | number |
| createTx | 创建交易Hash | false | string |
| creator | 创建者地址 | false | string |
| price | 当前价格 | false | number |
| priceChange | 涨跌幅 | false | number |
| marketCap | 市值 | false | number |
| liquid | 流动性 | false | number |
| volume | 成交量 | false | number |
| value | 成交额 | false | number |
| holderCount | 持币地址数 | false | number |
| kolCount | KOL持仓地址数 | false | number |
| newCount | 新钱包持仓地址数 | false | number |
| riskLevel | 风险等级（NONE/LOW/MEDIUM/HIGH） | false | string |
| riskTag | 风险标签信息 | false | object |
| mint | 是否为Mintable代币 | false | boolean |
| freeze | 是否为冻结代币 | false | boolean |
| transferFee | 转账费用 | false | number |
| top10HolderRatio | Top10持仓比例 | false | number |
| fundingAddress | 资金地址 | false | string |

---

## 8. 查询K线历史数据

**接口地址**: `POST /v3/base/market/kline-historical`

**接口描述**: 查询代币K线历史数据

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |
| interval | K线周期（1m/5m/15m/30m/1h/4h/1d/1w） | true | string |
| begin | 起始时间戳（毫秒） | true | number |
| end | 结束时间戳（毫秒） | true | number |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| list | K线数据列表 | false | array |
| -> time | 时间戳 | true | number |
| -> open | 开盘价 | true | number |
| -> high | 最高价 | true | number |
| -> low | 最低价 | true | number |
| -> close | 收盘价 | true | number |
| -> volume | 成交量 | true | number |

---

## 9. 查询Meme代币排行列表

**接口地址**: `POST /v3/base/market/meme-rank`

**接口描述**: 查询Meme代币排行列表

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | false | string |
| order | 排序 | false | array |
| -> column | 排序字段 | true | string |
| -> asc | 是否正序 | true | boolean |
| page | 页数 | false | number |
| pageSize | 页大小 | false | number |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| total | 总数 | true | number |
| list | 列表 | true | array |
| -> chainName | 链名 | true | string |
| -> tokenAddressBase | 代币合约地址 | true | string |
| -> symbol | 代币符号 | true | string |
| -> name | 代币名称 | true | string |
| -> icon | 代币图标 | false | string |
| -> price | 当前价格 | false | number |
| -> priceChange | 涨跌幅 | false | number |
| -> marketCap | 市值 | false | number |
| -> liquid | 流动性 | false | number |
| -> volume | 成交量 | false | number |
| -> holderCount | 持币地址数 | false | number |
| -> newHolderCount | 新地址持仓合计 | false | number |
| -> createTime | 创建时间 | false | number |
| -> riskLevel | 风险等级 | false | string |

---

## 10. 查询Meme支持的DEX列表

**接口地址**: `POST /v3/base/market/meme-dexs`

**接口描述**: 查询Meme代币支持的DEX列表

**请求参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | true | string |
| tokenContractAddress | 代币合约地址 | true | string |

**响应参数**:

| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| dexEnum | DEX类型枚举 | true | number |
| dexName | DEX名称 | true | string |
| dexIcon | DEX图标 | false | string |
| dexAddress | DEX地址 | true | string |
| poolAddress | 池子地址 | false | string |
| version | 版本 | false | string |
