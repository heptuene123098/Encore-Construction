import { useRef, useState } from "react";

interface PartnersMarqueeProps {
  logos: { src: string; name: string }[];
}

const PartnersMarquee = ({ logos }: PartnersMarqueeProps) => {
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Triple the logos for seamless loop
  const allLogos = [...logos, ...logos, ...logos];

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      ref={containerRef}
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-navy-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-navy-dark to-transparent z-10 pointer-events-none" />

      <div
        className="flex items-center gap-16 whitespace-nowrap"
        style={{
          animation: "marquee 30s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {allLogos.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            className="h-[60px] max-w-[200px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersMarquee;
