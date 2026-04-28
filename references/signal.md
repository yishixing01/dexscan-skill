# 代币信号接口

## 1. 信号列表查询

**接口地址**: `POST /v3/base/coin-signal-scroll`

**接口描述**: 查询24小时信号，支持游标分页，每页返回20条

**认证头**:
| Header | 说明 |
|--------|------|
| ACCESS-KEY | API密钥，从全局/环境变量获取 |
| ACCESS-TIMESTAMP | 毫秒时间戳 |
| ACCESS-SIGN | HMAC-SHA256签名（Base64编码），签名消息：ACCESS-KEY + ":" + ACCESS-TIMESTAMP |

**请求参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名称 | false | string |
| cursor | 游标 | false | object |
| -> address | 代币地址 | true | string |
| -> signalTime | 最新信号时间 | true | number |

**响应参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| cursor | 游标 | false | object |
| -> address | 代币地址 | true | string |
| -> signalTime | 最新信号时间 | true | number |
| list | 列表 | false | array |
| -> chainName | 链名称 | true | string |
| -> address | 代币地址 | true | string |
| -> symbol | 代币symbol | true | string |
| -> name | 代币名称 | true | string |
| -> icon | 代币图标 | true | string |
| -> riskTag | 风险信息 | false | object |
| --> address | 代币地址 | true | string |
| --> chainName | 链名称 | true | string |
| --> level | 风险等级，NONE、LOW、MEDIUM、HIGH | true | string |
| --> riskTags | 风险标签 | false | array |
| ---> id | id | true | number |
| ---> tag | 风险标签 | true | string |
| ---> riskLevel | 风险等级，NONE、LOW、MEDIUM、HIGH | true | string |
| ---> zhCn | 风险描述 | true | string |
| -> top10BalanceSum | top10持仓 | false | string |
| -> signalPrice | 最新信号推送价格 | true | string |
| -> signalMarketCap | 最新信号推送市值 | true | string |
| -> signalHolder | 最新信号推送持币地址数量 | true | number |
| -> price | 当前价格 | true | string |
| -> marketCap | 当前市值 | true | string |
| -> holder | 当前持币地址数量 | true | number |
| -> score | 最新信号评分 | true | number |
| -> maxPriceChange | 最新信号最大价格涨幅 | true | number |
| -> signalTime | 最新信号推送时间 | true | number |
| -> totalSupply | 供应量 | false | string |
| -> chartList | 图表数据 | false | array |
| --> time | 时间窗口 | true | number |
| --> price | 时间窗口价格 | true | string |
| --> hot | 时间窗口热力值 | false | string |
| --> tagInfo | 时间窗口成交额最大的kol标签 | false | object |
| ---> address | 地址 | true | string |
| ---> name | 地址名称 | true | string |
| ---> url | 地址官网 | true | string |
| ---> icon | 地址头像 | true | string |
| ---> fans | 粉丝数量 | true | number |
| ---> tag | 地址标签 | true | string |
| --> value | 时间窗口kol最大成交额 | false | string |
| --> kolComment | 时间窗口评论影响最大kol | false | object |
| ---> userId | 评论KOL用户ID | true | number |
| ---> username | 评论KOL名称 | false | string |
| ---> url | 地址官网 | false | string |
| ---> icon | 地址头像 | true | string |
| ---> score | 评论KOL评分 | false | string |
| --> signal | 信号推送 | true | boolean |
| -> hisList | 历史信号数据 | true | array |
| --> signalTime | 信号推送时间 | true | number |
| --> score | 信号评分 | true | string |
| --> marketCap | 信号推送市值 | true | string |
| -> createTime | 代币创建时间 | false | number |
| -> firstMaxPriceChange | 首次信号最大涨幅 | true | string |
| -> firstCreateTime | 首次信号推送时间 | true | number |

---

## 输出规则

### 信号列表查询输出规则

**默认输出**：
- `cursor`：游标信息（address, signalTime）
- `list` 表头字段：symbol, chainName, address, price, holder, marketCap, score, signalTime, firstMaxPriceChange, firstCreateTime

**查询详细信息**（用户要求查看详细信息时）：输出 list 下一层级所有字段：
- chainName, address, symbol, name, icon, riskTag, top10BalanceSum, signalPrice, signalMarketCap, signalHolder, price, marketCap, holder, score, maxPriceChange, signalTime, hot, totalSupply, chartList, hisList, createTime, firstMaxPriceChange, firstCreateTime

---

## 2. 信号排行榜

**接口地址**: `POST /v3/base/coin-signal-rank`

**接口描述**: 查询24小时信号排行榜TOP10，基于首次信号最大涨幅降序，最新信号推送时间降序。

**认证头**:
| Header | 说明 |
|--------|------|
| ACCESS-KEY | API密钥，从全局/环境变量获取 |
| ACCESS-TIMESTAMP | 毫秒时间戳 |
| ACCESS-SIGN | HMAC-SHA256签名（Base64编码），签名消息：ACCESS-KEY + ":" + ACCESS-TIMESTAMP |

**请求参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | false | string |

**响应参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链名 | false | string |
| address | 代币地址 | false | string |
| symbol | 代币symbol | true | string |
| name | 代币名称 | true | string |
| icon | 代币图标 | true | string |
| marketCap | 最新信号推送市值 | true | string |
| score | 最新信号评分 | true | number |
| maxPriceChange | 最新信号价格最大涨幅 | true | string |
| signalTime | 最新信号推送时间 | true | number |