import ApiActions from "services/shared/api/ApiActions";
import { Delete, Get, Post, Put } from "./api/Api";
import { sendRequest } from "./api/api-middleware";

export const LoginUser = (json) => {
  return sendRequest(() => Post(ApiActions.Login, json), [401, 404]);
};

export const FindUser = (uuid) => {
  return sendRequest(() => Get(`${ApiActions.User}?uuid=${uuid}`));
};

export const EditUser = (json) => {
  return sendRequest(() => Put(ApiActions.User, json));
};

export const DeleteUser = () => {
  return sendRequest(() => Delete(ApiActions.User));
};
