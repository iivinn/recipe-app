// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = process.env.CLARIFAI_API_KEY;
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = "clarifai";
const APP_ID = "main";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

/**
 * predictFood - Predicts food items in an image
 * @param {string} imageUriOrUrl - Public URL or local URI
 * @returns {Array} - [{ name: "apple", probability: 0.98 }, ...]
 */
export const predictFood = async (imageUriOrUrl: string) => {
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

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Key ${PAT}`,
      },
      body: raw,
    };

    const response = await fetch(
      `https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
      requestOptions,
    );

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error predicting food:", error);
    return [];
  }
};
