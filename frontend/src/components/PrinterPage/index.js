import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOnePrinter } from '../../store/printers'
import ReviewFormModal from '../ReviewFormModal';

const PrinterPage = () => {

  const { id } = useParams();
  const printer = useSelector(state => state.printer[id]);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session)
  const history = useHistory();
  const [showEditPrinterForm, setShowEditPrinterForm] = useState(false);
  console.log("PRRRIINNNTTEERRR", printer)

  useEffect(() => {
    dispatch(getOnePrinter(id));
    setShowEditPrinterForm(false);
  }, [dispatch, id]);

  if (!printer) history.push('/');


  let content = null;

  if (sessionUser) {
    content = (
      <div className="Reviews__Create">
        <ReviewFormModal />
      </div>)
  } else {
    content = (
      <h3>Please log in to create a review!</h3>
    )
  }
  let contentPicture = null;

  if (printer.pictureUrl) {
    contentPicture = (
      <div
        className="printer-image" style={{ backgroundImage: `url('${printer.pictureUrl}')` }}></div>)
  } else {
    contentPicture = (
      <div></div>
    )
  }

  return (
    <div className="printer-detail">
      <div>
        {contentPicture}
        <div>
          <h1 className="printer-element">{printer.brand} {printer.model}</h1>
        </div>
        <div>
          <p className="printer-element">Retail Price: {printer.retailPrice}</p>
        </div>
        <div>
          <p className="printer-element">{printer.description}</p>
        </div>

        <div>
          {/* How do I embed a video link? */}
        </div>

      </div>
      {content}
    </div>
  );
}

export default PrinterPage;
