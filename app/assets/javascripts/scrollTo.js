window.addEventListener('DOMContentLoaded', function () {
	var scrollSpeed = 25, // Higher Number == Slower Speed
			scrollInterval,
			i = 0,
	// functions ->
	setup = function () {
		setupListenersOnAnchors();
	},

	setupListenersOnAnchors = function () {
		var listeners = document.getElementsByTagName('a');
		listeners = filterListeners(listeners);
		for(i=0; i < listeners.length; i++) {
			listeners[i].addEventListener('click', smoothScrollClick)
		}
	},

	filterListeners = function (listeners) {
		var hrefValue,
				listenerArray = [];

		for (i=0; i < listeners.length; i++) {
			l = listeners[i];
			hrefValue = l.getAttribute('href').charAt(0);
			if (hrefValue == '#') {
				listenerArray.push(l);
			}
		}
		return listenerArray;
	},

	smoothScrollClick = function () {
		var evt = event.srcElement,
				h = evt.getAttribute('href'),
				id = h.slice(1),
				scrlTo = document.getElementById(id),
				scrlToYCoord = scrlTo.getBoundingClientRect().top,
				pScrlPos,
				// Functions -> 
				smoothScroll = function () {
					var	cScrlPos = window.scrollY,
							step = (scrlToYCoord - cScrlPos)/scrollSpeed; // step Credit belongs to http://www.kryogenix.org/ 'Smooth Scrolling' 84) ss_stepsize = parseInt((desty-cypos)/ss.STEPS);

					if (step < 1) step = 1;
					
					if (cScrlPos <= scrlToYCoord) {
						pScrlPos = cScrlPos;
						window.scrollTo(0, cScrlPos + step)
						window.scrollInterval = setTimeout(smoothScroll , 10);
						window.onscroll = function checkForUpScroll () {
							if (window.scrollY < pScrlPos) {
								clearTimeout(window.scrollInterval); 
							}
						};
						if (pScrlPos == window.scrollY) {
							clearTimeout(window.scrollInterval);
							location.href = h;
							return;
						}
					} else {
						clearTimeout(window.scrollInterval);
						location.href = h;
					}
				};
		event.preventDefault();
		smoothScroll();
	};

	setup();
});