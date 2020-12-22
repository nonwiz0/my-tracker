import React from "react";
import {
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

const toggleDarkModeHandler = () => {
  document.body.classList.toggle("dark");
};

const SettingPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">Setting Page </div>{" "}
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
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SettingPage;
