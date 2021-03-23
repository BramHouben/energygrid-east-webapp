const apiUrl = "http://localhost:8081/";

const user = `${apiUrl}user/`;
const authentication = `${apiUrl}authentication/`

// All paths need to end with a '/'

const actions = {
  User: user,
  Login: `${authentication}login`
};

export default actions;
