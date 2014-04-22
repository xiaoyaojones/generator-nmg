/**
 * NMG-workflow v0.0.3
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
                    yuicompress: false // 开启 YUI CSS 压缩 (http://yui.github.io/yuicompressor/)
                }
            },
            // less 分支 -> 发布向
            release: {
                files: [{
                    expand: true, //启用动态扩展
                    cwd: 'source/css/', // CSS 文件源的文件夹
                    src: ['*.less', '!import*.less'], // 匹配规则
                    dest: 'dist/css/', //导出 CSS 和雪碧图的路径地址
                    ext: '.css' // 导出的 CSS名
                }],
                options: {
                    yuicompress: true // 开启 YUI CSS 压缩 (http://yui.github.io/yuicompressor/)
                }
            }
        },

        // CSS 验证检查 (https://github.com/gruntjs/grunt-contrib-csslint)
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

        // CSS 压缩 (https://github.com/gruntjs/grunt-contrib-cssmin)
        cssmin: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css',
                    src: ['*.sprite.css'],
                    dest: 'tmp/css',
                    ext: '.css'
                }]
            }
        },

        // 自动合并生成雪碧图
        sprite: {
            sprite: {
                options: {
                    // sprite背景图源文件夹，只有匹配此路径才会处理，默认 images/slice/
                    imagepath: 'tmp/slice/',
                    // 雪碧图输出目录，注意，会覆盖之前文件！默认 images/
                    spritedest: 'dev/slice/',
                    // 替换后的背景路径，默认 ../images/
                    spritepath: 'images/',
                    // 各图片间间距，如果设置为奇数，会强制+1以保证生成的2x图片为偶数宽高，默认 0
                    padding: 2,
                    // 是否以时间戳为文件名生成新的雪碧图文件，如果启用请注意清理之前生成的文件，默认不生成新文件
                    newsprite: false,
                    // 给雪碧图追加时间戳，默认不追加
                    spritestamp: false,
                    // 在CSS文件末尾追加时间戳，默认不追加
                    cssstamp: false,
                    // 默认使用二叉树最优排列算法
                    algorithm: 'binary-tree',
                    // 默认使用`pngsmith`图像处理引擎
                    engine: 'pngsmith'
                },
                autoSprite: {
                    files: [{
                        //启用动态扩展
                        expand: true,
                        // css文件源的文件夹
                        cwd: 'tem/css/',
                        // 匹配规则
                        src: '*.css',
                        //导出css和sprite的路径地址
                        dest: 'dev/css/',
                        // 导出的css名
                        ext: '.sprite.css'
                    }]
                }
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

        // PNG 压缩 (更多配置说明：https://www.npmjs.org/package/grunt-pngmin)
        pngmin: {
            compile: {
                options: {
                    ext: '.png', // 后缀名
                    force: true, // 生成优化后的图片覆盖原始图片
                    iebug: false // 为 IE6 优化图片，如需要可设置`true`
                },
                files: [{
                    src: ['dev/sprite/*.png'],
                    dest: 'dev/sprite/'
                }, {
                    expand: true,
                    cwd: 'dev/images',
                    src: ['**/*.png'],
                    dest: 'dev/images',
                    ext: '.png'
                }]
            }
        },

        // 复制文件夹操作
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

            // 移动 slice/ 到 tmp/ 供下一步的 合并雪碧图 task 使用
            slice: {
                files: [{
                    expand: true,
                    cwd: 'source/slice/',
                    src: ['**'],
                    dest: 'tmp/slice/'
                }, ]
            },

            // copy 分支 -> 开发向
            dev: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css/',
                    src: ['**', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'dev/css/'
                }, {
                    expand: true,
                    cwd: 'source/slice/',
                    src: ['**'],
                    dest: 'dev/slice/'
                }, {
                    expand: true,
                    cwd: 'source/images/',
                    src: ['**'],
                    dest: 'dev/images/'
                }, ]
            },

            // copy 分支 -> 发布向
            release: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css/',
                    src: ['*.css', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'dist/css/'
                }, {
                    expand: true,
                    cwd: 'source/images/',
                    src: ['**'],
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'tmp/slice/',
                    src: ['**'],
                    dest: 'dist/slice/'
                }]
            },

            // copy 分支 -> 调试向
            debug: {
                files: [{
                    expand: true,
                    cwd: 'tmp/css/',
                    src: ['*.css', '!*.timestamp.css', '!*.sprite.css', '!*.min.css'],
                    dest: 'publish/css/'
                }, {
                    expand: true,
                    cwd: 'img/',
                    src: ['**'],
                    dest: 'publish/img/'
                }, {
                    expand: true,
                    cwd: 'tmp/sprite/',
                    src: ['**'],
                    dest: 'publish/sprite/'
                }]
            }
        },

        // 检测 文件/代码 变动事件
        watch: {
            files: 'css/*.less',
            tasks: ['less:dev', 'copy:dev', 'clean:dev']
        },


        // 自动生成 @2x 图片对应的 @1x 图 (已存在图片不再生成，仅缺失图片触发此操作) 
        _2x2x: {
            scale: {
                imgsrcdir: "source/slice", // 源目录，此目录中的 @2x -> @1x
                imgdesdir: "source/slice", // 目标目录
                option: {
                    'overwrite': true // 是否覆盖原图
                }
            }
        },

        // 清理临时目录
        clean: {
            // clean 开发向
            dev: ['tmp/', 'dev/slice/', 'dist/'],
            // clean 发布向
            release: ['tmp/', 'dev/', 'dist/'],
            // clean 调试向
            debug: ['tmp/', 'dev/slice/']
        },

        // 文件夹打包压缩 Zip
        compress: {
            main: {
                options: {
                    archive: 'proj-generator-nmg-' + 'release.zip' // 设置压缩包名称
                },
                files: [{
                        expand: true,
                        src: "**/*",
                        cwd: "dist/"
                    } // 设置压缩范围为整个 `dist/` 发布目录
                ]
            }
        }
    });

    // 加载官方插件
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // 加载其他插件
    //grunt.loadNpmTasks('grunt-css-sprite');
    grunt.loadNpmTasks('grunt-pngmin');
    grunt.loadNpmTasks('grunt-timestamp');
    //grunt.loadNpmTasks('grunt-2x2x');


    /* 任务注册开始 */

    // == 默认工作流 ==
    // 输出目录为：../publish/(css/ + images/ + slice/)
    // 注：仅做编译操作 Less -> CSS，无其他操作
    grunt.registerTask('default', ['less:dev', 'copy:dev', 'clean:dev', 'watch']);

    // == 完整发布流 ==
    // 输出目录为：../publish/(css/ + images/ + sprite/)
    // 注：包括 Less 编译+压缩+雪碧图拼合+PNG压缩，仅执行1次流，不含(文件变动 watch)
    grunt.registerTask('all', ['less:release', 'sprite-cssmin', 'timestamp', 'copy:release', 'pngmin']);

    // == 调试工作流 ==
    // 输出目录为：../dev/(css/ + images/ + sprite/)
    // 注：同 `grunt all`，但不删除 tmp/ 目录，供调试查看使用，含(文件变动 watch)
    grunt.registerTask('debug', ['clean:release', 'less:release', 'sprite-cssmin', 'copy:debug', 'watch']);

    // == FTP 发布操作 ==
    // 注：将 `grunt all` 生成结果使用 FTP 上传到服务端
    grunt.registerTask('push', ['all', 'ftp-deploy:push', 'clean:release']);

    // == ZIP 发布操作 ==
    // 注：将 `grunt all` 生成结果使用 ZIP 生成包文件
    grunt.registerTask('zip', ['all', 'compress', 'clean:release']);

    // 定义别名 `grunt sprite-cssmin`
    // 注：拷贝移动 slice -> 合并雪碧图 sprite -> CSS 压缩
    grunt.registerTask('sprite-cssmin', ['copy:slice', 'sprite', 'cssmin']);

    // for test build
    grunt.registerTask('test', ['less:dev', 'copy:dev', 'clean:dev']);

    // 定义别名 `grunt 2x2x`
    // 注：@2x 图 生成 @1x 图
    grunt.registerTask('2x2x', ['_2x2x']);

    grunt.registerTask('jquery',['copy:jquery']);
}