
import apiConfig from '../config/api.config.js';

class Login {
	constructor($http,$state){
		this.$state = $state;
		this.data = {
			a:"login"
		}
	}	
	login(){
		$.post(apiConfig.user,this.data,(res)=>{
		
			if(res.status == "ok"){
				console.log(2);
				localStorage.token = res.token; 
				this.$state.go("index");
			}else{
				alert("账号密码不正确！")
			}
		})
	}
}
Login.$inject = ['$http','$state'];
export default Login;