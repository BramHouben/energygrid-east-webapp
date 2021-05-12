const apiUrl = "http://localhost:8081/";

const user = `${apiUrl}user`;
const weather = `${apiUrl}weather/`;
const authentication = `${apiUrl}authentication/`;
const region = `${apiUrl}region/`;
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
  EnergyMarket: `${energyMarket}`,
};

export default actions;
