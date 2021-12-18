import "./App.scss";
import Content from "./componenets/Content/Content";
import Map from "./componenets/UI/Map";

function App() {
  return (
    <div className="app">
      <h1 className="heading-primary">Mapty Application</h1>
      <div className="content-wrapper">
        <Content />
        <Map />
      </div>
    </div>
  );
}

export default App;
