import { collection, addDoc, doc,updateDoc, deleteDoc } from "firebase/firestore";
import { database } from "./firebases-setups";
export async function writeToDB(data) {
  try {
    const docRef = await addDoc(collection(database, "Activity"), data);
  } catch (err) {
    console.log(err.code);
  }
}

export async function deleteToDB(id) {
  try {
   
    await deleteDoc(doc(database, "Activity", id));
  } catch (err) {
    console.log(err);
  }
}

export async function updateToDB(id, data) {
  try {
    console.log(data)
    const docRef = doc(database, "Activity", id); // Note the correct collection name
    await updateDoc(docRef, data);

  } catch (err) {
    console.error("Error updating document:", err);
  }
}
