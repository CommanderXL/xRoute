var path = require('path'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

var PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist')
}

var PKG = require('./package.json');
var TARGET = process.env.npm_lifecycle_event;   //获取当前正在运行的脚本名称

var isProduction = function() {
    return process.env.NODE_ENV === 'production';
}

//TODO  [name]-[contenthash:8].css
//TODO  样式文件单独抽离出来打包.文件名带上路径信息
/**
 * 打包策略：
 *  
 *  工具打包成一个文件
 *  组件打包成一个文件
 * 
 */

module.exports ={
    //2个打包的入口文件
    //components是自身写的组件
    //还可以打包通过npm安装的模块
    //entry: path.join(__dirname, 'src/index.js'),
    entry: {
        'index': path.join(__dirname, 'src/index.js'),
        //'js/base': ['./src/lib/js/util.js', 'whatwg-fetch'],
        'components': ['./src/components/index.js'],
        'lib': ['./src/lib/js/index.js'],
        //'js/components': ['./src/components/city-select/index.js', './src/components/time-select/index.js', './src/components/uipicker/picker.min.js']
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
        //noParse: [/node_modules/],
       /* preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|picker.min.js$|dialog.js$|imgResize.js$/,
                loader: 'eslint'
            }
        ],*/
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules|picker.min.js/,
                loader: 'babel'
                //添加对于uipicker过滤的处理
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            },
            {
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css')
            },
            {
                test: /\.json$/,
                loader: 'json'
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
        extensions: ['', '.js', '.less', '.html', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '认证资料',
            template: './dist/assets/info.html',
            inject: 'body',
            filename: 'pages/register/index.html'   //输出html文件的位置
        }),
        new DashboardPlugin(),
        new ExtractTextPlugin('css/register/style.css'),     //将引入的样式文件单独抽成style.css文件并插入到head标签当中,带有路径时,最后打包
       /* new webpack.optimize.CommonsChunkPlugin('js/components', 'js/components.js'),
        new webpack.optimize.CommonsChunkPlugin('js/lib', 'js/lib.js'),*/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/register/common.js',
            minChunks: 3
        })
    ]
}