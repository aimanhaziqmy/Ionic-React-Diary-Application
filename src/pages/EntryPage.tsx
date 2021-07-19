import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterLink,
  IonList,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { trash as trashIcon } from "ionicons/icons";
import "./App.css";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useAuth } from "../auth";
import { formatDate } from "../date";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../models";

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const { userId } = useAuth();
  const [entry, setEntry] = useState<any>();
  const history = useHistory();

  useEffect(() => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    entryRef.get().then((doc) => {
      // const entry = { id: doc.id, ...doc.data() } as Entry;
      // setEntry(entry);
      setEntry(toEntry(doc));
    });
  }, [userId, id]);

  const handleDelete = async () => {
    const entryRef = firestore
      .collection("users")
      .doc(userId)
      .collection("entries")
      .doc(id);
    await entryRef.delete();
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{formatDate(entry?.date)}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon
                icon={trashIcon}
                slot="icon-only"
                style={{ fontSize: "5vmin" }}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding container">
        <h2>{entry?.title}</h2>
        <img src={entry?.pictureUrl} alt={entry?.title} />
        <p>{entry?.description}</p>
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
