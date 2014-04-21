/*
**config.js
**作用：設置seajs的config
**主要技術：seajs
**衝突：暫無發現
**path：source-開發、dist-發布
**未解決bug：暫無發現
**@Jones Ho
*/
seajs.config({
	alias: {
		//插件別名
	},
	paths: {
		'module': 'source/js/module', //模塊目錄
		'app': 'source/js/app' //app目錄
	}
});