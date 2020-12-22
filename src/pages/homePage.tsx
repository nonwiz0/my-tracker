import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import dayjs from "dayjs";
import { play, stop } from "ionicons/icons";

const ClockTime: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const RefreshClock = () => {
    setDate(new Date());
  };
  setInterval(RefreshClock, 1000);
  return (
    <div>
      <h2>{date.toLocaleTimeString()}</h2>
    </div>
  );
};

const HomePage: React.FC = () => {
  const [timerStatus, setTimerStatus] = useState({
    timeIn: "",
    timeOut: "",
    pause: false,
    start: false,
    stop: false,
    totalTime: 0,
  });
  const [taskDetail, setTaskDetail] = useState({
    category: "",
    description: "",
  });
  const timerControl = ({
    start,
    stop,
    pause,
  }: {
    start?: boolean;
    stop?: boolean;
    pause?: boolean;
  }) => {
    if (timerStatus.stop && stop) {
      console.log("You already time out, please time in again!");
    } else if (stop) {
      const startCount = dayjs(timerStatus.timeIn);
      const temp = dayjs();
      const timeDiff = temp.diff(startCount, "second");

      setTimerStatus({
        start: false,
        timeIn: timerStatus.timeIn,
        timeOut: timerStatus.timeOut,
        pause: timerStatus.pause,
        stop: true,
        totalTime: timeDiff,
      });
      console.log("Timer stop!");
      return 0;
    }

    if (timerStatus.start && start) {
      console.log("Time in already pressed once!");
    } else if (start) {
      const temp = dayjs();
      setTimerStatus({
        start: true,
        timeIn: temp.toString(),
        timeOut: timerStatus.timeOut,
        pause: timerStatus.pause,
        stop: false,
        totalTime: 0,
      });
      console.log("Timer starts!");
      return 0;
    }
    if (pause) {
      console.log("Timer pauses!");
    }
    // if (timerStatus.stop) {
    //   console.log("Time out already pressed once!");
    // }
  };
  const handleSave = () => {
    console.log("time status", timerStatus);
    console.log("Task detail:", taskDetail);
  };
  if (timerStatus.stop) {
    console.log("Total Time:", timerStatus.totalTime, " sec");
  }
  return (
    <IonPage>
      <IonHeader collapse="condense">
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
              {timerStatus.stop ? (
                timerStatus.totalTime + " Sec"
              ) : (
                <ClockTime />
              )}
            </h2>
          </div>
          <IonCardContent>
            {timerStatus.start && (
              <div className="ion-text-center">
                <IonInput
                  value={taskDetail.description}
                  onIonChange={(e) =>
                    setTaskDetail({
                      description: e.detail.value!,
                      category: taskDetail.category,
                    })
                  }
                  placeholder="I am working on ..."
                ></IonInput>
              </div>
            )}
            {timerStatus.stop && (
              <div>
                <IonItem color="primary">
                  <IonLabel>Task: </IonLabel>
                  <IonSelect
                    value={taskDetail.category}
                    onIonChange={(e) =>
                      setTaskDetail({
                        description: taskDetail.description,
                        category: e.detail.value!,
                      })
                    }
                  >
                    <IonSelectOption value="side-project">
                      Side Project
                    </IonSelectOption>
                    <IonSelectOption value="assignment">
                      Assignment
                    </IonSelectOption>
                    <IonSelectOption value="work">Work</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>
            )}
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader></IonCardHeader>
          <IonCardContent>
            {!timerStatus.stop ? (
              <div>
                <IonRow>
                  <IonCol>
                    <IonButton
                      fill="clear"
                      onClick={() => timerControl({ start: true })}
                    >
                      <IonIcon icon={play}></IonIcon>
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-end">
                    <IonButton
                      onClick={() => timerControl({ stop: true })}
                      fill="clear"
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
                      onClick={() =>
                        setTimerStatus({
                          timeIn: "",
                          timeOut: "",
                          pause: false,
                          start: false,
                          stop: false,
                          totalTime: 0,
                        })
                      }
                      color="danger"
                      fill="clear"
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
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
