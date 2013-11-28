/* Raw JavaScript li Drawer
	Taylor R. Allred
	August 2013
	TaylorAllred.Com
*/

window.addEventListener('DOMContentLoaded', function(){

	accordianList = function(options) {
	var accordianList,
			dresser,
			drawer,
			options = {
				speed: 1, //1-4 or milliseconds
				onHover: '',
				onClick: '',
				classActive: 'active',
				classHover: 'hover',
				classClosed: 'closed',
				classOpen: 'open'
			},
			defaultDrawerClassName = 'drawer';

	var // functions ->
			findDressers = function (ul) {
				for (var i = 0; i < ul.length; i ++) {
					//ul[i].addEventListener('click', onDresserClick)
					drawers = ul[i].children;
					findDrawers(drawers);
				} 
			},
			findDrawers = function (li) {
				for (var i = 0; i < li.length; i ++) {
					drawer = li[i].addEventListener('click', onDrawerClick);
				}
			};
			// onDresserClick = function (){
			// 	console.log("this: ");
			// 	console.log(this);
			// },
			onDrawerClick = function (){
				// close all the drawers in the dresser
				var drawers = this.parentElement.children,
						regEx;
						//= new RegExp('');
				regEx = /\bopen\b/;
				
				if ( regEx.test(this.className) ) {
					this.className = defaultDrawerClassName;	
					return;	
				};
				for (var i = 0; i < drawers.length; i++) {
					drawers[i].className = defaultDrawerClassName;
				};
				this.className += " open";
			};
		// Find my dresser. Dresser is the container ul for the li.drawer
		dresser =  document.getElementsByClassName('dresser');

		findDressers(dresser);
	}

	accordianList();
});