/**
 * NMG-workflow v0.0.9
 * https://github.com/xiaoyaojones/generator-nmg
 * @xiaoyaojones <xiaoyaojones@gmail.com>
 */

module.exports = function(grunt) {
    'use strict';

    var options = {
        'tmp': 'tmp/', 
        'source': 'source/',
        'dev': 'dev/',
        'dist': 'dist/'
    };

    // time-grunt 初始化
    require('time-grunt')(grunt);

    // Grunt 配置初始化
    grunt.initConfig({

        // 讀取 package.json 依賴
        pkg: grunt.file.readJSON('package.json'),

        // Less 編譯 CSS
        less: {
            // less 分支 -> 開發向
            dev: {
                files: [{
                    expand: true, // 啟用動態擴展
                    cwd: options.source + 'css/', // CSS 文件源的文件夾
                    src: ['*.less', '!*.import.less'], // 匹配規則
                    dest: options.dev + 'css/', //導出 CSS 的路徑地址
                    ext: '.css' // 導出的 CSS 後綴名
                }],
                options: {
                    yuicompress: false // 開啟 YUI CSS 壓縮 (http://yui.github.io/yuicompressor/)
                }
            },
            // less 分支 -> 發佈向
            release: {
                files: [{
                    expand: true, //啟用動態擴展
                    cwd: options.source + 'css/', // CSS 文件源的文件夾
                    src: ['*.less', '!*.import.less'], // 匹配規則
                    dest: options.dist + 'css/', //導出 CSS 和雪碧圖的路徑地址
                    ext: '.css' // 導出的 CSS名
                }],
                options: {
                    yuicompress: true // 開啟 YUI CSS 壓縮 (http://yui.github.io/yuicompressor/)
                }
            }
        },


        // CSS 壓縮 (https://github.com/gruntjs/grunt-contrib-cssmin)
        cssmin: {
            min: {
                files: [{
                    expand: true,
                    cwd: options.dist + 'css',
                    src: ['**.css'],
                    dest: options.dist + 'css',
                    ext: '.css'
                }]
            }
        },

        // 自動合併生成雪碧圖
        sprite: {
            options: {
                // sprite背景圖源文件夾，只有匹配此路徑才會處理，默認images/slice/
                imagepath: options.tmp + 'slice',
                // 雪碧圖輸出目錄，注意，會覆蓋之前文件！默認 images/
                spritedest: options.source + 'images/',
                // 替換後的背景路徑，默認 ../images/
                spritepath: '../images/',
                imagepath_map: null,
                // 各圖片間間距，如果設置為奇數，會強制+1以保證生成的2x圖片為偶數寬高，默認 0
                padding: 2,
                // 是否以時間戳為文件名生成新的雪碧圖文件，如果啟用請注意清理之前生成的文件，默認不生成新文件
                newsprite: false,
                // 給雪碧圖追加時間戳，默認不追加
                spritestamp: true,
                // 在CSS文件末尾追加時間戳，默認不追加
                cssstamp: false,
                // 默認使用二叉樹最優排列算法
                algorithm: 'binary-tree',
                // 默認使用`pngsmith`圖像處理引擎
                engine: 'pngsmith'
            },
            autoSprite: {
                files: [{
                    //啟用動態擴展
                    expand: true,
                    // css文件源的文件夾
                    cwd: options.tmp + 'slice/',
                    // 匹配規則
                    src: '*.css',
                    // 導出css和sprite的路徑地址
                    dest: options.source + 'css/',
                    // 導出的css名
                    ext: '.sprite.css'
                }]
            }
        },


        // 複製文件夾操作
        copy: {

            // 移動jquery庫到lib目錄
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: ['**'],
                    dest: 'lib/jquery/dist/'
                }]
            },
            
            // 移動slice/ 到tmp/ 供下一步的合併雪碧圖task 使用
            slice: {
                files: [{
                    expand: true,
                    cwd: options.source + 'slice/',
                    src: ['**'],
                    dest: options.tmp + 'slice/'
                }]
            },

            //測試向
            //移動 html -> dev/
            html: {
                files: [{
                    expand: true,
                    cwd: options.source,
                    src: ['**.html'],
                    dest: options.dev
                }]
            },

            //移動 css -> dev/css/
            css: {
                files: [{
                    expand: true,
                    cwd: options.source + 'css/',
                    src: ['**.css', '!*.sprite.css', '!*.min.css'],
                    dest: options.dev + 'css/'
                }]
            },

            //移動 images -> dev/images/
            images: {
                files: [{
                    expand: true,
                    cwd: options.source + 'images/',
                    src: ['**'],
                    dest: options.dev + 'images/'
                }]
            },

            //移動 js -> dev/js/
            script: {
                files: [{
                    expand: true,
                    cwd: options.source + 'js/',
                    src: ['**'],
                    dest: options.dev + 'js/'
                }]
            },

            //移動 data -> dev/data/
            data: {
                files: [{
                    expand: true,
                    cwd: options.source + 'data/',
                    src: ['**'],
                    dest: options.dev + 'data/'
                }]
            },

            // copy 分支 -> 發佈向
            release: {
                files: [{
                    expand: true,
                    cwd: options.dev + 'images/',
                    src: ['**'],
                    dest: options.dist + 'images/'
                }, {
                    expand: true,
                    cwd: options.dev + 'data/',
                    src: ['**'],
                    dest: options.dist + 'data/'
                }, {
                    expand: true,
                    cwd: options.dev + 'js/',
                    src: ['**'],
                    dest: options.dist + 'js/'
                }, {
                    expand: true,
                    cwd: options.dev,
                    src: ['*.html'],
                    dest: options.dist
                }]
            }
        },

        // 檢測 文件/代碼 變動事件
        watch: {
            less:{
                files: [
                    options.source + 'css/*.less'
                ],
                tasks: ['less:dev']
            }, css: {
                files: [
                    options.source + 'css/*.css'
                ],
                tasks: ['copy:css']
            }, script: {
                files: [
                    options.source + 'js/**'
                ],
                tasks: ['jshint', 'copy:script'],
                options: {
                    spawn: false,
                }
            }, html: {
                files: [
                    options.source + '*.html'
                ],
                tasks: ['copy:html']
            }, images: {
                files: [
                    options.source + 'images/*'
                ],
                tasks: ['copy:images']
            }, data: {
                files: [
                    options.source + 'data/*'
                ],
                tasks: ['clean:data', 'copy:data']
            }, sprites: {
                files: [
                    options.source + 'slice/**'
                ],
                tasks: ['sprite-img', 'less:dev']
            }
        },

        jshint: {
            all: {
                src: [options.source + 'js/**']
            },
            options: {
                globals: {
                    jQuery: true
                }
            }
        },


        // 清理臨時目錄
        clean: {
            // 清理tmp目錄
            tmp: [options.tmp],
            // 清理data目錄
            data: [options.dev + 'data'],
            // clean 開發向
            dev: [options.tmp, options.dev, options.dist],
            // clean 發佈向
            release: [options.tmp, options.dist]
        },

    });

    // 加載官方插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');


    //檢查是否存在外部插件
    var bIsSelected = {
        'grunt_css_sprite': grunt.file.exists('node_modules/grunt-css-sprite/Gruntfile.js')
    };

    // 加载外部插件
    if ( !! bIsSelected.grunt_css_sprite) {
        grunt.loadNpmTasks('grunt-css-sprite')
    };

    /* 任務註冊開始 */
    // == 默認工作流 ==
    // 輸出目錄為：../dist/(css/ + images/ + slice/)
    // 注：包括清理舊dev目錄 + 雪碧圖拼合 + jshint + less編譯 + 所需文件移動到dev目錄 + 開發期間watch
    grunt.registerTask('default', ['clean:dev', 'sprite-img', 'jshint', 'less:dev', 'copy-dev', 'watch']);

    // == 完整發佈流 ==
    // 輸出目錄為：../dist/(css/ + images/ + sprite/)
    // 注：包括Less 編譯+壓縮+雪碧圖拼合，僅執行1次流，不含(文件變動watch)
    grunt.registerTask('all', ['clean:release','sprite-img', 'clean:tmp', 'less:release', 'cssmin', 'copy:release']);

    // == dev目錄移動操作 ==
    grunt.registerTask('copy-dev',['copy:html', 'copy:css', 'copy:images', 'copy:data', 'copy:script']);

    // 定義別名 `grunt sprite-img`
    // 注：拷貝移動slice -> 合併雪碧圖sprite
    grunt.registerTask('sprite-img', ['clean:tmp', 'copy:slice', 'sprite']);

}