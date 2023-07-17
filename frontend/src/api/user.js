import { apiGet, apiPost, apiPatch, apiDelete, apiWrap } from './base';

const userApi = {
  current: apiGet('/users/current.json'),
  signUp:  apiPost('/users.json'),
  update:  apiPatch('/users.json'),
  signIn:  apiPost('/users/sign_in.json'),
  signOut: apiDelete('/users/sign_out.json'),
	read:    apiWrap(id => `/users/${id}.json`, path => apiGet(path)),
};

export default userApi;
