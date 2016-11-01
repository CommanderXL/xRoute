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
        'js/index': path.join(__dirname, 'src/index.js'),
        //'js/base': ['./src/lib/js/util.js', 'whatwg-fetch'],
        'js/components': ['./src/components/index.js'],
        'js/lib': ['./src/lib/js/index.js'],
        //'js/components': ['./src/components/city-select/index.js', './src/components/time-select/index.js', './src/components/uipicker/picker.min.js']
    },
   /* entry: {
        app: path.join(__dirname, 'src/index.js'),
        //style: path.join(__dirname, 'src/lib/index.less'),
        components: ['./src/components/index.js'],
        //publicPath: '/dist/'
        //vendor: Object.keys(pkg.dependencies)
    },*/
    output: {
        path: PATHS.dist,
        filename: '[name].js'
        //TODO: build文件中加入hash值
    },
    //生成source-map文件
    devtool: 'source-map',
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
            modules: path.join(__dirname, 'src/modules'),
            cssLib: path.join(__dirname, 'src/lib/css'),  
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
            filename: 'pages/index.html'   //输出html文件的位置
        }),
        new DashboardPlugin(),
        new ExtractTextPlugin('css/style.css'),     //将引入的样式文件单独抽成style.css文件并插入到head标签当中,带有路径时,最后打包
       /* new webpack.optimize.CommonsChunkPlugin('js/components', 'js/components.js'),
        new webpack.optimize.CommonsChunkPlugin('js/lib', 'js/lib.js'),*/
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js',
            minChunks: 3
        })
    ]
}