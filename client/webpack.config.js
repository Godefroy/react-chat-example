const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
}

const common = {
    entry: {
        // react-hot-loader has to run before app!
        app: ['react-hot-loader/patch', PATHS.app],
    },
    output: {
        path: PATHS.build,
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Don't refresh if hot loading fails. If you want
        // refresh behavior, set hot: true instead.
        hotOnly: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: options.host || '0.0.0.0';
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: process.env.HOST, // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: HtmlWebpackTemplate,
            title: 'Discord-like',
            appMountId: 'app', // Generate #app where to mount
            mobile: true, // Scale page on mobile
            inject: false, // html-webpack-template requires this to work
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: PATHS.app,
                //exclude,
                loader: 'babel-loader',
                options: {
                    // Enable caching for improved performance during
                    // development.
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., { cacheDirectory: '<path>' }
                    cacheDirectory: true,
                },
            },
            {
                test: /\.css(\?|$)/,
                loaders: ['style-loader', 'css-loader?sourceMap']
            },
            { test: /\.woff(\?|$)/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?|$)/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?|$)/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?|$)/, loader: 'file-loader' },
            { test: /\.svg(\?|$)/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
        ],
    },
}

module.exports = function (env) {
    process.env.BABEL_ENV = env
    return common
}