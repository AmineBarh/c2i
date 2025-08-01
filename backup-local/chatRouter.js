const express = require("express");
const axios = require("axios");
const fetchWebsiteKnowledge = require("../utils/fetchWebsiteKnowledge");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Received POST /api/chat request with body:", req.body);
  const { message } = req.body;

  try {
    const knowledge = await fetchWebsiteKnowledge();

    const fullPrompt =
      "Tu es un assistant virtuel pour un site web, tu réponds uniquement en français en te basant sur les informations suivantes :\n\n" +
      knowledge +
      "\n\nQuestion de l'utilisateur : " +
      message;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3-coder:free",
        messages: [
          {
            role: "system",
            content:
              "Tu es un assistant virtuel dédié au site web de l’entreprise C2I & Training. " +
              "Tu dois répondre exclusivement en français, de manière claire, polie et utile. " +
              "\n\nInformations importantes à utiliser quand pertinent :\n" +
              "- 📞 Téléphone : +216 12 345 678\n" +
              "- 📱 WhatsApp : +216 98 765 432\n" +
              "- 📍 Emplacement : El Zeouiet\n" +
              "- ✉️ Email : info@c2i.com / contact@c2i.com \n" +
              "- 🌐 Nom du site : C2I\n" +
              "- 🏢 Nom de l’entreprise : C2I & Training\n\n" +
              "Tu es un assistant pour un site web professionnel. Réponds toujours en français. Ne jamais dire que tu es un robot ou un assistant virtuel. Ne jamais utiliser de langage familier ou d'argot. Réponds toujours de manière professionnelle et utile. Ne jamais dire que tu ne sais pas ou que tu n'es pas sûr. Réponds toujours avec confiance et précision. Ne jamais utiliser ** ou de caractères spéciaux dans tes réponses. Repondre de maniere claire et concise, s'il faut revenir sur une question, le faire de manière polie et professionnelle. Revenire à la ligne si nécessaire.",
          },
          { role: "user", content: fullPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000",
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Chat error:", error?.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la communication avec OpenRouter." });
  }
});

module.exports = router;
