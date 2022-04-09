import {default as React} from "react";
import {Route, Routes} from "react-router-dom";
import Loading from "./components/Loading";

const GamePage = React.lazy(() => import("./pages/gamePage/GamePage"));
const MainPage = React.lazy(() => import("./pages/mainPage/MainPage"));

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <React.Suspense fallback={<Loading/>}>
                        <MainPage/>
                    </React.Suspense>
                }
            />
            <Route
                path="/game"
                element={
                    <React.Suspense fallback={<Loading/>}>
                        <GamePage/>
                    </React.Suspense>
                }
            />
        </Routes>
    );
}

export default App;
