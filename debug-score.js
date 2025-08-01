// Quick debug script to test the scoring

function dollars(raw) {
  if (typeof raw === "number") return raw;
  if (!raw) return 0;
  const str = raw
    .toString()
    .replace(/[^\d\-–\.kK]/g, "")   // drop $, commas, etc.
    .toLowerCase();

  const parts = str.split(/[-–]/); // handle ranges
  const nums  = parts.map(p => {
    const mult = p.includes("k") ? 1_000 : 1;
    return parseFloat(p.replace("k", "")) * mult;
  }).filter(n => !isNaN(n));

  if (!nums.length) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length; // midpoint if range
}

// Test the occupancy cost parsing
const testCost = "roughly $30/sqft or ~$48k per month";
console.log("Input:", testCost);
console.log("Parsed dollars:", dollars(testCost));

// Test gatekeeper conditions
const kids = 54088;
const occCs = dollars(testCost);
const compN = 6;

console.log("\nGatekeeper checks:");
console.log("Kids:", kids, ">=", 20000, "?", kids >= 20000);
console.log("Occupancy cost:", occCs, "<=", 35, "?", occCs <= 35);
console.log("Competitors:", compN, "<=", 10, "?", compN <= 10);

const gatekeeperPassed = kids >= 20000 && occCs <= 35 && compN <= 10;
console.log("All gatekeepers passed?", gatekeeperPassed);