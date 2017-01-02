
const host = "http://192.168.10.123:8082";
const api_path = "/zhoa/api";
const release =  {
	user: host + api_path + "/user",
	userInfo: host + api_path + "/userInfo",
	getList: host + api_path + "/getList",
	editPasswd: host + api_path + "/user/editPasswd",
	getUserList: host + api_path + "/user/getUserList",
	saveUserItem: host + api_path + "/user/saveUserItem",
	delUser: host + api_path + "/user/delUser"
}

const test =  {
	user: host + "/json/login.json",
	userInfo: host + "/json/userinfo.json",
	getList: host + "/json/getList.json",
	editPasswd: host + api_path + "/user/editPasswd",
	getUserList: host + api_path + "/user/getUserList",
	saveUserItem: host + api_path + "/user/saveUserItem",
	delUser: host + api_path + "/user/delUser"
}
const DEBUG = true;
module.exports = DEBUG ? test : release;