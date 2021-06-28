import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { getOnePrinter, deletePrinter } from '../../store/printers'
import ReviewFormModal from '../ReviewFormModal';
import './PrinterPage.css'

const PrinterPage = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { id } = useParams();
    const printer = useSelector(state => state.printer[id]);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getOnePrinter(id));
    }, [dispatch, id]);

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await dispatch(deletePrinter(printer.id))
            history.push('/')
        } catch (e) {
            //This error shouldn't appear unless the printer is deleted directly from the database but not removed from the state...
            console.log("Printer Deletion Error", e);
        }
    }

    if (!printer) history.push('/');

    let submitContent = null;
    if (sessionUser) {
        submitContent = (
            <div className="Reviews__Create">
                <ReviewFormModal />
                <NavLink to={`/printers/${id}/edit`}>
                    <button className="button1" type="button">Edit Printer Info</button>
                </NavLink>
                <button className="button1" type="button" onClick={handleDelete}>Delete Printer</button>
            </div>
        )
    } else {
        submitContent = (
            <h3>Please log in to create a review or make changes to the printer!</h3>
        )
    }
    let contentPicture = null;
    if (printer?.pictureUrl) {
        contentPicture = (
            <img
                className="printer-image"
                src={printer?.pictureUrl}
                alt={`${printer?.brand} ${printer?.model}`}
            />
            )
    } else {
        contentPicture = (
            <img
                className="printer-image"
                src="/images/nessie.png"
                alt="Nessie says No Images Uploaded!"
            />
        )
    }

    let contentVideo = null;
    if (printer?.videoUrl) {
        contentVideo = (
            <ReactPlayer url={printer?.videoUrl} />
            )
    } else {
        contentVideo = (
            <ReactPlayer url="https://youtu.be/dQw4w9WgXcQ" />
        )
    }

    return (
        <div className="printer-detail-container">
            <h1 id="printer-element__title">{printer?.brand} {printer?.model}</h1>
            <div id="printer-element__subtitle">Retail Price: {printer?.retailPrice} Retail Status: {printer?.retailStatus}</div>
            <div className="printer-detail-card">
                {contentPicture}
                <div className="printer-detail__title">
                </div>
                <div className="printer-detail__info">
                    <p id="printer-element__paragraph">{printer?.description}</p>
                </div>
                <div className="printer-detail__video">
                    {contentVideo}
                </div>
            </div>
            {submitContent}
            <h2 id="printer-review__title">Reviews of this printer</h2>
            {printer?.PrinterReviews?.map(review => {
                return (
                    <div className="printer-review-card" key={review.id}>
                        {review?.review}
                    </div>
                )
            })}
        </div>
    );
}

export default PrinterPage;
