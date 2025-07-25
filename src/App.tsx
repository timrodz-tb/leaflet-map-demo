import "./App.css";

import { IIIFMapDemo as IIIFMapDemoLeaflet } from "./components/leaflet/IIIFMapDemo";
import { ImageMapDemo as ImageMapDemoLeaflet } from "./components/leaflet/ImageMapDemo";
import { OpenMapDemo as OpenMapDemoLeaflet } from "./components/leaflet/OpenMapDemo";

const MAP =
  "https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0107/0000010732/00000072.jpx/info.json";
const AMAALA = "public/AMAALA_IIIF/info.json";
const MLK =
  "https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json";

function App() {
  return (
    <>
      <h1>AMAALA ZOOMABLE MAP DEMO</h1>
      <p>
        The blurry background was placed here to help reduce negative space
        because the map is not able to completely start fully zoomed in. There
        are 2 markers in this demo and they're set to be shown at specific zoom
        boundaries
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10rem",
        }}
      >
        {/* <IIIFMapDemoLeaflet url={MAP} /> */}
        {/* <IIIFMapDemoLeaflet url={MLK} /> */}
        <IIIFMapDemoLeaflet url={AMAALA} />
      </div>
    </>
  );
}

export default App;
