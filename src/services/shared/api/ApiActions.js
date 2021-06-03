const apiUrl = "http://localhost:8081/";

const user = `${apiUrl}user`;
const weather = `${apiUrl}weather/`;
const authentication = `${apiUrl}authentication/`;
const region = `${apiUrl}region/`;
const wind = `${apiUrl}scenario/wind`;
const solar = `${apiUrl}scenario/solar`;

//If simulation service exist, we can call one request for the scenario's. Now we have only the latest from solar
const scenario = `${apiUrl}scenario/wind/latest/`;
const simulation = `http://localhost:8120/solar/production`;
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
  Scenarios: `${scenario}`,
  TodayScenarioWind: `${wind}/today`,
  TodayScenarioSolar: `${solar}/today`,
  OverviewSolarProduction: `${simulation}/overview`,
  ResultsSolarProduction: `${simulation}/results`,
};

export default actions;
