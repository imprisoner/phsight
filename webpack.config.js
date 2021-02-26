const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");

const PUG_DIR = path.join(__dirname, 'src/pages')
const PUG_PAGES = fs.readdirSync(PUG_DIR).filter(filename => filename.endsWith('.pug'))

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.less'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    entry: {
        index: './index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000
    },
    output: {
        filename: '[name].[fullhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',

        }),
        ...PUG_PAGES.map(page => new HTMLWebpackPlugin({
            template: `${PUG_DIR}/${page}`,
            filename: `./${page}`.replace(/\.pug/, '.html')
        })),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/img'),
                to: path.resolve(__dirname, 'dist/img'),
                noErrorOnMissing: true,
            }]
        })
    ],
    module: {
        rules: [{
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.less$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'less-loader'
                ]
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
            },
            {
                test: /\.(jpg|png|svg|jpeg)$/,
                loader: 'file-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}