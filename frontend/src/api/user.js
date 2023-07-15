import { apiGet, apiPost, apiDelete } from './base';

const userApi = {
  current: apiGet('/users/current.json'),
  signUp:  apiPost('/users.json'),
  signIn:  apiPost('/users/sign_in.json'),
  signOut: apiDelete('/users/sign_out.json'),
};

export default userApi;