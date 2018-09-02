if (!global._babelPolyfill) {
   require('babel-polyfill');
}

/**
 * 获取URL参数值
 * @param  {String} name 参数名
 * @return {String}      参数值
 */
function getUrlParam(name) {
    let value = window.location.search.match(new RegExp('[?&]' + name + '=([^&]*)(&?)', 'i'));
    return value ? decodeURIComponent(value[1]) : '';
}

export {
    getUrlParam
};

