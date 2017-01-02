
//var q = new Promise();

class Server{
	constructor(obj){
		this.method = obj.method;
		this.url = obj.url;
		this.data = obj.data;
	}
	get(){

	}
	post(){
		console.log("post");
		var _this = this;
		var q = new Promise(function(resolve,reject){
			$.post(_this.url,_this.data,function(res){
				resolve(res)
			})		
		})
		return q;		
	}
}


module.exports = Server;