import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite: format currency", () => {
  it("converts the cents to dollars", () => {
    expect(formatCurrency(1095)).toEqual("10.95");
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("numbers rounded to nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });
});
