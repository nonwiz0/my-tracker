import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { home, listCircle, settings } from "ionicons/icons";
import HomePage from "./pages/homePage";
import ViewPage from "./pages/viewPage";
import SettingPage from "./pages/settingPage";
import EntryPage from "./pages/entryPage";
import CreditPage from "./pages/creditPage";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/home" component={HomePage} exact={true} />
          <Route path="/view" component={ViewPage} exact={true} />
          <Route path="/setting" component={SettingPage} />
          <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
          <Route exact path="/view/entries/:id">
            <EntryPage />
          </Route>
          <Route path="/credits" component={CreditPage} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/view">
            <IonIcon icon={listCircle} />
            <IonLabel>View list</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/setting">
            <IonIcon icon={settings} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
