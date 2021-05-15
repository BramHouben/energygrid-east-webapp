const apiUrl = "http://localhost:8081/";

const user = `${apiUrl}user`;
const weather = `${apiUrl}weather/`;
const authentication = `${apiUrl}authentication/`;
const region = `${apiUrl}region/`;
const wind = `${apiUrl}scenario/wind`;
const solar = `${apiUrl}scenario/solar`;
// All paths need to end with a '/'
const balance = `${apiUrl}energybalance/`;
const energyMarket = `${apiUrl}market/`;

const actions = {
  User: user,
  CurrentWeather: `${weather}current/`,
  ProvinceInfo: `${region}province/info/`,
  CityInfo: `${region}city/info/`,
  CityInfoStats: `${region}city/stats/`,
  AllCitiesRegion: `${region}cities/region/`,
  StreetInfo: `${region}street/info/`,
  Login: `${authentication}login/`,
  CreateScenarioWind: `${wind}/create`,
  CreateScenarioSolar: `${solar}/create`,
  latestbalance: `${balance}currentbalance/`,
  EnergyMarket: `${energyMarket}`,
};

export default actions;
