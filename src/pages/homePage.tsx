import React, { useEffect, useState } from "react";
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
  IonToolbar,
} from "@ionic/react";
import dayjs from "dayjs";
import { play, stop } from "ionicons/icons";
import ClockTime from "../components/TimeCard";
import { Plugins } from "@capacitor/core";
import { formatTime } from "../components/FormatDateTime";
import { useHistory } from "react-router";

const { Storage } = Plugins;
// JSON "set" example

const HomePage: React.FC = () => {
  const history = useHistory();
  const [handleClick, setHandleChange] = useState(0);
  const [enableStop, setEnableStop] = useState(false);
  // Timer status
  const [timerStatus, setTimerStatus] = useState({
    timeIn: "",
    timeOut: "",
    start: false,
    stop: false,
    totalTime: 0,
  });

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
        date: new Date(),
      }),
    });
  };

  const timerControl = ({
    start,
    stop,
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
        stop: false,
        totalTime: 0,
      });
      console.log("Timer starts!");
      return 0;
    }
  };

  // When user trigger save
  const handleSave = () => {
    setObj();
    setHandleChange(handleClick + 1);
    handleReset();
    history.go(0);
  };
  if (timerStatus.stop) {
    console.log("Total Time:", timerStatus.totalTime, " sec");
  }

  useEffect(() => {
    setTaskDetail({ category: "", description: "" });
  }, [handleClick]);

  // WHen user click reset
  const handleReset = () => {
    setHandleChange(handleClick + 1);
    setTimerStatus({
      timeIn: "",
      timeOut: "",
      start: false,
      stop: false,
      totalTime: 0,
    });
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
                {/* <IonInput
                  value={taskDetail.description}
                  onIonChange={(e) =>
                    setTaskDetail({
                      description: e.detail.value!,
                      category: taskDetail.category,
                    })
                  }
                  placeholder="I am working on ..."
                ></IonInput> */}
                <IonTextarea
                  value={taskDetail.description}
                  onIonChange={(e) =>
                    setTaskDetail({
                      description: e.detail.value!,
                      category: taskDetail.category,
                    })
                  }
                  placeholder="I'm working on ..."
                ></IonTextarea>
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
                    <IonSelectOption value="Main Project">
                      Main Project
                    </IonSelectOption>
                    <IonSelectOption value="Side Project">
                      Side Project
                    </IonSelectOption>
                    <IonSelectOption value="Course Work">
                      Course Work
                    </IonSelectOption>
                    <IonSelectOption value="Workplace">Working</IonSelectOption>
                    <IonSelectOption value="Learning">Learning</IonSelectOption>

                    <IonSelectOption value="Learning">Testing</IonSelectOption>
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
