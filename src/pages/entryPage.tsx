import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useRouteMatch } from "react-router";
import { toEntry, TrackDetail } from "../model";
import { formatDate, formatDetailTime } from "../components/FormatDateTime";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { close, pencil } from "ionicons/icons";

interface RouterParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const history = useHistory();
  const [editing, setEditing] = useState(false);
  const [description, setDescription] = useState("");
  const { userId } = useAuth();
  const match = useRouteMatch<RouterParams>();
  const { id } = match.params;
  const [trackDetail, setTrackDetail] = useState<TrackDetail>();
  const entryRef = firestore
    .collection("users")
    .doc(userId)
    .collection("tasks")
    .doc(id);

  const handleUpdate = async () => {
    if (description !== undefined) await entryRef.update({ description });
    history.goBack();
  };
  const getTrackFS = () => {
    entryRef.get().then((doc) => {
      setTrackDetail(toEntry(doc));
    });
  };

  useEffect(() => {
    getTrackFS();
    return () => {};
  }, [id]);

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
          <IonButtons slot="end">
            <IonButton onClick={() => setEditing(!editing)}>
              {editing && <IonIcon icon={close} />}
              {!editing && <IonIcon icon={pencil} />}
            </IonButton>
          </IonButtons>
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
              {editing && (
                <>
                  <IonTextarea
                    value={description}
                    onIonChange={(e) => setDescription(e.detail.value!)}
                    placeholder={trackDetail?.description}
                  ></IonTextarea>
                  <IonButton
                    onClick={handleUpdate}
                    className="ion-margin-top"
                    fill="clear"
                  >
                    Update
                  </IonButton>
                </>
              )}
              {!editing && (
                <IonText color="primary">{trackDetail?.description}</IonText>
              )}
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
