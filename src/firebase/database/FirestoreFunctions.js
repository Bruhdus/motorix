import { cloneElement } from "react"
import { db } from "../firebaseSetup"
import { getDocs, addDoc, collections, collection, doc, setDoc } from "firebase/firestore"

// Creating references to the collections in firestore
const usersCollectionRef = collection(db, "users");
const flatsCollectionRef = collection(db, "flats");

export async function addUser(userId, userData) {
    // Create a reference to the document with the specified userId
    const userDocRef = doc(usersCollectionRef, userId);
    try {
        // Set the data for the user document
        await setDoc(userDocRef, userData);
        console.log("User added successfully!");
        return true
    } catch (error) {
        console.error("Error adding user: ", error);
        return false
    }
}

export async function postFlat(email, phone, name, address, suburb, city, availableFrom, weeklyRentPrice, wifiIncluded, electricityIncluded, ensuite) {
    await addDoc(flatsCollectionRef, {
        email: email,
        phone: phone,
        name: name,
        address: address,
        suburb: suburb,
        city: city,
        availableFrom: availableFrom,
        weeklyRentPrice: weeklyRentPrice,
        wifiIncluded: wifiIncluded,
        electricityIncluded: electricityIncluded,
        ensuite: ensuite
    })
}