������ package.json                 
������ README.md                    
������ gulpfile.js                  // gulp �����ļ�
������ webpack.config.js            // webpack �����ļ�
������ doc                          // doc  Ŀ¼������Ӧ���ĵ�
������ test                         // test Ŀ¼�������ļ�
������ dist                         // dist Ŀ¼�����ÿ���ʱ�����ʱ����ļ�
������ bin                          // bin  Ŀ¼������ prodcution ����ļ�
������ mocks                        // ���� mock ���  
������ src                          // Դ�ļ�Ŀ¼
��   ������ html                     // html Ŀ¼ 
��   ��   ������ index.html
��   ��   ������ page2.html
��   ������ js                       // js Ŀ¼ 
��   ��   ������ common               // ����ҳ��Ĺ������򣬿��ܰ��������������������
��   ��   ������ home                 // home ҳ�� js Ŀ¼
��   ��   ��   ������ components
��   ��   ��   ��   ������ App.js
��   ��   ��   ������ index.js         // ÿ��ҳ�����һ����ڣ�ͳһΪ index.js
��   ��   ������ page2                // page2 ҳ�� js Ŀ¼
��   ��   ��   ������ components
��   ��   ��   ��   ������ App.js
��   ��   ��   ������ index.js
��   ������ style                    // style Ŀ¼
��       ������ common               // ������ʽ����
��       ��   ������ varables.less    // �����������
��       ��   ������ index.less       // ������ʽ���
��       ������ home                 // home ҳ����ʽĿ¼    
��       ��   ������ components       // home ҳ�������ʽĿ¼
��       ��   ��   ������ App.less 
��       ��   ������ index.less       // home ҳ����ʽ���
��       ������ page2                // page2 ҳ����ʽĿ¼
��       ��   ������ components       
��       ��   ��   ������ App.less
��       ��   ������ index.less       
������ vendor                         // ��������
��   ������ bootstrap
������ ������ jquery


1 ��װ��������

Ŀ¼�����ù��󣬽�����ĿĿ¼����װ webpack ��gulp��react ��صĻ�������

// react ���

$ npm install react react-dom --save


// webpack ���

$ npm install webpack-dev-server webpack --save-dev
$ npm install babel-loader babel-preset-es2015 babel-preset-stage-0 babel-preset-react babel-polyfill --save-dev

//JS������װ

$ npm install eslint eslint-loader eslint-plugin-react --save-dev

// gulp ���

$ npm install gulpjs/gulp-cli -g
$ npm install gulpjs/gulp.git#4.0 --save-dev
$ npm install gulp-util del gulp-rename gulp-less gulp-connect connect-rest@1.9.5  --save-dev
$ npm install gulp-data gulp-autoprefixer gulp-cached gulp-remember gulp.spritesmith gulp-jade gulp-minify-css --save-dev

PS�� ��gulp.git4.0��connect-rest@1.9.5��װ���ϣ��밲װgit������git��bin��·����ӵ�ϵͳ�����С�



