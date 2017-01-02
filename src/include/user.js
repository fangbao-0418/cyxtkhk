import apiConfig from '../config/api.config.js';

export default {
	loginVerify($http){
		let promise = new Promise(function(resolve, reject) {	
			
			let data = {
			 	token: localStorage.token,
			 	a: "auth"
			}
			if(localStorage.token){
				$http({
				 	url:apiConfig.user,
				 	data:data,
				 	mthods:"get"
				}).then((res)=>{
					console.log(res);
					resolve();
				},(err)=>{
					reject();
				})
			}else{
				reject();
			}
			
		
		 })
		return promise;
	},
	getUserInfo(){
		// let promise = new Promise(function(resolve, reject) {	
		// 	let data = {
		// 		a: "userinfo",
		// 		token: localStorage.token
		// 	}
		// 	$.post(apiConfig.user,data,function(res){
		// 		//console.log(res);
		// 		if(res){
		// 			resolve(res);
		// 		}else{
		// 			reject("err")
		// 		}	
		// 	})
		// })

		// //console.log(promise);
		// return promise;	
	}
}