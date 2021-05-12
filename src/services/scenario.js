import ApiActions from "services/shared/api/ApiActions";
import { Post } from "./shared/api/Api";
import { sendRequest } from "./shared/api/api-middleware";

export const CreateScenarioWind = (params, json) => {
  return sendRequest(() => Post(ApiActions.CreateScenarioWind + params, json));
};
