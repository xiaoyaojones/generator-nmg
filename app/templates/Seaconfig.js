/**
 * @name: config.js
 * @description: 設置seajs的config
 * @path: source-開發、dist-發布
 * @author: Jones Ho
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