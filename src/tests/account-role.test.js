import { configure, EnzymeAdapter } from "enzyme";
import accountRole from "services/shared/account-role";

configure({ adapter: new EnzymeAdapter() });

test("Check if roles exists", () => {
  expect(accountRole).toEqual({
    Customer: "CUSTOMER",
    LargeScaleCustomer: "LARGE_SCALE_CUSTOMER",
    Admin: "ADMIN",
    GridOperator: "GRID_OPERATOR",
    UtilityCompany: "UTILITY_COMPANY",
    ResponsibleParty: "RESPONSIBLE_PARTY",
  });
});
