import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NaviFooter from "./components/NaviFooter";
import Navigation from "./components/Navigation";
import PrinterCreateForm from "./components/PrinterCreateForm";
import PrinterPage from "./components/PrinterPage";
import UserPage from "./components/ProfilePage";
import SignupFormPage from "./components/SignupFormPage";
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
                    <Route path="/signup">
                        <SignupFormPage />
                    </Route>
                    <Route path="/createPrinter">
                        <PrinterCreateForm />
                    </Route>
                    <Route path="/printers/:id">
                        <PrinterPage />
                    </Route>
                    <Route path="/users/:id">
                        <UserPage />
                    </Route>
                </Switch>
            )}
            <NaviFooter />
        </>
    );
}

export default App;
