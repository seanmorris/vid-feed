import axios from 'axios';

const API_HOST = '//localhost:3000'

const getCsrf = () => {
  const API_PATH  = '/csrf';
  return axios.get(API_HOST + API_PATH, {withCredentials: true})
  .then(response => response.data.token)
  .catch(error => { throw error.response.data })
};

const apiGet = path => query => {
	const params = String(new URLSearchParams(query));
	return axios.get(API_HOST + path + '?' + params, {withCredentials: true})
  .then(response => response.data)
  .catch(error => { throw error.response.data })
};

const apiPost = path => packet => {
  return getCsrf().then(authenticity_token => {
    const fullPacket = {...packet, authenticity_token};
    return axios.post(API_HOST + path, fullPacket, {withCredentials: true})
    .then(response => response.data)
    .catch(error => { throw error.response.data })
  });
};

const apiPatch = path => packet => {
  return getCsrf().then(authenticity_token => {
    const fullPacket = {...packet, authenticity_token};
    return axios.patch(API_HOST + path, fullPacket, {withCredentials: true})
    .then(response => response.data)
    .catch(error => { throw error.response.data })
  });
};

const apiDelete = path => () => {
  return getCsrf().then(authenticity_token => {
    return axios.delete(API_HOST + path, {withCredentials: true, headers: {'x-csrf-token': authenticity_token}})
    .then(response => response.data)
    .catch(error => { throw error.response.data })
  });
};

const apiWrap = (pathGen, callback) => (...args) => callback(pathGen(args[0]))(...args.slice(1));

const apiGen = stem => ({
  list:    apiGet(`${stem}.json`),
  create: apiPost(`${stem}.json`),
  read:   apiWrap(id => `${stem}/${id}.json`, path => apiGet(path)),
  update: apiWrap(id => `${stem}/${id}.json`, path => apiPatch(path)),
  delete: apiWrap(id => `${stem}/${id}.json`, path => apiDelete(path)),
});

export {getCsrf, apiGet, apiPost, apiPatch, apiDelete, apiWrap, apiGen};
