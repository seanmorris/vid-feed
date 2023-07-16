import { apiGen, apiGet } from './base';

const quipApi = apiGen('/quips');;

quipApi.byVideo = apiGet('/quips/by-video.json');

export default quipApi;
