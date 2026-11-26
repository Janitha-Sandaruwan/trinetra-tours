-- ============================================================
-- Trinetra Solutions Tours & Travels — Database Schema
-- Run once against your Vercel Postgres / Neon database.
-- ============================================================

-- ── Tour Packages ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tour_packages (
  id                  SERIAL PRIMARY KEY,
  slug                TEXT UNIQUE NOT NULL,
  title               TEXT NOT NULL,
  category            TEXT NOT NULL,          -- 'Cultural' | 'Wildlife' | 'Honeymoon' | 'Beach & Wellness' | 'Adventure'
  duration_days       INTEGER NOT NULL,
  starting_price_usd  NUMERIC(10,2) NOT NULL,
  summary             TEXT,
  cover_image_url     TEXT,
  route_tags          JSONB DEFAULT '[]'::jsonb,
  itinerary           JSONB DEFAULT '[]'::jsonb,  -- [{day,title,description,accommodation,meals}]
  inclusions          JSONB DEFAULT '[]'::jsonb,
  exclusions          JSONB DEFAULT '[]'::jsonb,
  is_featured         BOOLEAN DEFAULT false,
  is_published        BOOLEAN DEFAULT true,
  created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Customer Inquiries ────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id              SERIAL PRIMARY KEY,
  inquiry_type    TEXT NOT NULL,     -- 'Package Booking' | 'Tailor-Made'
  package_title   TEXT,
  customer_name   TEXT NOT NULL,
  email           TEXT NOT NULL,
  country         TEXT,
  whatsapp        TEXT,
  travel_date     TEXT,
  duration_days   INTEGER,
  adults          INTEGER,
  children        INTEGER,
  interests       JSONB DEFAULT '[]'::jsonb,
  hotel_tier      TEXT,
  vehicle_type    TEXT,
  notes           TEXT,
  status          TEXT DEFAULT 'New',  -- 'New' | 'Contacted' | 'Quoted' | 'Booked' | 'Archived'
  created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ── Seed Data ─────────────────────────────────────────────
INSERT INTO tour_packages (slug, title, category, duration_days, starting_price_usd, summary, cover_image_url, route_tags, itinerary, inclusions, exclusions, is_featured, is_published)
VALUES
(
  'cultural-heritage-trail',
  'Cultural Heritage Trail',
  'Cultural',
  8,
  1290.00,
  'Journey through Sri Lanka''s UNESCO World Heritage Sites — ancient kingdoms, sacred temples, and timeless frescoes. From the fortress of Sigiriya to the cave paintings of Dambulla.',
  '/img/cultural-heritage.png',
  '["Colombo", "Dambulla", "Sigiriya", "Polonnaruwa", "Anuradhapura", "Kandy"]'::jsonb,
  '[
    {"day":1,"title":"Arrival in Colombo","description":"Airport meet & greet, transfer to Negombo. Evening seafood dinner by the beach.","accommodation":"4-star beach hotel","meals":"Dinner"},
    {"day":2,"title":"Dambulla Cave Temples","description":"Drive to Dambulla, explore the magnificent cave temples with 150 Buddha statues. Afternoon at Sigiriya village.","accommodation":"Luxury eco-lodge","meals":"Breakfast, Lunch"},
    {"day":3,"title":"Sigiriya Rock Fortress","description":"Sunrise climb of Sigiriya — the 8th wonder of the ancient world. Afternoon visit to Pidurangala Rock.","accommodation":"Luxury eco-lodge","meals":"Breakfast, Dinner"},
    {"day":4,"title":"Ancient City of Polonnaruwa","description":"Explore the medieval capital — Gal Vihara, Lotus Pond, and the Royal Palace ruins.","accommodation":"Heritage boutique hotel","meals":"Breakfast, Lunch"},
    {"day":5,"title":"Sacred City of Anuradhapura","description":"Full-day exploration of the first ancient capital with 2,500-year-old sacred Bo tree.","accommodation":"Heritage boutique hotel","meals":"Breakfast"},
    {"day":6,"title":"Kandy & Temple of the Tooth","description":"Drive through scenic countryside to Kandy. Visit the Temple of the Sacred Tooth Relic. Evening cultural dance show.","accommodation":"Kandy luxury villa","meals":"Breakfast, Dinner"},
    {"day":7,"title":"Peradeniya Royal Botanical Gardens","description":"Morning at the famous gardens. Afternoon spice garden visit and cooking class.","accommodation":"Kandy luxury villa","meals":"Breakfast, Lunch"},
    {"day":8,"title":"Departure","description":"Transfer to Bandaranaike International Airport for departure.","accommodation":"","meals":"Breakfast"}
  ]'::jsonb,
  '["Private air-conditioned vehicle & chauffeur-guide","7 nights accommodation (4–5 star)","Daily breakfast","Entrance fees to all listed sites","24/7 on-tour support"]'::jsonb,
  '["International airfare","Visa fees","Personal expenses","Tips & gratuities","Meals not listed"]'::jsonb,
  true,
  true
),
(
  'wildlife-safari-adventure',
  'Wildlife Safari Adventure',
  'Wildlife',
  7,
  1650.00,
  'Track leopards at Yala, observe elephants at Udawalawe, and discover rare endemic species at Sinharaja — Sri Lanka''s premier wildlife experiences in one unforgettable journey.',
  '/img/wildlife.png',
  '["Colombo", "Udawalawe", "Yala", "Sinharaja"]'::jsonb,
  '[
    {"day":1,"title":"Arrival & Transfer","description":"Airport pickup, transfer to Colombo. Welcome dinner with orientation briefing.","accommodation":"5-star Colombo hotel","meals":"Dinner"},
    {"day":2,"title":"Udawalawe National Park","description":"Full-day game drives in Udawalawe — home to over 600 wild elephants and open grasslands.","accommodation":"Safari lodge","meals":"Breakfast, Lunch, Dinner"},
    {"day":3,"title":"Udawalawe – Elephant Transit Home","description":"Morning game drive. Visit the Elephant Transit Home rehabilitation centre.","accommodation":"Safari lodge","meals":"Breakfast, Dinner"},
    {"day":4,"title":"Transfer to Yala","description":"Scenic coastal drive to Yala. Afternoon arrival, sundowners at the lodge.","accommodation":"Luxury tented camp","meals":"Breakfast, Dinner"},
    {"day":5,"title":"Yala National Park","description":"Two game drives (dawn and dusk) in Yala Block 1 — highest leopard density in the world.","accommodation":"Luxury tented camp","meals":"Breakfast, Lunch, Dinner"},
    {"day":6,"title":"Sinharaja Rainforest","description":"Transfer to Sinharaja UNESCO Biosphere Reserve. Guided jungle trek for endemic birds and purple-faced langurs.","accommodation":"Eco-resort","meals":"Breakfast, Lunch, Dinner"},
    {"day":7,"title":"Return & Departure","description":"Morning forest walk, transfer to airport for departure.","accommodation":"","meals":"Breakfast"}
  ]'::jsonb,
  '["Private 4x4 safari vehicle","Licensed wildlife tracker & naturalist","6 nights eco-lodge accommodation","All meals during safari","National park entrance & jeep fees","Binoculars & field guides"]'::jsonb,
  '["International airfare","Visa fees","Alcoholic beverages","Travel insurance","Personal expenses"]'::jsonb,
  true,
  true
),
(
  'honeymoon-paradise',
  'Honeymoon Paradise',
  'Honeymoon',
  10,
  2450.00,
  'A bespoke 10-night romantic escape — from the misty tea country of Nuwara Eliya to sun-kissed beaches of the South Coast, crafted exclusively for newlyweds.',
  '/img/honeymoon.png',
  '["Colombo", "Kandy", "Nuwara Eliya", "Ella", "Mirissa", "Galle"]'::jsonb,
  '[
    {"day":1,"title":"Arrival — Romantic Welcome","description":"VIP airport meet & greet with flowers. Transfer to Colombo city hotel.","accommodation":"5-star Colombo hotel","meals":"Dinner"},
    {"day":2,"title":"Kandy — City of Kings","description":"Scenic train to Kandy. Temple of Tooth, botanical gardens, sunset lake walk.","accommodation":"Kandy boutique villa","meals":"Breakfast, Dinner"},
    {"day":3,"title":"Tea Country — Nuwara Eliya","description":"Drive through misty tea estates to Nuwara Eliya — ''Little England'' of Sri Lanka.","accommodation":"Colonial hill-station hotel","meals":"Breakfast, Afternoon tea"},
    {"day":4,"title":"Tea Estate & Waterfalls","description":"Private tea estate tour, Gregory Lake boat ride, Ramboda Falls visit.","accommodation":"Colonial hill-station hotel","meals":"Breakfast, Dinner"},
    {"day":5,"title":"Ella by Train","description":"Scenic train ride from Nanu Oya to Ella — world''s most beautiful train journey. Nine Arch Bridge sunset.","accommodation":"Ella boutique hotel","meals":"Breakfast"},
    {"day":6,"title":"Ella — Little Adam''s Peak","description":"Morning hike to Little Adam''s Peak. Afternoon couples spa treatment.","accommodation":"Ella boutique hotel","meals":"Breakfast, Dinner"},
    {"day":7,"title":"Southern Coast — Mirissa","description":"Drive to Mirissa. Afternoon on the beach. Sunset cocktails by the ocean.","accommodation":"5-star beach villa","meals":"Breakfast"},
    {"day":8,"title":"Whale Watching & Beach","description":"Dawn whale watching boat trip. Afternoon free on the beach.","accommodation":"5-star beach villa","meals":"Breakfast"},
    {"day":9,"title":"Galle Fort","description":"Explore the UNESCO-listed Dutch Galle Fort. Private candlelit dinner.","accommodation":"Galle heritage hotel","meals":"Breakfast, Dinner"},
    {"day":10,"title":"Departure","description":"Leisurely morning, transfer to airport.","accommodation":"","meals":"Breakfast"}
  ]'::jsonb,
  '["Private romantic transfers throughout","9 nights luxury accommodation","Breakfast daily + 4 special dinners","Couples spa session (60 min)","Whale watching boat trip","Scenic train tickets (Kandy–Ella)","Dedicated honeymoon coordinator"]'::jsonb,
  '["International airfare","Visa fees","Travel insurance","Personal shopping","Additional spa treatments"]'::jsonb,
  true,
  true
),
(
  'beach-wellness-retreat',
  'Beach & Wellness Retreat',
  'Beach & Wellness',
  9,
  1890.00,
  'Reconnect with yourself along Sri Lanka''s pristine southern coastline — Ayurvedic therapies, yoga at sunrise, whale watching, and turquoise waves at Mirissa and Tangalle.',
  '/img/beach-wellness.png',
  '["Colombo", "Bentota", "Mirissa", "Tangalle", "Galle"]'::jsonb,
  '[
    {"day":1,"title":"Arrival & Wellness Intro","description":"Airport transfer to Bentota. Welcome consultation with Ayurvedic practitioner.","accommodation":"5-star spa resort","meals":"Dinner"},
    {"day":2,"title":"Bentota Ayurvedic Day","description":"Full Ayurvedic treatment day. Abhyanga massage, herbal steam bath. Evening yoga.","accommodation":"5-star spa resort","meals":"Breakfast, Lunch"},
    {"day":3,"title":"Bentota River & Beach","description":"Morning mangrove boat safari. Afternoon on Bentota beach. Sunset meditation.","accommodation":"5-star spa resort","meals":"Breakfast"},
    {"day":4,"title":"Hikkaduwa Reef Snorkelling","description":"Transfer south, snorkelling at Hikkaduwa coral reef. Beach yoga at sunset.","accommodation":"Boutique beach resort","meals":"Breakfast"},
    {"day":5,"title":"Mirissa — Whale Watching","description":"5am whale watching expedition. Afternoon beach rest and spa.","accommodation":"Cliffside ocean villa","meals":"Breakfast"},
    {"day":6,"title":"Mirissa Free Day","description":"Full free beach day. Optional surf lesson or kayaking. Beachside dining.","accommodation":"Cliffside ocean villa","meals":"Breakfast"},
    {"day":7,"title":"Tangalle Turtle Bay","description":"Drive to Tangalle. Visit turtle hatchery. Pristine uncrowded beach afternoon.","accommodation":"Eco-beach resort","meals":"Breakfast, Dinner"},
    {"day":8,"title":"Galle Fort Heritage","description":"Morning at the UNESCO Galle Fort. Afternoon cooking class — Sri Lankan cuisine.","accommodation":"Galle heritage villa","meals":"Breakfast, Lunch"},
    {"day":9,"title":"Departure","description":"Transfer to Colombo airport.","accommodation":"","meals":"Breakfast"}
  ]'::jsonb,
  '["Private transfers throughout","8 nights luxury beach accommodation","Daily breakfast","Ayurvedic treatments (3 sessions)","Whale watching excursion","Mangrove river safari","Daily yoga & meditation sessions","Coral reef snorkelling trip"]'::jsonb,
  '["International airfare","Visa fees","Additional spa treatments","Surf lessons (optional add-on)","Alcoholic beverages"]'::jsonb,
  false,
  true
)
ON CONFLICT (slug) DO NOTHING;
