import { CRS, type LatLngBoundsExpression } from "leaflet";
import { ImageOverlay, MapContainer, Marker, Popup } from "react-leaflet";

const bounds: LatLngBoundsExpression = [
  [-26.5, -25],
  [1021.5, 1023],
];
const IMAGE_URL = "uqm_map_full.png";

export function ImageMapDemo() {
  return (
    <MapContainer
      bounds={bounds}
      crs={CRS.Simple}
      attributionControl={false}
      zoomControl={false}
      minZoom={-5}
    >
      <ImageOverlay url={IMAGE_URL} bounds={bounds} />
      <Marker position={[145, 175.2]}>
        <Popup>
          <button onClick={() => console.log("button clicked")}>
            Click me
          </button>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
