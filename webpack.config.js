var path = require('path'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    WebpackMd5Hash = require('webpack-md5-hash'),
    //TestPlugin = require('./plugins/test'),
    precss = require('precss'),
    autoprefixer = require('autoprefixer');

var PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
}

var PKG = require('./package.json');
var TARGET = process.env.npm_lifecycle_event;   //获取当前正在运行的脚本名称

var isProduction = function() {
    return process.env.NODE_ENV === 'production';
}



module.exports ={
    entry: {
        'index': path.join(__dirname, 'src/index.js')
    },
    //filename是主入口文件的名称,即对应的entry
    //chunkFilename对应的是非主入口文件的名称,chunk
    output: {
        path: PATHS.dist,
        publicPath: '/static/taxi-driver/',    //publicPath 的话是打包的时候生成的文件链接,如果是在生产环境当然是用服务器地址，如果是开发环境就是用本地静态服务器的地址
        filename: 'js/register/[name].js',
        chunkFilename: 'js/register/[name].js',
        //TODO: build文件中加入hash值
    },
    //生成source-map文件
    devtool: isProduction ? null : 'source-map',
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|picker.min.js/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less!postcss')
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss')
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    postcss: function() {
        return [precss, autoprefixer];
    },
    resolve: {
        alias: {
            src: path.join(__dirname, 'src'),
            modules: path.join(__dirname, 'src/modules'),
            lessLib: path.join(__dirname, 'src/lib/less'),  
            jsLib: path.join(__dirname, 'src/lib/js'),
            components: path.join(__dirname, 'src/components')
        },
        extensions: ['', '.js', '.less', '.html', '.json', '.css'],
    },
    plugins: [
        new WebpackMd5Hash(),
        new HtmlWebpackPlugin({
            title: '认证资料',
            template: './dist/assets/info.html',
            inject: 'body',
            filename: 'pages/register/index.html'   //输出html文件的位置
        }),
        //new DashboardPlugin(),
        new ExtractTextPlugin('css/register/style.css'),     //将引入的样式文件单独抽成style.css文件并插入到head标签当中,带有路径时,最后打包
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/register/common.js'
        }),
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            comments: false,
            except: ['exports', 'require'] //避免关键字被混淆
        }),*/
        //new TestPlugin()
    ]
}