const comprehend = require("@aws-sdk/client-comprehend");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const client = new comprehend.Comprehend({
  region: "us-east-1",
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

const text = "I love this product! It is the best I have ever used";

async function detectSentiment() {
  const detectSentimentResult = await client.detectSentiment({
    Text: text,
    LanguageCode: "en",
  });

  const sentiment = detectSentimentResult.Sentiment;
  console.log(sentiment); // 'POSITIVE'
}

detectSentiment();
