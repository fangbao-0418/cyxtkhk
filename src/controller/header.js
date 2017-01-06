import apiConfig from '../config/api.config.js';
class vm {
	constructor($scope,$state,$http,$rootScope){
		this.$scope = $scope;
		this.$http = $http;
		this.$state = $state;
		this.$rootScope = $rootScope;
		this.getUserInfo();
		this.watch();
	}
	watch(){
	  /**
       * 监听用户分页
       */      
      this.$scope.$watch('vm.userListPage',(newVal,oldVal)=>{ 
            if(newVal){
              this.showUserList();
            }
      })

      /**
       * 监听用户页数变化
       */
      this.$scope.$watch('vm.userList.pageNum',(newVal,oldVal)=>{ 
          console.log(newVal + "," + oldVal);
        if(newVal != oldVal){
          this.userListPage = newVal;
        }
      })
	}
	getUserInfo(){
		this.$http({
	      method:"get",
	      url:apiConfig.user + "/userinfo",
	      params:{token:localStorage.token}
	    }).then((res)=>{
	    	this.userinfo = res.data;
	    })
	}
	/**
     * 打开密码修改界面
     */
	showEditPasswd(){
		$('#myEditPasswd').modal('show');
	}

	loginout(){   
      this.$rootScope.isFull = true;
    	localStorage.removeItem('token');
    	this.$state.go('login');
  }

	go(path){
		this.$state.go(path)
	}
	/**
     * 密码修改
     */
	editPasswd(){ 
	  	$('#myEditPasswd').modal('hide');
	    this.$http({
	      method:"post",
	      url:apiConfig.editPasswd,
	      data:{
	        userid:this.userinfo.id,
	        oldpasswd:this.oldpasswd,
	        newpasswd:this.newpasswd
	      },
	      headers:{ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
	    }).then((res)=>{
	      console.log(res);
	      this.$rootScope.alertMessage = res.data.message;
	      $('#alert').modal('show');
	    })   
	}



  /**
   * 员工管理列表
   */
  showUserList(){
  	 $('#userList').modal('show');
    this.userListPage = this.userListPage ? this.userListPage : 1;
    this.$http({
      method:"post",
      url:apiConfig.getUserList,
      data:{
        page:this.userListPage,
        token:localStorage.token,
      },
      headers:{ 'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
    }).then((res)=>{
      if(res.data.status == "ok"){

        this.userList = res.data;
        this.userList.pageArr = [];
        for(var i=0; i < res.data.pageNum; i++){
          this.userList.pageArr.push(i+1);
        }
         
      }
    })
  }

  /**
   * 添加员工
   */
  addUser(){
    this.userItem = {};
    this.userItemTitle = "添加用户";    
    $('#userInfo').modal('show');  

  }

  /**
   * 员工信息修改界面
   */
   editUser(item){
   	console.log(item);
      this.userItemTitle = "用户资料修改";
      this.userItem = item;
      $('#userInfo').modal('show');  
   }

   /**
    * 删除员工账号
    */
    delUser(id){
      this.$http({
        method:"post",
        url:apiConfig.delUser,
        data:{
          token:localStorage.token,
          id:id
        },
        headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
      }).then((res)=>{

        this.showUserList();
        
        this.$rootScope.alertMessage = res.data.message;
        $("#alert").modal("show");
      })
    }

  /**
   *  员工信息保存
   */
  saveUserItem(){
    console.log(this.userItem);
    $('#userInfo').modal('hide');  
    this.$http({
      method:"post",
      url:apiConfig.saveUserItem,
      data:this.userItem,
      headers:{'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'}
    }).then((res)=>{
      this.showUserList();
      this.$rootScope.alertMessage = res.data.message;
      $("#alert").modal("show");
    })
  }

}
vm.$inject = ['$scope','$state','$http','$rootScope'];
export default vm;