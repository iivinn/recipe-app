import { predictFood } from "../services/clarifaiClient.js";

const testUrl = "https://images.contentstack.io/v3/assets/bltcedd8dbd5891265b/bltce581a92bf401b41/667084bfeba5621147322198/ways-to-use-fruit-hero.jpg";

const runTest = async () => {
  const results = await predictFood(testUrl);
  console.log(results);
};

runTest();

// To run this test, use the command: node C:\Users\adamh\Desktop\recipe-app\app\tests\clarifaiTest.js
