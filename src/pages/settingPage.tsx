import React from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import "../theme/components.css";
import { auth } from "../firebase";
import { Redirect } from "react-router";

const toggleDarkModeHandler = () => {
  document.body.classList.toggle("dark");
};

const SettingPage: React.FC = () => {
  const handleLogout = () => {
    auth.signOut();
    return <Redirect to="/login" />;
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center"> Setting Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard>
          <div className="ion-text-center ion-margin-top ion-padding-top">
            <img
              alt="setting "
              src="./assets/svg/setting-preference.svg"
              height="150 px"
            />
          </div>

          <IonItem>
            <IonLabel> Switch Theme</IonLabel>
            <IonToggle
              slot="end"
              name="darkMode"
              onIonChange={toggleDarkModeHandler}
            />
          </IonItem>

          <IonItem>
            <div>
              <a href="/my/credits">Credits & Others</a>
            </div>
          </IonItem>
          <IonItem>
            <a href="mailto:bdchanbroset@gmail.com">
              Found a bug or suggestion?
            </a>
          </IonItem>
          <IonItem>MFA © 2020</IonItem>
        </IonCard>

        <IonButton
          color="danger"
          routerLink="/login"
          expand="block"
          onClick={handleLogout}
        >
          LOGOUT
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SettingPage;
