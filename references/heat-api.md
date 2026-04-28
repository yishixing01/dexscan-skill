# 热度接口

## 1. 社交热度列表

**接口地址**: `POST /v3/base/coin-heat-page`

**接口描述**: 社交热度列表，支持分页和排序

**认证头**:
| Header | 说明 |
|--------|------|
| ACCESS-KEY | API密钥，从全局/环境变量获取 |
| ACCESS-TIMESTAMP | 毫秒时间戳 |
| ACCESS-SIGN | HMAC-SHA256签名（Base64编码），签名消息：ACCESS-KEY + ":" + ACCESS-TIMESTAMP |

**请求参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| page | 页数 | true | integer |
| pageSize | 页大小 | true | integer |
| order | 排序 | false | array |
| -> column | 排序字段 | true | string |
| -> asc | 是否正序 | true | boolean |
| chainName | 链名 | true | string |
| heatDate | 热度时间戳 | false | number |
| onlyLookNewCoin | 是否新币 | false | boolean |
| filtrationBlueChipCoin | 是否过滤蓝筹币 | false | boolean |

**响应参数**:
| 参数名称 | 字段说明 | 数据类型 |
|----------|----------|----------|
| chainName | 链名 | string |
| icon | 代币图标 | string |
| address | 代币地址 | string |
| symbol | 代币符号 | string |
| heatTime | 热度时间 | number |
| displayHeat | 展示热度 | number |
| marketCap | 市值 | number |
| priceFluctuationRatio | 24小时涨跌幅 | number |
| heatTopKol | 热度贡献前5kol | array |
| -> username | kol名 | string |
| -> url | X地址 | string |
| -> icon | 图标 | string |
| buyTopKol | 交易买入top5kol | array |
| -> username | kol名 | string |
| -> url | X地址 | string |
| -> icon | 图标 | string |
| heatFluctuation | 热度涨跌值 | number |
| heatFluctuationRatio | 热度涨跌幅 | number |
| priceTrend | 24h价格走势 | array |
| aiSummary | 推文AI总结 | object |
| -> tweetAiSummaryList | 总结列表 | array |
| --> title | 标题 | string |
| --> content | 总结内容 | string |

---

## 2. 最新热度数据

**接口地址**: `POST /v3/base/coin-last-heat`

**接口描述**: 查询最新热度数据

**认证头**:
| Header | 说明 |
|--------|------|
| ACCESS-KEY | API密钥，从全局/环境变量获取 |
| ACCESS-TIMESTAMP | 毫秒时间戳 |
| ACCESS-SIGN | HMAC-SHA256签名（Base64编码），签名消息：ACCESS-KEY + ":" + ACCESS-TIMESTAMP |

**请求参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| chainName | 链类型（BSC/SOL） | true | string |
| limit | 数据条数 | true | number |

**响应参数**:
| 参数名称 | 字段说明 | 数据类型 |
|----------|----------|----------|
| chainName | 链名 | string |
| address | 代币地址 | string |
| symbol | 代币符号 | string |
| heatTime | 热度时间 | string |
| heatRaw | 原始热度 | number |
| heatEma | 平滑后的热度 | number |
| createTime | 创建时间 | string |

---

## 3. 推文热度数据

**接口地址**: `POST /v3/base/twitter-tweets-heat`

**接口描述**: 查询推文热度数据

**认证头**:
| Header | 说明 |
|--------|------|
| ACCESS-KEY | API密钥，从全局/环境变量获取 |
| ACCESS-TIMESTAMP | 毫秒时间戳 |
| ACCESS-SIGN | HMAC-SHA256签名（Base64编码），签名消息：ACCESS-KEY + ":" + ACCESS-TIMESTAMP |

**请求参数**:
| 参数名称 | 字段说明 | 是否必须 | 数据类型 |
|----------|----------|----------|----------|
| | 推文id列表 | true | array |

**响应参数**:
| 参数名称 | 字段说明 | 数据类型 |
|----------|----------|----------|
| snapshootTime | 快照时间 | string |
| tweetId | 推文ID | string |
| userId | 用户ID | string |
| keyword | 搜索关键词 | string |
| tweetText | 推文内容 | string |
| tweetTime | 推文时间 | string |
| views | 浏览数量 | number |
| replies | 回复数量 | number |
| retweets | 转发数量 | number |
| likes | 点赞数量 | number |

---

## 输出规则

### 默认输出字段

**coin-heat-page**：address, symbol, displayHeat, priceFluctuationRatio, heatFluctuation, heatFluctuationRatio

**coin-last-heat**：chainName, address, symbol, heatRaw, heatEma, createTime

**twitter-tweets-heat**：tweetId, userId, tweetText, tweetTime, views, replies, retweets, likes

### 详细信息输出

当用户要求查看详细信息时，输出完整响应字段，包含 aiSummary、heatTopKol、priceTrend 等嵌套数据