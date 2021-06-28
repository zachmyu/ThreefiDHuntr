import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NaviFooter from "./components/NaviFooter";
import Navigation from "./components/Navigation";
import PrinterCreateForm from "./components/PrinterCreateForm";
import PrinterPage from "./components/PrinterPage";
import PrinterUpdateForm from "./components/PrinterUpdateForm";
import UserPage from "./components/ProfilePage";
import SignupFormPage from "./components/SignupFormPage";
import ReviewsUpdateForm from "./components/ReviewsUpdateForm";
import * as sessionActions from "./store/session";

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    return (
        <>
            <Navigation isLoaded={isLoaded} />
                {isLoaded && (
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route exact path="/signup">
                            <SignupFormPage />
                        </Route>
                        <Route exact path="/createPrinter">
                            <PrinterCreateForm />
                        </Route>
                        <Route exact path="/printers/:id">
                            <PrinterPage />
                        </Route>
                        <Route exact path="/printers/:id/edit">
                            <PrinterUpdateForm />
                        </Route>
                        <Route exact path="/users/:id">
                            <UserPage />
                        </Route>
                        <Route exact path="/reviews/:id">
                            <ReviewsUpdateForm />
                        </Route>
                    </Switch>
                )}
            <NaviFooter />
        </>
    );
}

export default App;
