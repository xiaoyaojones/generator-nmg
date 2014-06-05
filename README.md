generator-nmg
=============================
[Yeoman](http://yeoman.io) generator for [NMG](http://www.nmg.com.hk/)@gz - lets you quickly set up a project with sensible defaults and best practises.

[![NPM](https://nodei.co/npm/generator-nmg.png?compact=true)](https://nodei.co/npm/generator-nmg/)

Yo nmg!
-----------------------------
* Automagically wire up your [Bower](http://bower.io/) components with bower-install
* Automagically compile [Less](http://lesscss.org/)
* Automagically bilud [SeaJS](http://seajs.org/docs/)
* Automagically generate css sprites
* Automagically generate 2x images
* Automagically compress PNG images
* Automagically lint your scripts

Getting Started
-----------------------------
```
$ npm install -g yo
```

To install generator-nmg from npm, run:

```
$ npm install -g generator-nmg
```

Finally, initiate the generator:

```
$ yo nmg
```

Directory
-----------------------------
###
	template
		├── bower_components                bower組件
		│   └── jquery                      拉取jquery
		│       └── dist							
		├── html                            存放靜態HTML
		├── lib                             js框架、庫
		│   ├── jquery                          jquery，從bower目錄copy
		│   │   └── <version>
		│   └── seajs                           seajs
		│       └── <version> 							
		├── source                          源碼目錄
		│   ├── css                             less源碼
		│   ├── images                          不需要sprites的圖片
		│   ├── js                              js源碼
		│   │   ├──module                           seajs module
		│   │   └──app                              seajs app
		│   └── slice                           需要sprites的圖片與css
		├── tmp                             sprites臨時目錄
		│   ├── css                             sprites css
		│   └── slice                           sprites 圖片	
		├── dev                             開發目錄
		│   ├── css                             less編譯後生成的css
		│   ├── images                          不需要sprites的圖片，只copy
		│   ├── js                              壓縮合併後js
		│   └── slice                           sprites操作後的圖片
		├── dist                            發佈目錄
		│   ├── css                             less編譯後生成的css
		│   ├── images                          不需要sprites的圖片，壓縮png並copy
		│   ├── js                              壓縮合併後js
		│   └── slice                           sprites、壓縮後的圖片
		├── .editorconfig
		├── .jshintrc
		├── bower.json
		├── Gruntfile.js                    grunt task
		├── package.json
		└── Seaconfig.js                    seajs配置

License
-----------------------------
[MIT](http://rem.mit-license.org/)
