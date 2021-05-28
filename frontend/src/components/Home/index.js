import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';

import PrinterPage from '../PrinterPage';
import CreatePrinterForm from '../PrinterCreateForm';
import { getPrinters } from '../../store/printers';


const Home = () => {
  const dispatch = useDispatch();
  const { printerId } = useParams();
  const printer = useSelector(state => {
    return state.printer.list.map(printerId => state.printer[printerId]);
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getPrinters());
  }, [dispatch]);

  if (!printer) {
    return null;
  }

  return (
    <main>
      <nav>
        <div className="card-container">
          {printer.map((printer) => {
            return (
              <div className="printer-card">
                <NavLink key={printer.name} to={`/printers/${printer.id}`}>
                <div className={
                  Number.parseInt(printerId) === printer.id
                    ? "nav-entry is-selected"
                    : "nav-entry"
                  }>
                <div className="nav-entry-image"
                  style={{backgroundImage: `url('/images/nessie.png')`}}></div>
                  {/* <div
                    className="nav-entry-image"
                    style={{backgroundImage: `url('${printer.imageUrl}')`}}
                  ></div> */}
                  <div className="nav-text">
                    <div className="primary-text">{printer.brand} {printer.model}</div>
                    <div className="secondary-text">{printer.boosts} Retail price: ${printer.retailPrice} Status:{printer.retailStatus}</div>
                  </div>
                </div>
                </NavLink>
              </div>
            );
          })
        }
        </div>
      </nav>
      {/* {showForm ? (
        <CreatePrinterForm hideForm={() => setShowForm(false)} />
      ) : (
        <Route path="/printers/:printerId">
          <PrinterPage />
        </Route>
      )} */}
    </main>
  );
};

export default Home;
