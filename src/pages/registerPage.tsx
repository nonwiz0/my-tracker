import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import { auth } from "../firebase";

const RegisterPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: false });

  const handleRegister = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.createUserWithEmailAndPassword(
        userDetail.email,
        userDetail.password
      );
    } catch (error) {
      setStatus({ loading: false, error: true });
      console.log(error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my" />;
  }

  if (status.loading) {
    return <IonLoading isOpen />;
  }
  return (
    <IonPage>
      {" "}
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">Registration </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <IonCardHeader>
            <div className="ion-text-center">
              <img
                src="/assets/svg/login-authentication.svg"
                alt="login illustration"
                height="150 px"
              />
            </div>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonInput
                value={userDetail.email}
                onIonChange={(e) =>
                  setUserDetail({
                    email: e.detail.value!,
                    password: userDetail.password,
                  })
                }
                type="text"
                placeholder="forcess97@gmail.com"
              />
            </IonItem>
            <IonItem>
              <IonInput
                value={userDetail.password}
                onIonChange={(e) =>
                  setUserDetail({
                    email: userDetail.email,
                    password: e.detail.value!,
                  })
                }
                type="password"
                placeholder="*******"
              />
            </IonItem>
          </IonCardContent>
        </IonCard>

        <IonButton
          onClick={handleRegister}
          className="ion-margin-start ion-margin-end"
          expand="block"
        >
          SIGNUP
        </IonButton>
        <IonButton
          routerLink="/login"
          className="ion-margin-start ion-margin-end"
          fill="clear"
          expand="full"
        >
          ALREADY HAVE AN ACCOUNT?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
