import ApiActions from "services/shared/api/ApiActions";
import { Post } from "./shared/api/Api";
import { sendRequest } from "./shared/api/api-middleware";

export const Register = async (json) => {
  return await sendRequest(() => Post(ApiActions.Register, json));
};
