import React, { useState } from "react";
import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonChip,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLoading,
  IonPage,
  IonProgressBar,
  IonSlide,
  IonSlides,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import { auth } from "../firebase";

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });
  const [status, setStatus] = useState({ loading: false, error: false });
  const [errorMessage, setErr] = useState("");
  const handleLogin = async () => {
    try {
      setStatus({ loading: true, error: false });
      const credential = await auth.signInWithEmailAndPassword(
        userDetail.email,
        userDetail.password
      );
    } catch (error) {
      setErr(error.message!);
      setStatus({ loading: false, error: true });
      console.log(error);
    }
  };

  if (loggedIn) {
    return <Redirect to="/my/home" />;
  }

  return (
    <IonPage>
      {status.loading && (
        <div>
          <IonAlert isOpen={status.loading} message={`Loading ...`} />
        </div>
      )}
      {status.error && (
        <IonAlert
          isOpen={status.error}
          onDidDismiss={() => setStatus({ error: false, loading: false })}
          header={"Login failed"}
          message={`${errorMessage}`}
          buttons={["OK"]}
        />
      )}
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">Login Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard>
          <IonCardHeader color="primary">
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
          onClick={handleLogin}
          className="ion-margin-start ion-margin-end"
          expand="block"
        >
          LOGIN
        </IonButton>
        <IonButton
          routerLink="/register"
          className="ion-margin-start ion-margin-end"
          fill="clear"
          expand="full"
        >
          DON'T HAVE ACCOUNT YET?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
