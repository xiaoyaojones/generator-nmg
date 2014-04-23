/**
 * @name: config.js
 * @description: 設置seajs的config
 * @path: source-源碼、dist-發佈
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