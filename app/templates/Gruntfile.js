/**
 * NMG-workflow v0.0.7
 * https://github.com/xiaoyaojones/generator-nmg
 * @xiaoyaojones <xiaoyaojones@gmail.com>
 */

module.exports = function(grunt) {

    // time-grunt 初始化
    require('time-grunt')(grunt);

    // Grunt 配置初始化
    grunt.initConfig({

        // 讀取 package.json 依賴
        pkg: grunt.file.readJSON('package.json'),

        // Less 編譯 CSS
        less: {
            // 編譯

            // less 分支 -> 開發向
            dev: {
                files: [{
                    expand: true, // 啟用動態擴展
                    cwd: 'source/css/', // CSS 文件源的文件夾
                    src: ['*.less', '!import*.less'], // 匹配規則
                    dest: 'dev/css/', //導出 CSS 的路徑地址
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
                    cwd: 'source/css/', // CSS 文件源的文件夾
                    src: ['*.less', '!import*.less'], // 匹配規則
                    dest: 'dist/css/', //導出 CSS 和雪碧圖的路徑地址
                    ext: '.css' // 導出的 CSS名
                }],
                options: {
                    yuicompress: true // 開啟 YUI CSS 壓縮 (http://yui.github.io/yuicompressor/)
                }
            }
        },

        // CSS 驗證檢查 (https://github.com/gruntjs/grunt-contrib-csslint)
        csslint: {
            options: {
                formatters: [{
                    id: 'junit-xml',
                    dest: 'report/csslint_junit.xml'
                }, {
                    id: 'csslint-xml',
                    dest: 'report/csslint.xml'
                }]
            },
            strict: {
                options: {
                    import: 2
                },
                src: ['dist/css/*.css']
            },
            lax: {
                options: {
                    import: false
                },
                src: ['dist/css/*.css']
            }
        },

        // CSS 壓縮 (https://github.com/gruntjs/grunt-contrib-cssmin)
        cssmin: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'dev/css',
                    src: ['**.css'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },

        // 自動合併生成雪碧圖
        sprite: {
            options: {
                // sprite背景圖源文件夾，只有匹配此路徑才會處理，默認images/slice/
                imagepath: 'tmp/slice/',
                // 雪碧圖輸出目錄，注意，會覆蓋之前文件！默認 images/
                spritedest: 'dev/slice/',
                // 替換後的背景路徑，默認 ../images/
                spritepath: 'images/',
                // 各圖片間間距，如果設置為奇數，會強制+1以保證生成的2x圖片為偶數寬高，默認 0
                padding: 2,
                // 是否以時間戳為文件名生成新的雪碧圖文件，如果啟用請注意清理之前生成的文件，默認不生成新文件
                newsprite: false,
                // 給雪碧圖追加時間戳，默認不追加
                spritestamp: false,
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
                    cwd: 'tmp/slice/',
                    // 匹配規則
                    src: '*.css',
                    // 導出css和sprite的路徑地址
                    dest: 'dev/css/',
                    // 導出的css名
                    ext: '.css'
                }]
            }
        },

        // 时间戳，去缓存
        // https://www.npmjs.org/package/grunt-timestamp
        timestamp: {
            timestamp: {
                files: [{
                    // Use dynamic extend name
                    expand: true,
                    // Open source dir
                    cwd: 'tmp/css',
                    // Match files
                    src: ['*.sprite.css'],
                    // Output files
                    dest: 'tmp/css',
                    // Set extend middle name
                    ext: '.timestamp'
                }],
                options: {
                    // Timestamp display text
                    'timestampName': 'Timetamp',
                    // Date format
                    'timestampFormat': 'yyyy/mm/dd HH:MM:ss',
                    // Add timestamp at the end of the files' content(.css/.js).
                    'timestampType': 'time',
                    // Timestamp type like time(2014/04/02 22:17:07) | md5/sha1/ha256/sha512).
                    'fileEndStamp': true,
                    // Add timestamp at images of CSS style.
                    'cssImgStamp': true,
                    // Rename file name with timestamp inside.
                    'fileNameStamp': true
                }
            }
        },

        // PNG 壓縮(更多配置說明：https://www.npmjs.org/package/grunt-pngmin)
        pngmin: {
            compile: {
                options: {
                    ext: '.png', // 後綴名
                    force: true, // 生成優化後的圖片覆蓋原始圖片
                    iebug: false // 為 IE6 優化圖片，如需要可設置`true`
                },
                files: [{
                    src: ['dev/images/*.png'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'dev/images',
                    src: ['**/*.png'],
                    dest: 'dist/images',
                    ext: '.png'
                }]
            }
        },

        // 複製文件夾操作
        copy: {

            //copy bower_components/jquery -> lib/jquery 開發/發佈向
            jquery: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/jquery/dist/',
                    src: ['*.js'],
                    dest: 'lib/jquery/dist/'
                }]
            },

            // 移動slice/ 到tmp/ 供下一步的合併雪碧圖task 使用
            slice: {
                files: [{
                    expand: true,
                    cwd: 'source/slice/',
                    src: ['**'],
                    dest: 'tmp/slice/'
                }, ]
            },

            // copy 分支 -> 開發向
            dev: {
                files: [{
                    expand: true,
                    cwd: 'source/css/',
                    src: ['**.css', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'dev/css/'
                }, {
                    expand: true,
                    cwd: 'source/images/',
                    src: ['**'],
                    dest: 'dev/images/'
                }, ]
            },

            // copy 分支 -> 發佈向
            release: {
                files: [{
                    expand: true,
                    cwd: 'dev/css/',
                    src: ['*.css', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'dist/css/'
                }, {
                    expand: true,
                    cwd: 'dev/images/',
                    src: ['**'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'dev/slice/',
                    src: ['**.png'],
                    dest: 'dist/slice/'
                }]
            }
        },

        // 檢測 文件/代碼 變動事件
        watch: {
            files: 'source/css/*.less',
            tasks: ['clean:dev', 'less:dev', 'copy:dev']
        },


        // 自動生成@2x 圖片對應的@1x 圖(已存在圖片不再生成，僅缺失圖片觸發此操作)
        _2x2x: {
            scale: {
                imgsrcdir: "source/slice", // 源目錄，此目錄中的 @2x -> @1x
                imgdesdir: "source/slice", // 目標目錄
                quality: 100,
                option: {
                    'overwrite': true // 是否覆蓋原圖
                }
            }
        },

        // 清理臨時目錄
        clean: {
            // clean 開發向
            dev: ['tmp/', 'dev/', 'dist/'],
            // clean 發佈向
            release: ['tmp/', 'dist/']
        },

        // 文件夾打包壓縮 Zip
        compress: {
            main: {
                options: {
                    archive: 'proj-generator-nmg-' + 'release.zip' // 设置压缩包名称
                },
                files: [{
                        expand: true,
                        src: "**/*",
                        cwd: "dist/"
                    } // 設置壓縮範圍為整個 `dist/` 發布目錄
                ]
            }
        }
    });

    // 加載官方插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');


    //檢查是否存在外部插件
    var bIsSelected = {
        'grunt_css_sprite': grunt.file.exists('node_modules/grunt-css-sprite/Gruntfile.js'),
        'grunt_pngmin': grunt.file.exists('node_modules/grunt-pngmin/Gruntfile.js'),
        'grunt_timestamp': grunt.file.exists('node_modules/grunt-timestamp/Gruntfile.js'),
        'grunt_2x2x': grunt.file.exists('node_modules/grunt-2x2x/Gruntfile.js'),
    };

    // 加载外部插件
    if ( !! bIsSelected.grunt_css_sprite) {
        grunt.loadNpmTasks('grunt-css-sprite')
    };
    if ( !! bIsSelected.grunt_pngmin) {
        grunt.loadNpmTasks('grunt-pngmin')
    };
    if ( !! bIsSelected.grunt_timestamp) {
        grunt.loadNpmTasks('grunt-timestamp')
    };
    if ( !! bIsSelected.grunt_2x2x) {
        grunt.loadNpmTasks('grunt-2x2x')
    };

    /* 任務註冊開始 */

    // == 默認工作流 ==
    // 輸出目錄為：../dist/(css/ + images/ + slice/)
    // 注：僅做編譯操作Less -> CSS，無其他操作
    grunt.registerTask('default', ['less:dev', 'copy:dev', 'clean:dev', 'watch']);

    // == 完整發佈流 ==
    // 輸出目錄為：../dist/(css/ + images/ + sprite/)
    // 注：包括Less 編譯+壓縮+雪碧圖拼合+PNG壓縮，僅執行1次流，不含(文件變動watch)
    grunt.registerTask('all', ['less:release', 'sprite-cssmin', 'timestamp', 'copy:release', 'pngmin']);

    // == 調試工作流 ==
    // 輸出目錄為：../dev/(css/ + images/ + sprite/)
    // 注：同`grunt all`，但不刪除tmp/ 目錄，供調試查看使用，含(文件變動watch)
    grunt.registerTask('debug', ['clean:dev', 'less:dev', 'sprite-cssmin', 'copy:dev', 'watch']);

    // == ZIP 發布操作 ==
    // 注：將`grunt all` 生成結果使用ZIP 生成包文件
    grunt.registerTask('zip', ['all', 'compress', 'clean:release']);

    // 定義別名 `grunt 2x2x`
    // 注：@2x 圖 生成 @1x 圖
    grunt.registerTask('2x2x', ['_2x2x:scale']);

    // 定義別名 `grunt sprite-cssmin`
    // 注：拷貝移動slice -> 合併雪碧圖sprite -> CSS 壓縮
    grunt.registerTask('sprite-cssmin', ['copy:slice', 'sprite', 'cssmin']);

    // for test build
    grunt.registerTask('test', ['less:dev', 'copy:dev', 'clean:dev']);

    // 定義別名 `grunt jquery`
    // 注：初始移動jquery到根目錄以供全站使用
    grunt.registerTask('jquery', ['copy:jquery']);

}