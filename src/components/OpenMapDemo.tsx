import type { LatLngTuple } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const position: LatLngTuple = [51.505, -0.09,]

export function OpenMapDemo() {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br />
        </Popup>
      </Marker>
      <Marker position={[51.508, -0.08]}>
        <Popup>
          <button onClick={() => console.log("button clicked")}>Click me</button>
        </Popup>
      </Marker>
    </MapContainer>
  )
}