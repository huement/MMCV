///     ________         __     ______              __
///    |  |  |  |.-----.|  |--.|   __ \.---.-.----.|  |--.
///    |  |  |  ||  -__||  _  ||    __/|  _  |  __||    <
///    |________||_____||_____||___|   |___._|____||__|__|
///    ---------------------------------------------------
///

const webpack = require('webpack');
const path = require('path');
const resolve = require('path').resolve;
//onst ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

module.exports = {

    mode: 'production',

    entry: {
        main: ['./source/js/code.js.es6'],
        styles: './source/style/styles.css.scss'
    },

    resolve: {
        modules: [
            __dirname + './source/js',
            __dirname + './source/style',
            __dirname + './node_modules',
            './node_modules'
        ],
        extensions: ['.js', '.es6', '.css', '.sass', '.scss']
    },

    output: {
        path: __dirname + '/.tmp/dist',
        filename: './source/js/[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    query: {
                        babelrc: false,
                        presets: [["es2015", { modules: true }], "react", "stage-3"],
                      }
                },

            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 }},
                    'postcss-loader'
                ]
            }, {
                test: /\.(sa|sc)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
        // inside your code for any environment checks; UglifyJS will automatically
        // drop any unreachable code.
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "./build/style/[name].css",
            chunkFilename: "./build/style/[id].css"
        })
    ]
};

// Load SASS Vars from JSON file
// {
//   loader: "@epegzz/sass-vars-loader",
//   options: {
//     syntax: 'sass',
//     files: [
//       path.resolve(__dirname, 'data/sass-vars.json')
//     ]
//   }
// }
