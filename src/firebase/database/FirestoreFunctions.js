import { db } from "../firebaseSetup"
import { getDocs, addDoc, collections, collection } from "firebase/firestore"

const flatsCollectionRef = collection(db, "flats")

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