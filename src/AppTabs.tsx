import {
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import React from "react";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuth } from "./auth";

import {
  home as homeIcon,
  settings as settingsIcon,
  settingsSharp,
} from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import EntryPage from "./pages/EntryPage";
import AddEntryPage from "./pages/AddEntryPage";

const AppTabs: React.FC = () => {
  const { loggedIn } = useAuth();
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage />
        </Route>
        <Route exact path="/my/entries/add">
          <AddEntryPage />
        </Route>
        <Route exact path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route exact path="/my/settings">
          <SettingsPage />
        </Route>
        <Redirect exact path="/" to="/my/entries" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon style={{ fontSize: "20px" }} icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon style={{ fontSize: "20px" }} icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
