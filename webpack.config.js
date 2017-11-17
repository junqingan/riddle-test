var os = require('os');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');
var UglifyJsParallelPlugin = require('webpack-uglify-parallel'); // 开启happypack的多线程池
var Es3ifyWebpackPlugin = require('es3ify-webpack-plugin'); //采用了多核并行压缩的方式来提升压缩速度
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var GlobalHandlerPrefix = '';

//获取目录路径
var getDir = function(dir) {
    return path.resolve(__dirname, dir);
}

//遍历目录路径生成入口配置
var setEntryObj = function(dir) {
    var entryObj = {};
    var getEntry = function(dir) {
        fs.readdirSync(dir).map(function(item) {
            if (item.indexOf('.js') > 0) {
                entryObj[path.basename(item, '.js')] = dir + '\/' + item;
            }
        });
    }(dir);
    return entryObj;
}

var config = {
    //文件入口配置
    entry: setEntryObj(getDir(pkg.src)),
    //文件输出配置
    output: {
        path: getDir(pkg.dist),
        filename: './js/[name].js',
        library: GlobalHandlerPrefix + '[name]',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    // devtool: process.env.NODE_ENV == 'production' ? false : "cheap-source-map",
    //
    module: {
        rules: [{
            test: /\.less$/,
            use: ExtractTextPlugin.extract({
                use: [{
                        loader: process.env.NODE_ENV == 'production' ? 'css-loader?sourceMap=false&url=false&minimize=true' : 'css-loader?sourceMap=true&url=false'
                    },
                    {
                        loader: "less-loader"
                    }
                ]
            })
        }, {
            test: /.js$/,
            enforce: 'post', // post-loader处理
            loader: 'es3ify-loader'
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            ignore: ['*.less', '*.md'],
            copyUnmodified: true,
            from: './src/',
            to: '../dist/'
        }]),
        new Es3ifyWebpackPlugin(),
        new webpack.BannerPlugin({
            banner: ['/**',
                '* ...',
                '* @author ' + pkg.author,
                '* ' + new Date(),
                '*/'
            ].join('\n'),
            raw: true,
            entryOnly: true
        }),
        new ExtractTextPlugin({
            filename: "./css/[name].css",
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],
    //解决方案配置
    resolve: {
        extensions: ['.js', '.json', '.css', '.less'],
        modules: [getDir(pkg.src), 'node_modules']
    }
}
module.exports = function() {
    if (process.env.NODE_ENV == 'production') {
        var pop = config.plugins.pop();
        config.plugins = config.plugins.concat([
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            }),
            new UglifyJsParallelPlugin({
                workers: os.cpus().length,
                mangle: true,
                comments: false,
                compressor: {
                    properties: false,
                    warnings: false
                }
            }),
            pop
        ]);
    }
    return config;
}