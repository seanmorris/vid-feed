import { apiGet, apiPost, apiPatch, apiDelete } from './base';

const userApi = {
  current: apiGet('/users/current.json'),
  signUp:  apiPost('/users.json'),
  update:  apiPatch('/users.json'),
  signIn:  apiPost('/users/sign_in.json'),
  signOut: apiDelete('/users/sign_out.json'),
};

export default userApi;
