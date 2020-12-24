import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRouteMatch } from "react-router";
import { toEntry, TrackDetail } from "../model";
import { Plugins } from "@capacitor/core";
import { formatDate, formatDetailTime } from "../components/FormatDateTime";
import { firestore } from "../firebase";
import { useAuth } from "../auth";

interface RouterParams {
  id: string;
}

const { Storage } = Plugins;
const EntryPage: React.FC = () => {
  const { userId } = useAuth();
  console.log("You're eat entry page");
  const match = useRouteMatch<RouterParams>();
  const { id } = match.params;
  const [trackDetail, setTrackDetail] = useState<TrackDetail>();

  const getTrackFS = () => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("tasks")
      .doc(id);
    entryRef.get().then((doc) => {
      setTrackDetail(toEntry(doc));
    });
  };
  const getTrackDetail = async () => {
    const ret = await Storage.get({ key: id });
    const objValue = JSON.parse(ret.value!);
    setTrackDetail(objValue);
  };

  useEffect(() => {
    // getTrackDetail();
    getTrackFS();
    return () => {};
  }, [id, userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            <div>{trackDetail?.category} </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard>
          <div className="ion-text-center">
            <img
              alt="progress "
              src="./assets/svg/entry-progress.svg"
              height="150 px"
            />
          </div>
          <IonCardContent>
            <div className="ion-margin-bottom">
              <IonLabel>
                Date: <br />
              </IonLabel>
              <IonText color="primary">
                {formatDate(trackDetail?.date!)}
              </IonText>
              <br />
            </div>
            <div>
              <IonLabel>
                Description: <br />
              </IonLabel>
              <IonText color="primary">{trackDetail?.description}</IonText>
            </div>
          </IonCardContent>
        </IonCard>
        <IonRow>
          <IonCol>
            <IonCard color="primary">
              <IonCardContent>
                <div className="ion-text-center">
                  <IonLabel>Time in:</IonLabel>
                  <br />
                  <IonText>{formatDetailTime(trackDetail?.timeIn!)}</IonText>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
          <IonCol>
            <IonCard color="danger">
              <IonCardContent>
                <div className="ion-text-center">
                  <IonLabel>Time out:</IonLabel>
                  <br />
                  <IonText>{formatDetailTime(trackDetail?.timeOut!)}</IonText>
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
