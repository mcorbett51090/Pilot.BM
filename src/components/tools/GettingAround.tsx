// Getting Around — React island
// Transport decision tool for Bermuda visitors.
// Inlines the transport logic to avoid server-only import issues in the client bundle.
// Verified facts: tourists cannot rent cars in Bermuda.

import { useState } from 'react'

type TripType =
  | 'airport_transfer'
  | 'beach_day'
  | 'island_tour'
  | 'nightlife'
  | 'hamilton_shopping'

type PartySize = 1 | 2 | 3 | 4

interface TransportOption {
  id: string
  name: string
  estimatedCost: string
  comfortScore: number
  effortScore: number
  canTouristsDo: boolean
  notes: string
  affiliateCta?: string
  recommended: boolean
}

interface TripRecommendations {
  tripType: TripType
  partySize: PartySize
  options: TransportOption[]
  carNote: string
}

const CAR_NOTE =
  'Tourists cannot rent cars in Bermuda — this is unique and catches many visitors off guard. Bermuda enforces a one-car-per-household quota island-wide; rental cars for tourists have been banned for decades.'

const TAXI: TransportOption = {
  id: 'taxi',
  name: 'Taxi',
  estimatedCost: '$60–85/hr or metered ($40–70 airport→Hamilton)',
  comfortScore: 5,
  effortScore: 1,
  canTouristsDo: true,
  notes:
    'Regulated metered fares. Airport pickup strongly recommended if you have luggage. Bermuda Taxi Hotline: +1-441-295-4141. Ask when booking if the driver accepts cards.',
  recommended: false,
}

const BUS_FERRY: TransportOption = {
  id: 'bus-ferry',
  name: 'Bus + Ferry Pass',
  estimatedCost: '$4/ride or $62/week unlimited',
  comfortScore: 3,
  effortScore: 3,
  canTouristsDo: true,
  notes:
    'Pink buses run 7am–11pm across all major sites. Ferry: Hamilton ↔ Dockyard, Hamilton ↔ St. George\'s (seasonal). Buy passes at Ferry Terminal in Hamilton. Buses accept coins/tokens only — no bills.',
  recommended: false,
}

const SCOOTER: TransportOption = {
  id: 'scooter',
  name: 'Scooter',
  estimatedCost: '$55–85/day',
  comfortScore: 3,
  effortScore: 2,
  canTouristsDo: true,
  notes:
    'Bermuda drives on the left, 35 km/h limit. Tourist licence available on-island. Helmet included. Book ahead in peak season (May–Oct). Oleander Cycles, Wheels Cycles.',
  affiliateCta: 'Book via Oleander Cycles',
  recommended: false,
}

const MINICAR: TransportOption = {
  id: 'minicar',
  name: 'Electric Minicar (Twizy)',
  estimatedCost: '$70–100/day',
  comfortScore: 4,
  effortScore: 2,
  canTouristsDo: true,
  notes:
    'Two-seat electric minicar — simpler than a scooter, good for couples. Available at Oleander Cycles and some hotels. Limited fleet; book ahead.',
  affiliateCta: 'Book via Oleander Cycles',
  recommended: false,
}

const BICYCLE: TransportOption = {
  id: 'bicycle',
  name: 'Bicycle',
  estimatedCost: '$25–35/day',
  comfortScore: 2,
  effortScore: 3,
  canTouristsDo: true,
  notes: 'Bermuda is hilly. Good for the Railway Trail (flat, scenic, car-free path). Not ideal with luggage or for long-distance touring.',
  recommended: false,
}

const WATER_TAXI: TransportOption = {
  id: 'water-taxi',
  name: 'Water Taxi',
  estimatedCost: '~$5/crossing',
  comfortScore: 5,
  effortScore: 2,
  canTouristsDo: true,
  notes: 'Seasonal (April–October approx). Hamilton to Dockyard is the most scenic route — 35 min across the Great Sound.',
  recommended: false,
}

function r(opt: TransportOption, overrides: Partial<TransportOption>): TransportOption {
  return { ...opt, ...overrides }
}

function getOptions(tripType: TripType, partySize: PartySize): TripRecommendations {
  let options: TransportOption[] = []

  switch (tripType) {
    case 'airport_transfer':
      options = [
        r(TAXI, {
          recommended: true,
          notes:
            'Strongly recommended for airport. LF Wade International → Hamilton hotels: ~40 min, ~$55–70. Taxi Hotline: +1-441-295-4141. Book ahead for late arrivals.',
        }),
        r(BUS_FERRY, {
          recommended: false,
          notes:
            'Bus Route 1: airport → Hamilton (~55 min, $4). Feasible if you pack light. Not convenient with large luggage.',
        }),
      ]
      break

    case 'beach_day':
      if (partySize <= 2) {
        options = [
          r(BUS_FERRY, {
            recommended: true,
            notes:
              'Bus Route 7 → Horseshoe Bay. $62 weekly pass covers all beach days. No parking stress.',
          }),
          r(SCOOTER, {
            recommended: partySize === 1,
            notes:
              partySize === 1
                ? 'Solo: scooters give total flexibility to hop between beaches. Horseshoe, Warwick Long Bay, and Jobson\'s Cove are within minutes of each other.'
                : 'Two riders need two scooters (single-seat tourist licence). ~$110–170/day for a pair.',
          }),
          r(MINICAR, {
            recommended: partySize === 2,
            notes: 'For couples: minicar is the comfortable compromise — independence without scooter nerves.',
          }),
        ]
      } else {
        options = [
          r(BUS_FERRY, {
            recommended: true,
            notes: 'For 3–4: bus is most cost-effective. Route 7 to Horseshoe Bay runs frequently. $62/person/week.',
          }),
          r(TAXI, {
            recommended: false,
            notes: 'A shared taxi for 4 is competitive with multiple scooters. Arrange a pickup time.',
          }),
        ]
      }
      break

    case 'island_tour':
      if (partySize <= 2) {
        options = [
          r(SCOOTER, {
            recommended: partySize === 1,
            notes:
              'The classic Bermuda experience. Full-island loop ~20 miles. Stop at Hamilton, St. George\'s (UNESCO), Dockyard, and south shore beaches.',
          }),
          r(MINICAR, {
            recommended: partySize === 2,
            notes: 'Best for couples — all-day exploration, no scooter anxiety, 30 mph cap suits the island pace.',
          }),
          r(BUS_FERRY, {
            recommended: false,
            notes: 'Ferry to Dockyard + bus across the island is a great full-day public-transport loop.',
          }),
          r(WATER_TAXI, {
            recommended: false,
            notes: 'Combine a water taxi to Dockyard with bus or scooter for the rest of the island.',
          }),
        ]
      } else {
        options = [
          r(TAXI, {
            recommended: true,
            notes:
              'For 3–4: a taxi or private driver for the day ($350–450 for 6 hours) often beats multiple scooters. Ask the Taxi Hotline for day-rate drivers.',
          }),
          r(BUS_FERRY, {
            recommended: false,
            notes: 'Feasible with planning. Pick up a bus schedule at the Ferry Terminal.',
          }),
        ]
      }
      break

    case 'nightlife':
      options = [
        r(TAXI, {
          recommended: true,
          notes:
            'Do not ride a scooter after drinking. Narrow, dark roads. Taxi Hotline: +1-441-295-4141. Carry cash — not all drivers take cards.',
        }),
        r(BUS_FERRY, {
          recommended: false,
          notes: 'Last buses ~11pm on most routes. Check the schedule — nightlife can run later.',
        }),
      ]
      break

    case 'hamilton_shopping':
      if (partySize <= 2) {
        options = [
          r(BUS_FERRY, {
            recommended: true,
            notes: 'Hamilton is the bus and ferry hub — easiest option if you\'re already on public transport.',
          }),
          r(SCOOTER, {
            recommended: false,
            notes: 'Fine for getting to Hamilton. Parking near the Ferry Terminal. Watch your bags.',
          }),
          r(MINICAR, {
            recommended: partySize === 2,
            notes: 'Easy to park near Front Street. Convenient for couples with shopping bags.',
          }),
        ]
      } else {
        options = [
          r(BUS_FERRY, { recommended: true, notes: 'Hamilton is the end of multiple bus routes. Simplest for groups.' }),
          r(TAXI, {
            recommended: false,
            notes: 'Shared taxi makes sense for 3–4 people with shopping bags.',
          }),
        ]
      }
      break
  }

  return { tripType, partySize, options, carNote: CAR_NOTE }
}

// ---- Component ----

const TRIP_OPTIONS: { value: TripType; label: string; icon: string }[] = [
  { value: 'airport_transfer', label: 'Airport Transfer', icon: '✈️' },
  { value: 'beach_day', label: 'Beach Day', icon: '🏖️' },
  { value: 'island_tour', label: 'Island Tour', icon: '🗺️' },
  { value: 'nightlife', label: 'Nightlife / Evening Out', icon: '🌙' },
  { value: 'hamilton_shopping', label: 'Hamilton Shopping', icon: '🛍️' },
]

const PARTY_SIZES: { value: PartySize; label: string }[] = [
  { value: 1, label: '1 person' },
  { value: 2, label: '2 people' },
  { value: 3, label: '3 people' },
  { value: 4, label: '4+ people' },
]

function ScoreBar({ score, type }: { score: number; type: 'comfort' | 'effort' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
      <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '52px' }}>
        {type === 'comfort' ? 'Comfort' : 'Effort'}
      </span>
      <div
        style={{
          flex: 1,
          height: '6px',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${(score / 5) * 100}%`,
            height: '100%',
            backgroundColor: type === 'comfort' ? '#0d4f5c' : '#d97706',
            borderRadius: '9999px',
            transition: 'width 300ms ease',
          }}
        />
      </div>
      <span style={{ fontSize: '12px', color: '#6b7280', minWidth: '28px' }}>
        {score}/5
      </span>
    </div>
  )
}

function TransportCard({ option }: { option: TransportOption }) {
  return (
    <div
      style={{
        border: option.recommended ? '2px solid #0d4f5c' : '1px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px 20px',
        marginBottom: '12px',
        backgroundColor: option.recommended ? '#e8f4f6' : '#ffffff',
        position: 'relative',
      }}
    >
      {option.recommended && (
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            left: '16px',
            backgroundColor: '#0d4f5c',
            color: '#ffffff',
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 10px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Recommended
        </span>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px',
          gap: '12px',
        }}
      >
        <div>
          <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', margin: 0, color: '#1a1a2e' }}>
            {option.name}
          </h3>
          <p style={{ fontSize: '14px', color: '#0d4f5c', fontWeight: 600, margin: '4px 0 0' }}>
            {option.estimatedCost}
          </p>
        </div>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: '#166534',
            backgroundColor: '#dcfce7',
            border: '1px solid #bbf7d0',
            borderRadius: '9999px',
            padding: '2px 10px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          ✓ Tourists can do this
        </span>
      </div>

      <ScoreBar score={option.comfortScore} type="comfort" />
      <ScoreBar score={5 - option.effortScore + 1} type="effort" />

      <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, margin: '12px 0 0' }}>
        {option.notes}
      </p>

      {option.affiliateCta && (
        <a
          href="/Pilot.BM/go/oleander-cycles"
          style={{
            display: 'inline-block',
            marginTop: '12px',
            padding: '8px 16px',
            backgroundColor: '#0d4f5c',
            color: '#ffffff',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          {option.affiliateCta} →
        </a>
      )}
    </div>
  )
}

export default function GettingAround() {
  const [tripType, setTripType] = useState<TripType | null>(null)
  const [partySize, setPartySize] = useState<PartySize | null>(null)

  const results =
    tripType && partySize ? getOptions(tripType, partySize) : null

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0d4f5c 0%, #1a6b7a 100%)',
          color: '#ffffff',
          padding: '24px 32px',
        }}
      >
        <p
          style={{
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '8px',
          }}
        >
          Interactive Tool
        </p>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '24px',
            color: '#ffffff',
            marginBottom: '8px',
          }}
        >
          What's Your Best Way to Get Around?
        </h2>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', margin: 0 }}>
          Answer two questions for personalised transport recommendations.
        </p>
      </div>

      {/* Car note */}
      <div
        style={{
          backgroundColor: '#fffbeb',
          borderBottom: '1px solid #fde68a',
          padding: '12px 32px',
          fontSize: '13px',
          color: '#92400e',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
        }}
      >
        <span aria-hidden="true">🚗</span>
        <span>
          <strong>Tourists cannot rent cars in Bermuda</strong> — this surprises many visitors.
          Options below are your real choices.
        </span>
      </div>

      <div style={{ padding: '32px' }}>
        {/* Step 1 */}
        <fieldset style={{ border: 'none', padding: 0, marginBottom: '28px' }}>
          <legend
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '16px',
              display: 'block',
            }}
          >
            Step 1: What are you doing?
          </legend>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '8px',
            }}
          >
            {TRIP_OPTIONS.map((opt) => (
              <label
                key={opt.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  border: tripType === opt.value ? '2px solid #0d4f5c' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: tripType === opt.value ? '#e8f4f6' : '#ffffff',
                  transition: 'all 150ms ease',
                  fontWeight: tripType === opt.value ? 600 : 400,
                  fontSize: '14px',
                }}
              >
                <input
                  type="radio"
                  name="trip-type"
                  value={opt.value}
                  checked={tripType === opt.value}
                  onChange={() => setTripType(opt.value)}
                  style={{ display: 'none' }}
                />
                <span aria-hidden="true" style={{ fontSize: '18px' }}>
                  {opt.icon}
                </span>
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Step 2 */}
        <fieldset style={{ border: 'none', padding: 0, marginBottom: '28px' }}>
          <legend
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              fontWeight: 700,
              color: '#1a1a2e',
              marginBottom: '16px',
              display: 'block',
            }}
          >
            Step 2: Party size?
          </legend>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {PARTY_SIZES.map((ps) => (
              <label
                key={ps.value}
                style={{
                  padding: '10px 20px',
                  border: partySize === ps.value ? '2px solid #0d4f5c' : '1px solid #e5e7eb',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: partySize === ps.value ? '#e8f4f6' : '#ffffff',
                  fontWeight: partySize === ps.value ? 600 : 400,
                  fontSize: '14px',
                  transition: 'all 150ms ease',
                }}
              >
                <input
                  type="radio"
                  name="party-size"
                  value={ps.value}
                  checked={partySize === ps.value}
                  onChange={() => setPartySize(ps.value)}
                  style={{ display: 'none' }}
                />
                {ps.label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Results */}
        {results && (
          <div>
            <h3
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '20px',
                color: '#1a1a2e',
                marginBottom: '20px',
                paddingTop: '20px',
                borderTop: '1px solid #e5e7eb',
              }}
            >
              Your transport options
            </h3>
            {results.options.map((opt) => (
              <TransportCard key={opt.id} option={opt} />
            ))}
            <p
              style={{
                fontSize: '12px',
                color: '#9ca3af',
                marginTop: '16px',
                fontStyle: 'italic',
              }}
            >
              Costs are estimates for 2026 and may vary. Verify current prices with operators.
            </p>
          </div>
        )}

        {!results && (
          <div
            style={{
              textAlign: 'center',
              padding: '32px',
              color: '#9ca3af',
              fontSize: '15px',
              borderTop: '1px solid #e5e7eb',
            }}
          >
            Select your trip type and party size above to see recommendations.
          </div>
        )}
      </div>
    </div>
  )
}
