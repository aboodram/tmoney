(function() {
	console.log('mapHoverView.js');

	var mapHoverView = function () {
		var listenees,
				htmlBase ,
				id,
				boundary = {},
				// Hover Popover Box Style attributes
				top = '-105',
				left = '-96',
				width = '200',
				height = '100';

		getDynamicPoints = function () {

		},

		setupListeners = function (className, parentClass, event) {
			listenees = document.getElementsByClassName(parentClass)[0].getElementsByClassName(className);

	  	for (var i = 0; i < listenees.length; i++) {
        listenees[i].addEventListener(event, onEventTrigger);
	  	}

		},

		onEventTrigger = function () {
			var that = this
			if (this.children[0]) return;
			clearMapHoverView();
			showMapHoverView(that);
		},

		clearMapHoverView = function () {
			var mapHoverViews = document.getElementsByClassName('map-point-hover-container');
	  	
	  	for (var i = 0; i < mapHoverViews.length; i++) {
        delete mapHoverViews[i].parentNode.removeChild(mapHoverViews[i]);
	  	}
		},

		showMapHoverView = function (that) {
			var popoverLocation = {x: '', y: ''},
					hoverViewContainer = document.createElement('div');

			boundary.x = that.parentNode.offsetWidth;
			boundary.y = that.parentNode.offsetHeight;
			hoverViewContainer.setAttribute('class', 'map-point-hover-container');
			hoverViewContainer.setAttribute('style', 'top:'    + top 		+ 'px;' +
																							 'left:'   + left 	+ 'px;' + 
																							 'height:' + height + 'px;' +
																							 'width:'  + width 	+ 'px;' );

			popoverLocation = preventHoverContainerOverflow(that, hoverViewContainer);
			hoverViewContainer.style.top  = popoverLocation.y + 'px';
			hoverViewContainer.style.left = popoverLocation.x + 'px';

			id = getHoverItemId(that);
			// get id specific content

			htmlLocationName = getLocationNameFromId(id);
			htmlLocationImg =  getLocationImageFromId(id);

			hoverViewContainer.appendChild(htmlLocationName);
			hoverViewContainer.appendChild(htmlLocationImg);
			//set top and left attributes to always be inside the container.
			document.getElementById(id).appendChild(hoverViewContainer);

		},

		preventHoverContainerOverflow = function (point, hoverViewContainer) {
			var topPoint	 			= point.offsetTop
					topHover 				= hoverViewContainer.style.top.slice(0,-2) 	 	* 1,
					topHoverAbs			= (topPoint + topHover),
					
					leftPoint				= point.offsetLeft
					leftHover 			= hoverViewContainer.style.left.slice(0,-2)   * 1,
					leftHoverAbs		= (leftPoint + leftHover),
			    
			    hoverHeight 		= hoverViewContainer.style.height.slice(0,-2) * 1,
					hoverWidth 			= hoverViewContainer.style.width.slice(0,-2)  * 1,
					
					rightHoverAbs		= (leftPoint + leftHover + hoverWidth),
					
					bottomHoverAbs 	= topPoint + topHover + hoverHeight,
					
					pointHxW				= 8, // could be dynamic based on point size WxH
					padding 				= 10,
			    popoverLocation	= {x: leftHover, y: topHover};
			  //boundary.x	= 'popup-window sub-window extended-width location open'
			  //boundary.y  = 'popup-window sub-window extended-width location open'

			if ( topHoverAbs <= padding ) {  // if popover is too high
				
				popoverLocation.y =  (topPoint * -1) + padding; 

			} else if ( bottomHoverAbs >= boundary.y - padding ) {   	// if popover is too far down

				popoverLocation.y = topHover + (boundary.y - bottomHoverAbs - padding);
			};

			if ( leftHoverAbs <= padding ) {  // if popover is too far left

				popoverLocation.x = (leftPoint * -1) + padding;

			} else if ( rightHoverAbs >= boundary.x - padding) {   	// if popover is too far right

				popoverLocation.x = leftHover + (boundary.x - rightHoverAbs - padding);
			};
			return popoverLocation;
		},

		getLocationImageFromId = function(id) {
			var img,
					url = 'assets/' + id + '-sml.jpeg';
					imgExists = function() {
						try {
							var r = new XMLHttpRequest ();
							r.open('GET', url, false );
							r.send();
						}
						catch (err) {
							return false
						}
						return r.status == 200;
					}();

			img = document.createElement('img')

			if (!imgExists) id = 'default';
			
			img.setAttribute('src', 'assets/' + id + '-sml.jpeg');
			
			return img;
		},

		getLocationNameFromId = function(id) {
			var html;
			//i have a string
			//my htmlLocationName could be in an array
			html = document.createElement('div');
			html.setAttribute('class', 'destination-info')
			html.innerHTML = id ;
			
			return html;
		}

		getHoverItemId = function (el) {
			return el.getAttribute('id');
		}

		setupListeners('dynamic-point', 'location', 'mouseover');
		setupListeners('dynamic-point', 'location', 'mouseout');
	};

	if (document.body) {
		mapHoverView();
	} else {
		window.setTimeout(mapHoverView, 1000);
	}
})();