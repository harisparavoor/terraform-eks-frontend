var path = require('path');

// Use environment variable with proper fallback
const backendUrl =
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
console.log('Backend URL:', backendUrl);

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'eval-source-map',
    cache: true,
    mode: 'development',
    resolve: {
        alias: {
            'stompjs': __dirname + '/node_modules' + '/stompjs/lib/stomp.js',
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: backendUrl,
                changeOrigin: true
            },
            '/ws': {
                target: backendUrl.replace('http', 'ws'),
                ws: true,
                changeOrigin: true
            }
        },
        port: 3000,
        host: '0.0.0.0',  // Important for Docker/ECS
        hot: true,
        allowedHosts: 'all'  // For development flexibility
    }
};
