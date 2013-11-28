window.addEventListener('DOMContentLoaded', function() {
	var formName = 'contact-form',
			form     = document.forms[ formName || 0],
			submit   = document.getElementById('contactSubmit'),
			name     = form['name'].value,
			email    = form['email'].value,
			message  = form['message'].value,
			resultMessage = form.nextElementSibling,
			resultClassName = resultMessage.className,
			originalAction = form.action,
			regEmail,
			i        = 0,

	contactValidator = function () {
		form.addEventListener('submit', onContactFormSubmit);
		
		form['name'].onblur = validateInputs;
		form['email'].onblur = validateInputs;
		form['message'].onblur = validateInputs;
	},

	clearErrors = function () {
		resultMessage.className = resultClassName;
	},

	displayErrors = function () {
		resultMessage.className += " error";
	},

	validateInputs = function () {
		if ( inputsHaveValue() ) {
			clearErrors();
		} else {
			displayErrors();
		}
	},

	emailIsValid = function () {
		regEmail = /[^@;#]+@[^@.#;]+[.][^@.#;]{3,4}/ ;
									// [^@;#]+ == any number of characters except @;#
									// @       == must contain the @ symbol here
									// [^@.#;] == any number of characters except @.#;
									// [.]     == must contain a period here
									// [^@.#;]{3,4}  == 3-4 of any character except @.#;
		if ( regEmail.test(email) ) {
			return true;
		} else {
			return false;
		}
	},

	inputsHaveValue = function () {
		name    = form['name'].value;
		email   = form['email'].value;
		message = form['message'].value;
		
		if (!name | !email | !message) {
			return false;
		} else {
			return true;
		}
	},

	onContactFormSubmit = function () {
		if ( inputsHaveValue() ) {
			clearErrors();
		} else {
			displayErrors();
			form.action = '';
			return false;
		}
		
		if ( emailIsValid() ) {
			resultMessage.className += " success";
			form.action = originalAction;
			return true;
		} else {
			resultMessage.className += " email-error";
		}

		form.action = '';
		return false;
	};

	contactValidator();
});