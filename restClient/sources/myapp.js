import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config){
		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: !PRODUCTION,
			start 	: "/top/start"
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	// webix.ready(() => new MyApp().render() );

	webix.ready(() => {
		new MyApp().render();
	
		var session = webix.storage.session.get('session');

		if (session == null || session.token == null) { 
				window.location = "./login.html"; 
			} else {

		// Tampilkan Progress Sebelum Ajax
			webix.attachEvent("onBeforeAjax", 
				function(mode, url, data, request, headers, files, promise) {

					headers["Authorization"] = "Bearer " + session.token;

					// Progress
					webix.extend($$("halaman"), webix.ProgressBar);
					$$("halaman").enable();
					$$("halaman").showProgress({ type:"top" });
				}
			);

		}

		//PENANGANAN AJAX JIKA TOKEN EXPIRED MAKA LOGIN KEMBALI   
		webix.attachEvent("onAjaxError", function(request_obj){    
			if (request_obj.status == 401) {     
				window.location="./login.html";    
			}    
		}); 

		// Sembunyikan Progress Setelah Ajax
		webix.ajax.original_callback_function = webix.ajax.$callback;
		webix.ajax.$callback = function (owner, call, text, data, x, is_error) {
			$$("halaman").enable();
			$$("halaman").hideProgress();
			return webix.ajax.original_callback_function.apply(this,arguments);
		};

	});

}