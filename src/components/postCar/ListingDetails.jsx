import { useContext } from "react";
const ListingDetails = ({ handleCarUpdate, handlePageStateChange }) => {
    const carDetails = sessionStorage.getItem('carDetails') ? JSON.parse(sessionStorage.getItem('carDetails')) : {};
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update specific property in parent state
        handleCarUpdate({ [name]: value });
    };

    const postEndTimes = ['12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM', '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM'];

    // Get the current date in New Zealand
    const tomorrowsDateNZ = getTomorrowsDateNZ();

    return (
        <div className="mt-4">
            <form className="row g-3 text-start" style={{ fontWeight: "bold" }} onSubmit={() => handlePageStateChange("ListingDetails")} >
                <div className="col-md-6">
                    <label htmlFor="priceInput" className="form-label">What is your asking price?</label>
                    <input className="form-control" id="priceInput" type="text" name="price" onChange={handleInputChange} value={carDetails.price} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="postEndDateInput" className="form-label">Choose an end date</label>
                    <input className="form-control" id="postEndDateInput" type="date" name="postEndDate" onChange={handleInputChange} value={carDetails.postEndDate} min={tomorrowsDateNZ} required />
                </div>

                <div className="col-md-6">
                    <label htmlFor="bodySelect" className="form-label">Choose an end time</label>
                    <select className="form-select" id="bodySelect" name="postEndTime" onChange={handleInputChange} value={carDetails.postEndTime} required>
                        <option value=''>Please select an option</option>
                        {postEndTimes.map((postEndTime) => (
                            <option value={postEndTime}>
                                {postEndTime}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}

const getTomorrowsDateNZ = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add one day to get tomorrow's date

    const options = {
        timeZone: 'Pacific/Auckland', // Time zone for New Zealand
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    };

    tomorrow.toLocaleDateString('en-NZ', options)
    let year = tomorrow.getFullYear()
    let month = (tomorrow.getMonth() + 1).toString().padStart(2, '0')
    let day = tomorrow.getDate().toString().padStart(2, '0')

    return `${year}-${month}-${day}`;
};


export default ListingDetails;