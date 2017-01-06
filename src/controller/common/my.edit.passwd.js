import apiConfig from '../../config/api.config.js';
class vm {
	constructor($rootScope,$http){
		this.$http = $http;
		//this.userinfo = $rootScope.userinfo;
		console.log($rootScope.$root);
	}

	/**
     * 打开密码修改界面
     */
	showEditPasswd(){
	 
		$('#myEditPasswd').modal('show');
	}

	/**
     * 密码修改
     */
	editPasswd(){ 
	  	$('#myEditPasswd').modal('hide');
	    // this.$http({
	    //   method:"post",
	    //   url:apiConfig.editPasswd,
	    //   data:{
	    //     userid:this.userinfo.id,
	    //     oldpasswd:this.oldpasswd,
	    //     newpasswd:this.newpasswd
	    //   },
	    //   headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
	    // }).then((res)=>{
	    //   console.log(res);
	    //   this.alertText = res.data.message;
	    //   $('#alert').modal('show');
	    // })   
	}
} 
vm.$inject = ['$rootScope','$http'];
export default vm;