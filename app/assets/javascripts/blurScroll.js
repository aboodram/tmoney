window.addEventListener('DOMContentLoaded', function() {
	console.log('blurScroll.js');

	var blurScrollSetup = function () {
		var scrollItems = document.getElementsByClassName('college'),
				scrollItems = Array.prototype.slice.call(scrollItems), //Make it an array, not array-like obj.
				img,
				scrollAmount,
				marginTop = 220,
				// functions --> 
				onDivScroll = function () {
					img = this.getElementsByClassName('blur-scroll-image')[0];
					scrollAmount = this.scrollTop;

					if (scrollAmount > marginTop) scrollAmount = marginTop;
					img.setAttribute('style', 'margin-top:' + (-marginTop + scrollAmount) + 'px;');
				};
		
		scrollItems.forEach(function(scrollItem) {
			scrollItem.onscroll = onDivScroll;
		});
	};
	blurScrollSetup();
});