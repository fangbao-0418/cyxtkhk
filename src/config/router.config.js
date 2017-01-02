'use strict';
import home from '../controller/home.js';
import login from '../controller/login.js';
home.$inject = ['$scope','$state','$http'];
login.$inject = ['$http','$state'];
module.exports = function(stateProvider,locationProvider,urlRouterProvider){	
	 
	stateProvider
	.state('index',{url:'/index/:where',template:require('../template/home.html'),controllerAs:'home',controller:home,resolve:{}})
	.state('login',{url:'/login',template:require('../template/login.html'),controllerAs:'vm',controller:login});
	//.when()
	//console.log(urlRouterProvider)
	urlRouterProvider.otherwise('/index/');

	locationProvider.html5Mode(true);
}