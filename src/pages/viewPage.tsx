import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { toEntry, TrackDetail } from "../model";
import { open, trash } from "ionicons/icons";
import { formatString, formatTime } from "../components/FormatDateTime";
import { firestore } from "../firebase";
import { useAuth } from "../auth";

const ViewPage: React.FC = () => {
  const { userId } = useAuth();
  const [showNoData, setShowNoData] = useState(false);
  const [trackList, setTrackList] = useState<TrackDetail[]>([]);
  const categoryList: string[] = [];
  const entriesRef = firestore
    .collection("users")
    .doc(userId)
    .collection("tasks");

  const getListFromFS = async () => {
    await entriesRef
      .orderBy("date", "desc")
      .onSnapshot(({ docs }) => setTrackList(docs.map(toEntry)));
  };
  useEffect(() => {
    getListFromFS();

    return () => {};
  }, []);

  const handleDelete = async (keyName: string) => {
    const entryRef = entriesRef.doc(keyName);
    await entryRef.delete().then(() => {
      console.log("deleted");
    });
  };

  for (const i of trackList) {
    if (!categoryList.includes(i.category)) {
      categoryList.push(i.category);
    }
  }

  useEffect(() => {
    if (!categoryList.length) {
      setShowNoData(true);
    } else {
      setShowNoData(false);
    }
  }, [categoryList]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">View Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <IonCardContent>
            <div className="ion-text-center">
              <h2>Tasks List:</h2>
            </div>

            <p className="ion-text-center">
              {categoryList.map((category) => (
                <IonChip color="light" key={category}>
                  <IonLabel>{category}</IonLabel>{" "}
                </IonChip>
              ))}
            </p>
          </IonCardContent>
        </IonCard>
        <div className="ion-text-center ion-margin-bottom">
          <IonButton color="light" expand="block">
            * Try to slide the record left or right
          </IonButton>
        </div>
        <IonItem lines="none">
          <IonCol>
            <IonText color="primary">Tasks</IonText>
          </IonCol>
          <IonCol>
            <div className="ion-text-end">
              {" "}
              <IonText color="primary"> Time Spent</IonText>
            </div>
          </IonCol>
        </IonItem>
        {showNoData && (
          <div className="ion-text-center ion-margin-top ion-padding-top">
            {" "}
            <img
              src="/assets/svg/view-noData.svg"
              height="150 px"
              alt="show no data"
            />
            <p>You haven't record any task yet!</p>
          </div>
        )}

        {trackList.map((entry) => (
          <IonItemSliding key={entry.id}>
            <IonItem>
              <IonCol>
                {" "}
                <div className="ion-text-start">
                  {formatString(entry.description)}
                </div>{" "}
              </IonCol>{" "}
              <IonCol>
                <div className="ion-text-end">
                  {formatTime(parseInt(entry.totalTime))}
                </div>{" "}
              </IonCol>
            </IonItem>
            <IonItemOptions side="start">
              <IonItemOption color="secondary">
                <IonText>{entry.category}</IonText>
              </IonItemOption>
            </IonItemOptions>
            <IonItemOptions side="end">
              <IonItemOption
                color=""
                slot="icon-only"
                routerLink={`/my/view/entries/${entry.id}`}
              >
                <IonIcon icon={open}> </IonIcon>
              </IonItemOption>
              <IonItemOption
                color="danger"
                onClick={() => handleDelete(entry.id)}
              >
                <IonIcon icon={trash}> </IonIcon>
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default ViewPage;
