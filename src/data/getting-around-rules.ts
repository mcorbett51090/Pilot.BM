// Getting Around — Bermuda transport decision ruleset
// All facts based on current Bermuda transport rules.
// NOTE: Tourists cannot rent cars in Bermuda. This is a unique restriction.
// Verified: 2026-06-10

export type TripType =
  | 'airport_transfer'
  | 'beach_day'
  | 'island_tour'
  | 'nightlife'
  | 'hamilton_shopping'

export type PartySize = 1 | 2 | 3 | 4

export interface TransportOption {
  id: string
  name: string
  estimatedCost: string
  comfortScore: number // 1-5
  effortScore: number // 1-5 (lower = easier)
  canTouristsDo: boolean // ALWAYS true — tourists cannot rent cars, only these options
  notes: string
  affiliateCta?: string
  recommended: boolean
}

export interface TripRecommendations {
  tripType: TripType
  partySize: PartySize
  options: TransportOption[]
  carNote: string
}

// Car note — always displayed
export const CAR_NOTE =
  'Tourists cannot rent cars in Bermuda — this is unique and catches many visitors off guard. Bermuda enforces a one-car-per-household quota island-wide; rental cars for tourists have been banned for decades. The options below are your real choices.'

const SCOOTER: TransportOption = {
  id: 'scooter',
  name: 'Scooter',
  estimatedCost: '$55–85/day',
  comfortScore: 3,
  effortScore: 2,
  canTouristsDo: true,
  notes:
    'Bermuda drives on the left, 35 km/h limit. Tourist driving licence available on-island (quick, inexpensive). Helmet included. NOT recommended for airport runs with luggage. Book ahead in peak season (May–Oct). Oleander Cycles and Wheels Cycles are the main operators.',
  affiliateCta: 'Book via Oleander Cycles',
  recommended: false,
}

const MINICAR: TransportOption = {
  id: 'minicar',
  name: 'Electric Minicar (Renault Twizy)',
  estimatedCost: '$70–100/day',
  comfortScore: 4,
  effortScore: 2,
  canTouristsDo: true,
  notes:
    'Two-seat electric minicar. Slower and simpler to drive than a scooter — a good option for couples who want independence without scooter nerves. Available at Oleander Cycles and select hotels. Limited fleet, book ahead.',
  affiliateCta: 'Book via Oleander Cycles',
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
    'Covers all major tourist sites. Pink buses run 7am–11pm. Ferries: Hamilton ↔ Dockyard (Royal Naval Dockyard), Hamilton ↔ St. George\'s (seasonal). Buy passes at Ferry Terminal or Central Bus Station in Hamilton. Buses accept exact coins/tokens only — no bills. The $62 weekly pass is outstanding value.',
  recommended: false,
}

const TAXI: TransportOption = {
  id: 'taxi',
  name: 'Taxi',
  estimatedCost: '$60–85/hour or metered ($40–70 airport to Hamilton)',
  comfortScore: 5,
  effortScore: 1,
  canTouristsDo: true,
  notes:
    "Regulated metered fares. Airport pickup strongly recommended over bus if you have luggage. Bermuda Taxi Hotline: +1-441-295-4141. Some drivers accept credit cards — ask when booking. Best for airport transfers and nightlife (no drunk scootering).",
  recommended: false,
}

const WATER_TAXI: TransportOption = {
  id: 'water-taxi',
  name: 'Water Taxi',
  estimatedCost: '~$5/crossing',
  comfortScore: 5,
  effortScore: 2,
  canTouristsDo: true,
  notes:
    "Seasonal (approximately April–October). Hamilton to Royal Naval Dockyard is the most scenic route — 35 minutes across the Great Sound. St. George's routes also available. Check schedules at the Hamilton Ferry Terminal.",
  recommended: false,
}

const BICYCLE: TransportOption = {
  id: 'bicycle',
  name: 'Bicycle',
  estimatedCost: '$25–35/day',
  comfortScore: 2,
  effortScore: 3,
  canTouristsDo: true,
  notes:
    "Bermuda is hilly — more so than it looks on a map. Good for the Railway Trail (flat, scenic, car-free path from Hamilton to the west). Not recommended for airport runs or long-distance touring. Bring water; the heat and humidity are real.",
  recommended: false,
}

function clone(opt: TransportOption, overrides: Partial<TransportOption>): TransportOption {
  return { ...opt, ...overrides }
}

export function getTransportOptions(
  tripType: TripType,
  partySize: PartySize
): TripRecommendations {
  let options: TransportOption[] = []

  switch (tripType) {
    case 'airport_transfer': {
      // Taxis are the clear winner — luggage makes scooters impractical
      options = [
        clone(TAXI, {
          recommended: true,
          notes:
            'Strongly recommended for airport. LF Wade International is in St. George\'s — taxi to Hamilton hotels takes ~40 min, ~$55–70. Bermuda Taxi Hotline: +1-441-295-4141. Book ahead if arriving late.',
        }),
        clone(BUS_FERRY, {
          recommended: false,
          notes:
            'Bus Route 1 connects airport to Hamilton (~55 min, $4). Feasible if you pack light and have time. NOT convenient with large luggage.',
        }),
      ]
      break
    }

    case 'beach_day': {
      if (partySize <= 2) {
        options = [
          clone(BUS_FERRY, {
            recommended: true,
            notes:
              'Bus Route 7 goes directly to Horseshoe Bay. $62 weekly pass covers all your beach days. No parking stress, no scooter sunburn.',
          }),
          clone(SCOOTER, {
            recommended: partySize === 1,
            notes:
              partySize === 1
                ? 'Solo riders: scooters give you total flexibility to hop between beaches — Horseshoe, Warwick Long Bay, and Jobson\'s Cove are all within a few minutes of each other.'
                : 'Two riders need two scooters (most tourist licenses are single-seat only — confirm with operator). Costs ~$110–170/day for a pair.',
          }),
          clone(MINICAR, {
            recommended: partySize === 2,
            notes:
              'For couples, the electric minicar is an excellent compromise — you explore independently without needing scooter skills.',
          }),
        ]
      } else {
        // Party of 3-4
        options = [
          clone(BUS_FERRY, {
            recommended: true,
            notes:
              'For 3–4 people, the bus is the most cost-effective and stress-free option. Route 7 to Horseshoe Bay runs frequently. $62 weekly pass per person.',
          }),
          clone(TAXI, {
            recommended: false,
            notes:
              'A shared taxi for 4 people is competitive with multiple scooters. Ask the driver to wait or arrange a pickup time.',
          }),
        ]
      }
      break
    }

    case 'island_tour': {
      if (partySize <= 2) {
        options = [
          clone(SCOOTER, {
            recommended: partySize === 1,
            notes:
              'The classic Bermuda experience. Full-island loop is ~20 miles — very doable in a day. Stop in Hamilton, St. George\'s (UNESCO World Heritage), Dockyard, and the south shore beaches.',
          }),
          clone(MINICAR, {
            recommended: partySize === 2,
            notes:
              'Best option for a couple wanting an all-day island exploration without scooter anxiety. 30 mph max suits the island pace perfectly.',
          }),
          clone(BUS_FERRY, {
            recommended: false,
            notes:
              'Combine ferry to Dockyard with bus across the island — a full day using public transport is absolutely feasible and covers the highlights.',
          }),
        ]
      } else {
        options = [
          clone(TAXI, {
            recommended: true,
            notes:
              'For 3–4 people on a full-island tour, a taxi or private driver for the day ($350–450 for 6 hours) is often better value than multiple scooters. Ask the Taxi Hotline for day-rate drivers.',
          }),
          clone(BUS_FERRY, {
            recommended: false,
            notes:
              'Feasible but requires route planning. Pick up a bus schedule at the Ferry Terminal in Hamilton — staff are helpful.',
          }),
        ]
      }
      break
    }

    case 'nightlife': {
      // Never drunk scootering — taxis only
      options = [
        clone(TAXI, {
          recommended: true,
          notes:
            'Do not ride a scooter after drinking. Bermuda roads are narrow and dark at night. Taxi is the only sensible option for a night out. Bermuda Taxi Hotline: +1-441-295-4141. Have cash — not all drivers take cards.',
        }),
        clone(BUS_FERRY, {
          recommended: false,
          notes:
            'Last buses run around 11pm on most routes. Check the schedule if you plan to use the bus — nightlife can run late.',
        }),
      ]
      break
    }

    case 'hamilton_shopping': {
      if (partySize <= 2) {
        options = [
          clone(BUS_FERRY, {
            recommended: true,
            notes:
              'Hamilton is the bus and ferry hub — most routes converge here. Easy to reach from anywhere. The most practical option if you\'re already on public transport.',
          }),
          clone(SCOOTER, {
            recommended: false,
            notes:
              "Scooters are fine for getting to Hamilton. Parking in the city centre is available near the Ferry Terminal. Carry bags carefully.",
          }),
          clone(MINICAR, {
            recommended: partySize === 2,
            notes: 'Easy to park near Front Street. Good for couples with shopping bags to carry.',
          }),
          clone(TAXI, {
            recommended: false,
            notes: 'Best if you\'re doing a big shopping run and need door-to-door service.',
          }),
        ]
      } else {
        options = [
          clone(BUS_FERRY, {
            recommended: true,
            notes: 'Hamilton is the end of multiple bus routes. Simplest for groups.',
          }),
          clone(TAXI, {
            recommended: false,
            notes: 'Shared taxi makes sense for 3–4 people, especially with shopping bags.',
          }),
        ]
      }
      break
    }
  }

  return {
    tripType,
    partySize,
    options,
    carNote: CAR_NOTE,
  }
}
