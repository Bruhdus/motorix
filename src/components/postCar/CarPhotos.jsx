import React, { useEffect, useRef, useState } from 'react'

const CarPhotos = ({ handleCarUpdate, handlePageStateChange, carImages, setCarImages }) => {
    const carDetails = sessionStorage.getItem('carDetails') ? JSON.parse(sessionStorage.getItem('carDetails')) : {};
    const carImageInputRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update specific property in parent state
        handleCarUpdate({ [name]: value });
    };

    const handleImageChange = (event) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            const selectedFile = files[0];
            addImage(selectedFile)
            if (carImageInputRef.current) {
                carImageInputRef.current.value = '';
            }
        }
    };

    const addImage = (newImage) => {
        setCarImages([...carImages, newImage])
        console.log([...carImages, newImage])
    }

    const deleteImage = (event, index) => {
        event.preventDefault()
        setCarImages(carImages.filter((_, i) => i !== index));
        console.log(carImages)
    };

    const handleCarImageUploadButtonClick = (event) => {
        event.preventDefault()
        // Programmatically trigger the file input
        if (carImageInputRef.current) {
            carImageInputRef.current.click();
        }
    };


    return (
        <div className="mt-4">
            <form className="row g-3 text-start" style={{ fontWeight: "bold" }} onSubmit={() => handlePageStateChange("ListingDetails")} >
                <div className="col-md-10">
                    <label htmlFor="descriptionTextArea" className="form-label">Describe your car
                        <span className="text-muted" style={{ fontSize: '0.7rem' }}> (optional)</span>
                    </label>
                    <textarea className="form-control" style={{ minHeight: '130px' }} id="descriptionTextArea" type="text" name="description" onChange={handleInputChange} value={carDetails.description} />
                </div>

                <fieldset className="input-group text-start">
                    <legend className="form-label" style={{ fontSize: "16px" }}>Car Images</legend>
                    <div className='input-group'>
                        <div className='row align-items-start' style={{ width: '100%' }}>
                            {carImages.map((image, index) => (
                                <div key={index} className='col-lg-4 col-md-6 mb-3 d-flex align-items-center justify-content-center'>
                                    <div className='post-car-img'>
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
                            <button className='btn btn-outline-primary' onClick={handleCarImageUploadButtonClick}>
                                Upload Image
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={carImageInputRef}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default CarPhotos;