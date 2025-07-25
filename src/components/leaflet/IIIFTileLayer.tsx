import React from "react";
import {
  createElementObject,
  createTileLayerComponent,
  type LayerProps,
  updateGridLayer,
  withPane,
} from "@react-leaflet/core";
import L, {
  TileLayer as LeafletTileLayer,
  type TileLayerOptions,
} from "leaflet";

interface TileLayerProps extends TileLayerOptions, LayerProps {
  url: string;
}

export const TileLayer_IIIF_V0 = createTileLayerComponent<
  LeafletTileLayer,
  TileLayerProps
>(
  function createTileLayer({ url, ...options }, context) {
    const pane = withPane(options, context);
    const layer = new LeafletTileLayer(url, pane);
    // @ts-expect-error Type error
    const iiifLayer = L.tileLayer.iiif(url, pane);
    console.log("iiifLayer", { layer, iiifLayer });
    return createElementObject(iiifLayer, context);
  },
  function updateTileLayer(layer, props, prevProps) {
    return;
    updateGridLayer(layer, props, prevProps);

    const { url } = props;
    if (url != null && url !== prevProps.url) {
      layer.setUrl(url);
    }
  }
);
