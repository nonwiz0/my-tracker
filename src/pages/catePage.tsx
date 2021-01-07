import React, { useEffect, useState } from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonChip,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { CategoryDetail, toEntry, TrackDetail } from "../model";
import { addCircle, closeCircle, open, trash } from "ionicons/icons";
import { formatString, formatTime } from "../components/FormatDateTime";
import { firestore } from "../firebase";
import { useAuth } from "../auth";

const CatePage: React.FC = () => {
  const [cateName, setCateName] = useState("");
  const { userId } = useAuth();
  const [showDelToast, setDelToast] = useState(false);
  const [cateList, setCateList] = useState<CategoryDetail>();

  let categoryList = cateList?.category;
  const entriesRef = firestore.collection("users").doc(userId);

  const getListFromFS = async () => {
    await entriesRef.onSnapshot((doc) => {
      setCateList(toEntry(doc));
    });
  };
  useEffect(() => {
    getListFromFS();
    return () => {};
  }, [userId]);

  // const handleDelete = async (keyName: string) => {
  //   const entryRef = entriesRef.doc(keyName);
  //   await entryRef.delete().then(() => {
  //     console.log("deleted");
  //   });
  //   setDelToast(true);
  // };
  const handleRemove = (cateName: string) => {
    console.log("Deleting");
    let temp = categoryList?.filter((cate) => cate !== cateName);
    entriesRef.update({ category: temp });
  };

  const handleAdd = () => {
    categoryList?.push(cateName);

    entriesRef.update({ category: categoryList });
    setCateName("Category name");
  };

  useEffect(() => {}, [handleAdd]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            <div> Category Page </div>{" "}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <IonCard color="primary">
          <IonCardContent>
            <div className="ion-text-center">
              <h2>Current Category List:</h2>
              {cateList?.category.map((cate) => (
                <IonChip color="light" key={`${cate}`}>
                  {cate}
                  <IonIcon
                    icon={closeCircle}
                    onClick={() => handleRemove(`${cate}`)}
                  />
                </IonChip>
              ))}
            </div>

            <p className="ion-text-center"></p>
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonRow>
            <IonInput
              value={cateName}
              onIonChange={(e) => setCateName(e.detail.value!)}
              type="text"
              placeholder="Category Name"
            />
            <IonButton fill="clear" onClick={handleAdd}>
              <IonIcon slot="icon-only" icon={addCircle} />
            </IonButton>
          </IonRow>
        </IonCard>

        <IonToast
          isOpen={showDelToast}
          onDidDismiss={() => setDelToast(false)}
          message="You have deleted the record successfully"
          duration={200}
        />
      </IonContent>
    </IonPage>
  );
};

export default CatePage;
