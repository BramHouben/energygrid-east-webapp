import { configure, EnzymeAdapter } from "enzyme";
import accountRole from "services/shared/account-role";

configure({ adapter: new EnzymeAdapter() });

test("Check if roles exists", () => {
  expect(accountRole).toEqual({
    Customer: "customer",
    LargeScaleCustomer: "largeScaleCustomer",
    Admin: "admin",
    UtilityCompany: "utilityCompany",
    ResponsibleParty: "responsibleParty",
  });
});
