window.addEventListener('DOMContentLoaded', function() {
	var formName = 'contact-form',
			form = document.forms[ formName || 0],
			submit = document.getElementById('contactSubmit'),
			name,
			email,
			message,
			regEmail,
			i = 0,

	contactValidator = function () {
		console.log('contactValidator');
		form.addEventListener('submit', onContactFormSubmit);

	},

	onContactFormSubmit = function () {
		event.preventDefault();
		name    = form['name'].value;
		email   = form['email'].value;
		message = form['message'].value;
		
		if (name & email & message) return true;
		console.log('submit');
		
		// Test to make sure email is valid
		regEmail = /[^@;#]+@[^@.#;]+[.][^@.#;]{3,4}/ ; //new RegEx()
									// [^@;#]+ == any number of characters except @;#
									// @       == must contain the @ symbol here
									// [^@.#;] == any number of characters except @.#;
									// [.]     == must contain a period here
									// [^@.#;]{3,4}  == 3-4 of any character except @.#;
		if ( regEmail.test(email) ) {
			console.log('test true')
			return true;
		}
		return false
	};


	contactValidator();
});