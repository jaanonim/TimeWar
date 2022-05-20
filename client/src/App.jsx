import { default as React } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const JoinPage = React.lazy(() => import("./pages/JoinPage"));
const GamePage = React.lazy(() => import("./pages/GamePage"));
const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));

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
    </Routes>
  );
}

export default App;
