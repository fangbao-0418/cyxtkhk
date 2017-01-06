export default function(){
	return {
		restruct: 'A',
		template:require('../template/common/alert.html'),
		scope: {
			/** 
			 * = 指定对象绑定
			 * & 引用传递方法
			 * @ 储存关联字符串
			 */
			message:'=' 
		},
		
	}
}