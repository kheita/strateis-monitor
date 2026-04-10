import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

interface Hotspot {
  lat: number;
  lng: number;
  name: string;
  type: "hq" | "hub" | "partner" | "market" | "opportunity";
  color: string;
  radius: number;
  desc: string;
}

const HOTSPOTS: Hotspot[] = [
  { lat: 5.36, lng: -4.0083, name: "Abidjan", type: "hq", color: "#D4A853", radius: 10, desc: "HQ Strateis Partners" },
  { lat: 14.6928, lng: -17.4467, name: "Dakar", type: "hub", color: "#3B82F6", radius: 7, desc: "Orange Digital Center, Wave HQ" },
  { lat: 6.5244, lng: 3.3792, name: "Lagos", type: "hub", color: "#22C55E", radius: 9, desc: "Moniepoint, Paystack, Flutterwave" },
  { lat: -1.2921, lng: 36.8219, name: "Nairobi", type: "hub", color: "#22C55E", radius: 8, desc: "M-Pesa, Safaricom" },
  { lat: -1.9403, lng: 29.8739, name: "Kigali", type: "partner", color: "#06B6D4", radius: 7, desc: "AI4Africa, Rwanda Innovation Fund" },
  { lat: 5.6037, lng: -0.187, name: "Accra", type: "partner", color: "#3B82F6", radius: 6, desc: "Africa Fintech Forum" },
  { lat: 33.5731, lng: -7.5898, name: "Casablanca", type: "market", color: "#A78BFA", radius: 6, desc: "GITEX Africa, CFC" },
  { lat: 30.0444, lng: 31.2357, name: "Le Caire", type: "market", color: "#EC4899", radius: 7, desc: "Egypt fintech ecosystem" },
  { lat: 12.6392, lng: -8.0029, name: "Bamako", type: "opportunity", color: "#F59E0B", radius: 5, desc: "UEMOA market" },
  { lat: 13.5127, lng: 2.1126, name: "Niamey", type: "opportunity", color: "#F59E0B", radius: 5, desc: "UEMOA market" },
  { lat: 6.1725, lng: 1.2314, name: "Lome", type: "partner", color: "#3B82F6", radius: 5, desc: "UEMOA market" },
  { lat: 12.3714, lng: -1.5197, name: "Ouagadougou", type: "opportunity", color: "#F59E0B", radius: 5, desc: "UEMOA market" },
  { lat: -4.4419, lng: 15.2663, name: "Kinshasa", type: "market", color: "#A78BFA", radius: 6, desc: "DRC emerging market" },
  { lat: 9.0579, lng: 7.4951, name: "Abuja", type: "hub", color: "#22C55E", radius: 6, desc: "Capital Nigeria" },
  { lat: -26.2041, lng: 28.0473, name: "Johannesburg", type: "market", color: "#F59E0B", radius: 7, desc: "JSE, SA tech ecosystem" },
  { lat: 8.9806, lng: 38.7578, name: "Addis Ababa", type: "market", color: "#F59E0B", radius: 6, desc: "AU, East Africa hub" },
  { lat: 15.3694, lng: -15.1055, name: "Saint-Louis", type: "opportunity", color: "#F59E0B", radius: 4, desc: "UGB, education hub" },
  { lat: 6.8523, lng: -5.3024, name: "Bouake", type: "opportunity", color: "#D4A853", radius: 4, desc: "2nd city CI" },
];

const LEGEND = [
  { c: "#D4A853", l: "HQ Strateis" },
  { c: "#22C55E", l: "Tech Hub" },
  { c: "#3B82F6", l: "Partner" },
  { c: "#F59E0B", l: "Opportunity" },
  { c: "#A78BFA", l: "Market" },
];

export function AfricaMap() {
  return (
    <div className="relative w-full h-full" style={{ minHeight: 350 }}>
      <MapContainer
        center={[5, 15]}
        zoom={3}
        minZoom={2}
        maxZoom={8}
        style={{ width: "100%", height: "100%", background: "#060B14" }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url={DARK_TILES} />
        {HOTSPOTS.map((spot) => (
          <CircleMarker
            key={spot.name}
            center={[spot.lat, spot.lng]}
            radius={spot.radius}
            pathOptions={{
              color: spot.color,
              fillColor: spot.color,
              fillOpacity: 0.3,
              weight: 1.5,
            }}
          >
            <Tooltip
              permanent={spot.type === "hq"}
              direction="right"
              offset={[10, 0]}
              className="monitor-tooltip"
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10 }}>
                <strong>{spot.name}</strong>
                <br />
                <span style={{ fontSize: 9, opacity: 0.7 }}>{spot.desc}</span>
              </div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Legend overlay */}
      <div
        className="absolute bottom-2 left-2 z-[1000] flex gap-2.5 px-2.5 py-1.5 rounded"
        style={{ background: "rgba(11,17,33,0.9)", border: "1px solid #1E293B" }}
      >
        {LEGEND.map(({ c, l }) => (
          <div key={l} className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: c }} />
            <span className="font-mono text-[8px] text-text-dim">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
