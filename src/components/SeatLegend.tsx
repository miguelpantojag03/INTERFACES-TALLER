// Mobile-only legend
export default function SeatLegend() {
  return (
    <div className="lg:hidden flex items-center justify-center gap-5 py-2 mb-2">
      <LegendItem color="#d1d5db" label="Disponible" />
      <LegendItem color="#9ca3af" label="Ocupado" />
      <LegendItem color="#6c47ff" label="Tu selección" round />
    </div>
  );
}

function LegendItem({ color, label, round }: { color: string; label: string; round?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        style={{ width: '10px', height: '10px', background: color, borderRadius: round ? '50%' : '3px', flexShrink: 0 }}
        aria-hidden="true"
      />
      <span className="text-[11px] text-[#9ca3af] font-medium">{label}</span>
    </div>
  );
}
