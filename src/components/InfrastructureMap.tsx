import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Droplets, MapPin } from "lucide-react";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface InfrastructurePoint {
  name: string;
  type: string;
  lat: number;
  lng: number;
  status: string;
}

const LOCATION_COORDS: Record<string, [number, number]> = {
  Nakuru: [-0.3031, 36.0800],
  Mombasa: [-4.0435, 39.6682],
  Nairobi: [-1.2921, 36.8219],
  Kisumu: [-0.1022, 34.7617],
  Eldoret: [0.5143, 35.2698],
};

const generateInfrastructure = (location: string): InfrastructurePoint[] => {
  const center = LOCATION_COORDS[location] || LOCATION_COORDS.Nakuru;
  return [
    { name: "Borehole Station A", type: "borehole", lat: center[0] + 0.015, lng: center[1] - 0.02, status: "Active" },
    { name: "Treatment Plant", type: "treatment", lat: center[0] - 0.01, lng: center[1] + 0.015, status: "Proposed" },
    { name: "Pipeline Junction", type: "pipeline", lat: center[0] + 0.005, lng: center[1] + 0.03, status: "Active" },
    { name: "Borehole Station B", type: "borehole", lat: center[0] - 0.02, lng: center[1] - 0.01, status: "Under Review" },
    { name: "Rainwater Harvest Site", type: "rainwater", lat: center[0] + 0.025, lng: center[1] + 0.005, status: "Proposed" },
  ];
};

const typeColors: Record<string, string> = {
  borehole: "#0ea5e9",
  treatment: "#14b8a6",
  pipeline: "#3b82f6",
  rainwater: "#06b6d4",
};

interface Props {
  location: string;
}

export default function InfrastructureMap({ location }: Props) {
  const center = LOCATION_COORDS[location] || LOCATION_COORDS.Nakuru;
  const points = generateInfrastructure(location);

  return (
    <div className="space-y-4 animate-fade-up" style={{ animationDelay: "100ms" }}>
      <div className="flex items-center gap-3">
        <MapPin className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Infrastructure Map</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border shadow-card">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "360px", width: "100%" }}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map((pt) => (
            <Marker key={pt.name} position={[pt.lat, pt.lng]}>
              <Popup>
                <div className="text-sm">
                  <strong>{pt.name}</strong>
                  <br />
                  Type: {pt.type}
                  <br />
                  Status: {pt.status}
                </div>
              </Popup>
            </Marker>
          ))}
          <Circle
            center={center}
            radius={2000}
            pathOptions={{ color: "hsl(205, 85%, 45%)", fillOpacity: 0.08, weight: 1 }}
          />
        </MapContainer>
      </div>

      <div className="flex flex-wrap gap-3">
        {Object.entries(typeColors).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </div>
        ))}
      </div>
    </div>
  );
}
