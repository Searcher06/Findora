/**
 * Related category pools — used to soften the hard category filter in matching.
 * A phone reported under "Personal Items" should still match one reported under
 * "Electronics". Each key maps to the full set of categories that should be
 * searched when that category is the reference item's category.
 */
const CATEGORY_POOL = {
  "Electronics":          ["Electronics", "Personal Items"],
  "Personal Items":       ["Personal Items", "Electronics", "Keys & Locks"],
  "Books & Stationary":   ["Books & Stationary", "Documents"],
  "Documents":            ["Documents", "Books & Stationary", "ID & Cards"],
  "ID & Cards":           ["ID & Cards", "Documents", "Personal Items"],
  "Bags & Accessories":   ["Bags & Accessories", "Clothing & Wearables", "Personal Items"],
  "Clothing & Wearables": ["Clothing & Wearables", "Bags & Accessories"],
  "Keys & Locks":         ["Keys & Locks", "Personal Items"],
  "Sports & Equipment":   ["Sports & Equipment"],
  "Others":               ["Others", "Electronics", "Personal Items", "Bags & Accessories"],
};

/**
 * Returns the pool of categories to search for a given reference category.
 * Falls back to an exact match if the category isn't in the map.
 */
export const getCategoryPool = (category) =>
  CATEGORY_POOL[category] ?? [category];
