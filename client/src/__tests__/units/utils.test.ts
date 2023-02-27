import { getNameInitial } from "src/utils";

describe("utils functions tests", () => {
  it("getNameInitial: should get correct initials when have first and last name", () => {
    const result = getNameInitial("Alisson Gabriel");
    const expected = "AG";

    expect(result).toEqual(expected);
  });

  it("getNameInitial: should get correct initials when have only first name", () => {
    const result = getNameInitial("Alisson");
    const expected = "AL";

    expect(result).toEqual(expected);
  });
});
