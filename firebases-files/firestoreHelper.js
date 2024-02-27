import { collection, addDoc, doc,updateDoc, deleteDoc } from "firebase/firestore";
import { database } from "./firebases-setups";
// Function to write data to Firestore database
export async function writeToDB(data) {
  try {
    // Attempts to add a new document with the provided data to the 'Activity' collection
    const docRef = await addDoc(collection(database, "Activity"), data);
    // If successful, docRef contains a reference to the newly created document, including its ID
  } catch (err) {
    // If an error occurs, log the error code to the console
    console.log(err.code);
  }
}

// Function to delete a document from Firestore database
export async function deleteToDB(id) {
  try {
    // Attempts to delete the document with the specified id from the 'Activity' collection
    await deleteDoc(doc(database, "Activity", id));
    // If successful, the document is deleted from the database
  } catch (err) {
    // If an error occurs, log the entire error to the console
    console.log(err);
  }
}

// Function to update an existing document in Firestore database
export async function updateToDB(id, data) {
  try {
    // Retrieves a reference to the document with the specified id in the 'Activity' collection
    const docRef = doc(database, "Activity", id);
    // Attempts to update the document with the provided data
    await updateDoc(docRef, data);
    // If successful, the document is updated with the new data
  } catch (err) {
    // If an error occurs, log an error message along with the error details to the console
    console.error("Error updating document:", err);
  }
}
