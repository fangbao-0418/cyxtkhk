
//公共过滤器

export default {
	  formatDate:function(){
      return function(input){
          var newDate = new Date();
        newDate.setTime(input * 1000);
        // // Wed Jun 18 2014 
        // console.log(newDate.toDateString());
        // // Wed, 18 Jun 2014 02:33:24 GMT 
        // console.log(newDate.toGMTString());
        // // 2014-06-18T02:33:24.000Z
        // console.log(newDate.toISOString());
        // // 2014-06-18T02:33:24.000Z 
        // console.log(newDate.toJSON());
        // // 2014年6月18日 
        // console.log(newDate.toLocaleDateString());
        // // 2014年6月18日 上午10:33:24 
        // console.log(newDate.toLocaleString());
        // // 上午10:33:24 
        // console.log(newDate.toLocaleTimeString());
        // // Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
        // console.log(newDate.toString());
        // // 10:33:24 GMT+0800 (中国标准时间) 
        // console.log(newDate.toTimeString());
        // // Wed, 18 Jun 2014 02:33:24 GMT
        // console.log(newDate.toUTCString());
        Date.prototype.format = function(format) {
               var date = {
                      "M+": this.getMonth() + 1,
                      "d+": this.getDate(),
                      "h+": this.getHours(),
                      "m+": this.getMinutes(),
                      "s+": this.getSeconds(),
                      "q+": Math.floor((this.getMonth() + 3) / 3),
                      "S+": this.getMilliseconds()
               };
               if (/(y+)/i.test(format)) {
                      format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
               }
               for (var k in date) {
                      if (new RegExp("(" + k + ")").test(format)) {
                             format = format.replace(RegExp.$1, RegExp.$1.length == 1
                                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
                      }
               }
               return format;
        }
        
        return newDate.format('yyyy-MM-dd');
      }
    }

}