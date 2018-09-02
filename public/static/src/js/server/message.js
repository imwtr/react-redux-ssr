
import Message from '../common/message';

let ReactDOMServer = require('react-dom/server');

/**
 * 提供给Node环境调用，传入初始状态
 * @param  {[type]} preloadState [description]
 * @return {[type]}              [description]
 */
export function init(preloadState) {
    return ReactDOMServer.renderToString(<Message preloadState={preloadState} />);
    // return ReactDOMServer.renderToStaticMarkup(<Message preloadState={preloadState} />);

    // stream方式，后面再补充
    // return ReactDOMServer.renderToNodeStream(<Message preloadState={preloadState} />);
    // return ReactDOMServer.renderToStaticNodeStream(<Message preloadState={preloadState} />);
};
