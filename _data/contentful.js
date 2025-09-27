// _data/contentful.js
const contentful = require("contentful");
require('dotenv').config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

module.exports = async function() {
  console.log("Fetching data from Contentful...");
  try {
    const entries = await client.getEntries({
      content_type: "roadmap", // Das ist die ID deines Content Models
      include: 2 // Wichtig, um verlinkte Bilder etc. mitzuladen
    });
    console.log(`Successfully fetched ${entries.items.length} roadmaps.`);
    return {
  roadmap: entries.items
    };
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return {
      roadmap: []
    };
  }
};