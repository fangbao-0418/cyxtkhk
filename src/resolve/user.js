import apiConfig from '../config/api.config.js';
import angular from 'angular';

var injector = angular.injector(['ng']),
	http = injector.get('$http');




var resolve = {
	getUserInfo:function(){
		// return http({
	 //      method:"get",
	 //      url:apiConfig.user + "/userinfo",
	 //      params:{token:localStorage.token},
	 //      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
	 //    })
	}
}
module.exports = resolve;