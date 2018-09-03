
/**
 * 获取数据
 * @return {[type]} [description]
 */
function getData() {
    // 获取用户信息
    let getUserInfo = new Promise(function(resolve, reject)  {
        setTimeout(() => {
            let userInfo = {
                sex: 'male',
                age: 18,
                name: '王羲之',
                avatar: '/public/static/imgs/avatar.png'
            };

            resolve(userInfo);
        }, 1000);
    });

    // 获取工作列表
    let getWorkList = new Promise(function(resolve, reject)  {
        setTimeout(() => {
            let workList = {
                todo: [{
                    id: '1',
                    content: '跑步'
                }, {
                    id: '2',
                    content: '游泳'
                }],

                done: [{
                    id: '13',
                    content: '看书'
                }, {
                    id: '24',
                    content: '写代码'
                }]
            };

            resolve(workList);
        }, 500);
    });

    return Promise.all([getUserInfo, getWorkList]);
}

// 编译后的文件路径
let distPath = '../../public/static/distSSR/js';

module.exports = function(req, res, next) {
    getDefaultData();

    async function getDefaultData() {
        let appHtml = '';
        let preloadState = await getData();

        preloadState = {
            userInfo: preloadState[0],
            todo: preloadState[1].todo,
            done: preloadState[1].done
        };

        // console.log('preloadState', preloadState);

        try {
            // 获取组件的值（字符串）
            appHtml = require(`${distPath}/home`).init(preloadState);
        } catch(e) {
            console.log(e);
            console.trace();
        }

        res.render('homeClient/home.html', {
            appHtml: appHtml,
            preloadState: JSON.stringify(preloadState).replace(/</g, '\\u003c')
        });
    }
}
