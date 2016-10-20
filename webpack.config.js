var path = require('path'),
    DashboardPlugin = require('webpack-dashboard/plugin');

module.exports ={
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist/js'),
        filename: 'bundle.js'
    },
    //生成source-map文件
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: '/\.less$/',
                loader: 'style!css!less'
            },
            {
                test: '/\.html$/',
                loader: 'raw'
            }
        ]
    },
    resolve: {
        alias: {
            modules: path.join(__dirname, 'src/modules')  
        },
        extensions: ['', '.js', '.less', '.html'],
    },
    plugins: [
        new DashboardPlugin()
    ]
}