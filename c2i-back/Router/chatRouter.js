const express = require("express");
const router = express.Router();
const axios = require("axios");
const fetchWebsiteKnowledge = require("../utils/fetchWebsiteKnowledge");
require("dotenv").config();

router.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const knowledge = await fetchWebsiteKnowledge();

    const fullPrompt = `
Tu es un assistant virtuel pour un site web. Tu réponds uniquement en français en te basant sur les informations suivantes :

${knowledge}

Question de l'utilisateur : ${message}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1-distill-llama-70b:free",
        messages: [
          {
            role: "system",
            content:
              "Tu es un assistant virtuel dédié au site web de l’entreprise **C2I & Training**. Tu dois répondre exclusivement en **français**, de manière claire, polie et utile. Voici des informations importantes que tu dois **utiliser si elles sont pertinentes** dans la conversation : \n- 📞 Téléphone : +216 12 345 678 \n - 📱 WhatsApp : +216 98 765 432  \n - 📍 Emplacement : El Zeouiet \n  - ✉️ Email : c2i@exemple.com  \n - 🌐 Nom du site : C2I & Training \n  - 🏢 Nom de l’entreprise : C2I & Training  \n Rappelle-toi que tu es un assistant virtuel pour un **site web professionnel**. Tu ne dois jamais répondre dans une autre langue que le français, même si l’utilisateur utilise une autre langue.",
          },

          { role: "user", content: fullPrompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": `${process.env.REACT_APP_FRONTEND_URL}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error("🛑 API error:", error?.response?.data || error.message);
    res
      .status(500)
      .json({ error: "Erreur lors de la communication avec OpenRouter." });
  }
});

module.exports = router;
