import React, { useEffect, useState } from "react";
import { IonApp, IonLoading, IonProgressBar } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import AppTabs from "./AppTabs";
import { AuthContext, useAuthInit } from "./auth";
import { Redirect, Route, Switch } from "react-router";
import LoginPage from "./pages/loginPage";
import PageNotFoundPage from "./pages/pageNotFoundPage";
import { auth } from "./firebase";
import RegisterPage from "./pages/registerPage";

const App: React.FC = () => {
  const { loading, auth } = useAuthInit();
  console.log("Logged in", auth);

  if (loading) {
    return <div></div>;
  }
  return (
    <IonApp>
      <AuthContext.Provider value={auth!}>
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
          </Switch>
          <Route
            path="/"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
