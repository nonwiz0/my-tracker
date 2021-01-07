import React, { useContext, useEffect, useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import dayjs from "dayjs";
import { play, stop } from "ionicons/icons";
import ClockTime from "../components/TimeCard";
import { formatTime } from "../components/FormatDateTime";
import { firestore } from "../firebase";
import { useAuth } from "../auth";
import { CategoryDetail, toEntry, TrackContext } from "../model";

const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [showSaveToast, setSaveToast] = useState(false);
  const [cateList, setCateList] = useState<CategoryDetail>();
  const entriesRef = firestore.collection("users").doc(userId);

  const { TrackStatus, setTrackStatus } = useContext(TrackContext);

  const getListFromFS = async () => {
    await entriesRef.onSnapshot((doc) => {
      setCateList(toEntry(doc));
    });
  };
  useEffect(() => {
    getListFromFS();
    return () => {};
  }, [userId]);
  // To save on the cloud
  const saveOnFS = async () => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("tasks");
    const entryData = {
      category: TrackStatus.category,
      description: TrackStatus.description,
      timeIn: TrackStatus.timeIn,
      timeOut: TrackStatus.timeOut,
      totalTime: TrackStatus.totalTime,
      date: `${dayjs()}`,
    };
    const entryRef = await entriesRef.add(entryData);
    handleReset();
    return () => {
      console.log(entryRef);
    };
  };

  const timerControl = ({
    start,
    stop,
  }: {
    start?: boolean;
    stop?: boolean;
    pause?: boolean;
  }) => {
    if (TrackStatus.stop && stop) {
    } else if (stop) {
      const startCount = dayjs(TrackStatus.timeIn);
      const temp = dayjs();
      const timeDiff = temp.diff(startCount, "second");

      setTrackStatus({
        ...TrackStatus,
        start: false,
        timeOut: temp.toString(),
        stop: true,
        totalTime: timeDiff,
      });
      return 0;
    }

    if (TrackStatus.start && start) {
    } else if (start) {
      const temp = dayjs();

      setTrackStatus({
        ...TrackStatus,
        start: true,
        timeIn: temp.toString(),
        stop: false,
        totalTime: 0,
      });
      return 0;
    }
  };

  const handleSave = () => {
    saveOnFS();
    handleReset();
    setSaveToast(true);
  };

  const handleReset = () => {
    setTrackStatus({
      description: "",
      category: "",
      timeIn: "",
      timeOut: "",
      start: false,
      stop: false,
      totalTime: 0,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <div className="ion-text-center">Home Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <div className="ion-text-center ion-margin-top ion-padding-top">
            <h2>
              {TrackStatus.stop ? (
                formatTime(TrackStatus.totalTime)
              ) : (
                <ClockTime />
              )}
            </h2>
          </div>
          <IonCardContent>
            {TrackStatus.start && (
              <div className="ion-text-center">
                <IonTextarea
                  value={TrackStatus.description}
                  onIonChange={(e) =>
                    setTrackStatus({
                      ...TrackStatus,
                      description: e.detail.value!,
                    })
                  }
                  placeholder="Right now, I ..."
                ></IonTextarea>
              </div>
            )}
            {TrackStatus.stop && (
              <div>
                <IonItem color="primary">
                  <IonLabel>Task: </IonLabel>
                  <IonSelect
                    value={TrackStatus.category}
                    onIonChange={(e) =>
                      setTrackStatus({
                        ...TrackStatus,
                        category: e.detail.value!,
                      })
                    }
                  >
                    {cateList?.category.map((cate) => (
                      <IonSelectOption value={`${cate}`} key={`${cate}`}>
                        {cate}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonItem>
              </div>
            )}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardContent>
            {!TrackStatus.stop ? (
              <div>
                <IonRow>
                  <IonCol>
                    <IonButton
                      fill="clear"
                      onClick={() => timerControl({ start: true })}
                      disabled={TrackStatus.start}
                    >
                      <IonIcon icon={play}></IonIcon>
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-end">
                    <IonButton
                      onClick={() => timerControl({ stop: true })}
                      fill="clear"
                      disabled={!TrackStatus.start}
                    >
                      <IonIcon icon={stop} />
                    </IonButton>
                  </IonCol>
                </IonRow>
              </div>
            ) : (
              <div>
                <IonRow>
                  <IonCol>
                    <IonButton
                      onClick={handleReset}
                      color="danger"
                      fill="clear"
                      disabled={false}
                    >
                      Reset
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-end">
                    <IonButton
                      onClick={handleSave}
                      color="primary"
                      fill="clear"
                    >
                      {" "}
                      Save{" "}
                    </IonButton>
                  </IonCol>
                </IonRow>
              </div>
            )}
          </IonCardContent>
        </IonCard>

        <IonToast
          isOpen={showSaveToast}
          onDidDismiss={() => setSaveToast(false)}
          message="You have save the record successfully"
          duration={200}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
