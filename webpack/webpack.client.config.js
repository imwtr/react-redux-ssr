let path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    WebpackBuildNotifierPlugin = require('webpack-build-notifier'),
    AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
    TimeFixPlugin = require('time-fix-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),

    // 是否生产环境
    isProduction = process.env.NODE_ENV === 'production',

    // 并行执行loader
    HappyPack = require('happypack'),

    os = require('os'),

    happyThreadPool = HappyPack.ThreadPool({
        size: os.cpus().length
    });

/**
 * 基础公共Webpack打包配置
 * @type {Object}
 */
let clientConfig = {
    name: 'normal',

    // 上下文位置
    context: path.resolve(__dirname, '../'),

    mode: process.env.NODE_ENV,

    // 启用sourceMap
    devtool: 'cheap-module-source-map',

    // 文件入口配置
    entry: {
        home: './public/static/src/js/home',
        message: './public/static/src/js/message',
        homeClient: './public/static/src/js/client/home',
        messageClient: './public/static/src/js/client/message'
    },

    // 文件输出配置
    output: {
        // 输出所在目录
        path: path.resolve(__dirname, '../public/static/dist/js/'),
        publicPath: '/public/static/dist/js/',
        // 开发环境使用热更新，方便编译，可以直接不用hash
        filename: '[name].js' + (isProduction ? '?[chunkhash:8]' : ''),
        jsonpFunction: `someJF`
    },

    // 模块使用外部定义
    externals: {
        jquery: 'window.$'
    },

    // 性能相关配置
    performance: {
        maxAssetSize: 760 * 1024,
        maxEntrypointSize: 500 * 1024
    },

    // 合并优化方式
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
            })
        ],
        concatenateModules: false,
        // 设为true会导致lint的检查输出不到文件中
        noEmitOnErrors: false
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
                    publicPath: '/public/static/dist/js/' + '../',
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
                    publicPath: '/public/static/dist/js/' + '../',
                }
            }],
        }, {
            test: /\.css$/,
            // 提取CSS文件
            loaders: [
                // 如果配置成不提取，则此类文件使用style-loader插入到<head>标签中
                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                'happypack/loader?id=css'
            ]
        }, {
            test: /\.scss$/,
            // 编译Sass文件 提取CSS文件
            loaders: [
                // 如果配置成不提取，则此类文件使用style-loader插入到<head>标签中
                isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                'happypack/loader?id=scss'
            ]
        }, {
            test: /\.jsx?$/,
            // 编译js或jsx文件，使用babel-loader转换es6为es5
            exclude: /node_modules/,
            loader: 'happypack/loader?id=js'
        }, {
            test: /\.html$/,
            loader: 'happypack/loader?id=html'
        }]
    },

    // 插件配置
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, '../public/static/dist/')]),
        new webpack.HashedModuleIdsPlugin({
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 10
        }),
        new TimeFixPlugin(),
        new WebpackBuildNotifierPlugin({
            title: 'webpack.client',
            suppressSuccess: false,
            suppressCompileStart: false,
            suppressWarning: false,
            activateTerminalOnError: true
        }),
        new MiniCssExtractPlugin({
            filename: '../css/[name].css?[contenthash:8]'
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
        }),

        new HtmlWebpackPlugin({
            template: './views/home/home_src.html',
            filename: '../../../../views/home/home.html',
            chunks: ['home'],
            inject: false,
            alwaysWriteToDisk: true
        }),

        new HtmlWebpackPlugin({
            template: './views/message/message_src.html',
            filename: '../../../../views/message/message.html',
            chunks: ['message'],
            inject: false,
            alwaysWriteToDisk: true
        }),

        new HtmlWebpackPlugin({
            template: './views/homeClient/home_src.html',
            filename: '../../../../views/homeClient/home.html',
            chunks: ['homeClient'],
            inject: false,
            alwaysWriteToDisk: true
        }),

        new HtmlWebpackPlugin({
            template: './views/messageClient/message_src.html',
            filename: '../../../../views/messageClient/message.html',
            chunks: ['messageClient'],
            inject: false,
            alwaysWriteToDisk: true
        }),

        new HtmlWebpackHarddiskPlugin(),

        // 定义变量，此处定义NODE_ENV环境变量，提供给生成的模块内部使用
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
};

// 打包模块分析
if (process.argv.includes('--analysis')) {
    clientConfig.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: require('find-free-port-sync')(),
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
    }));
}

module.exports = clientConfig;
