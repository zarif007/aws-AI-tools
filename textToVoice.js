const AWS = require("aws-sdk");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: "us-east-1", // Replace with your desired AWS region
});

const polly = new AWS.Polly();
const params = {
  OutputFormat: "mp3",
  Text: "Hello, world!", // Replace with your desired text
  VoiceId: "Joanna", // Replace with the desired voice
};

polly.synthesizeSpeech(params, (err, data) => {
  if (err) {
    console.log("Error:", err);
  } else if (data.AudioStream instanceof Buffer) {
    // Save the audio stream to a file
    // Replace "output.mp3" with your desired output file path
    const fs = require("fs");
    fs.writeFile("output.mp3", data.AudioStream, (err) => {
      if (err) {
        console.log("Error saving audio:", err);
      } else {
        console.log("Audio saved successfully!");
      }
    });
  }
});
