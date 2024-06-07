import { primaryButton, primaryColor } from "../style/AppStyle";

const PostCarDetails = ({ carData, onCarUpdate }) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onCarUpdate({ [name]: value }); // Update specific property in parent state
    };

    return (
        <div className="mt-4">
            <form className="row g-3 text-start" style={{ fontWeight: "bold" }}>
                <div className="col-md-6">
                    <label htmlFor="makeInput" className="form-label">Make</label>
                    <input className="form-control" id="makeInput" type="text" name="make" onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="modelInput" className="form-label">Model</label>
                    <input className="form-control" id="modelInput" type="text" name="model" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="bodySelect" className="form-label">Body</label>
                    <select className="form-select" id="bodySelect" name="body" onChange={handleInputChange}>
                        <option value="Other">Other</option>
                        <option value="Convertible">Convertible</option>
                        <option value="Coupe">Coupe</option>
                        <option value="Hatchback">Hatchback</option>
                        <option value="Sedan">Sedan</option>
                        <option value="Station Wagon">Station Wagon</option>
                        <option value="RV/SUV">RV/SUV</option>
                        <option value="Ute">Ute</option>
                        <option value="Van">Van</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label htmlFor="seatsInput" className="form-label">Seats
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <input className="form-control" id="seatsInput" type="number" name="seats" min="0" onChange={handleInputChange} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="doorsInput" className="form-label">Doors
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <input className="form-control" id="doorsInput" type="number" name="doors" min="0" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="prevOwnersSelect" className="form-label">Previous owners
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <select className="form-select" id="prevOwnersSelect" name="previousOwners" onChange={handleInputChange}>
                        <option value="Don't know">Don't know</option>
                        <option value="New">New</option>
                        <option value="1 Owner">1 Owner</option>
                        <option value="2 Owners">2 Owners</option>
                        <option value="3 Owners">3 Owners</option>
                        <option value="4 Owners">4 Owners</option>
                        <option value="5+ Owners">5+ Owners</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="yearInput" className="form-label">Year</label>
                    <input className="form-control" id="yearInput" type="number" name="year" min="0" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="kilometresInput" className="form-label">Kilometres</label>
                    <input className="form-control" id="kilometresInput" type="number" name="kilometres" min="0" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="colourInput" className="form-label">Colour
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <input className="form-control" id="colourInput" type="text" name="colour" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="numberPlateInput" className="form-label">Number plate</label>
                    <input className="form-control" id="numberPlateInput" type="text" name="numberPlate" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="engineSizeInput" className="form-label">Engine size (cc)
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <input className="form-control" id="engineSizeInput" type="text" name="engineSize" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="transmissionInput" className="form-label">Transmission
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <select className="form-select" id="transmissionSelect" name="transmission" onChange={handleInputChange}>
                        <option value="Don't know">Don't know</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Tiptronic">Tiptronic</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="fuelTypeInput" className="form-label">Fuel type</label>
                    <select className="form-select" id="fuelTypeSelect" name="fuelType" onChange={handleInputChange}>
                        <option value="Don't know">Don't know</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Electric">Electric</option>
                        <option value="Plug-in Hybrid">Plug-in Hybrid</option>
                        <option value="LPG">LPG</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label htmlFor="cylindersInput" className="form-label">Cylinders
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <select className="form-select" id="cylindersSelect" name="cylinders" onChange={handleInputChange}>
                        <option value="Don't know">Don't know</option>
                        <option value="Rotary">Rotary</option>
                        <option value="4-cylinder">4-cylinder</option>
                        <option value="5-cylinder">5-cylinder</option>
                        <option value="6-cylinder">6-cylinder</option>
                        <option value="8-cylinder">8-cylinder</option>
                        <option value="10-cylinder">10-cylinder</option>
                        <option value="12-cylinder">12-cylinder</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="4wdInput" className="form-label">Drive type</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="driveType" id="2wdRadio" value={"2WD"} onChange={handleInputChange} />
                        <label class="form-check-label" htmlFor="2wdRadio">
                            2WD
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="driveType" id="4wdRadio" value={"4WD"} onChange={handleInputChange} />
                        <label class="form-check-label" htmlFor="4wdRadio">
                            4WD
                        </label>
                    </div>
                </div>

                <div className="col-md-6">
                    <label htmlFor="regoInput" className="form-label">Registration expiry
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <input className="form-control" id="regoInput" type="text" name="regoExpiryDate" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="wofInput" className="form-label">WoF expiry
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <input className="form-control" id="wofInput" type="text" name="wofExpiryDate" onChange={handleInputChange} />
                </div>

                <div className="col-12">
                    <label htmlFor="orcInput" className="form-label">Are on road costs included?</label>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="orcIncluded" id="orcYes" value={"2WD"} onChange={handleInputChange} />
                        <label class="form-check-label" htmlFor="orcYes">
                            Yes - The car is sold with a valid WoF, Rego and road user charges
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="orcIncluded" id="orcNo" value={"4WD"} onChange={handleInputChange} />
                        <label class="form-check-label" htmlFor="orcNo">
                            No
                        </label>
                    </div>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn" style={primaryButton}>Go to Listing Details</button>
                </div>
            </form>
        </div >
    );
}

export default PostCarDetails;