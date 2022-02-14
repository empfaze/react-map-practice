import { FC } from "react";
import { YMaps, Map, GeoObject } from "react-yandex-maps";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import classes from "./Map.module.scss";

const MapBasics: FC = () => {
  const { places } = useTypedSelector((state) => state.adress);

  let mapState: any = { center: [55.752, 37.615], zoom: 10 };

  if (places.length > 0) {
    const lastPlace = places[places.length - 1];
    const lastPlaceLng = lastPlace.lng;
    const lastPlaceLat = lastPlace.lat;

    mapState = { center: [lastPlaceLng, lastPlaceLat], zoom: 10 };
  }

  const mapStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <YMaps>
      <div id="map" className={classes["map"]}>
        <Map state={mapState} style={mapStyle}>
          {places.length > 0 &&
            places.map((place, idx) => (
              <GeoObject
                key={place.id}
                geometry={{
                  type: "Point",
                  coordinates: [place.lng, place.lat],
                }}
                properties={{
                  balloonContentBody: [
                    `<div style="text-align: center">
                      ${idx + 1} - ${place.adress.replaceAll("+", " ")}
                    </div>`,
                  ],
                }}
                options={{
                  draggable: false,
                }}
                modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
              />
            ))}
          {places.length > 1 &&
            places.map((place, idx) => {
              if (idx > 0) {
                const prevCoords = [places[idx - 1].lng, places[idx - 1].lat];
                const currCoords = [places[idx].lng, places[idx].lat];

                return (
                  <GeoObject
                    key={place.id}
                    geometry={{
                      type: "LineString",
                      coordinates: [prevCoords, currCoords],
                    }}
                    properties={{
                      hintContent: place.adress,
                    }}
                    options={{
                      strokeColor: "#000000",
                      strokeWidth: 4,
                    }}
                  />
                );
              } else return null;
            })}
        </Map>
      </div>
    </YMaps>
  );
};

export default MapBasics;
