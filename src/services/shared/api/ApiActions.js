const apiUrl = "http://localhost:8081/";

const user = `${apiUrl}user/`;
const weather = `${apiUrl}weather/`;
const authentication = `${apiUrl}authentication/`;
const region = `${apiUrl}region/`;
// All paths need to end with a '/'

const actions = {
  User: user,
  CurrentWeather: `${weather}current/`,
  ProvinceInfo: `${region}provinceinfo/`,
  CityInfo: `${region}cityinfo/`,
  CityInfoStats: `${region}cityinfostats/`,
  AllCitiesRegion: `${region}citiesregion/`,
  StreetInfo: `${region}streetinfo`,
  Login: `${authentication}login/`,
};

export default actions;
