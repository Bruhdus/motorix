import { useState, useEffect, useContext } from 'react'
import PostCarDetails from './PostCarDetails'
import ListingDetails from './ListingDetails';

const PostCar = () => {
    const [pageState, setPageState] = useState('CarDetails');
    const [carDetails, setCarDetails] = useState({
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

    const handleStateChange = (newState) => {
        setPageState(newState);
    };
    const handleCarUpdate = (updatedData) => {
        setCarDetails({ ...carDetails, ...updatedData });
        sessionStorage.setItem('carDetails', JSON.stringify({ ...carDetails, ...updatedData }));
    };

    return (
        <div className="p-5 row justify-content-center">
            {pageState === 'CarDetails' &&
                <>
                    <h2>Vehicle Details</h2>
                    <div style={{ maxWidth: '800px' }}>
                        <PostCarDetails handleCarUpdate={handleCarUpdate} handleStateChange={handleStateChange} />
                    </div>
                </>
            }

            {pageState === 'ListingDetails' &&
                <>
                    <h2>Listing Details</h2>
                    <div style={{ maxWidth: '800px' }}>
                        <ListingDetails />
                    </div>
                </>
            }
        </div>
    )
}

export default PostCar;