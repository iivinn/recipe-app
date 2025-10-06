// app/services/clarifaiClient.js
import "dotenv/config";

const PAT = process.env.CLARIFAI_API_KEY;
const USER_ID = "clarifai";   // default public user (replace if needed)
const APP_ID = "main";        // default app (replace if you created your own)

const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

/**
 * predictFood - Predicts food items in an image
 * @param {string} imageUriOrUrl - Public URL or local URI
 * @returns {Array} - [{ name: "apple", probability: 0.98 }, ...]
 */
export const predictFood = async (imageUriOrUrl) => {
  try {
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: imageUriOrUrl,
            },
          },
        },
      ],
    });

    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Key ${PAT}`,
        },
        body: raw,
      }
    );

    const result = await response.json();

    if (result.status.code !== 10000) {
      console.error("Error predicting food:", result);
      return [];
    }

    return result.outputs[0].data.concepts.map((item) => ({
      name: item.name,
      probability: item.value,
    }));
  } catch (error) {
    console.error("Error predicting food:", error);
    return [];
  }
};
