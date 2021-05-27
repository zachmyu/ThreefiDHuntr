import React, { useEffect, useState } from 'react';
import * as printerActions from '../../store/printers';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './PrinterCreate.css';

// if (printer) {
//   history.push(`/printer/${printer.id}`);
// }

const PrinterCreateForm = () => {
  // const printerFeatures = useSelector(state => state.printer.features);
  // const printerStatus = useSelector(state => state.printer.retailStatus);
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [retailStatus, setRetailStatus] = useState('');
  const [features, setFeatures] = useState([])
  const [errors, setErrors] = useState([]);

  // const updateRetailStatus = (e) => setRetailStatus(e.target.value);
  // const updateFeatures = (e) => setFeatures(e.target.value);

  if (!sessionUser) history.push('/');

  useEffect(() => {
    dispatch(printerActions.getPrinterFeatures());
  }, [dispatch]);

  //Function to change selected check boxes into an array
  const featureSelect = useSelector((state) => Array.from(state.printer.features))

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

  //Need to try and get this working... map the features from set features and make it into an object?
  //I want to add it to join table featuretypes, where id = current created printer, and features is id from array created.
  // const featureSubmit = setFeatures().map(feature => {
  //   console.log("FEAAAAAAAAATTTTTTUUUUUUURRRRRRRE", feature)
  // })

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    dispatch(printerActions.createPrinter({ brand, model, description, retailPrice, videoUrl, pictureUrl, retailStatus }))
      .then(history.push(`/`))
      // .then(history.push(`/printer/${data.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }



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
           {/* <select onChange={(e) => setRetailStatus(e.target.value)}
              value={retailStatus}>
              {printerStatus.map(status =>
                <option key={status}>{status}</option>
                )}
              </select> */}
          </label>
          <label>
            Printer Features
              <ul className="form--element">{featureSelect?.map((feature) =>
            <li key={feature.id}>
              <input type="checkbox" id={feature.id} name={feature.features} value={feature.id} onChange={(e) => handleCheckbox(e)} />
              <label htmlFor={feature.features}>{feature.features}</label>
            </li>
          )}
            </ul>
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


export default PrinterCreateForm;
