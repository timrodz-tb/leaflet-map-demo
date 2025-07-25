import React, { useEffect, useRef, useState } from "react";

import { CRS, icon, Map, tileLayer } from "leaflet";
import "leaflet-iiif";
import { MapContainer, Marker, Popup, useMapEvents } from "react-leaflet";

type LayerGroupRenderProps = {
  showAtZoom: number;
  hideAtZoom: number;
} & React.PropsWithChildren;

const LayerGroupRender = ({
  showAtZoom,
  hideAtZoom,
  children,
}: LayerGroupRenderProps) => {
  const [show, setShow] = useState(false);
  const map = useMapEvents({
    zoomend: () => {
      const zoom = map?.getZoom();
      if (!zoom) return;
      if (zoom >= showAtZoom && zoom < hideAtZoom) {
        setShow(true);
      } else {
        setShow(false);
      }
    },
  });

  if (!show) return null;

  return children;
};

type Props = {
  url: string;
};

const DEFAULT_ZOOM = 6;

const viteIcon = icon({
  iconUrl: "vite.svg",

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

/**
 * IIIF Tile Layer: https://github.com/mejackreed/Leaflet-IIIF/blob/master/README.md
 * React TileLayer: https://github.com/PaulLeCam/react-leaflet/blob/master/packages/react-leaflet/src/TileLayer.tsx
 */
export function IIIFMapDemo({ url }: Props) {
  const reactRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    if (!reactRef.current || !map) {
      return;
    }

    map.on("zoomend", () => {
      setZoom(map.getZoom());
    });

    // @ts-expect-error Typing
    tileLayer.iiif(url).addTo(map);
  }, [reactRef, map, url]);

  return (
    <>
      <div className="blur">
        <div ref={reactRef}>
          <MapContainer
            // bounds={outerBounds}
            ref={setMap}
            center={[0, 0]}
            crs={CRS.Simple}
            zoom={zoom}
            minZoom={2}
            maxZoom={6}
            attributionControl={false}
            zoomControl={false}
          >
            <LayerGroupRender showAtZoom={0} hideAtZoom={3}>
              <Marker position={[0, 0]}>
                <Popup>
                  A pretty CSS3 popup. <br />
                </Popup>
              </Marker>
              <Marker position={[-100, 100]}>
                <Popup>
                  <button onClick={() => console.log("button clicked")}>
                    Click me
                  </button>
                </Popup>
              </Marker>
              <Marker position={[-100, 300]}>
                <Popup>
                  <button onClick={() => setShowImage(!showImage)}>
                    Click me
                  </button>
                  {showImage && <img src="vite.svg" alt="Vite" />}
                </Popup>
              </Marker>
            </LayerGroupRender>
            <LayerGroupRender showAtZoom={3} hideAtZoom={6}>
              <Marker position={[-200, 350]} icon={viteIcon}></Marker>
              <Marker position={[-100, 250]}>
                <Popup>
                  <div>
                    <p>Hello</p>
                  </div>
                </Popup>
              </Marker>
            </LayerGroupRender>
          </MapContainer>
        </div>
        {/* <div>
          <p>Zoom: {zoom}</p>
        </div> */}
      </div>
    </>
  );
}
