'use strict';




import angular from 'angular';
import ngRoute from 'angular-route';
import uiRouter from 'angular-ui-router';

import '../scss/common.scss';
import  routerConfig from '../config/router.config.js';
import filters from '../filter/index.js';
import factorys from '../factory/index.js';
import user from '../include/user.js';
const MODULE_NAME = 'app';



angular.module(MODULE_NAME, ['ui.router']).
  config(['$stateProvider','$locationProvider','$urlRouterProvider', ($stateProvider,$locationProvider,$urlRouterProvider)=>{
    routerConfig($stateProvider,$locationProvider,$urlRouterProvider)    
  }])
  .run(['$rootScope','$location','$state','$http',($rootScope,$location,$state,$http)=>{
        


      $rootScope.$on('$stateChangeStart',(evt,next,current)=>{ 
         user.loginVerify($http).then((res)=>{
          $state.go('index');
        },(res)=>{  
          console.log($state.current.name);
          // if($state.current.name != "login"){
          //   $state.go('login');
          // }
  		}) 

       
       
          
        
        })
  }])
  .filter(filters)
  .factory(factorys);

export default MODULE_NAME;