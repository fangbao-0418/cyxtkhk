'use strict';
import apiConfig from '../config/api.config.js';

export default class {
	constructor($http,$state){
		this.$state = $state;
		this.data = {
			a:"login"
		}
	}	
	login(){
		 
		$.get(apiConfig.user,this.data,(res)=>{
			console.log(res);
			if(res.status == "ok"){
				localStorage.token = res.token; 
				this.$state.go("index");
			}else{
				alert("账号密码不正确！")
			}
		})
	}
}

 