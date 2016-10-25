var path = require('path'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports ={
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    //生成source-map文件
    devtool: 'eval-source-map',
    module: {
        /*preLoaders: [
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
            jsLib: path.join(__dirname, 'src/lib/js')
        },
        extensions: ['', '.js', '.less', '.html', '.json'],
    },
    plugins: [
        new DashboardPlugin(),
        new ExtractTextPlugin('style.css')
    ]
}