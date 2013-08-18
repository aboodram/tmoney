(function() {
	console.log('blurScroll.js');

	var blurScrollSetup = function () {
		var scrollItems = document.getElementsByClassName('college'),
				scrollItems = Array.prototype.slice.call(scrollItems),
				img,
				scrollAmount,
				// functions --> 
				onDivScroll = function () {
					img = this.getElementsByClassName('blur-scroll-image')[0];
					scrollAmount = this.scrollTop;
					marginTop = 220;
					if (scrollAmount > marginTop) scrollAmount = marginTop;
					img.setAttribute('style', 'margin-top:' + (-marginTop + scrollAmount) + 'px;');
				};
		scrollItems.forEach(function(scrollItem) {
			scrollItem.onscroll = onDivScroll;
		});


	};
	if (document.body) {
		blurScrollSetup();
	} else {
		window.setTimeout(blurScrollSetup, 1000);
		console.log('setTimeout');
	}
})();