import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L, { LatLngExpression } from "leaflet";

interface PinProps {
  data: {
    id: number;
    latitude: number;
    longitude: number;
    media: string[];  // Ensure 'media' is an array of image URLs
    name: string;
    bedrooms: number;
    rentPerDay: number;
  };
}

const customIcon = new L.Icon({
  iconUrl: "/pin3.jpg",
  iconSize: [32, 46],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function Pin({ data }: PinProps) {
  // Use the latitude and longitude from the data object to position the marker
  
  const position: LatLngExpression = [51.5074, -0.1278];
  
  // Log data to confirm it's correct
  console.log("Data received in Pin component:", data);

  return (
    <Marker position={position} icon={customIcon}>
      <Popup>
        <div className="flex gap-5">
          {/* Check if media[0] is available before displaying */}
          {data.media && data.media[0] ? (
            <img
              src={data.media[0]} // Ensure the first image exists
              alt={data.name}
              className="w-16 h-12 object-cover rounded-md"
            />
          ) : (
            <div className="w-16 h-12 bg-gray-200 rounded-md" /> // Placeholder if no image exists
          )}

          <div className="flex flex-col justify-between">
            {/* Link to a dynamic route */}
            <Link to={`/${data.id}`}>{data.name}</Link>
            <span>{data.bedrooms} bedroom</span>
            <b>${data.rentPerDay}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
