import { useState, useEffect } from 'react'
import PostCarDetails from './PostCarDetails'

const PostCar = () => {
    const [carData, setCarData] = useState({
        imagePath: undefined,
        make: undefined,
        model: undefined,
        body: undefined,
        seats: undefined,
        doors: undefined,
        previousOwners: undefined,
        year: undefined,
        kilometres: undefined,
        colour: undefined,
        numberPlate: undefined,
        engineSize: undefined,
        transmission: undefined,
        fuelType: undefined,
        cylinders: undefined,
        driveType: undefined,
        regoExpiryDate: undefined,
        wofExpiryDate: undefined,
        orcIncluded: undefined
    });

    const handleCarUpdate = (updatedData) => {
        setCarData({ ...carData, ...updatedData });
        console.log(carData)
    };

    return (
        <div className="p-5 row justify-content-center">
            <h2>Vehicle Details</h2>
            <div style={{ maxWidth: '800px' }}>
                <PostCarDetails carData={carData} onCarUpdate={handleCarUpdate} />
            </div>
        </div>
    )
}

export default PostCar;