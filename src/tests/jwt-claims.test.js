import { configure, EnzymeAdapter } from "enzyme";
import claims from "services/shared/jwt-claims";

configure({ adapter: new EnzymeAdapter() });

test("Check if claims exists", () => {
  expect(claims).toEqual({
    accountRole: "role",
    userName: "Username",
    uuid: "Uuid",
    expires: "exp",
  });
});
