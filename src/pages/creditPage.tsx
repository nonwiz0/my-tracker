import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { resetAll } from "../components/StorageComponent";
import "../theme/components.css";
import { useHistory } from "react-router";

const CreditPage: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center"> Credit & Others </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonSlides>
          <IonSlide>
            <IonCard>
              <IonCardHeader>
                {" "}
                <div>
                  <img src="/assets/svg/specialThanks.svg" height="100 px" />
                </div>{" "}
                Special Thanks{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    - Undraw.co for the amazing illustration
                    <br />
                    - Canva.com for the favicon
                    <br />
                  </div>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <IonCardHeader>
                {" "}
                <div>
                  <img src="/assets/svg/personalData.svg" height="100 px" />
                </div>{" "}
                Privacy Policy{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    VLS does not make use data
                    <br />
                    from our side
                  </div>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <IonCardHeader>
                {" "}
                <div>
                  <img src="/assets/svg/react.svg" height="100 px" />
                </div>{" "}
                React{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    - Power by
                    <br />
                    - React
                    <br />
                  </div>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <IonCardHeader>
                {" "}
                <div>
                  <img src="/assets/svg/openSource.svg" height="100 px" />
                </div>{" "}
                Open Source{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    Get started with <br /> gh repo clone chanrose/vls
                    <br />
                  </div>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonSlide>
          <IonSlide>
            <IonCard>
              <IonCardHeader>
                {" "}
                <div>
                  <img src="/assets/svg/contactUs.svg" height="100 px" />
                </div>{" "}
                Contact me{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    <a href="mailto:bdchanbroset@gmail.com">Email me</a> <br />{" "}
                    <a href="https://chanrose.vercel.app">My website</a>
                    <br />
                  </div>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonSlide>
        </IonSlides>
        <IonButton
          color="primary"
          routerLink="/"
          expand="block"
          onClick={() => history.goBack()}
        >
          Go Back
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default CreditPage;
