const path = require('path');
const webpack = require('webpack');
const webpackCommonsChunkPluginConfig = new webpack.optimize.CommonsChunkPlugin({ //избегаем дублирование модулей в коде,
    name: 'commons',
    filename: 'common.js',
    minChunks: 2, // модули которые загружаются 2 или более раза
    allChunks: true
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});
const webpackDefinePlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

var entry = null;
var output = null;

if(process.env.NODE_ENV) {
    entry = [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/index.js',
    ];
    output = {
        filename: 'index_bundle.js'
    }
} else {
    entry = [
        './src/index.js',
    ];
    output = {
        path: path.resolve('./build'),
        filename: 'index_bundle.js',
        publicPath : '/build/'
    }
}


module.exports = {
    //context: path.resolve(__dirname, './src'),

    entry: entry,
    output: output,

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'react-hot-loader/webpack',
                    {
                        loader: 'babel-loader',
                        options: { presets: ['es2015', 'react', 'stage-0'] },
                    }
                ],
                exclude: [
                    /node_modules/ // babel не пропускает через себя эту дир.
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'style-loader',
                        options: { modules: true }
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'resolve-url-loader', 'less-loader' ]
            },
            {
                test: /\.(gif|jpg|png)/i,
                exclude: /node_modules/,
                use: ["url-loader?name=[path][name].[ext]"]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ["url-loader?limit=1000&mimetype=application/font-woff&name=[path][name].[ext]"]
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ["file-loader?name=[path][name].[ext]"]
            },
        ],
    },

    plugins: [
        HtmlWebpackPluginConfig,
        webpackCommonsChunkPluginConfig,
        HotModuleReplacementPlugin,
        webpackDefinePlugin,
    ],

    resolve: {
        modules: [path.resolve(__dirname, './src'), 'node_modules'] // избегаем ошибок при импортах, сначала смотрим исходную дир., а затем модули.
    },

    //devServer: {
    //    //contentBase: path.resolve(__dirname, './client'),
    //    port: 8000,
    //    //publicPath: './',
    //},

};