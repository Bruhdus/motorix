import { primaryButton, primaryColor } from "../style/AppStyle";

const PostCarDetails = ({ carData, onCarUpdate }) => {
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        onCarUpdate({ [name]: value }); // Update specific property in parent state
    };

    return (
        <div className="mt-4">
            <form className="row g-3 text-start" style={{ color: "gray", fontWeight: "bold" }}>
                <div className="col-md-6">
                    <label htmlFor="makeInput" className="form-label">Make</label>
                    <input className="form-control" id="makeInput" type="text" name="make" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="modelInput" className="form-label">Model</label>
                    <input className="form-control" id="modelInput" type="text" name="model" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="bodyInput" className="form-label">Body</label>
                    <input className="form-control" id="bodyInput" type="text" name="body" onChange={handleInputChange} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="seatsInput" className="form-label">Seats</label>
                    <input className="form-control" id="seatsInput" type="text" name="seats" onChange={handleInputChange} />
                </div>
                <div className="col-md-3">
                    <label htmlFor="doorsInput" className="form-label">Doors</label>
                    <input className="form-control" id="doorsInput" type="text" name="doors" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="prevOwnersInput" className="form-label">Previous owners</label>
                    <input className="form-control" id="prevOwnersInput" type="number" name="previousOwners" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="yearInput" className="form-label">Year</label>
                    <input className="form-control" id="yearInput" type="number" name="year" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="kilometresInput" className="form-label">Kilometres</label>
                    <input className="form-control" id="kilometresInput" type="text" name="kilometres" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="colourInput" className="form-label">Colour</label>
                    <input className="form-control" id="colourInput" type="text" name="colour" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="numberPlateInput" className="form-label">Number plate</label>
                    <input className="form-control" id="numberPlateInput" type="text" name="numberPlate" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="engineSizeInput" className="form-label">Engine size (cc)</label>
                    <input className="form-control" id="engineSizeInput" type="text" name="engineSize" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="transmissionInput" className="form-label">Transmission</label>
                    <input className="form-control" id="transmissionInput" type="text" name="transmission" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="fuelTypeInput" className="form-label">Fuel type</label>
                    <input className="form-control" id="fuelTypeInput" type="text" name="fuelType" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="cylindersInput" className="form-label">Cylinders</label>
                    <input className="form-control" id="cylindersInput" type="text" name="cylinders" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="4wdInput" className="form-label">Drive type</label>
                    <input className="form-control" id="4wdInput" type="text" name="driveType" onChange={handleInputChange} />
                </div>

                <div className="col-md-6">
                    <label htmlFor="regoInput" className="form-label">Registration expiry</label>
                    <input className="form-control" id="regoInput" type="text" name="regoExpiryDate" onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                    <label htmlFor="wofInput" className="form-label">WoF expiry</label>
                    <input className="form-control" id="wofInput" type="text" name="wofExpiryDate" onChange={handleInputChange} />
                </div>

                <div className="col-12">
                    <label htmlFor="orcInput" className="form-label">Are on road costs included?</label>
                    <input className="form-control" id="orcInput" type="text" name="orcIncluded" onChange={handleInputChange} />
                </div>

                <div class="col-12">
                    <button type="submit" class="btn" style={primaryButton}>Go to Listing Details</button>
                </div>
            </form>
        </div >
    );
}

export default PostCarDetails;