const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"),
    output: { 
      path: path.resolve(__dirname, "build"), 
      filename: "bundle.js" 
    },
    mode: process.env.NODE_ENV,
    devServer: { 
      compress: true,
      port: 8080,
      proxy: {
        '/' : 'http://localhost:3000'
      }
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                  }
                }
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            { 
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"] 
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
    ],
};