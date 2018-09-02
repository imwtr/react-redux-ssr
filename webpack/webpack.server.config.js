let path = require('path'),
    webpack = require('webpack'),
    WebpackBuildNotifierPlugin = require('webpack-build-notifier'),
    HappyPack = require('happypack');

let serverConfig = {
    name: 'SSR',

    // 上下文位置
    context: path.resolve(__dirname, '../'),

    mode: process.env.NODE_ENV,

    optimization: {
        // 不压缩，仅作调试用
        minimizer: [],
    },

    // 启用sourceMap
    devtool: false,

    // 文件入口配置
    entry: {
        home: './public/static/src/js/server/home',
        message: './public/static/src/js/server/message'
    },

    // 文件输出配置
    output: {
        // 输出所在目录
        path: path.resolve(__dirname, '../public/static/distSSR/js/'),
        filename: '[name].js',
        library: 'node',
        libraryTarget: 'commonjs2'
    },

    // 处理相关文件的检索及引用方式
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['node_modules']
    },

    // 模块的处理配置，匹配规则对应文件，使用相应loader配置成可识别的模块
    module: {
        rules: [{
            test: /\.(png|gif|jpg)$/,
            use: [{
                loader: 'url-loader',
                // 处理图片，当大小在范围之内时，图片转换成Base64编码，否则将使用file-loader引入
                options: {
                    limit: 8192,
                    // 设置生成图片的路径名字信息 [path]相对context，outputPath输出的路径，publicPath相应引用的路径
                    name: '[path][name].[ext]?[hash:8]',
                    outputPath: '../',
                    publicPath: '/public/static/distSSR/js/' + '../',
                }
            }]
        }, {
            test: /\.(eot|svg|ttf|otf|woff|woff2)\w*/,
            use: [{
                loader: 'file-loader',
                options: {
                    // 设置生成字体文件的路径名字信息 [path]相对context，outputPath输出的路径，publicPath相应引用的主路径
                    name: '[path][name].[ext]?[hash:8]',
                    outputPath: '../',
                    publicPath: '/public/static/distSSR/js/' + '../',
                }
            }],
        }, {
            test: /\.css$/,
            loaders: [
                // 'style-loader',
                'happypack/loader?id=css'
            ]
        }, {
            test: /\.scss$/,
            loaders: [
                // 'style-loader',
                'happypack/loader?id=scss'
            ]
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'happypack/loader?id=js'
        }, {
            test: /\.html$/,
            loader: 'happypack/loader?id=html'
        }]
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            React: 'react'
        }),
        new WebpackBuildNotifierPlugin({
            title: 'webpack.server',
            suppressSuccess: false,
            suppressCompileStart: false,
            suppressWarning: false,
            activateTerminalOnError: true
        }),
        new HappyPack({
            id: 'css',
            loaders: [{
                loader: 'css-loader',
                options: {
                    // url: false,
                    minimize: true
                }
            }, {
                'loader': 'sprite-loader'
            }]
        }),
        new HappyPack({
            id: 'scss',
            loaders: [{
                loader: 'css-loader',
                options: {
                    // url: false,
                    minimize: true
                }
            }, {
                'loader': 'sprite-loader'
            }, {
                loader: 'sass-loader',
                options: {
                    sourceMap: true,
                    // sprite-loader需要通过注释检测是否开启sprite合并, 这里不压缩防止注释被去掉
                    // outputStyle: 'compressed'
                }
            }]
        }),
        new HappyPack({
            id: 'js',
            use: [{
                loader: 'babel-loader',
                options: {
                    // cacheDirectory: true
                }
            }]
        }),
        new HappyPack({
            id: 'html',
            use: [{
                loader: 'ejs-loader',
                options: {

                }
            }]
        })
    ]
}

module.exports = serverConfig;
