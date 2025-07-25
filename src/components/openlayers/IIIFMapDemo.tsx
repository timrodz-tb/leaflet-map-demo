/**
 * https://codesandbox.io/p/sandbox/amazing-poitras-6yfusm?file=%2Fsrc%2Fstyles.css%3A5%2C1
 */

import { View, Map } from "ol";
import { useCallback, useEffect, useRef } from "react";
import OSM from "ol/source/OSM";
import IIIFInfo from "ol/format/IIIFInfo";
import IIIF from "ol/source/IIIF";
import TileLayer from "ol/layer/Tile";

type Props = {
  zoom?: number;
  url: string;
};

export function IIIFMapDemo({ zoom = 1, url }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map>(null);
  const notifyDivRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<TileLayer>(null);

  const refreshMap = useCallback(
    (imageInfoUrl: string) => {
      if (!mapRef.current || !layerRef.current || !notifyDivRef.current) {
        return;
      }
      console.log("fetching", imageInfoUrl);
      fetch(imageInfoUrl)
        .then(function (response) {
          console.log("response", response);
          response
            .json()
            .then(function (imageInfo) {
              const options = new IIIFInfo(imageInfo).getTileSourceOptions();
              if (options === undefined || options.version === undefined) {
                notifyDivRef.current!.textContent =
                  "Data seems to be no valid IIIF image information.";
                return;
              }
              options.zDirection = -1;
              const iiifTileSource = new IIIF(options);
              const tileGrid = iiifTileSource.getTileGrid();
              if (!tileGrid) {
                console.error("No tile grid", { iiifTileSource });
                return;
              }
              layerRef.current!.setSource(iiifTileSource);
              mapRef.current!.setView(
                new View({
                  resolutions: tileGrid.getResolutions(),
                  extent: tileGrid.getExtent(),
                  constrainOnlyCenter: true,
                })
              );
              mapRef.current!.getView().fit(tileGrid.getExtent());
              notifyDivRef.current!.textContent = "";
            })
            .catch(function (body) {
              notifyDivRef.current!.textContent =
                "Could not read image info json. " + body;
            });
        })
        .catch(function () {
          notifyDivRef.current!.textContent = "Could not read data from URL.";
        });
    },
    [mapRef, layerRef, notifyDivRef]
  );

  useEffect(() => {
    console.log("I'm mounting!");
    if (ref.current && !mapRef.current && !layerRef.current) {
      layerRef.current = new TileLayer({ source: new OSM() });
      mapRef.current = new Map({
        layers: [layerRef.current],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
      });
      refreshMap(url);
    }
  }, [ref, mapRef, layerRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  return (
    <>
      <div ref={ref} style={{ width: "100%", height: "1000px" }} />
      <div className="controls">
        <div ref={notifyDivRef}>&nbsp;</div>
      </div>
    </>
  );
}
