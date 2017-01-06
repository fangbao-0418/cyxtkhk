import apiConfig from '../config/api.config.js';
class Vm{
	constructor($scope,$rootScope,$state,$http) {
		

		console.log($rootScope.userinfo);

	    this.$scope = $scope;
	    this.$state = $state;
		this.$http = $http;
		this.page = 0;
		this.dataItems = null;
		this.where = {};
		this.sex = [
			{'title':'男'},
			{'title':'女'}
		] 

		this.init(); 
	} 
	init(){

	    this.$http({
	      	method:"get",
	      	url:apiConfig.user + "/userinfo",
	    	params:{token:localStorage.token}
	    }).then((res)=>{
	    	this.userinfo = res.data;
	     	if(this.userinfo.level != 1){
	     		this.$state.go("index");
	     	}
	    },(res)=>{
	      
	    });   


		//console.log(this);
	    if(this.$state.params.where != "" ){
	      this.where = JSON.parse(this.$state.params.where);
	    } 

		//加载列表
		this.loadData();  
		//开始时间  截止时间
	    $('.form_datetime').datetimepicker({
	      language:  'zh-CN',  
	      format: 'yyyy-mm-dd',  
	      autoclose: 1, 
	      startView: 2,
	      minView: 2,
	      forceParse: 0
	    });
	    $('.to_datetime').datetimepicker({
	      language:  'zh-CN',  
	      format: 'yyyy-mm-dd',  
	      autoclose: 1, 
	      startView: 2,
	      minView: 2,
	      forceParse: 0
	    });
   
	}

	reset(){
    	this.$state.go('ysjt',{where:""});
	}


	goSearch(){
	    var fromdate = $('.form_datetime input').val();
	    var todate = $('.to_datetime input').val();
	    this.where.fromdate = fromdate;
	    this.where.todate = todate;
	   
	    this.$state.go("ysjt",{where:JSON.stringify(this.where)})
  	}

	/**
	 * 加载数据
	 */
	loadData(refresh = false){
	    if(refresh){
	      this.page = 0;
	    }
	    var _this = this;
	    this.page = this.page + 1;
	    var data = {
	      token:localStorage.token,
	      page:this.page,
	      where:this.where
	    }
	    //console.log(typeof JSON.stringify(data));
	    this.$http({
	      method:"POST",
	      url:apiConfig.ysjtList,
	      data:data,
	      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
	    }).then((res)=>{
	      console.log(res);
	      if( _this.dataItems == null || refresh ){
	        
	        if(res.data.list){
	          _this.dataItems = res.data.list;
	          if(_this.dataItems.length == 20){
	            _this.showLoadData = true;
	          }
	        }
	        

	      }else{
	        
	        if(res.data.list != null){
	          for(var x in res.data.list){
	            _this.dataItems.push(res.data.list[x]);
	          }
	        }else{
	          this.alertText = "抱歉暂无更多数据！";   
	          $('#alert').modal('show');
	        }
	      
	      }
	      //console.log(_this.dataItems.length);

	    },(res)=>{
	      console.log(res);
	    })
  	}  

  	/**
  	 * 信息修改
  	 */
  	editData(item){  
	    this.item = item; 
	    $('#myModal').modal('show');  
	    this.alertTit = "信息修改";  
	} 

	addData(){
    	this.item = {};
  		$('#myModal').modal('show');
    	this.alertTit = "信息添加";   
  	}

	/**
	 * 保存数据
	 */
	saveData(id){  
	  	var _this = this;
	  	
	    this.alertText = id ? "信息修改成功" : "信息添加成功";        
	   

	    var action = "saveData";

	    var data = {
	      body:this.item,
	      a:action
	    }    

	    $.post(apiConfig.ysjt,data,function(res){      
	      $('#myModal').modal('hide');  
	    });
	    this.loadData(true);
    }

}
Vm.$inject = ['$scope','$rootScope','$state','$http'];
export default Vm;