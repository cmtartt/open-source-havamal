# open-source-havamal (cmtartt original README)

Hello all,

This is a simple repository of existing Havamal translations in JSON format, including the raw icelandic text.

This repository also includes a very rough machine translated version using Google Translate. Use at your own discretion. Translation quality is not guaranteed with that translation.

Also included is a JSON format version of Edward Petit's translation, released under Creative Commons licensing terms.

# 🏛️ The Gold Standard API (havamal_api_v1_gold.json)
To address the common issue of "alignment drift" found in many digital versions of the Hávamál, this repository now includes a surgically aligned, comparative dataset.

Most translations (`Bellows`, `Bray`, `Larrington/Petit`) vary in how they group stanzas or where they place summary verses. This file anchors all translations to the Codex Regius 164-verse structure, ensuring every row across all authors discusses the exact same content in real-time.

## 🛡️ Data Schema

Each entry in the JSON array follows this standardized structure for professional integration:

| Key |	Description |
| :-- | :-- |
| verse |	The stanza number (1–164) based on the Codex Regius. |
| original |	The original Old Norse "ink" text. |
| academic_note |	Contextual notes explaining manuscript discrepancies or stanza swaps. | 
| translations |	An object containing Bellows, Bray, and Petit (Larrington) translations. |

## 🏺 How to Access the Data

Since this is a static JSON API, you can fetch the entire Hávamál into your application with a single, high-performance call. On modern hardware, this allows for near-zero latency searching and rendering.

```JavaScript
// Example fetch for a React or Node.js environment
const getHavamal = async () => {
  const response = await fetch('https://[your-url]/havamal_api_v1_gold.json');
  const data = await response.json();
  
  // Access Verse 138 (Odin on the Tree)
  const v138 = data[137]; 
  console.log(v138.translations.petit); // "I know that I hung on a windy tree..."
};
```

## 🛠️ The Alignment Script (align_havamal.js)

The `barrelScript.js` utility was used to forge the `havamal_api_v1_gold.json` file. It uses Conditional Anchoring to resolve known scholarly drifts:

- The `Cattle Swap (76–78)`: Realigns the "Cattle die" and "Fitjung's sons" verses which Bellows and Bray moved in their editions.

- The `Rúnatal Anchor (138+)`: Surgically skips Bellows' inserted summary to keep the "Windy Tree" stanzas synced with the Icelandic original.

- The `18th Song (163–164)`: Maps the final charms and conclusion stanzas to ensure academic integrity.

## 🛡️ Academic Integrity & Ethics

This project is dedicated to providing an accessible, accurate, and inclusive resource for the Norse Pagan community.

"Blessed is he who said, blessed is he who knows, may he who learned enjoy, blessed are those who obeyed." — Hávamál 164