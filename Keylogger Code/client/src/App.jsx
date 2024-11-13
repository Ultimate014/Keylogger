import "./App.scss";
import "@/components/ui/ui.scss";
import Header from "./components/header";
import { PreferenceProvider } from "./context/Preference";
import { StrokeProvider } from "./context/Strokes";
import Body from "./components/body";

function App() {
	return (
		<PreferenceProvider>
			<div className="container">
				<Header />
				<StrokeProvider>
					<Body />
				</StrokeProvider>
			</div>
		</PreferenceProvider>
	);
}

export default App;
