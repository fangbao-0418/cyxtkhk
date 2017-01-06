
import home from '../controller/home.js';//主页
import login from '../controller/login.js';//登录
import ysjt from '../controller/ysjt.js';//药商讲堂
import user from '../resolve/user.js';
//user.$inject = ['$http'];
module.exports = function($stateProvider,$locationProvider,$urlRouterProvider){	
	 
	$stateProvider
	.state('index',{url:'/index/:where',template:require('../template/home.html'),controllerAs:'home',controller:home,resolve:user})
	.state('login',{url:'/login',template:require('../template/login.html'),controllerAs:'vm',controller:login})
	.state('ysjt', {url:'/ysjt/:where', template:require('../template/ysjt.html'), controllerAs:'vm', controller:ysjt});
	 
	$urlRouterProvider.otherwise('/index/');
	$locationProvider.html5Mode(true);
}