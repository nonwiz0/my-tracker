import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Plugins } from "@capacitor/core";
import { TrackDetail } from "../model";
import formatTime from "../components/FormatTime";
import { pencil, trash } from "ionicons/icons";

const { Storage } = Plugins;
const ViewPage: React.FC = () => {
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
    setTrackList(temp);
    console.log(temp);
  };
  useEffect(() => {
    getKeys();

    return () => {
      console.log("unmount");
    };
  }, []);

  console.log("List from Track", trackList);
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
              {/* <p>Site-Project: 1, Assignment: 2, Learning: 3</p> */}
              <p>You can slide the item to edit or delete</p>
            </div>
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
        {trackList.map((entry) => (
          <IonItemSliding>
            <IonItem key={entry.id}>
              <IonCol>
                {" "}
                <div className="ion-text-start">{entry.description}</div>{" "}
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
              <IonItemOption color="" slot="icon-only">
                <IonIcon icon={pencil}> </IonIcon>
              </IonItemOption>
              <IonItemOption color="danger">
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
