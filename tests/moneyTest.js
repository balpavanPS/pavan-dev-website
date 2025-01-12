import { formatCurrency } from "../scripts/utils/money.js";

console.log("test suite: tests on format currenncy");
console.log("converts the cents to dollars");
if (formatCurrency(1095) === "10.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("works with 0");
if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("numbered rounded to nearest cent");
if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}
