import { useState } from "react";
import { Navigation, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const OFFICE_ADDRESS = "24A Taiye Olowu Street, Lekki Phase 1, Lagos, Nigeria";
const OFFICE_QUERY = encodeURIComponent(OFFICE_ADDRESS);

const OfficeMap = ({ className = "" }: { className?: string }) => {
  const [loading, setLoading] = useState(false);

  const openDirections = () => {
    setLoading(true);
    const fallback = () => {
      window.open(
        `https://www.google.com/maps/dir/?api=1&destination=${OFFICE_QUERY}&travelmode=driving`,
        "_blank",
        "noopener,noreferrer"
      );
      setLoading(false);
    };

    if (!navigator.geolocation) return fallback();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${OFFICE_QUERY}&travelmode=driving`,
          "_blank",
          "noopener,noreferrer"
        );
        setLoading(false);
      },
      () => fallback(),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  return (
    <div className={`rounded-lg overflow-hidden border border-border bg-secondary ${className}`}>
      <div className="relative h-56 sm:h-64">
        <iframe
          title="Encore Construction Office"
          src={`https://www.google.com/maps?q=${OFFICE_QUERY}&output=embed`}
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between bg-card">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
          <span>{OFFICE_ADDRESS}</span>
        </div>
        <Button
          variant="gold"
          size="sm"
          onClick={openDirections}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          <Navigation className="w-4 h-4" />
          {loading ? "Locating…" : "Get Directions"}
        </Button>
      </div>
    </div>
  );
};

export default OfficeMap;
