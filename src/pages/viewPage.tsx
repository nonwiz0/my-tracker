import React, { useEffect, useState } from "react";
import {
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
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { TrackDetail } from "../model";
import {
  arrowBack,
  arrowUp,
  chevronDownCircleOutline,
  open,
  pencil,
  push,
  trash,
} from "ionicons/icons";
import { removeItem } from "../components/StorageComponent";
import { useHistory } from "react-router";
import { formatTime } from "../components/FormatDateTime";
import { RefresherEventDetail } from "@ionic/core";
const { Storage } = Plugins;

const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
  setTimeout(() => {
    console.log("Async operation has ended");
    event.detail.complete();
  }, 2000);
};

const ViewPage: React.FC = () => {
  const [showNoData, setShowNoData] = useState(false);
  const history = useHistory();
  const [trackList, setTrackList] = useState<TrackDetail[]>([]);
  const getKeys = async () => {
    const { keys } = await Storage.keys();
    const temp = [];
    for (const i of keys) {
      const ret = await Storage.get({ key: i });
      const objValue = JSON.parse(ret.value!);
      console.log("Keys are", objValue);
      temp.push(objValue);
    }
    if (temp.length < 1) {
      setShowNoData(true);
    }
    setTrackList(temp);
    console.log(temp);
  };
  useEffect(() => {
    getKeys();

    return () => {
      console.log("unmount");
    };
  }, []);

  const sortedTrack = trackList.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  const handleDelete = (keyName: string) => {
    removeItem(keyName);
  };

  const categoryList: string[] = [];
  for (const i of sortedTrack) {
    if (!categoryList.includes(i.category)) {
      categoryList.push(i.category);
    }
  }
  console.log("Checking Loop: ", categoryList);
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
                <IonChip color="light">
                  {" "}
                  <IonLabel>{category}</IonLabel>{" "}
                </IonChip>
              ))}
            </p>
          </IonCardContent>
        </IonCard>

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
            <img src="/assets/svg/view-noData.svg" height="150 px" />
            <p>You haven't record any task yet!</p>
          </div>
        )}
        <IonRefresher color="light" slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing..."
          ></IonRefresherContent>
        </IonRefresher>
        {sortedTrack.map((entry) => (
          <IonItemSliding>
            <IonItem key={entry.id}>
              <IonCol>
                {" "}
                <div className="ion-text-start">
                  {entry.description.substr(0, 20)}
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
                routerLink={`/view/entries/${entry.id}`}
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
