const path = require('path');
const uglifyJS = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var website = {
    'publicPath': 'http://127.0.0.1:8081/'
}

module.exports = {
    entry: {
        entry: "./src/entry.js",
        entry2: "./src/entry2.js"
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].js",
        publicPath: website.publicPath // 公用路径
    },
    module: {
        rules: [
            {
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },{
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit: 500, // 小于5000字节的图片生成base64格式
                        outputPath: "images/"
                    }
                }]
            },{
                test: /\.(html|htm)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new uglifyJS(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes:true
            },
            hash: true,
            template: './src/index.html'
        }),
        new ExtractTextPlugin("css/index.css")
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        host: "127.0.0.1",
        port: 8081
    }
}