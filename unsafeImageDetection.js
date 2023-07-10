const AWS = require("aws-sdk");
const { default: axios } = require("axios");
AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});
const rekognition = new AWS.Rekognition();

const imageUrl =
  "https://www.socsportswear.com/INTERSHOP/static/WFS/Stadium-SOC-Site/fr/Stadium/en_US/Detail/350014_101_SOC_W%20BRIEF_M1.png";

axios
  .get(imageUrl, { responseType: "arraybuffer" })
  .then((response) => {
    const imageBytes = response.data;

    const params = {
      Image: {
        Bytes: imageBytes,
      },
      MinConfidence: 70, // Adjust the confidence threshold as per your requirement
    };

    rekognition.detectModerationLabels(params, (err, data) => {
      if (err) {
        console.error("Error:", err);
      } else {
        const moderationLabels = data.ModerationLabels;

        if (moderationLabels.length > 0) {
          console.log("Unsafe content detected:");
          moderationLabels.forEach((label) => {
            console.log("  - Label:", label.Name);
            console.log("    Confidence:", label.Confidence.toFixed(2));
          });
        } else {
          console.log("No unsafe content detected.");
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error retrieving the image:", error);
  });
