import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import "../theme/components.css";
import { auth } from "../firebase";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import CreditPage from "./creditPage";

const toggleDarkModeHandler = () => {
  document.body.classList.toggle("dark");
};

const SettingPage: React.FC = () => {
  const [showCreditModal, setCreditModal] = useState(false);
  const turnOffCredit = () => {
    setCreditModal(false);
  };

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
            <div onClick={() => setCreditModal(true)}>Credits & Others</div>
          </IonItem>
          <IonItem>
            <a href="mailto:chanrose@protonmail.com">
              Found a bug or suggestion?
            </a>
          </IonItem>
          <IonItem>
            <Link to="/my/category"> Add/Remove Category</Link>
          </IonItem>
          <IonItem>COR © 2020</IonItem>
        </IonCard>

        <IonButton
          color="danger"
          routerLink="/login"
          expand="block"
          onClick={handleLogout}
        >
          LOGOUT
        </IonButton>
        <div className="ion-text-center">
          <IonText color="medium">Latest update on Jan 07, 2021</IonText>
        </div>
        <IonModal
          isOpen={showCreditModal}
          onDidDismiss={() => setCreditModal(false)!}
        >
          <CreditPage turnOffModal={turnOffCredit} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SettingPage;
