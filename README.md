generator-nmg
=============================
Yeoman generator for NMG@gz - lets you quickly set up a project with sensible defaults and best practises.

Features
-----------------------------
* Automagically compile Less<br />
* Automagically bilud seajs<br />
* Automagically lint your scripts<br />
* Automagically wire up your Bower components with bower-install


Directory
-----------------------------
###
	template
		├── bower_components						bower組件
		│   └── jquery								拉取jquery
		│   	└── dist							
		├── html 									存放靜態HTML
		├── lib										js框架、庫
		│	├── jquery								jquery，從bower目錄copy
		│   │	└── <version>
		│   └── seajs								seajs
		│   	└── <version> 							
		├── source 									源碼目錄
		│   ├── css									less源碼
		│   ├── images								不需要sprites的圖片
		│   ├── js									js源碼
		│   │	├──module								seajs module
		│   │	└──app									seajs app
		│   └── slice								需要sprites的圖片與css
		├── tmp										sprites臨時目錄
		│   ├── css									sprites css
		│   └── slice								sprites 圖片	
		├── dev										開發目錄
		│   ├── css									less編譯後生成的css
		│   ├── images								不需要sprites的圖片，只copy
		│   ├── js									壓縮合併後js
		│   └── slice								sprites操作後的圖片
		├── dist									發佈目錄
		│   ├── css									less編譯後生成的css
		│   ├── images								不需要sprites的圖片，壓縮png並copy
		│   ├── js									壓縮合併後js
		│   └── slice								sprites、壓縮後的圖片
		├── .editorconfig
		├── .jshintrc
		├── bower.json
		├── Gruntfile.js 							grunt task
		├── package.json
		└── Seaconfig.js 							seajs配置

License
-----------------------------
[MIT](http://rem.mit-license.org/)