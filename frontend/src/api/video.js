import { apiGen, apiGet } from './base';

const videoApi =  apiGen('/videos');

videoApi.byUser = apiGet('/videos/by-user.json');

export default videoApi;
