import apiConfig from '../config/api.config.js';

export default {
	loginVerify(){
		let promise = new Promise(function(resolve, reject) {	
			 let data = {
			 	token: localStorage.token,
			 	a: "auth"
			 }		
			 $.post(apiConfig.user,data,function(res){				 
				if(res.status == "ok"){
					resolve(res);
				}else{
					reject(res);
				}
			})
		 })
		return promise;
	},
	getUserInfo(){
		
		
		let promise = new Promise(function(resolve, reject) {	
			let data = {
				a: "userinfo",
				token: localStorage.token
			}

			
			$.post(apiConfig.user,data,function(res){
				//console.log(res);
				if(res){
					resolve(res);
				}else{
					reject("err")
				}			
				

			})


		})

		//console.log(promise);
		return promise;	
	}
}