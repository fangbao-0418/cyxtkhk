import header from '../controller/header.js';
export default function(){
	return {
		template:require('../template/header.html'),
		controller:header,
		controllerAs:'vm',
		
	}
}