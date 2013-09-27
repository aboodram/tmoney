window.addEventListener('DOMContentLoaded', function() {
	var loopSlider = function (company) {

		var request,
				rText,
				rXML;

		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) { console.log(e.description)}
			}
		};

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				rText = request.responseText;
				rXML	= request.responseXML;
				document.getElementById('company-display-container').innerHTML = rText;
			} else {
				
			}
		};


		request.open('GET', 'home/company_' + company +'.html');
		request.setRequestHeader('Cache-Control', 'no-cache');
		request.send(null);
	};

	//loopSlider('vivint');
});