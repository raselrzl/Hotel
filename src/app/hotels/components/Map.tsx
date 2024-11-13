"use client"
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";
import { LatLngExpression } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

interface DataItem {
  id: number;
  title: string;
  images: string[];
  bedroom: number;
  bathroom: number;
  price: number;
  address: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  datas: DataItem[];
}

function Map({ datas }: MapProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Run only on client side
  }, []);

  const defaultCenter: LatLngExpression =
    datas.length === 1
      ? [datas[0].latitude, datas[0].longitude]
      : [52.4797, -1.90269];

  if (!isClient) return null; // Don't render on server side

  return (
    <MapContainer
      center={defaultCenter}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full h-screen"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {datas.map((data) => (
        <Pin data={data} key={data.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
