import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPrinter, getPrinterFeatures } from '../../store/printers';
import { useHistory } from 'react-router-dom';
import './PrinterCreate.css';

const CreatePrinterForm = () => {
  const printerFeatures = useSelector(state => state.printer.features);
  const printerStatus = useSelector(state => state.printer.retailStatus);
  const dispatch = useDispatch();
  const history = useHistory();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [retailStatus, setRetailStatus] = useState('');
  const [features, setFeatures] = useState('')
  const [errors, setErrors] = useState([]);

  const updateRetailStatus = (e) => setRetailStatus(e.target.value);
  const updateFeatures = (e) => setFeatures(e.target.value);


  useEffect(() => {
    dispatch(getPrinterFeatures());
  }, [dispatch]);

  // useEffect(() => {
  //   if (printerFeatures.length && !feature) {
  //     setFeature(printerFeatures[0]);
  //   }
  // }, [printerFeatures, features]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //!!!!!!!how do I add error checking??
    const payload = {
      brand,
      model,
      description,
      retailPrice,
      videoUrl,
      pictureUrl,
      retailStatus,
      features
    };

    //add error validation here
    if (!errors) {
      const printer = await dispatch(createPrinter(payload));
      if (printer) {
        history.push(`/printer/${printer.id}`);
        // hideForm();
      }
    }

  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push(`/`)
  };

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
              required
            />
          </label>
          <label>
            Image URL
          <input
              className="form--element"
              type="text"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              required
            />
          </label>
          <label>
            Current Retail Status
           <select onChange={(e) => setRetailStatus(e.target.value)}
              value={retailStatus}>
              {printerStatus.map(status =>
                <option key={status}>{status}</option>
              )}
            </select>
          </label>
          <label>
            Printer Features
            <div className="form--element">
              <input type="checkbox" id="feature1" name="feature1" onChange={(e) => setFeatures(e.target.value)} />
              <label for="feature1">Feature 1</label>
              <input type="checkbox" id="feature2" name="feature2" onChange={(e) => setFeatures(e.target.value)} />
              <label for="feature2">Feature 2</label>
              <input type="checkbox" id="feature3" name="feature3" onChange={(e) => setFeatures(e.target.value)} />
              <label for="feature3">Feature 3</label>
              <input type="checkbox" id="feature4" name="feature4" onChange={(e) => setFeatures(e.target.value)} />
              <label for="feature4">Feature 4</label>
              <input type="checkbox" id="feature5" name="feature5" onChange={(e) => setFeatures(e.target.value)} />
              <label for="feature5">Feature 5</label>
            </div>
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
            <button className="add__button" type="submit">Add Printer</button>
            <button className="cancel__button" type="button" onClick={handleCancelClick}>Cancel</button>
          </div>
        </div>
      </div>
    </form >
  );
};

export default CreatePrinterForm;
