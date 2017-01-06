

import apiConfig from '../config/api.config.js'
import user from '../include/user.js';
import Server from '../include/server.helper.js';

var hzxm = [
      {title:"网站合作",complete:false},
      {title:"物流大会",complete:false},
      {title:"药博会",complete:false},
      {title:"药商讲堂",complete:false},
      {title:"杂志合作",complete:false},
      {title:"其他会议",complete:false}  
    ];

class Home {
  constructor($scope,$rootScope,$state,$http,getUserInfo,userFactory,a) {
    a.then((res)=>{
      console.log(res);
    })
   
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    this.$state = $state;
    this.$http = $http;

  	this.page = 0;
    this.dataItems = null;

    this.yxfl = [
    	{title:"A类"},
    	{title:"B类"},
    	{title:"C类"},
    	{title:"D类"}
    ]
    this.search = {};
    this.showLoadData = false;
    this.hzqk = [
    	{title:"已合作"},
    	{title:"未合作"}     
    ]
    this.cplb = [
    	{title:"药品"},
      {title:"保健食品"},
      {title:"营养食品"},
      {title:"原料药"},
      {title:"中间体"},
      {title:"药品辅料"},
      {title:"种植物提取物"},
      {title:"中药材"},
      {title:"中药饮片"},
      {title:"医疗器械"},
      {title:"耗材"},
      {title:"制药设备"},
      {title:"包装材料"},
      {title:"孕婴用品"},
    	{title:"计生用品"},
    	{title:"消毒用品"},
     	{title:"美容护肤"},
      {title:"其他"}
    ]
    this.hzxm = hzxm;
    this.item = {};
    this.where = {};
    this.qtxqList = null;
    this.init();
    this.loadData();    
    this.watch();
      //console.log(newVal);
  }
  watch(){
      /**
       * 监听洽谈详情分页
       */
      this.$scope.$watch('home.qtxqListPage',(newVal,oldVal)=>{ 
          if(newVal){
            console.log(newVal);
            console.log(this.qtxqList)
            this.$http({
              method:"get",
              url:apiConfig.user,
              params:{
                a:"getQtxqList",
                id:this.item.id,
                page:this.qtxqListPage
            }}).then((res)=>{
              if(res.data.list != "null"){
                 this.qtxqList = res.data;
              }
            })
          }
      })
  }
  init(){
    //console.log(this);
    if(this.$state.params.where != "" ){
      this.where = JSON.parse(this.$state.params.where);
    } 
    
 
   
    var _this = this;
    this.$http({
      method:"get",
      url:apiConfig.user + "/userinfo",
      params:{token:localStorage.token}
    }).then((res)=>{
      
      this.userinfo = res.data;
      this.item.xsdb = res.data.userid;
      //console.log(res.data.userid);
    },(res)=>{
      
    });   
    // this.$on('$viewContentLoading',function(event, viewConfig){
    //     console.log(event);
    // })


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
    this.$state.go('index',{where:""});
  }

  goSearch(){
    var fromdate = $('.form_datetime input').val();
    var todate = $('.to_datetime input').val();
    this.where.fromdate = fromdate;
    this.where.todate = todate;
    //console.log(this.search);
    this.where.hzxm = this.multiSelectSplit(',',this.hzxm);   
    this.$state.go("index",{where:JSON.stringify(this.where)})
  }

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
      url:apiConfig.user + "/getList",
      data:data,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    }).then((res)=>{
      //console.log(res);
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
  addData(){
    this.item = {};
  	$('#myModal').modal('show');
    this.alertTit = "信息添加";   
  }
  editData(item){  
    this.item = item;  
    console.log(item);
    this.qtxqList = null;
    this.qtxqListPage = 1;
    this.$http({
      method:"get",
      url:apiConfig.user,
      params:{
        a:"getQtxqList",
        id:item.id,
        page:this.qtxqListPage
      }}).then((res)=>{
        if(res.data != "null"){
           this.qtxqList = res.data;
        }
      })

    this.item.hzxm = this.reSelectItem(",",this.item.hzxm,hzxm); 
    $('#myModal').modal('show');  
    this.item.hzxm = this.multiSelectSplit(',',this.item.hzxm);
    this.alertTit = "信息修改";  

  }
  /**
    * 还原多选对象
    */
  reSelectItem(sign,val,arr){
    //初始化数据
    for(var x in arr){
      arr[x].complete = false;
    }

    var newarr = val.split(sign);
    for(var i in newarr){
      for(var j in arr){
        if(arr[j].title == newarr[i]){
          arr[j].complete = true;
        }
      }
    }
    
    return arr;
  }
  multiSelectSplit(sign,arr){   
  	var str = "";
  	for(var x in arr){
  		if(arr[x].complete){
  			if(str){
	  			str += sign + arr[x].title;
	  		}else{
	  			str += arr[x].title;
	  		}
  		} 		
  	}  	
  	return str;
  }
  saveData(id){  

  	var _this = this;
    

    this.item.hzxm = this.multiSelectSplit(",", this.hzxm);

  	this.item.userid = this.userinfo.id;

    this.item.xsdb = this.item.xsdb ? this.item.xsdb : this.userinfo.userid;

    this.$rootScope.alertMessage = id ? "信息修改成功" : "信息添加成功";        
   

    var action = "saveData";

    var data = {
      body:this.item,
      a:action
    }
    

    $.post(apiConfig.user,data,function(res){      
      $('#myModal').modal('hide');
      //console.log(res);
      if(res.status > 0){
        $('#alert').modal('show')
      }
    });

    this.loadData(true)

    for(var x in hzxm){
      hzxm[x].complete = false;
    }
  }
 
 
}
Home.$inject = ['$scope','$rootScope','$state','$http','getUserInfo','userFactory','a'];
module.exports = Home;