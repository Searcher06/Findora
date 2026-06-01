import Groq from "groq-sdk";

const CONFIDENCE_THRESHOLD = 0.6;

/**
 * Ask Groq (Llama 3.1 8B) whether any of the candidates could be the same
 * physical item as the reference item.
 *
 * Returns an array of { item, confidence } pairs sorted by confidence
 * descending, capped at maxResults. Confidence is preserved so callers can
 * act differently on very high-confidence matches (e.g. admin flags).
 *
 * @param {object}   referenceItem  Mongoose item document
 * @param {object[]} candidates     Mongoose item documents
 * @param {number}   maxResults
 * @returns {Promise<{item: object, confidence: number}[]>}
 */
export const scoreCandidatesWithGroq = async (
  referenceItem,
  candidates,
  maxResults = 5
) => {
  if (!candidates.length) return [];

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const candidateList = candidates
    .map(
      (c, i) =>
        `[${i}] Name: "${c.name}" | Description: "${c.description}" | Location: "${c.location}" | Date: ${new Date(c.dateLostOrFound).toDateString()}`
    )
    .join("\n");

  const prompt = `You are a lost-and-found matching assistant for a university campus app called Findora.

Reference item (${referenceItem.status}):
- Name: "${referenceItem.name}"
- Category: ${referenceItem.category}
- Description: "${referenceItem.description}"
- Location: "${referenceItem.location}"
- Date: ${new Date(referenceItem.dateLostOrFound).toDateString()}

Below are ${referenceItem.status === "lost" ? "found" : "lost"} items. For each, decide if it could plausibly be the SAME physical item. Consider name similarity, description details (colour, brand, features), and location proximity. Be generous — a potential match is worth notifying about.

${candidateList}

Reply ONLY with a valid JSON array. Each entry must have "index" (number) and "confidence" (0.0 to 1.0). Only include items with confidence >= ${CONFIDENCE_THRESHOLD}. If no matches, reply with [].
Example: [{"index":0,"confidence":0.85},{"index":2,"confidence":0.72}]`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    max_tokens: 200,
    temperature: 0,
    messages: [{ role: "user", content: prompt }],
  });

  const raw = response.choices[0]?.message?.content?.trim() || "[]";
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  const scored = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

  return scored
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, maxResults)
    .map(({ index, confidence }) => ({ item: candidates[index], confidence }))
    .filter(({ item }) => Boolean(item));
};
