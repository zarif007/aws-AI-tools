const comprehend = require("@aws-sdk/client-comprehend");

const client = new comprehend.Comprehend({
  region: "us-east-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
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
