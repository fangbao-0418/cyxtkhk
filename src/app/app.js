
import angular from 'angular';
import ngRoute from 'angular-route';
import uiRouter from 'angular-ui-router';
import '../scss/common.scss';
import  routerConfig from '../config/router.config.js';
import filters from '../filter/index.js';
import factorys from '../factory/index.js';
import apiConfig from '../config/api.config.js';
import user from '../include/user.js';
import directives from '../directive/index.js';
const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ui.router'])
  .directive(directives)
  .config(['$stateProvider','$locationProvider','$urlRouterProvider', ($stateProvider,$locationProvider,$urlRouterProvider)=>{
    routerConfig($stateProvider,$locationProvider,$urlRouterProvider)    
  }])
  .run(['$rootScope','$location','$state','$http',function($rootScope,$location,$state,$http){
		
    $rootScope.isFull = true;

    $rootScope.$on('$stateChangeStart',function(evt,next,current){    			 
      user.loginVerify().then((res)=>{
        $rootScope.isFull = false;
			  $state.go(next.name);
			},(res)=>{  	
        $rootScope.isFull = true;
				//$location.path('/login');
				$state.go('login');
			})
      /**
       * 获取用户信息
       */
      $http({
        method:"get",
        url:apiConfig.user + "/userinfo",
        params:{token:localStorage.token}
      }).then((res)=>{      
        $rootScope.userinfo = res.data;
      });   


		})
  }])
  .filter(filters)
  .factory(factorys);

export default MODULE_NAME;