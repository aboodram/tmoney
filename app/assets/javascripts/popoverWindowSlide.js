window.addEventListener('DOMContentLoaded', function() {

	var popoverButton,
			subWindows,
	    subWindows = document.getElementsByClassName('sub-window'),
			openClass  = 'open',

	// functions ->
	  setupPopoverListeners = function () {
	  	//find the right elements
	  	popoverButton = document.getElementsByClassName('bio')[0].getElementsByClassName('popoverButton');

	  	for (var i = 0; i < popoverButton.length; i++) {
        popoverButton[i].addEventListener('click', onPopoverButtonClick);
	  	}
	  },
	  
	  onPopoverButtonClick = function () {
	  	var a,
	  	    popoverClasses = makeArrayClassNamesArray(this),
	  	    popoverclass,  // = popoverClasses[1],
	  	    subWindowClasses,
	  	    subWindowClass,
	  	    i, r, w;

	  	// match specialty classname with the specialty classname of sub-window
	  	for ( i = 0; i < popoverClasses.length; i++) {  								// Iterate through the clicked item's classes
				popoverClass = popoverClasses[i]
        for ( r = 0; r < subWindows.length; r++) { 									// Iterate through the possible subWindows
	        subWindowClasses = makeArrayClassNamesArray(subWindows[r]);

	        for ( w = 0; w < subWindowClasses.length; w++) { 					// Iterate through the subWindows classes     
            subWindowClass = subWindowClasses[w];
            if (subWindowClass == popoverClass) { 											// Match the clicked item's class (specialty, location, etc)
            	onClassMatch(subWindows[r]);												// with the subWindows class (specialty, location, etc)
            	return;
            }
          };
        };
	  	};

	  },

	  // Possible refactor of the triple nested for loops above...
	  iterateAndSetVariable = function (list, variable, func) {
	  	for (var i = 0; i < list.length; i++) {  
	  		variable = list[i];
	  		if (func) {
	  			func();
	  		}
			};
	  	return variable;
	  },

	  makeArrayClassNamesArray = function (DOMobject) {
	  	return DOMobject.className.split(" ");
	  },

	  hasClassName = function (DOMobject, className) {
	  	return DOMobject.classList.contains(className); //DOMTokenList
	  },

	  groupHasClassName = function (DOMgroup, className) {
	  	
	  	for (var i = 0; i < DOMgroup.length; i++) {
	  		if ( hasClassName(DOMgroup[i], className) ) {
	  			return true;
	  		}
	  	}

	  },

	  removeClassName = function (DOMobject, className) {
	  	DOMobject.classList.remove(className);
	  },

	  onClassMatch = function (subWindow) {
	  	// if any subWindows has an open class removeClassName, but still add the className on a new click

		  	if ( !groupHasClassName(subWindows, openClass) ) {
			  	subWindow.className += ' open';
		  	} else if ( hasClassName(subWindow, openClass) ) {
		  		removeClassName(subWindow, openClass);
	  		} else if ( !hasClassName(subWindow, openClass) ) {
					for (var i = 0; i < subWindows.length; i++) {
						removeClassName(subWindows[i], openClass);
					}
					subWindow.className += ' open';
	  		};
	  	// if ( hasClassName(subWindow, openClass) ) {
	  	// 	removeClassName(subWindow, openClass);
	  	// } else {
	  		
	  	// }

	  };

		setupPopoverListeners();
});