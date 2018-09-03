let axios = require('axios');

function getData(id) {
    return new Promise(function(resolve, reject)  {
        // 这里可以放一些异步请求
        // return axios({
        //     method: 'get',
        //     url: 'xxxxx',
        // }).then(rs => {
        //     resolve(rs.data);
        // })
        // .catch(e => {
        //     console.log(e);
        // });

        setTimeout(() => {
            let msgs = [{
                id: '1',
                content: '我是消息我是消息我是消息',
                time: '2018-11-23 12:33:44',
                userName: '王羲之'
            }, {
                id: '2',
                content: '我是消息我是消息我是消息2',
                time: '2018-11-23 12:33:45',
                userName: '王博之'
            }, {
                id: '3',
                content: '我是消息我是消息我是消息3',
                time: '2018-11-23 12:33:44',
                userName: '王安石'
            }, {
                id: '4',
                content: '我是消息我是消息我是消息45',
                time: '2018-11-23 12:33:45',
                userName: '王明'
            }];

            resolve(msgs);
        }, 1000);
    });
}

// 编译后的文件路径
let distPath = '../../public/static/distSSR/js';

module.exports = function(req, res, next) {
    // 如果需要id
    let id = 'req.params.id';

    console.log(id);

    getDefaultData(id);

    async function getDefaultData(id) {
        let appHtml = '';
        let preloadState = await getData(id);

        console.log('preloadState', preloadState);

        try {
            // 获取组件的值（字符串）
            appHtml = require(`${distPath}/message`).init(preloadState);
        } catch(e) {
            console.log(e);
            console.trace();
        }

        res.render('messageClient/message.html', {
            appHtml: appHtml,
            preloadState: JSON.stringify(preloadState).replace(/</g, '\\u003c')
        });
    }
};

