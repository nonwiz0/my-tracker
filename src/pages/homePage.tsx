import React, { useState } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
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
import ClockTime from "../components/TimeCard";
import { Plugins } from "@capacitor/core";
import { useHistory } from "react-router";
import formatTime from "../components/FormatTime";

const { Storage } = Plugins;
// JSON "set" example

const HomePage: React.FC = () => {
  const [enableStop, setEnableStop] = useState(false);
  // Timer status
  const [timerStatus, setTimerStatus] = useState({
    timeIn: "",
    timeOut: "",
    pause: false,
    start: false,
    stop: false,
    totalTime: 0,
  });
  const history = useHistory();

  // Timer detail about tasks
  const [taskDetail, setTaskDetail] = useState({
    category: "",
    description: "",
  });

  // To save locally
  const setObj = async () => {
    await Storage.set({
      key: `${dayjs().format("DD-HH-mm-ss")}`,
      value: JSON.stringify({
        id: `${dayjs().format("DD-HH-mm-ss")}`,
        category: taskDetail.category,
        description: taskDetail.description,
        timeIn: timerStatus.timeIn,
        timeOut: timerStatus.timeOut,
        totalTime: timerStatus.totalTime,
      }),
    });
  };

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
      setEnableStop(!enableStop);
      setTimerStatus({
        start: false,
        timeIn: timerStatus.timeIn,
        timeOut: temp.toString(),
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
      setEnableStop(!enableStop);
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
  };

  // When user trigger save
  const handleSave = () => {
    console.log("time status", timerStatus);
    console.log("Task detail:", taskDetail);
    setObj();
    history.go(0);
  };
  if (timerStatus.stop) {
    console.log("Total Time:", timerStatus.totalTime, " sec");
  }

  // WHen user click reset
  const handleReset = () => {
    setTimerStatus({
      timeIn: "",
      timeOut: "",
      pause: false,
      start: false,
      stop: false,
      totalTime: 0,
    });
    history.go(0);
  };
  return (
    <IonPage>
      {" "}
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
              {timerStatus.stop ? (
                formatTime(timerStatus.totalTime)
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
          <IonCardContent>
            {!timerStatus.stop ? (
              <div>
                <IonRow>
                  <IonCol>
                    <IonButton
                      fill="clear"
                      onClick={() => timerControl({ start: true })}
                      disabled={enableStop}
                    >
                      <IonIcon icon={play}></IonIcon>
                    </IonButton>
                  </IonCol>
                  <IonCol className="ion-text-end">
                    <IonButton
                      onClick={() => timerControl({ stop: true })}
                      fill="clear"
                      disabled={!enableStop}
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
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
