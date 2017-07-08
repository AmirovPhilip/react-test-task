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
const HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
    //context: path.resolve(__dirname, './src'),
    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://0.0.0.0:3000',
        'webpack/hot/only-dev-server',
        './src/index.js',
    ],
    output: {
        path: path.resolve('build'),
        filename: 'index_bundle.js',
    },

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
                        loader: 'css-loader',
                        options: { modules: true }
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [ 'style-loader', 'css-loader', 'less-loader' ]
            }
        ],
    },

    plugins: [
        HtmlWebpackPluginConfig,
        webpackCommonsChunkPluginConfig,
        HotModuleReplacementPlugin,
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