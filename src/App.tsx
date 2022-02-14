import "./App.scss";
import Content from "./componenets/Content/Content";
import Map from "./componenets/UI/Map";
import { useTypedActions } from "./hooks/useTypedActions";
import { IPlace } from "./types/adress";

function App() {
  const { addPlace } = useTypedActions();

  const placesInLocalStorage = localStorage.getItem("places");
  if (placesInLocalStorage) {
    const placesArray: IPlace[] = JSON.parse(placesInLocalStorage);

    if (placesInLocalStorage.length > 0) {
      placesArray.forEach((place) => addPlace(place));
    }
  }

  return (
    <div className="app">
      <h1 className="app__heading-primary">Mapty Application</h1>
      <div className="app__main-wrapper main-wrapper">
        <Content />
        <Map />
      </div>
    </div>
  );
}

export default App;
