module.exports = {
    entry: {
        app: './source/index.js',
    },
    output: {
        path: `${__dirname}/build`,
        filename: './simple-events.js',
    },
    resolve: {
        extensions: ['.js'],
    },
    module: {
        loaders: [],
    },
    plugins: [],
};