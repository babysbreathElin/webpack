//var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path"),
    HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        index: "./index",

    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "[name].js"

    },

    module: {
        rules: [
            // {
            //     test: /\.jsx$/,
            //     enforce: "pre",
            //     loader: "eslint-loader"
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react', 'stage-2']

                        }
                    }

                ]
            }
        ]

    },
    context: __dirname,
    devtool: "source-map",
    target: "web",
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules",
            path.resolve(__dirname, "node_modules")
        ],
        // directories where to look for modules
        extensions: [".js", ".json", ".jsx", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `../template/_layout.html`
        }),
        new ExtractTextPlugin({
            filename: "[name].css"
        }),
    ]



};
