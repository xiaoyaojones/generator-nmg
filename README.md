generator-nmg
=============================
[Yeoman](http://yeoman.io) generator for [NMG](http://www.nmg.com.hk/)@gz - lets you quickly set up a project with sensible defaults and best practises.

[![NPM](https://nodei.co/npm/generator-nmg.png?compact=true)](https://nodei.co/npm/generator-nmg/)

Dependence
-----------------------------
* [node.js](http://nodejs.org/)
* [GraphicsMagick](http://www.graphicsmagick.org/)
* [Phantomjs](http://phantomjs.org/)

Yo nmg!
-----------------------------
* Automagically wire up your [Bower](http://bower.io/) components with bower-install
* Automagically compile [Less](http://lesscss.org/)
* Automagically bilud [SeaJS](http://seajs.org/docs/)
* Automagically generate css sprites
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

Grunt任務指令
-----------------------------
* grunt: - 默認工作流(開發調試向)
	- 清理舊dev目錄
	- 雪碧圖自動拼合
	- 添加雪碧圖時間戳清理緩存
	- jshint檢查
	- less文件編譯
	- 所需文件移動到dev目錄
	- watch(source目錄所有文件的監視，jshint + less + sprites + 文件變動)
* grunt:all - 完整發佈流
	- 清理舊發佈目錄
	- 雪碧圖自動拼合
	- 添加雪碧圖時間戳清理緩存
	- 清理tmp目錄
	- less自動編譯
	- css壓縮
	- 所需文件移動到dist目錄

Directory
-----------------------------
###
	├── app
	│	├── template
	│	│	│	
	│	│	├── bower_components                bower組件
	│	│	│   └── jquery                      	拉取jquery
	│	│	│       └── dist							
	│	│	├── lib								js库、框架
	│	│	│	├── jquery							jquery
	│	│	│   │	└── <version>
	│	│	│   └── seajs							seajs
	│	│	│   	└── <version> 							
	│	│	├── source 							源码目录
	│	│	│   ├── css								less源碼、sprites.css
	│	│	│   ├── images							不需要sprites的圖片
	│	│	│   ├── js								js源碼
	│	│	│   │	├──module							seajs module
	│	│	│   │	└──app								seajs app
	│	│	│   ├── slice							需要sprites的圖片與css
	│	│	│   ├── data							測試所需數據及圖片
	│	│	│   └── *.html 							html源碼
	│	│	├── tmp								臨時目錄
	│	│	│   └── slice							sprites圖片及css
	│	│	├── dev								開發調試目錄
	│	│	│   ├── css									
	│	│	│   ├── images								
	│	│	│   ├── js									
	│	│	│   ├── slice								
	│	│	│   └── *.html 							
	│	│	├── dist							發佈目錄
	│	│	│   ├── css									
	│	│	│   ├── images								
	│	│	│   ├── js									
	│	│	│   ├── slice								
	│	│	│   └── *.html 							
	│	│	├── .editorconfig
	│	│	├── .jshintrc
	│	│	├── bower.json
	│	│	├── Gruntfile.js 							
	│	│	└── package.json
	│	└──	index.js						
	└── package.json

License
-----------------------------
[MIT](http://rem.mit-license.org/)
