import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";

const PageNotFoundPage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      {" "}
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">Login Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <IonCardHeader>
            <div className="ion-text-center">
              <img
                src="/assets/svg/view-noData.svg"
                alt="login illustration"
                height="150 px"
              />
            </div>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <div className="ion-text-center">404 Page Not Found</div>
          </IonCardContent>
        </IonCard>
        <div className="ion-text-end">
          <IonButton
            onClick={() => history.goBack()}
            className="ion-margin-start ion-margin-end"
            expand="block"
          >
            Go Back
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PageNotFoundPage;
