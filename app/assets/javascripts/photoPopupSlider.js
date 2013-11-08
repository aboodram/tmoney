window.addEventListener('DOMContentLoaded', function () {
	var photoPopupSlider = function () {
		var photoDiv = document.getElementById('photo-popup-div'),
				imgWrappers = photoDiv.children,
				imageSrcList = window.popupPhotos,
				imageTag,

		// Functions -->
		setup = function () {
			placeImageTags();
			setupListeners();
			window.setTimeout(calculateImageLocation, 1000);
		},

		setupListeners = function () {
			for (var i = 0; i < imgWrappers.length; i++) {
				imgWrappers[i].addEventListener('click', onPhotoClick);
			};
			window.onresize = calculateImageLocation;
		},

		placeImageTags = function () {
			for (var i = 0; i < imageSrcList.length; i++) {
				photoTag = document.createElement('div');
				imgTag = document.createElement('img');
				
				photoTag.className = 'img-wrapper';
				imgTag.src = 'assets/' + imageSrcList[i].slice(18); //I dislike using slice in this way....refactor!
				imgTag.alt = 'Popup Photos';
				photoTag.appendChild(imgTag);
				photoDiv.appendChild(photoTag); 
			}
		},

		calculateImageLocation = function () {
			var image,
					imageWidth = 256, //image.clientWidth; // currently set at 250
					windowWidth = window.innerWidth,
					top,
					maxTop = 0,
					left,
					minPadding = 24,
					totalRowPadding = windowWidth % imageWidth,
					imagesPerRow = Math.round((windowWidth - totalRowPadding) / (imageWidth + minPadding), 0),
					padding = Math.round(totalRowPadding/(imagesPerRow + 1), 0),
					indexOfTranslateY,
					imgAbove,
					imgAboveHeight = 0, // zero height for the first row
					imgAboveTranslate = 0,
					imgLeft,
					imgLeftWidth = 100,
					imgLeftTranslate = 20,
					rowCounter = 0,
					transBeg,
					transEnd,
					currentLeft = 0,
					currentTop = 0,
					imgMotion,
					container = document.getElementById('project-gallery-container');
			
			for (var i = 0; i < imgWrappers.length; i++) {
				image = imgWrappers[i];
				// Add motion to the transform.
				//for (currentLeft; currentLeft != left && currentTop != top;) {
				// Calculate what row we are on.				 
				if (i > imagesPerRow * rowCounter ) {
					rowCounter++;
				}
				// Calculate the top position we need to move to
				if (i > imagesPerRow - 1) { 		// if images are in the 2 row or greater
				  imgAbove = imgWrappers[(i - imagesPerRow)];

				  imgAboveHeight = imgAbove.clientHeight;
				  transBeg = imgWrappers[(i - imagesPerRow)].style.cssText.lastIndexOf(', ') + 2;
				  transEnd = imgWrappers[(i - imagesPerRow)].style.cssText.lastIndexOf('px'); //translate(XXXpx, XXXpx)'
				  imgAboveTranslate = imgWrappers[(i - imagesPerRow)].style.cssText.slice(transBeg, transEnd) * 1;
				};
				// Calculate the left position we need to move to
				if (i == imagesPerRow * rowCounter) {  // if the images are in the 1st column
					imgLeftWidth = 0;
					imgLeftTranslate = 0;
				} else {
				  imgLeftWidth = imageWidth;

					imgLeft = imgWrappers[( i - 1 )];
				  transBeg = imgLeft.style.cssText.indexOf('(') + 1;
			   	transEnd = imgLeft.style.cssText.indexOf('px'); //translate(XXXpx, XXXpx)'
				  imgLeftTranslate = imgLeft.style.cssText.slice(transBeg, transEnd) * 1;
				};
				//Calculate the current Y
			  transBeg = image.style.cssText.lastIndexOf(', ') + 2;
			  transEnd = image.style.cssText.lastIndexOf('px'); //translate(XXXpx, XXXpx)'
			  currentTop = image.style.cssText.slice(transBeg, transEnd) * 1;				
				//Calculate the current X
			  transBeg = image.style.cssText.indexOf('(') + 1;
		   	transEnd = image.style.cssText.indexOf('px'); //translate(XXXpx, XXXpx)'
			  currentLeft = image.style.cssText.slice(transBeg, transEnd) * 1;


				// Calulate the total distance from the top and left
				top  = imgAboveHeight + imgAboveTranslate + minPadding ;
				left = imgLeftWidth   + imgLeftTranslate  + padding ;

				// Code to transform commented out during animateImg testing
				image.style.webkitTransform = 'translate(' + left + 'px,' + top  + 'px)';
				if (top > maxTop) {
					maxTop = top;
					container.style.height = maxTop + padding + "px;";
				}
				console.log('first', image.firstChild.src)
					// for (;currentLeft != left && currentTop != top;) {
					// 	// Increment the current X position
					// 	console.log(image.firstChild.src)
					// 	if (currentLeft > left) { 
					// 		currentLeft--;
					// 	} else if (currentLeft == left) {
					// 		console.log('X correct');
					// 	} else {
					// 		currentLeft++;
					// 	}
					// 	// Increment the current Y position
					// 	if (currentTop > top) { 
					// 		currentTop--;
					// 	} else if (currentTop == top) {
					// 		console.log('Y correct');
					// 	} else {
					// 		currentTop++;
					// 	}
						// Update the DOM
						// for (currentTop; ;) {
						// 	setTimeout(function() {
						//	image.style.webkitTransform = 'translate(' + currentLeft + 'px,' + currentTop  + 'px)';
						// 	}, 10);
						// 	break;
						// }
						// setTimeout(function() {
						//	image.style.webkitTransform = 'translate(' + currentLeft + 'px,' + currentTop  + 'px)';
						 // }, 1000);
					// };
				//};					
			};

		},

		onPhotoClick = function () {
			var photoSrc = this.firstChild.src;
			launchPhotoDarkroom();
		},

		launchPhotoDarkroom = function () {
			createDarkScrim();
			createPhotoDiv();
			displayPhoto();
			createNextPreviousButtons();
		},

		createDarkScrim = function () {
			var scrimNode = document.createElement('div'),
					closeButtonNode = document.createElement('div');
			scrimNode.className = 'scrim';
			scrimNode.id = 'scrim';
			closeButtonNode.className = 'close-button';
			closeButtonNode.innerHTML = 'X';
			scrimNode.appendChild(closeButtonNode);
			document.body.appendChild(scrimNode);
			setListenerOnCloseButton(closeButtonNode);
		},

		createPhotoDiv = function () {
			var photoBox = document.createElement('div');
			photoBox.className = 'photobox';
			photoBox.id = 'photobox';
			document.getElementById('scrim').appendChild(photoBox);
		},

		displayPhoto = function () {
			var img = event.srcElement,
					imgSrc = img.src,
					imgCopy = document.createElement('img');
					imgCopy.src = imgSrc;
			document.getElementById('photobox').appendChild(imgCopy);
		},

		setListenerOnCloseButton = function (closeButtonNode) {
			closeButtonNode.addEventListener('click', closeScrim);
		},

		closeScrim = function () {
			var scrim = this.parentNode;
			this.removeEventListener('click', closeScrim);
			this.parentElement.getElementsByClassName('next')[0].removeEventListener('click', skipPhoto);
			this.parentElement.getElementsByClassName('prev')[0].removeEventListener('click', skipPhoto);
			scrim.parentNode.removeChild(scrim);
		},

		createNextPreviousButtons = function () {
			var photobox = document.getElementById('photobox'),
					next = document.createElement('div'),
					prev = document.createElement('div');

			next.className = 'next';
			next.innerHTML = 'Next';
			prev.className = 'prev';
			prev.innerHTML = 'Prev';

			photobox.appendChild(next);
			photobox.appendChild(prev);

			prev.addEventListener('click', skipPhoto);
			next.addEventListener('click', skipPhoto);
		},

		createAjaxRequestObject = function () {
			var ajax;
			
			if (window.XMLHttpRequest) {
			 ajax = new XMLHttpRequest;	
			} else if (window.ActiveXObject) {
				try {
					ajax = new ActiveXObject("Msxml2.XMLHTTP");
				} catch (e) {
					try {
						request = new ActiveXObject("Microsoft.XMLHTTP");
					} catch (e) {
						console.log('AJAX Error: ', e.description);
					}
				}
			};

			ajax.onreadystatechange = function () {
				if (ajax.readyState == 4 && request.state == 200) {
					rText = ajax.responseText;
					rXML  = ajax.responseXML;
					console.log('rText', 'rXML');
				}
			};
		},

		skipPhoto = function () {
			var photo = this.parentNode.getElementsByTagName('img')[0],
					photoSrc = photo.src,
					direction = this.className,
					photoLocation;
			for (var i = 0; i < imageSrcList.length; i++) {
				if (imageSrcList[i].split('images')[1] === photoSrc.split('assets')[1]) {
					photoLocation = i;
					if (direction == 'next') {
						if (photoLocation + 1 == imageSrcList.length) { // if at the end of the photo list go back to 0
							photo.src = photo.src.split('popup/')[0].concat(imageSrcList[(0)].slice(18));
						} else {
							photo.src = photo.src.split('popup/')[0].concat(imageSrcList[(i+1)].slice(18));
						};
					} else if (direction == 'prev') {
						if (photoLocation == 0 ) { // if less than zero go to end of list
							photo.src = photo.src.split('popup/')[0].concat(imageSrcList[(imageSrcList.length - 1)].slice(18));
						} else {
							photo.src = photo.src.split('popup/')[0].concat(imageSrcList[(i-1)].slice(18));
						};
					};
				}
			}
		};

		setup();
	};
	photoPopupSlider();
});