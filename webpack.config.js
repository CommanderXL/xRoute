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

module.exports ={
    //2个打包的入口文件
    //components是自身写的组件
    //还可以打包通过npm安装的模块
    entry: path.join(__dirname, 'src/index.js'),
   /* entry: {
        app: path.join(__dirname, 'src/index.js'),
        //style: path.join(__dirname, 'src/lib/index.less'),
        components: ['./src/components/index.js'],
        //publicPath: '/dist/'
        //vendor: Object.keys(pkg.dependencies)
    },*/
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
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
        noParse: [/picker.min/],
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
                exclude: /node_modules/,
                loader: 'babel'
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
        /*new HtmlWebpackPlugin({
            title: '司机注册',
            template: './dist/assets/index.html',
            filename: path.join(__dirname, 'dist/test.html')    //输出html文件的位置
        }),*/
        new DashboardPlugin(),
        //new ExtractTextPlugin('../css/style.css'),                     
        new ExtractTextPlugin('style.css'),     //将引入的样式文件单独抽成style.css文件并插入到head标签当中
        //new webpack.optimize.CommonsChunkPlugin('components', 'components.js')
    ]
}