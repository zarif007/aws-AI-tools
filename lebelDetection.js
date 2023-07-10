const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});

const rekognition = new AWS.Rekognition();

const imageUrl =
  "https://i.pinimg.com/originals/77/92/07/7792075307c9ffce77574c2547004f0b.jpg"; // Replace with the URL of the image you want to analyze

axios
  .get(imageUrl, { responseType: "arraybuffer" })
  .then((response) => {
    const imageBytes = response.data;

    const params = {
      Image: {
        Bytes: imageBytes,
      },
      MaxLabels: 10, // Maximum number of labels to return
      MinConfidence: 70, // Confidence threshold for labels
    };

    rekognition.detectLabels(params, (err, data) => {
      if (err) {
        console.error("Error:", err);
      } else {
        const labels = data.Labels;

        if (labels.length > 0) {
          console.log("Labels detected:");
          labels.forEach((label) => {
            console.log("  - Name:", label.Name);
            console.log("    Confidence:", label.Confidence.toFixed(2));
          });
        } else {
          console.log("No labels detected.");
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error retrieving the image:", error);
  });
