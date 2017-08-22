const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');


let config = {
    entry:'./src/index.js',
    output: {
        path:path.resolve(__dirname,'./public'),
        filename:'output.js'
    },
    resolve : {
        extensions : ['.js','.jsx','.json','.scss','.css','.jpeg','.jpg','.gif','.png'], //Automatically resolves certain extensions
        alias :{ //Create aliases
          images: path.resolve(__dirname, 'src/asssets/images')
        }
    },
  module: {
    rules: [
     {
       test:/\.js$/, //file ending with .js 
       exclude: /node_modules/, //exclude the node_modules directory
       loader: "babel-loader" //use this (babel-core) loader 
     },
     {
         test:/\.scss$/, //files ending with .scss
         use : ExtractTextWebpackPlugin.extract({ //call our plugin with extract method
           use: ['css-loader','sass-loader'], // use these loaders
           fallback: 'style-loader'  //fallback for any css not extracted
         })//end extract
     },
     {
         test:/\.jsx$/, //all files ending with .jsx
         loader:'babel-loader', //use the babel loader for all .jsx files 
         exclude:/node_modules/ //exclude searching for files int the node_modules directory
     },
     {
         test:/\.(jpe?g|png|gif|svg)$/i,
         loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]',{
             loader:'image-webpack-loader',
             query: {
                 mozjpeg: {
                     progressive : true,
                 },
             gifsicle:{
                 interlaced : false,
             },
             optipng:{
                 optimizationLevel : 4,
             },
             pngquant : {
                 quality : '75-90',
                 speed: 3,
             },
            },
         }],
         exclude: /node_modules/,
         include: __dirname,
     },
   ]//end rules 
 },
 plugins: [
     new ExtractTextWebpackPlugin('styles.css')//call the ExtractTextWebpackPlugin constructor and name our css file
 ],
 devServer: {
     contentBase: path.resolve(__dirname, './public'),
     historyApiFallback: true,
     inline: true,
     open: true
 },
  devtool: 'eval-source-map'
} 
module.exports = config;

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin(), // call the uglify plugin
        new OptimizeCSSAssets()
    );
}