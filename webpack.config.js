var path = require('path'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer'),
    InlineWebpackManifest = require('inline-manifest-webpack-plugin');

var PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
}

var PKG = require('./package.json');
var TARGET = process.env.npm_lifecycle_event; //获取当前正在运行的脚本名称

var isProduction = function () {
    return process.env.NODE_ENV === 'production';
}

var cssLoader = [{
        loader: 'css-loader'
    },
    {
        loader: 'postcss-loader'
    }
]


const babelLoaderPlugins = [

];


module.exports = {
    entry: {
        'index': path.join(__dirname, 'src/index.js')
    },
    output: {
        path: PATHS.dist,
        publicPath: '/static/taxi-driver/', //publicPath 的话是打包的时候生成的文件链接,如果是在生产环境当然是用服务器地址，如果是开发环境就是用本地静态服务器的地址
        filename: 'js/register/[name].js',
        chunkFilename: 'js/register/[name].js',
    },
    //生成source-map文件
    devtool: isProduction ? false : 'source-map',
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: cssLoader.concat({
                        loader: 'less-loader'
                    })
                })
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: cssLoader
                })
            },
            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    resolve: {
        alias: {
            src: path.join(__dirname, 'src'),
            modules: path.join(__dirname, 'src/modules'),
            lessLib: path.join(__dirname, 'src/lib/less'),
            jsLib: path.join(__dirname, 'src/lib/js'),
            components: path.join(__dirname, 'src/components')
        },
        extensions: ['.js', '.less', '.html', '.json', '.css'],
    },
    plugins: [
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            title: '认证资料',
            template: './dist/assets/info.ejs',
            inject: 'body',
            filename: 'pages/register/index.html' //输出html文件的位置
        }),
        //new DashboardPlugin(),
        //new ExtractTextPlugin('css/register/style.css'),     //将引入的样式文件单独抽成style.css文件并插入到head标签当中,带有路径时,最后打包
        new ExtractTextPlugin({
            filename: 'css/register/style.css',
            allChunks: true,
            disable: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            //names: ['common', 'manifest'],
            //filename: 'js/register/common.js'
            //name: 'common',
            names: ['common', 'manifest'],
            filename: 'js/register/common.js'
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: [
                            'last 3 version',
                            'ie >= 10',
                        ]
                    })
                ]
            }
        }),
        new InlineWebpackManifest()
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            comments: false,
            except: ['exports', 'require'] //避免关键字被混淆
        }),*/
    ]
}