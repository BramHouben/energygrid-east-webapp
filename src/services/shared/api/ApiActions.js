const apiUrl = "http://localhost:8160/";

const user = `${apiUrl}user/`;
const weather = `${apiUrl}weather/`;
const authentication = `${apiUrl}authentication/`;
const region = `${apiUrl}region/`;
const balance = `${apiUrl}energybalance/`;
// All paths need to end with a '/'

const actions = {
  User: user,
  CurrentWeather: `${weather}current/`,
  ProvinceInfo: `${region}province/info/`,
  CityInfo: `${region}city/info/`,
  CityInfoStats: `${region}city/stats/`,
  AllCitiesRegion: `${region}cities/region/`,
  StreetInfo: `${region}street/info/`,
  Login: `${authentication}login/`,
  latestbalance: `${balance}currentbalance/`,
};

export default actions;
