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
    () => selectedSeats.reduce((sum, s) => sum + s.price, 0),
    [selectedSeats]
  );
  const currentSection = sections.find(s => s.id === activeSection)!;

  const handleToggleSeat = useCallback((toggled: Seat) => {
    setSections(prev => prev.map(sec => {
      if (!sec.seats.find(s => s.id === toggled.id)) return sec;
      return {
        ...sec,
        seats: sec.seats.map(s => {
          if (s.id !== toggled.id || s.status === 'occupied') return s;
          return { ...s, status: s.status === 'selected' ? 'available' : 'selected' };
        }),
      };
    }));
  }, []);

  const handleRemoveSeat = useCallback((seat: Seat) => handleToggleSeat(seat), [handleToggleSeat]);

  const handleConfirm = () => {
    if (selectedSeats.length === 0) return;
    setConfirmed(true);
    setTimeout(() => setConfirmed(false), 2500);
  };

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", minHeight: '100dvh', background: '#e8e8ea' }}>

      {/* ════════════ DESKTOP ≥1024px ════════════ */}
      <div className="hidden lg:flex" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '32px 24px' }}>
        <div style={{
          width: '100%',
          maxWidth: '860px',
          background: '#ffffff',
          borderRadius: '28px',
          padding: '32px',
          boxShadow: '0 2px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
        }}>
          <Header />
          <AircraftMap activeSection={activeSection} />
          <SectionSelector sections={sections} activeSection={activeSection} onSectionChange={setActiveSection} />

          {/* Two-column body */}
          <div style={{ display: 'grid', gridTemplateColumns: '196px 1fr', gap: '16px', alignItems: 'stretch' }}>
            <ThreeDRenderingCard />

            {/* Seat map card */}
            <div className="stripe-bg" style={{
              background: '#f8f9fb',
              border: '1px solid #ecedf1',
              borderRadius: '18px',
              padding: '20px',
            }}>
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
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: '#c8ff00', color: '#0a0a0a', fontWeight: 700, fontSize: '13px', padding: '8px 28px', borderRadius: '999px' }}>
                ✓ Booking confirmed
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ════════════ MOBILE <1024px ════════════ */}
      <div className="lg:hidden" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: '#fff' }}>
        <Header />

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px', paddingBottom: `${bottomBarH}px` }}>
          <div style={{ marginTop: '12px', marginBottom: '14px' }}>
            <AircraftMap activeSection={activeSection} />
          </div>

          <SectionSelector sections={sections} activeSection={activeSection} onSectionChange={setActiveSection} />
          <SeatLegend />

          {/* Section info row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#111' }}>{currentSection.name}</span>
            <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 500, marginLeft: '8px', whiteSpace: 'nowrap' }}>
              {currentSection.freeSeats} libres · ${currentSection.price} / asiento
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <MobileSeatGrid section={currentSection} onToggleSeat={handleToggleSeat} />
          </div>

          {confirmed && (
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: '#c8ff00', color: '#0a0a0a', fontWeight: 700, fontSize: '13px', padding: '8px 28px', borderRadius: '999px' }}>
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

/* ── Mobile seat grid ── */
const COLS_LEFT  = ['A', 'B', 'C'];
const COLS_RIGHT = ['D', 'E', 'F'];

interface MGProps { section: SectionData; onToggleSeat: (s: Seat) => void; }

function MobileCell({ seat, onToggle }: { seat: Seat | undefined; onToggle: (s: Seat) => void }) {
  if (!seat) return <div style={{ width: 38, height: 38 }} />;
  const isOccupied = seat.status === 'occupied';
  const isSelected = seat.status === 'selected';
  const bg = isSelected ? '#6c47ff' : isOccupied ? '#c4c7d0' : '#dfe1e7';
  const textColor = isSelected ? '#fff' : isOccupied ? '#a8aab6' : '#9ca3af';

  return (
    <button
      type="button"
      disabled={isOccupied}
      onClick={() => !isOccupied && onToggle(seat)}
      aria-label={`Seat ${seat.id}, ${isOccupied ? 'unavailable' : isSelected ? 'selected' : 'available'}`}
      aria-pressed={isSelected}
      aria-disabled={isOccupied}
      className="touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6c47ff] active:scale-90"
      style={{
        width: '38px', height: '38px', borderRadius: '10px',
        background: bg, color: textColor,
        fontSize: '9px', fontWeight: 700,
        border: isSelected ? '1.5px solid #5535d4' : 'none',
        boxShadow: isSelected ? '0 2px 10px rgba(108,71,255,0.35)' : 'none',
        cursor: isOccupied ? 'not-allowed' : 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
        paddingBottom: '5px', position: 'relative',
        transition: 'transform 0.1s', flexShrink: 0, userSelect: 'none',
        outline: 'none',
      }}
    >
      <span aria-hidden="true" style={{
        position: 'absolute', top: '6px', left: '50%', transform: 'translateX(-50%)',
        width: '14px', height: '3px', borderRadius: '99px',
        background: isSelected ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.08)',
      }} />
      {isSelected
        ? <X size={11} strokeWidth={3} color="#fff" style={{ marginBottom: '1px' }} />
        : seat.id
      }
    </button>
  );
}

function MobileSeatGrid({ section, onToggleSeat }: MGProps) {
  const rows = Array.from(new Set(section.seats.map(s => s.row))).sort((a, b) => a - b);
  const getSeat = (row: number, col: string) => section.seats.find(s => s.row === row && s.column === col);

  return (
    <div style={{ maxWidth: '308px', width: '100%' }}>
      {/* Column headers */}
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '30px', marginBottom: '6px' }} aria-hidden="true">
        {COLS_LEFT.map((c, i) => (
          <div key={c} style={{ width: '38px', marginRight: i < 2 ? '4px' : 0, textAlign: 'center', fontSize: '10px', fontWeight: 600, color: '#9ca3af' }}>{c}</div>
        ))}
        <div style={{ width: '24px' }} />
        {COLS_RIGHT.map((c, i) => (
          <div key={c} style={{ width: '38px', marginRight: i < 2 ? '4px' : 0, textAlign: 'center', fontSize: '10px', fontWeight: 600, color: '#9ca3af' }}>{c}</div>
        ))}
      </div>

      {/* Rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }} role="group" aria-label="Seat map">
        {rows.map(row => (
          <div key={row} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '26px', textAlign: 'right', paddingRight: '4px', fontSize: '10px', fontWeight: 600, color: '#9ca3af', flexShrink: 0 }}>{row}</div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {COLS_LEFT.map(col => <MobileCell key={col} seat={getSeat(row, col)} onToggle={onToggleSeat} />)}
            </div>
            <div style={{ width: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }} aria-hidden="true">
              <span style={{ fontSize: '9px', color: '#d1d5db', fontWeight: 600 }}>{row}</span>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {COLS_RIGHT.map(col => <MobileCell key={col} seat={getSeat(row, col)} onToggle={onToggleSeat} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
