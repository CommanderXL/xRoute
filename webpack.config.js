var path = require('path'),
    DashboardPlugin = require('webpack-dashboard/plugin'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports ={
    entry: path.join(__dirname, 'src/index.js'),
    /*entry: {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['jsLib/imgResize']
    },*/
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    //生成source-map文件
    devtool: 'source-map',
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
        new DashboardPlugin(),
        new ExtractTextPlugin('style.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '[name].bundle.js',
            //minChunks: 2
        })
    ]
}