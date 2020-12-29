import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { home, listCircle, settings } from "ionicons/icons";
import HomePage from "./pages/homePage";
import ViewPage from "./pages/viewPage";
import SettingPage from "./pages/settingPage";
import EntryPage from "./pages/entryPage";
import CreditPage from "./pages/creditPage";
import { useAuth } from "./auth";

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Switch>
          <Route path="/my/home" component={HomePage} exact={true} />
          <Route path="/my/view" component={ViewPage} exact={true} />
          <Route path="/my/settings" component={SettingPage} />

          <Route path="/my/view/entries/:id">
            <EntryPage />
          </Route>
        </Switch>
        <Route
          path="/"
          render={() => <Redirect to="/my/home" />}
          exact={true}
        />
        <Route path="/my/credits" component={CreditPage} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="view" href="/my/view">
          <IonIcon icon={listCircle} />
          <IonLabel>View list</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settings} />
          <IonLabel>Setting</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
