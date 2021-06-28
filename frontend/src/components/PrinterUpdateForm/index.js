import React, { useEffect, useState } from 'react';
import * as printerActions from '../../store/printers';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import './PrinterUpdate.css';

const RETAIL = ["Available", "Pre-Order", "Discontinued", "Prototype"]

const PrinterUpdateForm = () => {
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state?.session?.user);
    const featureSelect = useSelector(state => state?.printer?.feature)
    const currPrinter = useSelector(state => state?.printer[id]);
    const [brand, setBrand] = useState(currPrinter?.brand);
    const [model, setModel] = useState(currPrinter?.model);
    const [description, setDescription] = useState(currPrinter?.description);
    const [retailPrice, setRetailPrice] = useState(currPrinter?.retailPrice);
    const [videoUrl, setVideoUrl] = useState(currPrinter?.videoUrl);
    const [pictureUrl, setPictureUrl] = useState(currPrinter?.pictureUrl);
    const [retailStatus, setRetailStatus] = useState(RETAIL[0]);
    const [features, setFeatures] = useState([])
    const [errors, setErrors] = useState([]);

    if (!sessionUser) history.push('/');

    useEffect(() => {
        dispatch(printerActions.getPrinterFeatures());
    }, [dispatch]);

    const handleCheckbox = (e) => {
        let id = e.target.value;
        if (features.includes(id)) {
            let indexOfId = features.indexOf(id)
            let copy = [...features];
            copy.splice(indexOfId, 1);
            setFeatures(copy);
        } else {
            setFeatures([...features, id])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        dispatch(printerActions.updatePrinter({
            brand,
            model,
            description,
            retailPrice,
            videoUrl,
            pictureUrl,
            retailStatus,
            features
        }, id))
            .then(() => history.push(`/`))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        history.push('/')
    };

    if (!featureSelect) return null;

    return (
        <form className='form--container' onSubmit={handleSubmit}>
            <div className='form--element--container'>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='form--element-left'>
                    <label>
                        Brand of Printer
                        <input
                            className="form--element"
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Model of Printer
                        <input
                            className="form--element"
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Current Retail Price
                        <input
                            className="form--element"
                            type="text"
                            placeholder="Please input price format as 1234.99"
                            value={retailPrice}
                            onChange={(e) => setRetailPrice(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Video URL
                        <input
                            className="form--element"
                            type="text"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            // required
                        />
                    </label>
                    <label>
                        Image URL
                        <input
                            className="form--element"
                            type="text"
                            value={pictureUrl}
                            onChange={(e) => setPictureUrl(e.target.value)}
                            // required
                        />
                    </label>
                    <label>
                        Current Retail Status
                        <select onChange={(e) => setRetailStatus(e.target.value)}
                            value={retailStatus}>
                            {RETAIL.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                            </select>
                    </label>
                    <label>
                        Printer Features
                        <ul className="form--element">{featureSelect?.map((feature) =>
                            <li key={feature.id}>
                                <input type="checkbox" id={feature.id} name={feature.features} value={feature.id} onChange={(e) => handleCheckbox(e)} />
                                <label htmlFor={feature.features}>{feature.features}</label>
                            </li>
                        )}</ul>
                    </label>
                </div>
                <div className='form--element-right'>
                    <label>
                        Description
                        <textarea
                            className="form--element"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <div className="button--container">
                        <button className="button2" type="submit">Update Printer</button>
                        <button className="button1" type="button" onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </form >
    );
};


export default PrinterUpdateForm;
