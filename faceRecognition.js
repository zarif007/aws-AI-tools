const AWS = require("aws-sdk");
const axios = require("axios");

AWS.config.update({
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-east-1",
});

const rekognition = new AWS.Rekognition();

const imageUrl =
  "https://i.pinimg.com/originals/77/92/07/7792075307c9ffce77574c2547004f0b.jpg";

axios
  .get(imageUrl, { responseType: "arraybuffer" })
  .then((response) => {
    const imageBytes = response.data;

    const params = {
      Image: {
        Bytes: imageBytes,
      },
    };

    rekognition.recognizeCelebrities(params, (err, data) => {
      if (err) {
        console.error("Error:", err);
      } else {
        const celebrities = data.CelebrityFaces;

        if (celebrities.length > 0) {
          console.log("Celebrities detected:");
          celebrities.forEach((celebrity) => {
            console.log("  - Name:", celebrity.Name);
            console.log(
              "    Confidence:",
              celebrity.MatchConfidence.toFixed(2)
            );
          });
        } else {
          console.log("No celebrities detected.");
        }
      }
    });
  })
  .catch((error) => {
    console.error("Error retrieving the image:", error);
  });
