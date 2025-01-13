/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import {onRequest} from "firebase-functions/v2/https";
import OpenAI from "openai";
import * as functions from "firebase-functions";

// AI Chat Completion endpoint
export const generateAIResponse = onRequest({
  region: "us-central1",
  memory: "256MiB",
  minInstances: 0,
  maxInstances: 10,
}, async (request, response) => {
  try {
    // Enable CORS
    response.set("Access-Control-Allow-Origin", "*");
    if (request.method === "OPTIONS") {
      // Send response to OPTIONS requests
      response.set("Access-Control-Allow-Methods", "POST");
      response.set("Access-Control-Allow-Headers", "Content-Type");
      response.status(204).send("");
      return;
    }

    // Ensure request method is POST
    if (request.method !== "POST") {
      response.status(405).json({error: "Method not allowed"});
      return;
    }

    const {message, chatId} = request.body;

    if (!message || !chatId) {
      response.status(400).json({error: "Message and chatId are required"});
      return;
    }

    // Initialize OpenAI with OpenRouter configuration
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY || functions.config().openrouter.apikey,
      defaultHeaders: {
        "HTTP-Referer": "https://orbit-react-native.web.app",
        "X-Title": "Orbit Travel Assistant",
      },
    });

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful travel assistant, " +
            "providing detailed and personalized travel advice. " +
            "Your responses should be informative yet concise, " +
            "focusing on practical travel tips and recommendations.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const aiResponse = completion.choices[0].message.content;
    response.status(200).json({response: aiResponse});
  } catch (error) {
    console.error("Error generating AI response:", error);
    response.status(500).json({error: "Failed to generate AI response"});
  }
});
