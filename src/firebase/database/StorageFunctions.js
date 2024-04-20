import { storage } from "../firebaseSetup";
import { ref, uploadBytes } from "firebase/storage";

// Function to upload multiple files
export async function uploadFlatImages(folderName, files) {
    try {
        let fileNumber = 1;
        const uploadPromises = files.map(async (file) => {
            // Create a reference to the location where you want to upload each file
            const fileRef = ref(storage, `flats/${folderName}/${fileNumber}`);
            fileNumber++;

            // Upload the file to Firebase Storage
            await uploadBytes(fileRef, file);
        });
        // Wait for all uploads to complete
        await Promise.all(uploadPromises);

        console.log('All files uploaded successfully');
        return true
    } catch (error) {
        console.error('Error uploading files: ', error);
        return false
    }
};