import React, { useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { getItem, getKeys } from "../components/StorageComponent";
import { Plugins } from "@capacitor/core";
import { TrackDetail } from "../model";
import formatTime from "../components/FormatTime";

const { Storage } = Plugins;
const ViewPage: React.FC = () => {
  const [trackList, setTrackList] = useState<TrackDetail[]>([]);
  const [listKey, setListKey] = useState<string[]>([]);
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

    console.log(listKey);
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
              <h2>Task Category:</h2>
              <p>Site-Project: 1, Assignment: 2, Learning: 3</p>
            </div>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonRow>
                <IonCol>Tasks</IonCol>
                <IonCol>
                  <div className="ion-text-end">Time Spent</div>{" "}
                </IonCol>
              </IonRow>
              {trackList.map((entry) => (
                <div key={entry.id}>
                  {/* <IonCol size="1">
                      <h4>{entry.description}</h4>
                    </IonCol>
                    <IonCol size={"1"}>
                      {" "}
                      {formatTime(parseInt(entry.totalTime))}
                    </IonCol> */}
                  <IonItem>
                    <h4>
                      {entry.description}{" "}
                      <div className="ion-text-end">
                        {formatTime(parseInt(entry.totalTime))}
                      </div>
                    </h4>
                  </IonItem>
                </div>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
        {/* {trackList.map((entry) => (
          <div key={entry.id}>
            <div>{entry.category}</div>
            <div>{entry.description}</div>
            <div>Total Time Spent: {formatTime(parseInt(entry.totalTime))}</div>
            <br />
          </div>
        ))} */}
      </IonContent>
    </IonPage>
  );
};

export default ViewPage;
