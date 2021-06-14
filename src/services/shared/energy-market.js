import ApiActions from "services/shared/api/ApiActions";
import { Get, Post } from "./api/Api";
import { sendRequest } from "./api/api-middleware";

export const BuyOrSellEnergy = (json) => {
  return sendRequest(() => Post(ApiActions.EnergyMarket, json));
};

export const EnergyHistory = () => {
  return sendRequest(() => Get(ApiActions.EnergyMarket));
};
