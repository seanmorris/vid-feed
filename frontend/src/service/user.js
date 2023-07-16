import userApi from '../api/user';

let currentUser = null;

const handleCurrent = result => {
	userService.signedIn = false;
	if (!currentUser && result && result.id) {
		handleLogin(result);
		currentUser = result;
		userService.signedIn = true;
	}
};

const handleCurrentError = error => {
	console.warn(error);
};

const handleLogin = result => {
	userService.signedIn = true;
	document.dispatchEvent(new CustomEvent('user-logged-in', {detail: result}));
};

const handleLoginError = error => {
	document.dispatchEvent(new CustomEvent('user-logged-in-failed', {detail: error}));
};

const handleLogout = result => {
	userService.signedIn = false;
	document.dispatchEvent(new CustomEvent('user-logged-out', {detail: result}))
};

const handleLogoutError = error => {
	document.dispatchEvent(new CustomEvent('user-logged-out-failed', {detail: error}))
};

const handleRegistered = result => {
	document.dispatchEvent(new CustomEvent('user-registered', {detail: result}))
	handleLogin(result);
};

const handleRegisterError = error => {
	document.dispatchEvent(new CustomEvent('user-register-failed', {detail: error}));
}

const userService = {

	signedIn: false,

	current: function() {
    const current = userApi.current()
		.catch(handleCurrentError);

		current.then(handleCurrent)

		return current;
  },

	signIn: function(email, password) {

    const signIn = userApi.signIn({user: {email, password}});

		signIn
		.then(handleLogin)
		.catch(handleLoginError);

    return signIn;
  },


  signOut: function() {
    const signOut = userApi.signOut()
		.catch(handleLogoutError);

    signOut.then(handleLogout);

    return signOut;
  },

  register: function(formData) {

		const register = userApi.signUp(formData)

		register
		.then(handleRegistered)
		.catch(handleRegisterError);

		return register;
	},
};

export default userService;
