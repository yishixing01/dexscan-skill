/**
 * DexScan API 客户端
 * 提供 get/post 请求方式，支持签名认证
 *
 * ACCESS-KEY 获取优先级（从高到低）：
 * 1. js文件全局变量默认值：e562239ecfd845a4bf3b4cad533f8d2b
 * 2. 操作系统环境变量：DEXSCAN-ACCESS-KEY
 *
 * SECRET-KEY 获取优先级（从高到低）：
 * 1. js文件全局变量默认值：de7b589f7628452c84f90ff370facfb3
 * 2. 操作系统环境变量：DEXSCAN-SECRET-KEY
 */

const crypto = require('crypto');
const BASE_URI = 'http://192.168.224.29/api';

// 全局变量默认值（优先级最高）
const DEFAULT_ACCESS_KEY = 'e562239ecfd845a4bf3b4cad533f8d2b';
const DEFAULT_SECRET_KEY = 'de7b589f7628452c84f90ff370facfb3';

/**
 * 时间戳转换为 yyyy-MM-dd HH:mm:ss 格式
 * @param {number|string} timestamp - 毫秒时间戳
 * @returns {string} 格式化后的时间字符串
 */
function formatTimestamp(timestamp) {
    if (!timestamp || timestamp === 0) return '-';
    const date = new Date(Number(timestamp));
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

/**
 * 格式化信号数据中的时间戳字段
 * @param {object} signal - 信号对象
 * @returns {object} 格式化后的信号对象
 */
function formatSignalData(signal) {
    return {
        ...signal,
        signalTime: formatTimestamp(signal.signalTime),
        createTime: formatTimestamp(signal.createTime),
        firstCreateTime: formatTimestamp(signal.firstCreateTime)
    };
}

/**
 * 获取 ACCESS-KEY
 * 优先级：全局变量默认值 > 环境变量
 */
function getAccessKey() {
    // 全局变量默认值优先级最高
    if (DEFAULT_ACCESS_KEY) return DEFAULT_ACCESS_KEY;

    // 环境变量
    return process.env.DEXSCAN_ACCESS_KEY || null;
}

/**
 * 获取 SECRET-KEY
 * 优先级：全局变量默认值 > 环境变量
 */
function getSecretKey() {
    // 全局变量默认值优先级最高
    if (DEFAULT_SECRET_KEY) return DEFAULT_SECRET_KEY;

    // 环境变量
    return process.env.DEXSCAN_SECRET_KEY || null;
}

/**
 * 生成签名头
 * @returns {{ ACCESS-KEY: string, ACCESS-TIMESTAMP: string, ACCESS-SIGN: string }}
 */
function getAuthHeaders() {
    const accessKey = getAccessKey();
    const timestamp = Date.now().toString();
    const signString = accessKey + ":" + timestamp;
    const secretKey = getSecretKey();

    // HMAC-SHA256 签名，Base64 编码
    const sign = crypto.createHmac('sha256', secretKey)
        .update(signString)
        .digest('base64');

    return {
        'ACCESS-KEY': accessKey,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-SIGN': sign
    };
}

/**
 * 发送 GET 请求
 * @param {string} path - 请求路径（不包含 base_uri）
 * @param {object} params - 查询参数
 * @returns {Promise<any>}
 */
async function get(path, params = {}) {
    const auth = getAuthHeaders();
    const url = BASE_URI + path + '?' + new URLSearchParams(params);

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...auth
        }
    });

    return response.json();
}

/**
 * 发送 POST 请求
 * @param {string} path - 请求路径（不包含 base_uri）
 * @param {object} data - 请求体数据
 * @returns {Promise<any>}
 */
async function post(path, data = {}) {
    const auth = getAuthHeaders();
    const url = BASE_URI + path;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...auth
        },
        body: JSON.stringify(data)
    });

    return response.json();
}

// ==================== 代币信号接口 ====================

/**
 * 信号列表查询（分页查询）
 * 接口地址: POST /v3/base/coin-signal-scroll
 * 接口描述: 查询24小时信号，支持游标分页，每页返回20条
 * @param {object} options - 查询参数
 * @param {string} [options.chainName] - 链名称 (SOL/BSC/Base/ETH/Polygon/Arbitrum/Optimism/Avalanche/Monad/SUI)
 * @param {object} [options.cursor] - 游标，用于分页
 * @param {string} options.cursor.address - 代币地址
 * @param {number} options.cursor.signalTime - 最新信号时间
 * @returns {Promise<any>}
 */
async function querySignalList(options = {}) {
    const { chainName, cursor } = options;
    const result = await post('/v3/base/coin-signal-scroll', {
        chainName,
        cursor
    });
    // 格式化返回数据中的时间戳字段
    if (result.data && result.data.list && Array.isArray(result.data.list)) {
        result.data.list = result.data.list.map(item => formatSignalData(item));
    }
    return result;
}

/**
 * 信号排行榜查询
 * 接口地址: POST /v3/base/coin-signal-rank
 * 接口描述: 查询24小时信号排行榜TOP10，基于首次信号最大涨幅降序，最新信号推送时间降序。
 * @param {object} options - 查询参数
 * @param {string} [options.chainName] - 链名称
 * @returns {Promise<any>}
 */
async function querySignalRank(options = {}) {
    const { chainName } = options;
    const result = await post('/v3/base/coin-signal-rank', {
        chainName
    });
    // 格式化返回数据中的时间戳字段
    if (result.data && Array.isArray(result.data)) {
        result.data = result.data.map(item => formatSignalData(item));
    }
    return result;
}

// ==================== 地址牛人榜接口 ====================

/**
 * 地址牛人榜查询
 * 接口地址: POST /v3/base/address-rank-page
 * 接口描述: 查询地址盈亏排行榜，支持多条件筛选和排序
 * @param {object} options - 查询参数
 * @param {string} options.chainName - 链名称
 * @param {string} options.bar - 时间枚举（7d、30d、90d）
 * @param {number} options.page - 页数
 * @param {number} options.pageSize - 每页条数
 * @param {Array} [options.order] - 排序规则 [{column: 'pnl', asc: false}]
 * @param {string} [options.tag] - 标签枚举（KOL）
 * @param {number} [options.minPnl] - 收益额最小值
 * @param {number} [options.maxPnl] - 收益额最大值
 * @param {number} [options.minWinRatio] - 胜率最小值
 * @param {number} [options.maxWinRatio] - 胜率最大值
 * @param {number} [options.minNumber] - 交易笔数最小值
 * @param {number} [options.maxNumber] - 交易笔数最大值
 * @returns {Promise<any>}
 */
async function queryAddressRank(options = {}) {
    const {
        chainName,
        bar,
        page = 1,
        pageSize = 20,
        order = [{ column: 'pnl', asc: false }],
        tag,
        minPnl,
        maxPnl,
        minWinRatio,
        maxWinRatio,
        minNumber,
        maxNumber,
        minValue,
        maxValue
    } = options;

    const params = {
        chainName,
        bar,
        page: String(page),
        pageSize: String(pageSize),
        order
    };

    if (tag !== undefined) params.tag = tag;
    if (minPnl !== undefined) params.minPnl = minPnl;
    if (maxPnl !== undefined) params.maxPnl = maxPnl;
    if (minWinRatio !== undefined) params.minWinRatio = minWinRatio;
    if (maxWinRatio !== undefined) params.maxWinRatio = maxWinRatio;
    if (minNumber !== undefined) params.minNumber = minNumber;
    if (maxNumber !== undefined) params.maxNumber = maxNumber;
    if (minValue !== undefined) params.minValue = minValue;
    if (maxValue !== undefined) params.maxValue = maxValue;

    return post('/v3/base/address-rank-page', params);
}

// ==================== 热度接口 ====================

/**
 * 社交热度列表查询
 * 接口地址: POST /v3/base/coin-heat-page
 * 接口描述: 社交热度列表，支持分页和排序
 * @param {object} options - 查询参数
 * @param {number} options.page - 页数
 * @param {number} options.pageSize - 每页条数
 * @param {string} options.chainName - 链名
 * @param {Array} [options.order] - 排序规则 [{column: 'displayHeat', asc: false}]
 * @param {number} [options.heatDate] - 热度时间戳
 * @param {boolean} [options.onlyLookNewCoin] - 是否新币
 * @param {boolean} [options.filtrationBlueChipCoin] - 是否过滤蓝筹币
 * @returns {Promise<any>}
 */
async function queryCoinHeatPage(options = {}) {
    const {
        page = 1,
        pageSize = 20,
        chainName,
        order = [{ column: 'displayHeat', asc: false }],
        heatDate,
        onlyLookNewCoin,
        filtrationBlueChipCoin
    } = options;

    const params = {
        page,
        pageSize,
        chainName,
        order
    };

    if (heatDate !== undefined) params.heatDate = heatDate;
    if (onlyLookNewCoin !== undefined) params.onlyLookNewCoin = onlyLookNewCoin;
    if (filtrationBlueChipCoin !== undefined) params.filtrationBlueChipCoin = filtrationBlueChipCoin;

    return post('/v3/base/coin-heat-page', params);
}

/**
 * 最新热度数据查询
 * 接口地址: POST /v3/base/coin-last-heat
 * 接口描述: 查询最新热度数据
 * @param {object} options - 查询参数
 * @param {string} options.chainName - 链类型（BSC/SOL）
 * @param {number} options.limit - 数据条数
 * @returns {Promise<any>}
 */
async function queryCoinLastHeat(options = {}) {
    const { chainName, limit } = options;
    return post('/v3/base/coin-last-heat', {
        chainName,
        limit
    });
}

/**
 * 推文热度数据查询
 * 接口地址: POST /v3/base/twitter-tweets-heat
 * 接口描述: 查询推文热度数据
 * @param {Array} tweetIds - 推文ID列表
 * @returns {Promise<any>}
 */
async function queryTwitterTweetsHeat(tweetIds = []) {
    return post('/v3/base/twitter-tweets-heat', tweetIds);
}

// 导出方法
module.exports = {
    get,
    post,
    querySignalList,
    querySignalRank,
    queryAddressRank,
    queryCoinHeatPage,
    queryCoinLastHeat,
    queryTwitterTweetsHeat
};