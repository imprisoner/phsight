const path = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require("copy-webpack-plugin");
// const {
//     options
// } = require('less')


const PUG_DIR = path.join(__dirname, 'src/pages')
const PUG_PAGES = fs.readdirSync(PUG_DIR).filter(filename => filename.endsWith('.pug'))
console.log(PUG_DIR)
console.log(PUG_PAGES)
module.exports = {
    mode: 'production',
    // mode: 'development',
    context: path.resolve(__dirname, 'src'),
    resolve: {
        extensions: ['.js', '.less'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
    },
    entry: {
        // main: {
        //     import: './main.js',
        //     dependOn: 'shared'
        // },
        // index: {
        //     import: './index.js',
        //     dependOn: 'shared'
        // },
        // photos: {
        //     import: './photos.js',
        //     dependOn: 'shared'
        // },
        // profile: {
        //     import: './profile.js',
        //     dependOn: 'shared'
        // },
        // view: {
        //     import: './view.js',
        //     dependOn: 'shared'
        // },
        // shared: 'jquery',
        main: './main.js',
        index: './index.js',
        photos: './photos.js',
        // profile: './profile.js',
        view: './view.js',
        error: './error.js',
        techworks: './techworks.js',
        authorize: './authorize.js',
        register: './register.js',
        search: './search.js',
        upload: './upload.js',
        settings: './settings.js',
        messages: './messages.js',
        wallet: './wallet.js',
        myprofile: './myprofile.js',
        content: './content.js',
        jobs: './jobs.js'

    },
    // devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        port: 3000
    },
    output: {
        // filename: '[name].[fullhash].js',
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: ''
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css',
            chunkFilename: 'styles_common.css',
        }),
        ...PUG_PAGES.map(page => new HTMLWebpackPlugin({
            template: `${PUG_DIR}/${page}`,
            filename: `./${page}`.replace(/\.pug/, '.html'),
            chunks: [`${page}`.replace(/\.pug/, '')],
            minify: {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: false,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            }
        })),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/assets/img'),
                to: path.resolve(__dirname, 'dist/img'),
                noErrorOnMissing: true,
            }]
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/js/libs'),
                to: path.resolve(__dirname, 'dist/js/libs')
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
            test: /\.less|.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                }
            },

                'css-loader',
                'less-loader',
            ]
        },
        {
            test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/'
                }
            }]
        },
        {
            test: /\.(jpg|png|svg|jpeg|svg|gif)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'icons/'
            }
        }
        ]
    },
    optimization: {
        // runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
        },

    }

}