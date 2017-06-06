├── package.json                 
├── README.md                    
├── gulpfile.js                  // gulp 配置文件
├── webpack.config.js            // webpack 配置文件
├── doc                          // doc  目录：放置应用文档
├── test                         // test 目录：测试文件
├── dist                         // dist 目录：放置开发时候的临时打包文件
├── bin                          // bin  目录：放置 prodcution 打包文件
├── mocks                        // 数据 mock 相关  
├── src                          // 源文件目录
│   ├── html                     // html 目录 
│   │   ├── index.html
│   │   └── page2.html
│   ├── js                       // js 目录 
│   │   ├── common               // 所有页面的共享区域，可能包含共享组件，共享工具类
│   │   ├── home                 // home 页面 js 目录
│   │   │   ├── components
│   │   │   │   ├── App.js
│   │   │   ├── index.js         // 每个页面会有一个入口，统一为 index.js
│   │   ├── page2                // page2 页面 js 目录
│   │   │   ├── components
│   │   │   │   ├── App.js
│   │   │   └── index.js
│   └── style                    // style 目录
│       ├── common               // 公共样式区域
│       │   ├── varables.less    // 公共共享变量
│       │   ├── index.less       // 公共样式入口
│       ├── home                 // home 页面样式目录    
│       │   ├── components       // home 页面组件样式目录
│       │   │   ├── App.less 
│       │   ├── index.less       // home 页面样式入口
│       ├── page2                // page2 页面样式目录
│       │   ├── components       
│       │   │   ├── App.less
│       │   └── index.less       
├── vendor                         // 第三方库
│   └── bootstrap
└── └── jquery


1 安装基础依赖

目录创建好过后，进入项目目录，安装 webpack ，gulp，react 相关的基础依赖

// react 相关

$ npm install react react-dom --save


// webpack 相关

$ npm install webpack-dev-server webpack --save-dev
$ npm install babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save-dev

//JS依赖安装

$ npm install eslint eslint-loader eslint-plugin-react --save-dev

// gulp 相关

$ npm install gulpjs/gulp-cli -g
$ npm install gulpjs/gulp.git#4.0 --save-dev
$ npm install gulp-util del gulp-rename gulp-less gulp-connect connect-rest@1.9.5  --save-dev
$ npm install gulp-data gulp-autoprefixer gulp-cached gulp-remember gulp.spritesmith gulp-jade gulp-minify-css --save-dev

PS： 如gulp.git4.0与connect-rest@1.9.5安装不上，请安装git，并将git中bin的路径添加到系统变量中。



