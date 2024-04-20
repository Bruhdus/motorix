import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../style/Style.css'
import { primaryButton, primaryColor } from '../style/AppStyle';
import { postFlat } from '../firebase/database/FirestoreFunctions';
import { uploadFlatImages } from '../firebase/database/StorageFunctions';


const PostFlat = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // const [postClicked, setPostClicked] = useState(false);

    const [propertyImages, setPropertyImages] = useState([]);
    const propertyImageInputRef = useRef(null);

    // owner details
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');

    // expense details
    const [weeklyRentPrice, setWeeklyRentPrice] = useState('');
    const [wifiIncluded, setWifiIncluded] = useState();
    const [electricityIncluded, setElectricityIncluded] = useState();
    const [additionalExpenseDetails, setAdditionalExpenseDetails] = useState();

    // property details
    const [address, setAddress] = useState('');
    const [suburb, setSuburb] = useState('');
    const [city, setCity] = useState('');
    const [availableFrom, setAvailableFrom] = useState('');
    const [ensuite, setEnsuite] = useState();
    // const [couplesOk, setCouplesOk] = useState();
    // const [petsAllowed, setPetsAllowed] = useState();
    // const [numCurrentFlatMates, setNumCurrentFlatMates] = useState();
    // const [numShowerBooths, setNumShowerBooths] = useState();
    // const [numToilets, setNumToilets] = useState();
    // const [numBedrooms, setNumBedrooms] = useState();
    // const [numAvailableBedrooms, setNumAvailableBedrooms] = useState();
    // const [numPropertyParkingSpot, setNumPropertyParkingSpots] = useState();
    // const [kitchenFurnished, setKitchenFurnished] = useState();
    // const [livingAreaFurnished, setLivingAreaFurnished] = useState();
    // const [bedroomsFurnished, setBedroomsFurnished] = useState();

    useEffect(() => {
        if (currentUser == null) {
            navigate('/');
        }
    }, [currentUser, navigate])

    // Get the current date in New Zealand
    const getCurrentDateNZ = () => {
        const today = new Date();
        const options = {
            timeZone: 'Pacific/Auckland', // Time zone for New Zealand
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        today.toLocaleDateString('en-NZ', options)
        let year = today.getFullYear()
        let month = (today.getMonth() + 1).toString().padStart(2, '0')
        let day = today.getDate().toString().padStart(2, '0')

        return `${year}-${month}-${day}`;
    };

    const handlePostFlat = async (event) => {
        console.log("here")
        const flatId = address.replace(/ /g, "-") + '-' + city;
        event.preventDefault();
        try {
            setLoading(true);
            postFlat(email, phone, name, address, suburb, city, availableFrom, weeklyRentPrice, wifiIncluded, electricityIncluded, ensuite)
            uploadFlatImages(flatId, propertyImages)
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const handleImageChange = (event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            addImage(selectedFile)
            if (propertyImageInputRef.current) {
                propertyImageInputRef.current.value = '';
            }
        }
    };

    const addImage = (newImage) => {
        setPropertyImages([...propertyImages, newImage])
        console.log(propertyImages)
    }

    const deleteImage = (event, index) => {
        event.preventDefault()
        setPropertyImages(propertyImages.filter((_, i) => i !== index));
        console.log(propertyImages)
    };

    const handlePropertyImageUploadButtonClick = (event) => {
        event.preventDefault()
        // Programmatically trigger the file input
        if (propertyImageInputRef.current) {
            propertyImageInputRef.current.click();
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: "700px", padding: '60px 40px', }}>
                <h1 style={{ color: primaryColor }}>Post Flat</h1>
                <form onSubmit={handlePostFlat}>
                    <br />
                    <hr />
                    <h3>Your Details</h3>
                    <div className="text-start">
                        <input type="text" className="form-control mb-3" id="username" placeholder='Name'
                            value={name} onChange={(event) => setName(event.target.value)} autoComplete='given-name' required />
                        <input type="email" className="form-control mb-3" id="email" placeholder='Email'
                            value={email} onChange={(event) => setEmail(event.target.value)} autoComplete='email' required />
                        <input type="tel" className="form-control" id="phone" placeholder='Phone Number'
                            value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete='tel' required />
                    </div>

                    <br />
                    <hr />
                    <h3>Expense Details</h3>
                    <div className="text-start">
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input type="number" className="form-control" id="weeklyRentPrice" placeholder='Weekly Rent Price'
                                value={weeklyRentPrice} onChange={(event) => setWeeklyRentPrice(event.target.value)} required />
                        </div>
                        <fieldset className="mb-3">
                            <legend className="form-label" style={{ fontSize: "16px" }}>Is wifi included in the weekly rent?</legend>
                            <div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="yesWifiRadio">Yes</label>
                                    <input className="form-check-input" type="radio" id="yesWifiRadio" name='wifiRadio'
                                        checked={wifiIncluded === true} onChange={() => setWifiIncluded(true)} required />
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="noWifiRadio">No</label>
                                    <input className="form-check-input" type="radio" id="noWifiRadio" name='wifiRadio'
                                        checked={wifiIncluded === false} onChange={() => setWifiIncluded(false)} required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="mb-3">
                            <legend className="form-label" style={{ fontSize: "16px" }}>Is electricty included in the weekly rent?</legend>
                            <div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="yesElectricityRadio">Yes</label>
                                    <input className="form-check-input" type="radio" id="yesElectricityRadio" name='electricityRadio'
                                        checked={electricityIncluded === true} onChange={() => setElectricityIncluded(true)} required />
                                </div>
                                <div className="form-check form-check-inline">
                                    <label className="form-check-label" htmlFor="noElectricityRadio">No</label>
                                    <input className="form-check-input" type="radio" id="noElectricityRadio" name='electricityRadio'
                                        checked={electricityIncluded === false} onChange={() => setElectricityIncluded(false)} required />
                                </div>
                            </div>
                        </fieldset>
                        <textarea type="text" className="form-control" placeholder='Anything else you would like to add about expenses?'
                            value={additionalExpenseDetails} onChange={(event) => setAdditionalExpenseDetails(event.target.value)} required />
                    </div>

                    <br />
                    <hr />
                    <h3>Property Details</h3>

                    <div className="input-group text-start">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address"
                            value={address} onChange={(event) => setAddress(event.target.value)} autoComplete='street-address' required />
                    </div>
                    <div className="input-group text-start">
                        <label htmlFor="suburb" className="form-label">Suburb</label>
                        <input type="text" className="form-control" id="suburb"
                            value={suburb} onChange={(event) => setSuburb(event.target.value)} required />
                    </div>
                    <div className="input-group text-start">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city"
                            value={city} onChange={(event) => setCity(event.target.value)} required />
                    </div>
                    <div className="input-group text-start">
                        <label htmlFor="availableFrom" className="form-label">Available From</label>
                        <input type="date" className="form-control" id="availableFrom" min={getCurrentDateNZ()}
                            value={availableFrom} onChange={(event) => setAvailableFrom(event.target.value)} required />
                    </div>
                    <fieldset className="input-group text-start">
                        <legend className="form-label" style={{ fontSize: "16px" }}>Ensuite</legend>
                        <div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" htmlFor="yesEnsuiteRadio">Yes</label>
                                <input className="form-check-input" type="radio" id="yesEnsuiteRadio" name='ensuiteRadio'
                                    checked={ensuite === true} onChange={() => setEnsuite(true)} required />
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" htmlFor="noEnsuiteRadio">No</label>
                                <input className="form-check-input" type="radio" id="noEnsuiteRadio" name='ensuiteRadio'
                                    checked={ensuite === false} onChange={() => setEnsuite(false)} required />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="input-group text-start">
                        <legend className="form-label" style={{ fontSize: "16px" }}>Property Images</legend>
                        <div className='input-group'>
                            <div className='row align-items-start' style={{ width: '100%' }}>
                                {propertyImages.map((image, index) => (
                                    <div key={index} className='col-lg-4 col-md-6 mb-3 d-flex align-items-center justify-content-center'>
                                        <div className='post-flat-img'>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt=""
                                                className="img-thumbnail"
                                                style={{ width: '200px', height: '200px', minWidth: '200px', minHeight: '200px', objectFit: 'cover' }}
                                            />
                                            <button className="btn btn-danger img-delete-button position-absolute top-50 start-50 translate-middle"
                                                onClick={(event) => deleteImage(event, index)}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <button className='btn btn-outline-primary' onClick={handlePropertyImageUploadButtonClick}>
                                    Upload Image
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={propertyImageInputRef}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </fieldset>
                    <div className="d-grid">
                        <button type="submit" style={primaryButton} disabled={loading} className="btn mt-4">
                            Post
                        </button>
                    </div>
                </form>
                <br></br>
                <br></br>
            </div>
        </div>
    )

};

export default PostFlat;