import { configure, EnzymeAdapter } from "enzyme";
import paths from "services/shared/router-paths";

configure({ adapter: new EnzymeAdapter() });

test("Check if paths ends with /", () => {
  Object.values(paths).forEach((action) => {
    expect(action.substr(action.length - 1)).toEqual("/");
  });
});
