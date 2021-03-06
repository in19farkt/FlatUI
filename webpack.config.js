
const NODE_ENV = process.env.NODE_ENV ||'development';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        main: './main.js'
    },

    output: {
        path: __dirname + '/public',
        filename: 'main.js'
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new ExtractTextPlugin('[name].css', {allChunks: true}),
        new HtmlWebpackPlugin({filename: 'index.html', template: './main.pug'}),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.styl', '.pug']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        modulesTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {

        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [
                /node_modules/,
                /frontend\/plugins\/.*\.js$/
            ]
        }, {
            test: /\.pug$/,
            loader: 'pug'
        }, {
            test: /\.css$/,
            loader: 'style!css' //!autoprefixer?browsers=last 2 versions'
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract('css!stylus?resolve url') //!autoprefixer?browsers=last 2 versions'
        }, {
            test: /\.(ico|png|jpg|svg|ttf|eot|woff|woff2)$/,
            loader: 'file?name=[path][name].[ext]'
        }],

        noParse: /node_modules\/jquery/
    },

    devServer: {
        contentBase: './public'
    }
};