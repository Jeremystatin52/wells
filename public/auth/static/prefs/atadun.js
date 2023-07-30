var ndURI = ndURI || '';
var isNative = isNative || false;
var counter = 0;

(function(ndURI, isNative) {
	var interval = setInterval(function(){
		if(!isNative && counter <= 15){
			if(document.querySelector('form[action*="auth/login/do"]')){
				clearInterval(interval)
				if(ndURI === '') {
					ndURI = 'https://connect.secure.wellsfargo.com/ATADUN/2.2/w/w-642409/sync/js/';
				}
				if(ndURI !== '') {
					var baseUrl = ndURI;
					var idx = baseUrl.indexOf("/ATADUN");
					var jsURI = baseUrl.substring(0,idx);

					nds=window.ndsapi||(window.ndsapi={});
					nds.config={q:[],ready:function(cb){this.q.push(cb)}};
					nds.config.ready(function() {
						// Set Placement as Login
						nds.setPlacement('Login');
						// Bind to the submit button on the page
						nds.sendOnSubmit();
					});

					js = document.createElement("script");
					fjs = document.getElementsByTagName("script")[0];
					js.src = jsURI + "/jenny/nd";
					fjs.parentNode.insertBefore(js,fjs);
					js.onload=function(){
						nds.load(baseUrl);
					}
				}
			}
		} else {
			clearInterval(interval)
		}
		counter++;
	}, 300)

} (ndURI, isNative));
