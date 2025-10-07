// /services/clarifaiTest.js
import { predictFood } from "./clarifaiClient.js";
import fs from "fs";
import path from "path";

const testUrl = "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltce581a92bf401b41/667084bfeba5621147322198/ways-to-use-fruit-hero.jpg";

const runTest = async () => {
  const results = await predictFood(testUrl);

  console.log("Detected ingredients:", results);

  // NEW: ensure the directory exists
  const resultsDir = path.resolve("./public");
  if (!fs.existsSync(resultsDir)) {
    fs.mkdirSync(resultsDir, { recursive: true });
  }

  // Save results to JSON file
  const resultsPath = path.join(resultsDir, "clarifaiResults.json");
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));

  console.log("Clarifai results saved to:", resultsPath);
};

runTest();


// To run this test, use the command: node services/clarifaiTest.js