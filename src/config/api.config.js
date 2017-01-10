
const host = "http://www.bao-ru.com/index.php";
const api_path = "/Khk";
export default {
	user: host + api_path + "/user",
	editPasswd: host + api_path + "/user/editPasswd",
	getUserList: host + api_path + "/user/getUserList",
	saveUserItem: host + api_path + "/user/saveUserItem",
	delUser: host + api_path + "/user/delUser",
	ysjt: host + api_path + "/ysjt",
	ysjtList: host + api_path + "/ysjt/getList", // 药商讲堂列表
}