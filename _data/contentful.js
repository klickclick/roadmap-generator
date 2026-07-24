// _data/contentful.js
const contentful = require("contentful");
require('dotenv').config();

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

// Lädt alle Entries eines Content Models. Jede Sparte wird separat geladen,
// damit ein fehlendes Model (z.B. solange "roadmapCh" noch nicht angelegt ist)
// den Build der anderen Sparte nicht blockiert.
async function fetchEntries(contentType) {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
      include: 2 // Wichtig, um verlinkte Bilder etc. mitzuladen
    });
    console.log(`Successfully fetched ${entries.items.length} entries for "${contentType}".`);
    return entries.items;
  } catch (error) {
    console.error(`Error fetching "${contentType}" from Contentful:`, error.message || error);
    return [];
  }
}

module.exports = async function() {
  console.log("Fetching data from Contentful...");
  const [roadmap, roadmapCh] = await Promise.all([
    fetchEntries("roadmap"),   // Deutschland (+ englische Variante)
    fetchEntries("roadmapCh")  // Schweiz (eigenes Content Model, Preise in CHF)
  ]);
  return { roadmap, roadmapCh };
};
