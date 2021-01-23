import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonSlide,
  IonSlides,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "../theme/components.css";
import { turnOffModal } from "../model";

const CreditPage: React.FC<turnOffModal> = ({ turnOffModal }) => {
  return (
    <>
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
                  <img
                    src="/assets/svg/specialThanks.svg"
                    alt="thanks illustration"
                    height="100 px"
                  />
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
                  <img
                    src="/assets/svg/personalData.svg"
                    alt="no data taken"
                    height="100 px"
                  />
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
                  <img
                    src="/assets/svg/react.svg"
                    alt="react "
                    height="100 px"
                  />
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
                  <img
                    src="/assets/svg/openSource.svg"
                    alt=" about open source"
                    height="100 px"
                  />
                </div>{" "}
                Open Source{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    Get started with <br /> gh repo clone chanrose/my-tracker
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
                  <img
                    src="/assets/svg/contactUs.svg"
                    alt="contact me"
                    height="100 px"
                  />
                </div>{" "}
                Contact me{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonText>
                  <div className="ion-text-center">
                    <a href="mailto:chanrose@protonmail.com">
                      Email: chanrose@pm.me
                    </a>{" "}
                    <br />{" "}
                    <a href="https://chanrose.now.sh">
                      Website: https://chanrose.now.sh
                    </a>
                    <br />
                  </div>
                </IonText>
              </IonCardContent>
            </IonCard>
          </IonSlide>
        </IonSlides>
        <IonButton color="primary" expand="block" onClick={turnOffModal}>
          Go Back
        </IonButton>
      </IonContent>
    </>
  );
};

export default CreditPage;
