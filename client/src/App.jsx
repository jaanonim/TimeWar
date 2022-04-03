import { default as React, default as React } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
const GameScreen = React.lazy(() => import("./components/GameScreen"));
const MainPage = React.lazy(() => import("./pages/mainPage/MainPage"));

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
						<GameScreen />
					</React.Suspense>
				}
			/>
		</Routes>
	);
}

export default App;
