import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonImg,
  IonList,
  IonItem,
  IonFabButton,
  IonIcon,
  IonFab,
  IonLabel,
  IonThumbnail,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { add as addIcon } from "ionicons/icons";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { formatDate } from "../date";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";
import Container from "@material-ui/core/Container";
import "./App.css";
const HomePage: React.FC = () => {
  const { userId } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const entriesRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries");
    return entriesRef
      .orderBy("date", "desc")
      .limit(10)
      .onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
    // return entriesRef.onSnapshot(({ docs }) => setEntries(docs.map(toEntry)));
    //2 entriesRef.get().then(({ docs }) => setEntries(docs.map(toEntry)));
    // entriesRef.get().then((snapshot) => {
    //   const entries = snapshot.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   setEntries(entries);
    // });
  }, [userId]);

  return (
    <IonPage className="center">
      <IonHeader>
        <IonToolbar className="container">
          <IonTitle>Daily Moments</IonTitle>
          <IonButtons slot="primary">
            <IonButton>Account</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList className="container">
          {entries.map((entry) => (
            <IonItem
              button
              key={entry.id}
              routerLink={`/my/entries/view/${entry.id}`}
            >
              <IonThumbnail slot="end">
                <IonImg
                  style={{ borderRadius: "3.5px" }}
                  src={entry.pictureUrl}
                />
              </IonThumbnail>
              <IonLabel>
                <h2>{formatDate(entry.date)}</h2>
                <h3>{entry.title}</h3>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
