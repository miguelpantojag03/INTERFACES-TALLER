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

  const bottomBarRef = useRef<HTMLDivElement>(null);
  const [bottomBarH, setBottomBarH] = useState(200);

  useEffect(() => {
    const el = bottomBarRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      for (const e of entries) setBottomBarH(e.contentRect.height + 24);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const selectedSeats = useMemo(
    () => sections.flatMap(s => s.seats.filter(seat => seat.status === 'selected')),
    [sections]
  );

  const totalPrice = useMemo(
    () => selectedSeats.reduce((sum, seat) => sum + seat.price, 0),
    [selectedSeats]
  );

  const currentSection = sections.find(s => s.id === activeSection)!;

  const handleToggleSeat = useCallback((toggledSeat: Seat) => {
    setSections(prev =>
      prev.map(sec => {
        if (!sec.seats.find(s => s.id === toggledSeat.id)) return sec;
        return {
          ...sec,
          seats: sec.seats.map(s => {
            if (s.id !== toggledSeat.id) return s;
            if (s.status === 'occupied') return s;
            return { ...s, status: s.status === 'selected' ? 'available' : 'selected' };
          }),
        };
      })
    );
  }, []);

  const handleRemoveSeat = useCallback((seat: Seat) => handleToggleSeat(seat), [handleToggleSeat]);

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2500);
  };

  return (
    <div className="font-sans" style={{ minHeight: '100dvh', background: '#ebebed' }}>

      {/* ══════════════════════════════════════════════════
          DESKTOP  ≥1024px
      ══════════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-center justify-center min-h-screen p-6">
        <div
          className="w-full bg-white"
          style={{
            maxWidth: '860px',
            borderRadius: '28px',
            padding: '32px',
            boxShadow: '0 2px 40px rgba(0,0,0,0.07)',
          }}
        >
          {/* Header */}
          <Header />

          {/* Aircraft visualization */}
          <AircraftMap activeSection={activeSection} />

          {/* Section selector + legend */}
          <SectionSelector
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* ── Two-column body ── */}
          <div
            className="grid items-stretch"
            style={{ gridTemplateColumns: '196px 1fr', gap: '16px' }}
          >
            {/* Left: 3D Rendering card */}
            <ThreeDRenderingCard />

            {/* Right: Seat map card */}
            <div
              style={{
                background: '#f8f9fb',
                border: '1px solid #ecedf0',
                borderRadius: '18px',
                padding: '20px',
              }}
            >
              <SeatMap section={currentSection} onToggleSeat={handleToggleSeat} />
            </div>
          </div>

          {/* Bottom: chips + total + confirm */}
          <PriceSummary
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onRemoveSeat={handleRemoveSeat}
            onConfirm={handleConfirm}
          />

          {confirmed && (
            <div className="mt-4 flex justify-center">
              <span
                className="text-sm font-bold px-7 py-2 rounded-full animate-bounce"
                style={{ background: '#c8ff00', color: '#0a0a0a' }}
              >
                ✓ Booking confirmed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE  <1024px
      ══════════════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col" style={{ minHeight: '100dvh', background: '#fff' }}>
        <Header />

        <div
          className="flex-1 overflow-y-auto px-4"
          style={{ paddingBottom: bottomBarH }}
        >
          {/* Aircraft */}
          <div className="mt-3 mb-4">
            <AircraftMap activeSection={activeSection} />
          </div>

          {/* Section pills */}
          <SectionSelector
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Mobile legend */}
          <SeatLegend />

          {/* Section title row */}
          <div className="flex items-center justify-between mb-3 px-0.5">
            <span className="text-[13px] font-bold text-[#111]">{currentSection.name}</span>
            <span className="text-[11px] text-[#9ca3af] font-medium ml-3 whitespace-nowrap">
              {currentSection.freeSeats} libres · ${currentSection.price} / asiento
            </span>
          </div>

          {/* Mobile seat grid — centred */}
          <div className="flex justify-center">
            <MobileSeatGrid section={currentSection} onToggleSeat={handleToggleSeat} />
          </div>

          {confirmed && (
            <div className="mt-6 flex justify-center">
              <span className="text-sm font-bold px-7 py-2 rounded-full"
                    style={{ background: '#c8ff00', color: '#0a0a0a' }}>
                ✓ Booking confirmed
              </span>
            </div>
          )}
        </div>

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

/* ──────────────────────────────────────────────────────────
   MOBILE SEAT GRID  — larger touch targets, same visual style
────────────────────────────────────────────────────────── */

const COLS_LEFT  = ['A', 'B', 'C'];
const COLS_RIGHT = ['D', 'E', 'F'];

interface MobileSeatGridProps {
  section: SectionData;
  onToggleSeat: (seat: Seat) => void;
}

function MobileSeatCell({ seat, onToggle }: { seat: Seat | undefined; onToggle: (s: Seat) => void }) {
  if (!seat) return <div style={{ width: 38, height: 38 }} />;

  const isOccupied = seat.status === 'occupied';
  const isSelected = seat.status === 'selected';

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => !isOccupied && onToggle(seat)}
      aria-label={`Seat ${seat.id}, ${isOccupied ? 'unavailable' : isSelected ? 'selected' : 'available'}`}
      aria-pressed={isSelected}
      aria-disabled={isOccupied}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c47ff] touch-manipulation"
      style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        background: isSelected ? '#6c47ff' : isOccupied ? '#ced1d8' : '#e2e5ec',
        border: isSelected ? '1.5px solid #5535d4' : 'none',
        boxShadow: isSelected ? '0 2px 10px rgba(108,71,255,0.35)' : 'none',
        cursor: isOccupied ? 'not-allowed' : 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '5px',
        position: 'relative',
        transition: 'transform 0.1s',
        flexShrink: 0,
        color: isSelected ? '#fff' : isOccupied ? '#b0b3bc' : '#9ca3af',
        fontSize: '9px',
        fontWeight: 700,
      }}
    >
      {/* Headrest */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '14px',
          height: '3px',
          borderRadius: '99px',
          background: isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.08)',
        }}
      />
      {isSelected
        ? <X size={11} strokeWidth={3} color="#fff" style={{ marginBottom: '1px' }} />
        : seat.id
      }
    </button>
  );
}

function MobileSeatGrid({ section, onToggleSeat }: MobileSeatGridProps) {
  const rows = Array.from(new Set(section.seats.map(s => s.row))).sort((a, b) => a - b);
  const getSeat = (row: number, col: string) =>
    section.seats.find(s => s.row === row && s.column === col);

  return (
    <div style={{ maxWidth: '310px', width: '100%' }}>
      {/* Column labels */}
      <div className="flex items-center mb-1.5" style={{ paddingLeft: '30px' }} aria-hidden="true">
        {COLS_LEFT.map(c => (
          <div key={c} style={{ width: '38px', marginRight: '4px' }}
               className="text-center text-[10px] font-bold text-[#9ca3af]">{c}</div>
        ))}
        <div style={{ width: '24px' }} />
        {COLS_RIGHT.map(c => (
          <div key={c} style={{ width: '38px', marginRight: '4px' }}
               className="text-center text-[10px] font-bold text-[#9ca3af]">{c}</div>
        ))}
      </div>

      {/* Rows */}
      <div
        className="flex flex-col"
        style={{ gap: '5px' }}
        role="group"
        aria-label="Seat map"
      >
        {rows.map(row => (
          <div key={row} className="flex items-center">
            {/* Row # */}
            <div
              className="text-right text-[10px] font-bold text-[#9ca3af] shrink-0"
              style={{ width: '26px', paddingRight: '4px' }}
            >
              {row}
            </div>

            {/* A B C */}
            <div className="flex" style={{ gap: '4px' }}>
              {COLS_LEFT.map(col => (
                <MobileSeatCell key={col} seat={getSeat(row, col)} onToggle={onToggleSeat} />
              ))}
            </div>

            {/* Aisle */}
            <div style={{ width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                 aria-hidden="true">
              <span style={{ fontSize: '9px', color: '#d1d5db', fontWeight: 600 }}>{row}</span>
            </div>

            {/* D E F */}
            <div className="flex" style={{ gap: '4px' }}>
              {COLS_RIGHT.map(col => (
                <MobileSeatCell key={col} seat={getSeat(row, col)} onToggle={onToggleSeat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
