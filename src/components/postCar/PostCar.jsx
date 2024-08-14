import { useState, useEffect, useContext } from 'react'
import PostCarDetails from './CarDetails'
import ListingDetails from './ListingDetails';
import CarPhotos from './CarPhotos';

const PostCar = () => {
    const [pageState, setPageState] = useState('CarDetails');
    const [carImages, setCarImages] = useState([]);
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

    const handlePageStateChange = (newState) => {
        setPageState(newState);
    };
    const handleCarUpdate = (updatedData) => {
        setCarDetails({ ...carDetails, ...updatedData });
        sessionStorage.setItem('carDetails', JSON.stringify({ ...carDetails, ...updatedData }));
    };

    return (
        <div className="p-5 row justify-content-center">
            <div style={{ maxWidth: '800px' }}>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button type='button'
                        onClick={() => handlePageStateChange("CarDetails")}
                        className={`btn ${pageState === 'CarDetails' ? 'active' : 'inactive'}`}>
                        <h4>Vehicle Details</h4>
                    </button>
                    <button type='button'
                        onClick={() => handlePageStateChange("ListingDetails")}
                        className={`btn ${pageState === 'ListingDetails' ? 'active' : 'inactive'}`} >
                        <h4>Listing Details</h4>
                    </button>
                    <button type='button'
                        onClick={() => handlePageStateChange("CarPhotos")}
                        className={`btn ${pageState === 'CarPhotos' ? 'active' : 'inactive'}`} >
                        <h4>Photos & Description</h4>
                    </button>
                </div>

                {pageState === 'CarDetails' &&
                    <PostCarDetails handleCarUpdate={handleCarUpdate} handlePageStateChange={handlePageStateChange} />
                }

                {pageState === 'ListingDetails' &&

                    <ListingDetails handleCarUpdate={handleCarUpdate} handlePageStateChange={handlePageStateChange} />
                }

                {pageState === 'CarPhotos' &&
                    <CarPhotos
                        handleCarUpdate={handleCarUpdate}
                        handlePageStateChange={handlePageStateChange}
                        carImages={carImages}
                        setCarImages={setCarImages}
                    />
                }
            </div>
        </div>
    )
}

export default PostCar;