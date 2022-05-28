const HtmlWebPack= require('html-webpack-plugin')
const MiniCssExtract = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizer= require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports={
    mode: 'development',

    output:{
        clean:true,
        filename:'main.[contenthash].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader:'html-loader',
                options: {
                    sources: false
                }
            },
            {
                test: /\.css$/,
                exclude: /style.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /style.css$/,
                use: [MiniCssExtract.loader, 'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                //Este Codigo que sigue es para evitar que haga un Hash de la imagen y le coloque cualquier Nombre hasheado
                options: {
                    name: '[path][name].[ext]',
                  },
            }
        ]
    },
    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins:[
        new HtmlWebPack({
            title: 'Mi WebPack App',
            // filename: 'index.html',
            template:'./src/index.html'
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css',
            ignoreOrder:false
        }),

        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/' }
            ]
        })
    ],
}

