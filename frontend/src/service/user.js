import userApi from '../api/user';

let currentUser = null;

const handleCurrent = result => {
	if (!currentUser && result && result.id) {
		handleLogin(result);
		currentUser = result;
	}
};

const handleCurrentError = error => {
	console.warn(error);
};

const handleLogin = result => {
	console.log(result);
	document.dispatchEvent(new CustomEvent('user-logged-in', {detail: result}));
};

const handleLoginError = error => {
	document.dispatchEvent(new CustomEvent('user-logged-in-failed', {detail: error}));
};

const handleLogout = result => {
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

  register: function(email, password, password_confirmation, name) {

		const register = userApi.signUp({user: {name, email, password, password_confirmation}})

		register
		.then(handleRegistered)
		.catch(handleRegisterError);

		return register;
	},
};

export default userService;
