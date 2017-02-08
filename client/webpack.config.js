const path = require('path')
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
    plugins: [
        new HtmlWebpackPlugin({
            template: HtmlWebpackTemplate,
            title: 'Discord-like',
            appMountId: 'app', // Generate #app where to mount
            mobile: true, // Scale page on mobile
            inject: false, // html-webpack-template requires this to work
        }),
    ],
    module: {
        rules: [
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
        ],
    },
}

module.exports = function (env) {
    process.env.BABEL_ENV = env
    return common
}