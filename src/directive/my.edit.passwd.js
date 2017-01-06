import myEditPasswd from '../controller/common/my.edit.passwd.js';
export default function(){
	return {		
		template:require('../template/common/my.edit.passwd.html'),
		controller:myEditPasswd,
		controllerAs:'vm',
	}
}