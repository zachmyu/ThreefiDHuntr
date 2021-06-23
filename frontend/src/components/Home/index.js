import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, useParams } from "react-router-dom";
import { getPrinters } from "../../store/printers";

const Home = () => {
	const dispatch = useDispatch();
	const printer = useSelector((state) => {
		return state.printer.list.map((printerId) => state.printer[printerId]);
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
                            key={printer.id}
                            to={`/printers/${printer.id}`}
                        >
                            <div className="printer-card-left">
                                <img
                                className="printer-thumbnail-image"
                                src={printer.pictureUrl}
                                alt={`Thumbnail of ${printer.brand} ${printer.model}`}
                                />
                            </div>
                            <div className="printer-card-right">
                                <div className="primary-text">
                                    {printer.brand} {printer.model}
                                </div>
                                <div className="secondary-text">
                                    {printer.boosts} Retail price: $
                                    {printer.retailPrice} Status:
                                    {printer.retailStatus}
                                </div>
                            </div>
                        </NavLink>
                    );
                })}
			</article>
		</main>
	);
};

export default Home;