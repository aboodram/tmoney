window.addEventListener('DOMContentLoaded', function () {
	var timelineSlider = function () {
		var timelineRuler = document.getElementById('timeline-ruler'),
				timelineFocus = document.getElementById('timeline-focus'),
				timelineContent = document.getElementById('timeline-ruler-content'),
				gearIcon = document.getElementById('gear-icon'),
				fastStep = 2,
				xStart = 0,
				mouseMoveTime = 1,
				interval,
				momentumInterval,
				oldCompany,
				masterVelocity;
		// Functions -->
		setup = function () { 
			triggerCompanyFocusSlider();
			setupListeners();
		},

		setupListeners = function () {
			timelineRuler.addEventListener('mousedown', onMouseDown);
			timelineFocus.addEventListener('mousedown', onMouseDown);
		},

		onMouseDown = function (event) {
			clearInterval(interval);
			clearInterval(momentumInterval);
			momentumInterval = undefined;
			window.addEventListener('mousemove', onMouseMove);
			window.addEventListener('onmousewheel', onMouseMove);
			window.addEventListener('mouseup', onMouseUp);
			window.xStart = event.clientX;
		},

		onMouseUp = function (event) {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('onmousewheel', onMouseMove);
			calculateMovementPhysics(masterVelocity);
			masterVelocity = 0;
		},

		onMouseMove = function (event) {
			var movement = event.clientX - window.xStart,
					timelineRulerNewPosition = timelineRuler.offsetLeft + movement,
					timelineFocusNewPosition,
					timelineContentNewPosition,
					minLeft = -2171; // .timeline-ruler-container.style.width - .timeline-ruler.style.width

			// Stop moving if hit boundary
			if (timelineRulerNewPosition <= minLeft || timelineRulerNewPosition >= 0) movement = 0;

			timelineRulerNewPosition 	 = timelineRuler.offsetLeft 	+ movement,
			timelineFocusNewPosition 	 = timelineFocus.offsetLeft 	+ movement,
			timelineContentNewPosition = timelineContent.offsetLeft + movement * fastStep,

			timelineRuler.style.left 	 = timelineRulerNewPosition 	+ 'px';
			timelineContent.style.left = timelineContentNewPosition + 'px';
			timelineFocus.style.left 	 = timelineFocusNewPosition 	+ 'px';
			// make cross browser compat
			gearIcon.firstElementChild.style.webkitTransform = 'rotate(' + timelineRuler.offsetLeft/5 + 'deg)';

			getMouseVelocity(event);
			window.xStart = event.clientX;
			triggerCompanyFocusSlider();
		},

		getMousePositionX = function (event) {
			return event.clientX;
		},

		getMouseVelocity = function (event) {
			// speed = distance / time
			var distance = window.xStart - getMousePositionX(event);
			masterVelocity = distance / mouseMoveTime;
		},

		getMouseAcceleration = function (event) {
			// acceleration = speed / time || distance / time^2
			var speed = window.xStart - getMousePositionX(event);
			window.acceleration = speed / Math.pow(mouseMoveTime, 2);
		},


		calculateMovementPhysics = function (velocity) {
			var initialRulerX = timelineRuler.offsetLeft,
					totalMoveDistance = velocity * Math.abs(velocity),					
					goalRulerX = initialRulerX - totalMoveDistance,
					minimumCSSLeft = -1970,

					startMomentumSlide = function () {
						var currentRulerX 				= timelineRuler.offsetLeft,
								currentRulerFocusX 		= timelineFocus.offsetLeft,
								currentRulerContentX 	= timelineContent.offsetLeft,
								distance 		= Math.abs(currentRulerX) - Math.abs(goalRulerX),
								absDistance = Math.abs(distance),
								absVelocity = Math.abs(velocity),
								time = 40, //higher number = slower speed
								step = absDistance / time;

						if (step < 1 ) step = 1;

						if (currentRulerX <= 0 && currentRulerX >= minimumCSSLeft ) {
							if ( goalRulerX > currentRulerX && absDistance ) { 															// mouse move right
								timelineRuler.style.left 		= currentRulerX + step + 'px';
								timelineFocus.style.left 		= currentRulerFocusX + step + 'px';
								timelineContent.style.left 	= currentRulerContentX + (step * fastStep) + 'px';
								if (!momentumInterval) momentumInterval = setInterval(startMomentumSlide, 25);
							} else if ( goalRulerX < currentRulerX && absDistance ) { 											// mouse move left
								timelineRuler.style.left 		= currentRulerX - step + 'px';
								timelineFocus.style.left 		= currentRulerFocusX - step + 'px';
								timelineContent.style.left 	= currentRulerContentX - (step * fastStep) + 'px';
								if (!momentumInterval) momentumInterval = setInterval(startMomentumSlide, 25);
							}	else {
								clearInterval(momentumInterval);
								momentumInterval = undefined;
							}	
						} else { 																												// if not within limits stop scrolling
								clearInterval(momentumInterval);
								momentumInterval = undefined;
						};
						triggerCompanyFocusSlider();
						// Turn this into a function

						gearIcon.firstElementChild.style.webkitTransform = 'rotate(' + currentRulerX/5 + 'deg)';
					};

			if (goalRulerX > 0 ) { // prevents a sudden stop @ edges of scroll.
				goalRulerX = 0;
			} else if (goalRulerX < minimumCSSLeft) {
				goalRulerX = minimumCSSLeft;
			};

			if (velocity) startMomentumSlide();
		},

		triggerCompanyFocusSlider = function () {
			var companies = document.getElementsByClassName('history-marker'),
					sliderOffset = document.getElementById('timeline-ruler-content').offsetLeft,
					focusWidth = 100,
					companyOffset,
					minOffset = 510,
					maxOffset = minOffset + focusWidth,
					company;
					
			for (var i = 0; i < companies.length; i ++) {
				company = companies[i];
				companyOffset = sliderOffset + company.offsetLeft;
				if (companyOffset > minOffset && companyOffset < maxOffset) {
					if (oldCompany != company) {
						changeCompany(company);
						oldCompany = company;
					};	
				}
			};
		},

		changeCompany = function (company) {
			removeClassFromList('company-container', 'focus');
			getCompanyHTML(company);
		},

		removeClassFromList = function (classList, clas) {
			var classList = document.getElementsByClassName(classList),
					domElement,
					classes;

			for (var i = 0; i < classList.length; i ++) {
				domElement = classList[i];
				classes = domElement.className.split(' ');
				for (var t = 0; t < classes.length; t ++) {
					if (classes[t] == clas) {
						classes.splice(t, 1);
						domElement.className = classes.join(' ');
					}
				}
			}
		},
		
		matchNodeClassToListClasses = function(node, list) {
			var match,
					nodeClasses = node.className.split(' '),
					listClasses;

			for (var i = 0; i < nodeClasses.length; i++) {
				for (var l = 0; l < list.length; l++) {
					listClasses = list[l].className.split(' ');
					for (var c = 0; c < listClasses.length; c++) {
						if (listClasses[c] == nodeClasses[i]) {
							match = list[l]
							match.className = listClasses[c];
							return match;
						}
					}
				}
			}
		},

		showCompany = function (node) {
			node.className += ' focus';
		},

		getCompanyHTML = function (company) {
		var request,
				rText,
				rXML,
				companyName = company.id;

		if (window.XMLHttpRequest) {
			request = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			try {
				request = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					request = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) { 
					console.log(e.description)
				}
			}
		};

		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				rText = request.responseText;
				rXML	= request.responseXML;
				document.getElementById('company-display-container').innerHTML = rText;
				showCompany(company);
			} else {
				
			}
		};

		request.open('GET', 'js/company_' + companyName +'.html');
		request.setRequestHeader('Cache-Control', 'no-cache');
		request.send(null);
	};

	setup();
	};

	timelineSlider();
});

window.dateObjects = {
	0: {
		year: 2050,
		text: '',
		isCompany: false,
	},
	1: {

	},
	2: {

	},
	3: {

	},
	0: {

	},
	0: {

	},
	0: {

	},
	0: {

	},	
	0: {

	},
	0: {

	},
	0: {

	},
}