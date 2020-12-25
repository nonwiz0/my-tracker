import React, { useState } from "react";
import { IonApp, IonLoading, IonProgressBar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import { Redirect, Route, Switch } from "react-router";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import { TrackContext } from "./model";
import PageNotFoundPage from "./pages/pageNotFoundPage";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  const [TrackStatus, setTrackStatus] = useState({
    timeIn: "",
    timeOut: "",
    start: false,
    stop: false,
    totalTime: 0,
    category: "",
    description: "",
  });
  if (loading) {
    return <IonProgressBar type="indeterminate"></IonProgressBar>;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth!}>
        <TrackContext.Provider value={{ TrackStatus, setTrackStatus }}>
          <IonReactRouter>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route path="/my">
                <AppTabs />
              </Route>
              <Route>
                <PageNotFoundPage />
              </Route>
            </Switch>
            <Route
              path="/"
              render={() => <Redirect to="/login" />}
              exact={true}
            />
          </IonReactRouter>
        </TrackContext.Provider>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
