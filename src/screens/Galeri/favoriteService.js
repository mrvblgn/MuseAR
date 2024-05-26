import { db } from "../firebaseConfig";
import { ref, push, get, query, orderByChild, equalTo, remove } from "firebase/database";


export const addToFavorites = async (content, setIsFavorited) => {
  try {
    if (!content.id) {
      throw new Error("Content must have an id");
    }

    const favoritesRef = ref(db, "favorites");
    const favoritesQuery = query(favoritesRef, orderByChild("id"), equalTo(content.id));
    const snapshot = await get(favoritesQuery);

    if (snapshot.exists()) {
      console.log("Content is already in favorites:", content);
    } else {
      await push(favoritesRef, content);
      console.log("Added to favorites:", content);
      setIsFavorited(true);
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
  }
};


export const removeFromFavorites = async (contentId, setIsFavorited) => {
  try {
    if (!contentId) {
      throw new Error("Content ID must be defined");
    }

    const favoritesRef = ref(db, "favorites");
    const favoritesQuery = query(favoritesRef, orderByChild("id"), equalTo(contentId));
    const snapshot = await get(favoritesQuery);

    if (snapshot.exists()) {
      const updates = {};
      snapshot.forEach(childSnapshot => {
        updates[childSnapshot.key] = null;
      });
      await remove(ref(db, `favorites/${Object.keys(updates)[0]}`));
      console.log("Removed from favorites:", contentId);
      setIsFavorited(false);
    }
  } catch (error) {
    console.error("Error removing from favorites:", error);
  }
};
