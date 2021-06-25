import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getOnePrinter } from '../../store/printers'
import ReviewFormModal from '../ReviewFormModal';
import './PrinterPage.css'

const PrinterPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams();
    const printer = useSelector(state => state.printer[id]);
    const dispatch = useDispatch();
    const history = useHistory();
    const [showEditPrinterForm, setShowEditPrinterForm] = useState(false);

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
                <button className="button1" type="button">{showEditPrinterForm}Edit Printer Info</button>
            </div>
        )
    } else {
        content = (
            <h3>Please log in to create a review!</h3>
        )
    }
    let contentPicture = null;

    if (printer.pictureUrl) {
    //   contentPicture = (
    //     <div className="printer-image" style={{ backgroundImage: `url('${printer.pictureUrl}')` }}></div>)
    // } else {
        contentPicture = (
            <div className="printer-image" style={{ backgroundImage: `url('/images/nessie.png')` }}></div>
        )
    }

    return (
        <div className="printer-detail-container">
            <div className="printer-detail-card">
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
