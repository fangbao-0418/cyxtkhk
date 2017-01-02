$(function (){
	
	/* 鼠标移出收回ul */
	$(".select_div").mouseleave(function (){
		$(".select_div ul").slideUp("fast");
	})
	
	/*修改意向选项变化颜色*/
	$(".intention_sel ul li").click(function (){
		$(".dqyx").val($(this).text());	
	})	
	
})

/* div仿select */
function slide(obj){
		if($(obj).next("ul").children("li").length > 0){
			$(obj).next("ul").slideToggle("fast");
			$(obj).next().children("li").click(function () {
				$(".sub_tit").html($("#subset li").html());
				$(obj).html($(this).text());
				$(obj).next().slideUp("fast");
			});
		}
		
	}
	
/* 修改客户信息 */
function edit(obj,id){

    var arr = $(obj).parent().parent().children();/*获取父节点*/

    for(i=1; i<arr.length; i++) {/*循环修改布局*/
        if (i == 8) {
            $(arr[i]).html("<input type='button' value='保存' class='but' onclick='save(this,"+id+")' /></td>");
        }else if(i == 7){
            $(arr[i]).html("<select><option>已回款</option><option>未回款</option><option>已回执</option><option>未回执</option><option>可跟踪</option></select>");
        }else{
            $(arr[i]).html("<input type='text'  class='modify_inp inp"+i+"'  value='" + $(arr[i]).text() + "' >");
        }
    }
	
	
}
/* ajax 判断联系电话是否属于自己负责  */
function ajax_check_line(val){
	
	
	 
	
	
	
}
/* 保存 客户信息 */
function save(obj,id){
	
	var arr = $(obj).parent().parent().children();/*获取父节点*/
	var row = [];
	for(i=0; i<=7; i++){
		if(i == 0){
			row[i] = arr[i].innerText;
		}else{
			row[i] = arr[i].children[0].value;
		}		
	}
	row[8] = id;
	
	var str = JSON.stringify(row);
	
	 $.ajax({
		   url:"index.php?m=index&a=ajax_check_line&val="+str, 
		   async: true,
		   type: "GET",		
		   success: function(msg){
			   if(msg == -2){
				   alert("联系电话格式不正确！");
				   return false;
			   }
			   if(msg == -1){				  
				   alert("联系电话已存在！");
				   return false;
			   }
			 
			   if(!id){
				   $(".page_total a").text(parseInt($(".page_total a").text())+1);
			   }
			  
			   
			   if(!id){id = msg;}
			   
			   for(i=1; i<arr.length; i++) {
			        if (i == 8) {
			            $(arr[i]).html("<input type='button' value='修改' class='but' onclick='edit(this,"+id+")' />");
			        }
					else if (i == 7) {
						var val = $(arr[i]).children().val();
						if(val == "已回款"){
			           		$(arr[i]).html("<span style='color:#1CA800'>"+val+"</span>");
						}
						else if(val == "未回款"){
			           		$(arr[i]).html("<span style='color:#CC0000'>"+val+"</span>");
						}
						else if(val == "已回执"){
			           		$(arr[i]).html("<span style='color:#1F89F5'>"+val+"</span>");
						}
						else if(val == "未回执"){
			           		$(arr[i]).html("<span style='color:#EB8104'>"+val+"</span>");
						}
						else{
			           		$(arr[i]).html("<span style='color:#000000'>"+val+"</span>");
						}
			        }
					else{
			            $(arr[i]).html($(arr[i]).children().val());
			        }
			    }
			  
			   
			   
		     }
		  });

	
	 	
	
	
}


/* 修改展会企业信息 */
function adduser(){
	 
	var newdate=new Date();
	
	year = newdate.getFullYear();
	month = newdate.getMonth()+1;
	if(month < 10){
		month = "0"+month
	}
	date = newdate.getDate();
	
	var mydate= year+"-"+month+"-"+date;
	
		$(".exh_tab").prepend("<tr><td width='72'>"+mydate+"</td><td  width='248' class='company'><input class='modify_inp inp1'></td><td width='100'><input class='modify_inp inp2' ></td><td width='100'><input class='modify_inp inp3' ></td><td width='200'><input class='modify_inp inp4' ></td><td width='200'><input class='modify_inp inp5' ></td><td width='248'><input class='modify_inp inp6'></td><td  width='100'><select><option>已回款</option><option>未回款</option><option>已回执</option><option>未回执</option><option>可跟踪</option></select></td><td width='71'><input type='button' value='保存' class='but' onclick='save(this)' /></td></tr>");
		
}
	


