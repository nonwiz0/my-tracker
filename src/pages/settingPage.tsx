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
import { resetAll } from "../components/StorageComponent";
import "../theme/components.css";
import { auth } from "../firebase";

const toggleDarkModeHandler = () => {
  document.body.classList.toggle("dark");
};

const SettingPage: React.FC = () => {
  const handleLogout = () => {
    auth.signOut();
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

          <IonItem>MFA © 2020</IonItem>
          <IonItem>
            <div>
              <a href="/credits">Credits & Others</a>
            </div>
          </IonItem>
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
