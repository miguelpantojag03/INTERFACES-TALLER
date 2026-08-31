// Mobile-only legend (desktop legend is embedded in SectionSelector)
export default function SeatLegend() {
  return (
    <div className="lg:hidden flex items-center justify-center gap-4 py-2 mb-1">
      <LegendItem color="bg-[#e2e5ea]" label="Available" />
      <LegendItem color="bg-[#c8ccd4]" label="Occupied" />
      <LegendItem color="bg-[#6c47ff]" label="Your selection" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded-md ${color}`} aria-hidden="true" />
      <span className="text-[11px] text-gray-500 font-medium">{label}</span>
    </div>
  );
}
