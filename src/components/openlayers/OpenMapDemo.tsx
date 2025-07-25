import { View, Map } from "ol";
import { useEffect, useRef } from "react";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";

export function OpenMapDemo({ zoom = 1 }: { zoom?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);

  useEffect(() => {
    console.log("I'm mounting!");
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  return <div ref={ref} style={{ width: "100%", height: "300px" }} />;
}
