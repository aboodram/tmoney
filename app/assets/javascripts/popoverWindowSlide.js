(function() {
	console.log('popoverWindowAccordian.js');

	var infoRows;

	var // functions ->
	  popoverSetupListeners = function () {
	  	//find the right elements
	  	infoRows = document.getElementByClassName('bio-body').getElementByClassName('info-row');
	  	for (var i = 0; i < infoRows.length; i++) {
        infoRows[i].addEventListener('click', onInfoRowClick);
	  	}
	  },
	  
	  onInfoRowClick = function () {
    	  
	  };



	if (document.body) {
		popoverSetupListeners();
	} else {
		window.setTimeout(accordianList, 1000);
	}
})();