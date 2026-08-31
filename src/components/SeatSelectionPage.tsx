import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Seat, SectionData } from '../types';
import { sectionsData } from '../data/seats';

import Header from './Header';
import AircraftMap from './AircraftMap';
import SectionSelector from './SectionSelector';
import SeatLegend from './SeatLegend';
import SeatMap from './SeatMap';
import ThreeDRenderingCard from './ThreeDRenderingCard';
import PriceSummary from './PriceSummary';
import MobileBottomBar from './MobileBottomBar';

export default function SeatSelectionPage() {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [sections, setSections] = useState<SectionData[]>(sectionsData);
  const [confirmed, setConfirmed] = useState(false);
  // Track actual height of mobile bottom bar for dynamic scroll padding
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [bottomBarH, setBottomBarH] = useState(180);

  useEffect(() => {
    if (!bottomBarRef.current) return;
    const obs = new ResizeObserver((entries) => {
      for (const e of entries) {
        setBottomBarH(e.contentRect.height + 16); // +16px breathing room
      }
    });
    obs.observe(bottomBarRef.current);
    return () => obs.disconnect();
  }, []);

  // Collect all selected seats across all sections
  const selectedSeats = useMemo(
    () => sections.flatMap((s) => s.seats.filter((seat) => seat.status === 'selected')),
    [sections]
  );

  const totalPrice = useMemo(
    () => selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
    [selectedSeats]
  );

  const currentSection = sections.find((s) => s.id === activeSection)!;

  // Toggle a seat's selected state within its section
  const handleToggleSeat = useCallback((toggledSeat: Seat) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (!sec.seats.find((s) => s.id === toggledSeat.id)) return sec;
        return {
          ...sec,
          seats: sec.seats.map((s) => {
            if (s.id !== toggledSeat.id) return s;
            if (s.status === 'occupied') return s;
            return {
              ...s,
              status: s.status === 'selected' ? 'available' : 'selected',
            };
          }),
        };
      })
    );
  }, []);

  // Remove seat from chip (deselect)
  const handleRemoveSeat = useCallback(
    (seat: Seat) => {
      handleToggleSeat(seat);
    },
    [handleToggleSeat]
  );

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f6] font-sans">

      {/* ── DESKTOP LAYOUT ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-[0_4px_40px_0_rgba(0,0,0,0.08)] p-8">

          <Header />
          <AircraftMap activeSection={activeSection} />

          <SectionSelector
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <div className="grid grid-cols-[180px_1fr] gap-5 items-start">
            <ThreeDRenderingCard />
            <div className="bg-[#f7f8fa] rounded-2xl border border-gray-100 p-5 overflow-auto">
              <SeatMap section={currentSection} onToggleSeat={handleToggleSeat} />
            </div>
          </div>

          <PriceSummary
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onRemoveSeat={handleRemoveSeat}
            onConfirm={handleConfirm}
          />

          {confirmed && (
            <div className="mt-4 flex items-center justify-center">
              <div className="bg-[#c8ff00] text-gray-950 text-sm font-bold px-6 py-2 rounded-full shadow animate-bounce">
                ✓ Booking confirmed
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MOBILE / TABLET LAYOUT ──────────────────────────────────────── */}
      <div className="lg:hidden flex flex-col min-h-screen bg-white">

        <Header />

        {/* Scrollable content — padding-bottom matches live bottom bar height */}
        <div
          className="flex-1 overflow-y-auto px-4"
          style={{ paddingBottom: bottomBarH }}
        >
          <div className="mt-3 mb-4">
            <AircraftMap activeSection={activeSection} />
          </div>

          <SectionSelector
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          <SeatLegend />

          {/* Section title — wraps gracefully on small screens */}
          <div className="flex flex-col gap-0.5 mb-3 px-1">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">
              {currentSection.name}
            </h3>
            <span className="text-xs text-gray-400 font-medium">
              {currentSection.freeSeats} available &nbsp;·&nbsp; ${currentSection.price} / seat
            </span>
          </div>

          {/* Seat grid — centred, no horizontal overflow */}
          <div className="w-full flex justify-center overflow-x-auto">
            <MobileSeatGrid section={currentSection} onToggleSeat={handleToggleSeat} />
          </div>

          {confirmed && (
            <div className="mt-6 flex items-center justify-center">
              <div className="bg-[#c8ff00] text-gray-950 text-sm font-bold px-6 py-2 rounded-full shadow">
                ✓ Booking confirmed
              </div>
            </div>
          )}
        </div>

        {/* Fixed bottom bar — ref used to measure its height */}
        <MobileBottomBar
          ref={bottomBarRef}
          selectedSeats={selectedSeats}
          totalPrice={totalPrice}
          onRemoveSeat={handleRemoveSeat}
          onConfirm={handleConfirm}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Mobile seat grid — fluid seat sizing so it fits every screen width
──────────────────────────────────────────────────────────────────────────────*/

const COLS_LEFT = ['A', 'B', 'C'];
const COLS_RIGHT = ['D', 'E', 'F'];

interface MobileSeatGridProps {
  section: SectionData;
  onToggleSeat: (seat: Seat) => void;
}

function MobileSeatCell({
  seat,
  onToggle,
}: {
  seat: Seat | undefined;
  onToggle: (s: Seat) => void;
}) {
  if (!seat) return <div className="w-9 h-9" />;

  const isOccupied = seat.status === 'occupied';
  const isSelected = seat.status === 'selected';

  const base =
    'w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-bold ' +
    'transition-all duration-150 active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c47ff] focus-visible:ring-offset-1 ' +
    'select-none relative touch-manipulation';

  const style = isOccupied
    ? 'bg-[#c8ccd4] text-gray-400 cursor-not-allowed opacity-70'
    : isSelected
    ? 'bg-[#6c47ff] text-white cursor-pointer border border-[#5535d4] shadow-md shadow-[#6c47ff]/30'
    : 'bg-[#e2e5ea] active:bg-[#d0d4db] text-gray-500 cursor-pointer';

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => !isOccupied && onToggle(seat)}
      aria-label={`Seat ${seat.id}, ${seat.status}`}
      aria-pressed={isSelected}
      aria-disabled={isOccupied}
      className={`${base} ${style}`}
    >
      <span
        className={`absolute top-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full opacity-25 ${
          isSelected ? 'bg-white' : 'bg-gray-600'
        }`}
        aria-hidden="true"
      />
      {isSelected ? (
        <X size={11} strokeWidth={3} className="mt-1" />
      ) : (
        <span className="mt-1 leading-none">{seat.id}</span>
      )}
    </button>
  );
}

function MobileSeatGrid({ section, onToggleSeat }: MobileSeatGridProps) {
  const rows = Array.from(new Set(section.seats.map((s) => s.row))).sort(
    (a, b) => a - b
  );
  const getSeat = (row: number, col: string) =>
    section.seats.find((s) => s.row === row && s.column === col);

  return (
    // max-w-xs keeps the grid from stretching too wide; auto margins centre it
    <div className="w-full max-w-xs mx-auto">

      {/* Column header */}
      <div className="flex items-center gap-1 mb-2 pl-8" aria-hidden="true">
        <div className="flex gap-1">
          {COLS_LEFT.map((c) => (
            <div key={c} className="w-9 text-center text-[10px] font-semibold text-gray-400">
              {c}
            </div>
          ))}
        </div>
        {/* Aisle label space */}
        <div className="w-7" />
        <div className="flex gap-1">
          {COLS_RIGHT.map((c) => (
            <div key={c} className="w-9 text-center text-[10px] font-semibold text-gray-400">
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-1.5" role="group" aria-label="Seat map">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-1">
            {/* Row number */}
            <div className="w-7 text-right pr-1 text-[10px] font-semibold text-gray-400 shrink-0">
              {row}
            </div>

            {/* Left block A B C */}
            <div className="flex gap-1">
              {COLS_LEFT.map((col) => (
                <MobileSeatCell key={col} seat={getSeat(row, col)} onToggle={onToggleSeat} />
              ))}
            </div>

            {/* Aisle */}
            <div className="w-7 flex items-center justify-center shrink-0" aria-hidden="true">
              <span className="text-[9px] text-gray-300 font-medium">{row}</span>
            </div>

            {/* Right block D E F */}
            <div className="flex gap-1">
              {COLS_RIGHT.map((col) => (
                <MobileSeatCell key={col} seat={getSeat(row, col)} onToggle={onToggleSeat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
