import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPrinters } from "../../store/printers";

const Home = () => {
	const dispatch = useDispatch();
    const printer = useSelector((state) => {
        const printerList = Object.values(state.printer)
		return printerList;
	});

	useEffect(() => {
		dispatch(getPrinters());
	}, [dispatch]);

	if (!printer) return null;

	return (
		<main>
			<article className="card-container">
                {printer.map((printer) => {
                    return (
                        <NavLink
                            className="printer-card"
                            key={printer?.id}
                            to={`/printers/${printer.id}`}
                        >
                            <div className="printer-card-left">
                                <img
                                className="printer-thumbnail-image"
                                src={printer?.pictureUrl}
                                alt={`Thumbnail of ${printer?.brand} ${printer?.model}`}
                                />
                            </div>
                            <div className="printer-card-mid">
                                <div className="primary-text">
                                    {printer?.brand} {printer?.model}
                                </div>
                                <div className="secondary-text">
                                    <div>Retail price: {printer?.retailPrice}</div>
                                    <div>Status: {printer?.retailStatus}</div>
                                </div>
                            </div>
                            <div className="printer-card-right">
                                <i className="fas fa-chevron-up"></i>
                                <div className="secondary-text">{printer?.Boost?.length}</div>
                            </div>
                        </NavLink>
                    );
                })}
			</article>
		</main>
	);
};

export default Home;