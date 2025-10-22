// Your PAT (Personal Access Token) can be found in the Account's Security section
const PAT = "4eceeb0542e94e379a6fc133d25c596b";
// Specify the correct user_id/app_id pairings
// Since you're making inferences outside your app's scope
const USER_ID = "clarifai";
const APP_ID = "main";
// Change these to whatever model and image URL you want to use
const MODEL_ID = "food-item-recognition";
const MODEL_VERSION_ID = "1d5fd481e0cf4826aa72ec3ff049e044";

/**
 * predictFood - Predicts food items in an image
 * @param {string} imageData - Base64 encoded image data or public URL
 * @param {boolean} isBase64 - Whether the imageData is base64 encoded
 * @returns {Array} - [{ name: "apple", probability: 0.98 }, ...]
 */
export const predictFood = async (
  imageData: string,
  isBase64: boolean = false,
) => {
  try {
    const imageInput = isBase64 ? { base64: imageData } : { url: imageData };

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: imageInput,
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

    const result = await response.json();

    if (result.status.code !== 10000) {
      console.error("Error predicting food:", result);
      return [];
    }

    return result.outputs[0].data.concepts.map((item: any) => ({
      name: item.name,
      probability: item.value,
    }));
  } catch (error) {
    console.error("Error predicting food:", error);
    return [];
  }
};
