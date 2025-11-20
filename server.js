import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a friendly movie recommender. Suggest 2–4 movies with short explanations each." },
        { role: "user", content: userMessage }
      ],
      temperature: 0.8
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI request failed" });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
