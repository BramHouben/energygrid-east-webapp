// const apiUrl = "http://localhost:8081/";
const apiUrl = "http://20.84.168.136:8081/";

const user = `${apiUrl}user/`;
const weather = `${apiUrl}weather/`;
const authentication = `${apiUrl}authentication/`;
const region = `${apiUrl}region/`;
const wind = `${apiUrl}scenario/wind/`;
const solar = `${apiUrl}scenario/solar/`;
const nuclearSimulation = `${apiUrl}simulation/nuclear/`;
const production = `${apiUrl}solar/production/`;
const websocket = `http://52.154.158.81/ws-energy-grid/`;
//If simulation service exist, we can call one request for the scenario's. Now we have only the latest from solar
const scenario = `${apiUrl}scenario/`;
// All paths need to end with a '/'
const balance = `${apiUrl}energybalance/`;
const energyMarket = `${apiUrl}energymarket/`;
const usage = `${apiUrl}usage/`;

const actions = {
  User: user,
  CurrentWeather: `${weather}current/`,
  ForeCast: `${weather}forecast/`,
  ProvinceInfo: `${region}province/info/`,
  CityInfo: `${region}city/info/`,
  CityInfoStats: `${region}city/stats/`,
  AllCitiesRegion: `${region}cities/region/`,
  StreetInfo: `${region}street/info/`,
  Login: `${authentication}login/`,
  CreateScenarioWind: `${wind}create/`,
  CreateScenarioSolar: `${solar}create/`,
  latestbalance: `${balance}currentbalance/`,
  EnergyMarket: `${energyMarket}`,
  ScenariosWind: `${scenario}wind/latest/`,
  ScenariosSolar: `${scenario}solar/latest/`,
  ScenariosNuclear: `${scenario}nuclear/latest/`,
  TodayScenarioWind: `${wind}today/`,
  TodayScenarioSolar: `${solar}today/`,
  getLatestMarktInfo: `${energyMarket}`,
  OverviewSolarProduction: `${production}overview/`,
  AddOperator: `${user}operator/`,
  DeleteOperator: `${user}operator/`,
  GetOperator: `${user}operator/`,
  ResultsSolarProduction: `${production}results/`,
  AllNuclearSimulations: `${nuclearSimulation}all/`,
  CreateSimulationNuclear: `${nuclearSimulation}create/`,
  CreateScenarioNuclear: `${scenario}nuclear/create/`,
  getBalanceWebSocket: `${websocket}`,
  UsageDay: `${usage}day/`,
};

export default actions;
