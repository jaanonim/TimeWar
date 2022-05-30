import { default as React } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import AddArmyPage from "./pages/AddArmyPage";
import AddBuildingPage from "./pages/AddBuildingPage";
import ChangeDefaultSettingsPage from "./pages/ChangeDefaultSettingPage";
import MapCreatorPage from "./pages/MapCreatorPage";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const JoinPage = React.lazy(() => import("./pages/JoinPage"));
const GamePage = React.lazy(() => import("./pages/GamePage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <React.Suspense fallback={<Loading />}>
            <MainPage />
          </React.Suspense>
        }
      />
      <Route
        path="/game"
        element={
          <React.Suspense fallback={<Loading />}>
            <GamePage />
          </React.Suspense>
        }
      />
      <Route
        path="/join"
        element={
          <React.Suspense fallback={<Loading />}>
            <JoinPage />
          </React.Suspense>
        }
      />
      <Route
        path="/settings"
        element={
          <React.Suspense fallback={<Loading />}>
            <SettingsPage />
          </React.Suspense>
        }
      />
      <Route
        path="/about"
        element={
          <React.Suspense fallback={<Loading />}>
            <AboutPage />
          </React.Suspense>
        }
      />
      <Route
        path="/addArmy"
        element={
          <React.Suspense fallback={<Loading />}>
            <AddArmyPage />
          </React.Suspense>
        }
      />
      <Route
        path="/addBuilding"
        element={
          <React.Suspense fallback={<Loading />}>
            <AddBuildingPage />
          </React.Suspense>
        }
      />
      <Route
        path="/changeDefaultSettings"
        element={
          <React.Suspense fallback={<Loading />}>
            <ChangeDefaultSettingsPage />
          </React.Suspense>
        }
      />
      <Route
        path="/mapCreator"
        element={
          <React.Suspense fallback={<Loading />}>
            <MapCreatorPage />
          </React.Suspense>
        }
      />
    </Routes>
  );
}

export default App;
