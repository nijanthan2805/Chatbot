/**
 * -------------------------------------------------------------
 * 🧠 PROJECT: Offline Chatbot System
 * 📄 FILE: Chatbot.js
 * 👨‍💻 DEVELOPER: Nijanthan
 * -------------------------------------------------------------
 * 🔍 DESCRIPTION:
 * This file defines an intelligent **offline chatbot** that works
 * without any external APIs or internet access. It uses a **string
 * similarity algorithm** to understand user messages — meaning it
 * doesn’t rely on exact keyword matching.
 *
 * The chatbot:
 *  - Responds to greetings, time/date queries, jokes, and facts
 *  - Handles simple calculations using built-in JavaScript logic
 *  - Uses bigram-based smart matching to understand misspelled or
 *    incomplete inputs (e.g., “helo” → “hello hi”)
 *  - Is 100% offline and runs fully in the browser or React app
 *
 * 💡 ALGORITHM SUMMARY:
 * The chatbot’s `compareTwoStrings()` method compares two strings
 * using **bigrams** (two-letter pairs) and measures their overlap.
 * The higher the overlap, the higher the similarity score (0–1).
 * The `stringSimilarity()` function finds the best-matching response
 * key based on these scores.
 *
 * 🧩 TECHNOLOGY USED:
 *  - JavaScript (ES Module)
 *  - Works with React/Vite front-end
 *
 * -------------------------------------------------------------
 * 🔖 VERSION: v1.0 (Offline Chatbot)
 * 📅 LAST UPDATED: October 2025
 * -------------------------------------------------------------
 */

const Chatbot = {
  // 🧩 Default Responses
  defaultResponses: {
    'hello hi': `Hello! I'm your personal chatbot assistant 😊 How can I help you today?`,
    'hi': `Hi there!👋 How can I help you?`,
    'how are you': `I'm feeling fantastic! Thanks for asking 😄 How about you?`,
    'flip a coin': () => (Math.random() < 0.5 ? 'Sure! You got heads.' : 'Sure! You got tails.'),
    'roll a dice': () => `Sure! You got ${Math.floor(Math.random() * 6) + 1}`,
    'what is the date today': () => {
      const now = new Date();
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `Today is ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}.`;
    },
    'thank': `No problem! I'm always here to help 😄`,
  },

  // 🌐 Extra Built-in Responses (Offline)
  additionalResponses: {
    // --- Personal + Identity ---
    'who developed you': `I was proudly developed by **Nijanthan** 👨‍💻 — a passionate developer and tech enthusiast!`,
    'who created you': `I was created by **Nijanthan** with 💡 creativity and 💻 code!`,
    'who are you': `I'm an intelligent chatbot built by **Nijanthan** to assist you with fun and useful tasks.`,
    'what is your name': `I'm Chatbot 🤖 — your friendly AI companion designed by Nijanthan!`,

    // --- Greetings ---
    'good morning': `Good morning ☀️! Let’s make today amazing.`,
    'good afternoon': `Good afternoon 🌤️! Hope your day’s going great.`,
    'good night': `Good night 🌙! Sleep well and recharge for tomorrow.`,
    'bye': `Goodbye! Take care and see you soon 👋`,
    'help': `Here’s what I can do:\n- Flip a coin or roll a dice 🎲\n- Tell the date or time 📅\n- Tell jokes, facts, or quotes 💡\n- Do small math calculations ➕\n- And more coming soon!`,

    // --- Time & Date ---
    'what is the time now': () => {
      const now = new Date();
      return `The current time is ${now.toLocaleTimeString()}`;
    },

    // --- Fun (Offline Randomized) ---
    'tell me a joke': () => {
      const jokes = [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
        "Why did the computer show up at work late? It had a hard drive! 💻",
        "What do you call a group of 8 hobbits? A hobbyte. 😂",
        "Why was the JavaScript developer sad? Because they didn’t Node how to Express themselves!",
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    },

    'tell me a fact': () => {
      const facts = [
        "The first computer bug was an actual moth 🦋.",
        "Python is named after Monty Python, not the snake 🐍.",
        "The first 1GB hard drive was announced in 1980 and weighed over 500 pounds ⚙️.",
        "The first website is still online — info.cern.ch 🌐.",
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    },

    'tell me a quote': () => {
      const quotes = [
        `"Talk is cheap. Show me the code." — Linus Torvalds`,
        `"Programs must be written for people to read." — Harold Abelson`,
        `"The best error message is the one that never shows up." — Thomas Fuchs`,
        `"First, solve the problem. Then, write the code." — John Johnson`,
      ];
      return quotes[Math.floor(Math.random() * quotes.length)];
    },

    // --- 🧮 Basic Calculator ---
    'calculate': (message) => {
      try {
        const expression = message.replace(/calculate/gi, '').trim();
        if (!expression)
          return "Please type what you want me to calculate, e.g., 'calculate 5 + 3 * 2'";
        const result = Function(`"use strict"; return (${expression})`)();
        return `The answer is ${result}`;
      } catch {
        return "Sorry, I couldn’t calculate that. Try something simple like 'calculate 12 / 4'.";
      }
    },

    // --- ☁️ Weather or Climate ---
    'climate': `Hmm... I can't access live weather data yet 🌦️, but I'm working on it!`,
    'weather': `Sorry, I don’t have real-time weather info 🌧️, but that’s coming soon!`,

    // --- 🎯 Mood Response ---
    'i am sad': `I’m sorry to hear that 😔 Remember — bad days don’t last forever. You’ve got this 💪`,
    'i am happy': `That’s awesome! 😄 Keep smiling and spreading positive vibes! ✨`,
  },

  // --- Fallback & Helpers ---
  unsuccessfulResponse: `Working on it... 🌱`,
  emptyMessageResponse: `Your message seems empty. Please type something!`,

  addResponses(additionalResponses) {
    this.additionalResponses = { ...this.additionalResponses, ...additionalResponses };
  },

  // --- Local Response Logic ---
  getResponse(message) {
    if (!message) return this.emptyMessageResponse;

    const responses = { ...this.defaultResponses, ...this.additionalResponses };
    const { ratings, bestMatchIndex } =
      this.stringSimilarity(message.toLowerCase(), Object.keys(responses));
    const bestResponseRating = ratings[bestMatchIndex].rating;

    if (bestResponseRating <= 0.3) return this.unsuccessfulResponse;

    const bestResponseKey = ratings[bestMatchIndex].target;
    const response = responses[bestResponseKey];

    return typeof response === 'function' ? response(message) : response;
  },

  async getResponseAsync(message) {
    const localResponse = this.getResponse(message);
    const finalResponse = localResponse instanceof Promise ? await localResponse : localResponse;
    return finalResponse;
  },

  // --- String Matching Logic ---
  compareTwoStrings(first, second) {
    first = first.replace(/\s+/g, '');
    second = second.replace(/\s+/g, '');
    if (first === second) return 1;
    if (first.length < 2 || second.length < 2) return 0;

    const firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      firstBigrams.set(bigram, (firstBigrams.get(bigram) || 0) + 1);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.get(bigram) || 0;
      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  },

  stringSimilarity(mainString, targetStrings) {
    const ratings = [];
    let bestMatchIndex = 0;

    for (let i = 0; i < targetStrings.length; i++) {
      const target = targetStrings[i];
      const rating = this.compareTwoStrings(mainString, target);
      ratings.push({ target, rating });
      if (rating > ratings[bestMatchIndex]?.rating) bestMatchIndex = i;
    }

    return { ratings, bestMatchIndex };
  },
};

// ✅ ES Module Export (for React/Vite)
export default Chatbot;
