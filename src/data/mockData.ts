export interface TourPackage {
  slug: string
  title: string
  category: 'Cultural' | 'Wildlife' | 'Honeymoon' | 'Beach & Wellness'
  duration: number
  startingPrice: number
  route: string[]
  highlights: string[]
  image: string
  heroImage: string
  description: string
  itinerary: Array<{
    day: number
    title: string
    description: string
    accommodation: string
    meals: string[]
  }>
  inclusions: string[]
  exclusions: string[]
  faqs: Array<{ q: string; a: string }>
}

export interface Destination {
  name: string
  slug: string
  description: string
  bestTimeToVisit: string
  weatherBadge: string
  activities: string[]
  image: string
}

export interface Vehicle {
  id: string
  name: string
  type: string
  passengers: number
  luggage: string
  ac: boolean
  features: string[]
  image: string
}

export interface Review {
  id: string
  name: string
  country: string
  rating: number
  text: string
  platform: 'TripAdvisor' | 'Google'
  avatar: string
  tourTaken: string
}

export interface Stat {
  value: string
  label: string
  icon: string
}

export const tourPackages: TourPackage[] = [
  {
    slug: 'classic-cultural-triangle',
    title: 'Classic Cultural Triangle Explorer',
    category: 'Cultural',
    duration: 7,
    startingPrice: 1250,
    route: ['Colombo', 'Sigiriya', 'Dambulla', 'Kandy'],
    highlights: [
      'Sigiriya Rock Fortress UNESCO',
      'Dambulla Cave Temple',
      'Temple of the Tooth Relic',
      'Traditional Kandyan Dance',
      'Spice Garden Tour',
    ],
    image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=1600&q=90',
    description:
      'Journey through the UNESCO-studded Cultural Triangle — Sigiriya Rock Fortress, Dambulla Cave Temple, and the sacred Temple of the Tooth in Kandy. A perfect first Sri Lanka tour combining ancient history, stunning scenery, and warm hospitality.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Colombo & Transfer',
        description:
          'Welcome to Sri Lanka! Your SLTDA certified chauffeur guide will meet you at BIA Airport with a personalized name board. Drive through lush countryside to your hotel. Evening welcome dinner with traditional Sri Lankan cuisine.',
        accommodation: 'Cinnamon Grand Colombo (5-Star)',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Sigiriya Rock Fortress',
        description:
          'Morning drive to Sigiriya — the 8th Wonder of the World. Climb the ancient rock citadel (200m) built by King Kashyapa in the 5th century. Marvel at the famous frescoes and the Mirror Wall. Afternoon visit Pidurangala Rock for panoramic views.',
        accommodation: 'Water Garden Sigiriya (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 3,
        title: 'Dambulla Cave Temple & Cultural Village',
        description:
          'Morning visit to the magnificent Dambulla Cave Temple — 5 caves housing 153 Buddha statues dating back to the 1st century BC. Afternoon explore a traditional Sri Lankan village by tuk-tuk and bullock cart. Evening cultural performance.',
        accommodation: 'Water Garden Sigiriya (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 4,
        title: 'Kandy — The Hill Capital',
        description:
          'Scenic drive to Kandy through lush hills and tea country. Visit the sacred Temple of the Tooth Relic. Explore the vibrant Kandy Market, gem museum, and botanical gardens. Evening traditional Kandyan dance performance.',
        accommodation: 'Earls Regency Kandy (5-Star)',
        meals: ['Breakfast'],
      },
      {
        day: 5,
        title: 'Peradeniya Botanical Gardens & Spice Tour',
        description:
          'Morning visit to the Royal Botanical Gardens — 147 acres of tropical flora. Afternoon guided spice garden tour learning about cinnamon, cardamom, pepper, and vanilla. Evening free time to explore Kandy lakeside.',
        accommodation: 'Earls Regency Kandy (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 6,
        title: 'Pinnawala Elephant Orphanage',
        description:
          'Morning visit to Pinnawala Elephant Orphanage — home to 90+ rescued elephants. Watch the famous river bathing at 10am. Afternoon drive back toward Colombo. Evening shopping at Dutch Hospital Precinct.',
        accommodation: 'Taj Samudra Colombo (5-Star)',
        meals: ['Breakfast'],
      },
      {
        day: 7,
        title: 'Departure Day',
        description:
          'Post breakfast, your chauffeur guide will transfer you to Bandaranaike International Airport. Cherish the memories of a lifetime as you depart.',
        accommodation: '',
        meals: ['Breakfast'],
      },
    ],
    inclusions: [
      'Accommodation in handpicked 5-star hotels (6 nights)',
      'All transfers in air-conditioned luxury vehicle',
      'English-speaking SLTDA certified chauffeur guide',
      'Meals as specified in itinerary',
      'All entrance fees to mentioned attractions',
      'Airport meet & greet service',
      'Bottled water throughout the journey',
      '24/7 on-trip support from our operations team',
    ],
    exclusions: [
      'International airfare',
      'Sri Lanka visa/ETA fees (USD 20 per person)',
      'Travel insurance (strongly recommended)',
      'Personal expenses & laundry',
      'Tips & gratuities for guides and drivers',
      'Optional excursions not mentioned in itinerary',
      'Meals not mentioned in the program',
    ],
    faqs: [
      {
        q: 'Is this tour suitable for elderly travelers?',
        a: 'Yes, with modifications. The Sigiriya Rock climb involves 1,200+ steps and can be skipped — Pidurangala Rock is a gentler alternative. We customize pace to suit your group.',
      },
      {
        q: 'What is the best time to do this tour?',
        a: 'Year-round, but December to April offers the best weather for the Cultural Triangle. The area experiences a dry northeast monsoon making skies clear and temperatures pleasant.',
      },
      {
        q: 'Can I extend this tour?',
        a: 'Absolutely! This tour pairs perfectly with a beach extension to Mirissa or Galle (3-4 extra days). Contact us for a custom quote.',
      },
    ],
  },
  {
    slug: 'wild-leopard-safari',
    title: 'Wild Sri Lanka — Yala & Udawalawe Safari',
    category: 'Wildlife',
    duration: 6,
    startingPrice: 1450,
    route: ['Colombo', 'Udawalawe', 'Yala', 'Galle'],
    highlights: [
      "Yala National Park — World's highest leopard density",
      'Udawalawe Elephant Transit Home',
      'Whale watching in Mirissa',
      'Galle Dutch Fort',
      'Birdwatching in Bundala',
    ],
    image: 'https://images.unsplash.com/photo-1534759926976-b40f2c5a6a09?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1534759926976-b40f2c5a6a09?w=1600&q=90',
    description:
      "Track wild leopards at Yala — the world's best place for leopard sightings — then continue south to whale watching at Mirissa and the UNESCO-listed Galle Fort. A perfect wildlife and culture combination.",
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Transfer to Udawalawe',
        description:
          'Arrive at BIA and begin your wildlife adventure. Drive to Udawalawe National Park — famous for its large herds of wild elephants. Evening check-in at your eco lodge.',
        accommodation: "Kalu's Hideaway (Boutique Eco Lodge)",
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Udawalawe National Park Safari',
        description:
          'Full day at Udawalawe — home to 500+ wild elephants. Morning and afternoon safaris in an open-top jeep. Visit the Elephant Transit Home where orphaned elephants are nursed back to the wild.',
        accommodation: "Kalu's Hideaway (Boutique Eco Lodge)",
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
      {
        day: 3,
        title: 'Transfer to Yala — Afternoon Safari',
        description:
          "Drive to Yala National Park — the best place in the world to spot leopards in the wild. After check-in, afternoon jeep safari focusing on leopard territory. Sunset cocktails overlooking the jungle.",
        accommodation: 'Wild Coast Tented Lodge (5-Star Glamping)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 4,
        title: 'Full Day Yala Safari',
        description:
          'Two safari drives — 6am-10am golden hour and 3pm-6pm sunset safari. Spot leopards, sloth bears, crocodiles, elephants, and 200+ bird species. Expert naturalist guide included.',
        accommodation: 'Wild Coast Tented Lodge (5-Star Glamping)',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
      {
        day: 5,
        title: 'Mirissa — Whale Watching',
        description:
          'Morning transfer to Mirissa. Board a blue whale watching catamaran — Mirissa is one of the best locations in the world to spot blue whales, sperm whales, and spinner dolphins.',
        accommodation: 'Shangri-La Hambantota (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 6,
        title: 'Galle Dutch Fort & Departure',
        description:
          'Morning explore the UNESCO-listed Galle Dutch Fort. Lunch at a fort-side restaurant. Transfer to airport.',
        accommodation: '',
        meals: ['Breakfast', 'Lunch'],
      },
    ],
    inclusions: [
      'Accommodation (5 nights) including glamping at Yala',
      'All jeep safaris with national park entrance fees',
      'Whale watching boat trip from Mirissa',
      'Expert naturalist guide throughout',
      'All transfers in A/C vehicle',
      'Meals as specified',
      'Airport pick-up and drop-off',
    ],
    exclusions: [
      'International airfare & visa/ETA fees',
      'Travel insurance',
      'Optional hot air balloon safari (USD 180/person)',
      'Beverages and personal expenses',
      'Tips for guides and drivers',
    ],
    faqs: [
      {
        q: 'What is the best time for Yala safaris?',
        a: 'February to July when water levels are low and animals congregate at water holes. Leopard sightings are possible year-round.',
      },
      {
        q: 'Is whale watching guaranteed?',
        a: 'Blue whale sightings have a 95% success rate from December to April. We use responsible eco-certified operators.',
      },
    ],
  },
  {
    slug: 'honeymoon-paradise',
    title: 'Ceylon Honeymoon Paradise',
    category: 'Honeymoon',
    duration: 10,
    startingPrice: 2800,
    route: ['Colombo', 'Kandy', 'Nuwara Eliya', 'Ella', 'Mirissa', 'Galle'],
    highlights: [
      'Private scenic train Kandy to Ella',
      'Tea plantation sunrise hike',
      "Couple's Ayurveda spa retreat",
      'Whale watching sunset cruise',
      'Galle Fort candlelit dinner',
    ],
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=90',
    description:
      "The perfect honeymoon itinerary — scenic train rides through misty mountains, intimate Ayurveda spa retreats, whale watching at sunrise, and candlelit dinners at Galle Fort. Every detail crafted for couples in love.",
    itinerary: [
      {
        day: 1,
        title: 'Romantic Arrival in Colombo',
        description:
          'Your private chauffeur greets you with tropical flowers and a personalized welcome sign. Champagne transfer to your boutique Colombo hotel. Evening rooftop dinner overlooking the Indian Ocean.',
        accommodation: 'Shangri-La Colombo (5-Star)',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Kandy — City of Love',
        description:
          "Drive through tropical countryside to Kandy. Visit the Temple of the Tooth and explore Kandy Lake. Afternoon couples Ayurveda treatment at a heritage spa. Sunset view from Castle Hill.",
        accommodation: 'Amaya Hills Kandy (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 3,
        title: 'Scenic Train to Nuwara Eliya',
        description:
          "The world's most scenic train ride — Kandy to Nanuoya through misty mountains and emerald tea estates. First class window seats reserved just for you.",
        accommodation: 'Heritance Tea Factory (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 4,
        title: 'Tea Plantation & Colonial Charm',
        description:
          "Sunrise hike through the tea estates with private picnic breakfast. Tour the historic Heritance Tea Factory. Afternoon explore Nuwara Eliya's colonial bungalows and Gregory Lake. Candlelit dinner.",
        accommodation: 'Heritance Tea Factory (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 5,
        title: 'Ella — Adventure & Romance',
        description:
          "Morning train to Ella — the most romantic stretch of the journey crossing the Nine Arch Bridge. Afternoon hike to Little Adam's Peak for panoramic views. Sunset cocktails at an Ella sky bar.",
        accommodation: '98 Acres Resort Ella (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 6,
        title: 'Ella Rock & Nine Arch Bridge',
        description:
          "Morning guided hike to Ella Rock (3-4 hours, medium difficulty). Photographed at the famous Nine Arch Bridge during the passing train. Afternoon couple's massage at the resort spa.",
        accommodation: '98 Acres Resort Ella (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 7,
        title: 'Transfer to Mirissa — Beach Arrival',
        description:
          "Drive through the southern coast. Arrive in Mirissa — Sri Lanka's most romantic beach. Private beachfront dinner setup with lanterns and flower petals.",
        accommodation: 'The Sands by Aitken Spence (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 8,
        title: 'Sunrise Whale Watching',
        description:
          "Private 6am catamaran trip for blue whale and dolphin watching. Return for champagne brunch on the beach. Afternoon couple's surfing lesson or snorkeling.",
        accommodation: 'The Sands by Aitken Spence (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 9,
        title: 'Galle Fort — History & Fine Dining',
        description:
          "Morning drive to the UNESCO-listed Galle Dutch Fort. Private guided walking tour. Sundowner cocktails on the fort walls. Celebratory fine-dining dinner.",
        accommodation: 'Amangalla Galle Fort (5-Star Heritage)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 10,
        title: 'Farewell Sri Lanka',
        description:
          "Leisurely morning exploring Galle Fort boutiques — handmade jewelry, batik, Ceylon sapphires. After brunch, transfer to Bandaranaike International Airport.",
        accommodation: '',
        meals: ['Breakfast', 'Lunch'],
      },
    ],
    inclusions: [
      'Luxury 5-star accommodation throughout (9 nights)',
      'Private first-class scenic train reservations',
      "Couple's Ayurveda and spa sessions (2 treatments)",
      'Private whale watching catamaran',
      'Romantic setups: flower petals, candles, champagne',
      'All entrance fees to attractions',
      'Private A/C luxury vehicle & SLTDA guide',
      '24/7 personal concierge service',
    ],
    exclusions: [
      'International airfare & ETA visa',
      'Travel insurance',
      'Additional spa treatments beyond inclusions',
      'Personal shopping',
      'Tips for staff, guides & drivers',
    ],
    faqs: [
      {
        q: 'Is this good for a honeymoon?',
        a: "This package is specifically designed for couples — private transfers, romantic setups, flower petal turndowns, candle-lit dinners, and couple's spa treatments included.",
      },
      {
        q: 'Can we extend the beach time?',
        a: 'Absolutely. We can add extra nights at Mirissa or combine with a Maldives extension for a combined Sri Lanka + Maldives honeymoon.',
      },
    ],
  },
  {
    slug: 'beach-wellness-south',
    title: 'Southern Bliss — Beach & Wellness Retreat',
    category: 'Beach & Wellness',
    duration: 8,
    startingPrice: 1800,
    route: ['Colombo', 'Bentota', 'Galle', 'Mirissa', 'Tangalle'],
    highlights: [
      'Bentota River safari & watersports',
      'Galle Fort sundowners',
      'Ayurveda detox at Barberyn Reef Resort',
      'Mirissa whale watching',
      'Tangalle deserted beach',
    ],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=90',
    description:
      "Rejuvenate on the golden south coast — Ayurveda detox in Bentota, sundowners on Galle Fort walls, whale watching at Mirissa, and total seclusion at Tangalle's pristine beaches.",
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Colombo City Tour',
        description:
          'Arrive at BIA and explore Colombo — the Lotus Tower, Gangaramaya Temple, Pettah Market. Transfer to Colombo beach hotel.',
        accommodation: 'Taj Samudra Colombo (5-Star)',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Bentota — River & Beach',
        description:
          'Drive down the coastal expressway to Bentota. Afternoon river safari spotting monitor lizards and water birds. Sunset watersports. Beach bonfire evening.',
        accommodation: 'Taj Exotica Bentota (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 3,
        title: 'Ayurveda Detox Day',
        description:
          'Full day Ayurveda consultation, herbal oil treatments, yoga session, and meditation. Healthy Sri Lankan Ayurveda meals. Evening sunset yoga on the beach.',
        accommodation: 'Taj Exotica Bentota (5-Star)',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
      {
        day: 4,
        title: 'Galle Fort Heritage Walk',
        description:
          "Morning drive to Galle — the best preserved Dutch colonial fort in Asia. Walking tour of ramparts, lighthouse, Museum, and boutique galleries. Evening sundowners.",
        accommodation: 'Fort Bazaar Galle (Boutique 4-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 5,
        title: 'Mirissa — The Jewel Beach',
        description:
          "Transfer to Mirissa. Afternoon snorkeling at Parrot Rock. Sunset beach bar visit. Fresh seafood dinner by the sea.",
        accommodation: 'The Sands Mirissa (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 6,
        title: 'Blue Whale Watching',
        description:
          'Early morning catamaran whale watching. Afternoon beach relaxation or surfing lessons.',
        accommodation: 'The Sands Mirissa (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 7,
        title: 'Tangalle — Hidden Paradise',
        description:
          "Drive to Tangalle — Sri Lanka's most unspoiled beach destination. Visit Rekawa Beach for turtle nesting (seasonal). Afternoon at Hiriketiya Bay. Wellness dinner.",
        accommodation: 'Anantara Peace Haven Tangalle (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 8,
        title: 'Departure',
        description:
          'Morning yoga session on the beach. After breakfast, transfer to Bandaranaike International Airport via expressway.',
        accommodation: '',
        meals: ['Breakfast'],
      },
    ],
    inclusions: [
      '5-star beachside accommodation throughout (7 nights)',
      'Bentota river safari & watersports session',
      'Full Ayurveda consultation and 3 treatments',
      'Whale watching catamaran trip',
      'Turtle nesting night watch (seasonal)',
      'All transfers in A/C vehicle',
      'SLTDA certified English-speaking guide',
    ],
    exclusions: [
      'International airfare & ETA visa',
      'Travel insurance',
      'Additional spa treatments',
      'Beverages not at meals',
      'Tips and gratuities',
    ],
    faqs: [
      {
        q: 'When is the best time for the south coast?',
        a: 'November to April is peak beach season for the south coast. The sea is calm, whale watching is best, and beaches are gorgeous.',
      },
      {
        q: 'Is surfing available for beginners?',
        a: 'Yes! Hikkaduwa, Mirissa, and Hiriketiya all have beginner-friendly waves and qualified surf instructors.',
      },
    ],
  },
  {
    slug: 'hill-country-trains',
    title: 'Misty Hills & Scenic Rails',
    category: 'Cultural',
    duration: 9,
    startingPrice: 1600,
    route: ['Colombo', 'Kandy', 'Nuwara Eliya', 'Ella', 'Haputale', 'Colombo'],
    highlights: [
      "World's most scenic train (Kandy–Ella)",
      'Nine Arch Bridge Ella',
      "Horton Plains & World's End",
      "Lipton's Seat tea trail",
      'Knuckles Mountain Range trek',
    ],
    image: 'https://images.unsplash.com/photo-1570731090363-3b1f07a2e0ef?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1570731090363-3b1f07a2e0ef?w=1600&q=90',
    description:
      "Ride the world's most scenic railway through emerald tea estates and misty mountains, hike to World's End at Horton Plains, photograph the iconic Nine Arch Bridge, and discover Sri Lanka's cool hill country at its finest.",
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Colombo',
        description:
          'Arrive at BIA. City orientation tour: Colombo Fort, Galle Face Green, Viharamahadevi Park. Transfer to hotel.',
        accommodation: 'Cinnamon Grand Colombo (5-Star)',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Kandy — Cultural Heart',
        description:
          'Drive to Kandy. Visit Temple of the Tooth, Kandy Market, Gem Museum. Evening Kandyan cultural dance show.',
        accommodation: 'Earls Regency Kandy (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 3,
        title: 'Knuckles Mountain Hike',
        description:
          'Full day hike through the Knuckles Conservation Forest — a UNESCO Biosphere Reserve. Spot endemic birds, medicinal plants, and mist-shrouded peaks. Packed lunch in the mountains.',
        accommodation: 'Earls Regency Kandy (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 4,
        title: 'Scenic Train to Nuwara Eliya',
        description:
          "Morning train (first class reserved) from Kandy to Nanuoya — 4 hours through tunnels, waterfalls, and tea gardens. Transfer to Nuwara Eliya.",
        accommodation: 'Heritance Tea Factory (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 5,
        title: 'Tea Trail & Waterfalls',
        description:
          'Morning guided walk through Pedro Tea Estate. Tea factory tour and tasting session. Afternoon visit Ramboda Falls. Victoria Park evening walk.',
        accommodation: 'Heritance Tea Factory (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 6,
        title: "Horton Plains & World's End",
        description:
          "Pre-dawn drive to Horton Plains National Park (UNESCO). 9km trek across the cloud plateau to World's End — a sheer 870m cliff. Baker's Falls on the return loop.",
        accommodation: '98 Acres Resort Ella (5-Star)',
        meals: ['Breakfast', 'Packed Lunch'],
      },
      {
        day: 7,
        title: 'Ella — Nine Arches & Rock',
        description:
          "Arrive Ella by scenic train. Morning hike to Little Adam's Peak. Afternoon photograph the iconic Nine Arch Bridge. Evening sunset cocktails at a sky bar.",
        accommodation: '98 Acres Resort Ella (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 8,
        title: "Lipton's Seat — Tea Country Summit",
        description:
          "Morning tuk-tuk ride to Lipton's Seat — the highest tea estate viewpoint in Sri Lanka (1,970m). Afternoon drive. Train back to Colombo.",
        accommodation: 'Taj Samudra Colombo (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 9,
        title: 'Departure',
        description: 'Post breakfast, transfer to BIA. Farewell Sri Lanka!',
        accommodation: '',
        meals: ['Breakfast'],
      },
    ],
    inclusions: [
      'All accommodation as specified (8 nights)',
      'First class scenic train reservations',
      'Knuckles Mountain guided trek',
      'Horton Plains national park entry & guide',
      'Tea factory tour and tasting',
      'All transfers in A/C luxury vehicle',
      'SLTDA certified chauffeur guide',
    ],
    exclusions: [
      'International airfare & ETA visa',
      'Travel insurance',
      'Personal trekking gear',
      'Beverages and personal expenses',
      'Tips',
    ],
    faqs: [
      {
        q: 'How difficult are the hikes?',
        a: "Knuckles is moderate (5-6 hours), Horton Plains is easy-moderate (9km flat plateau, 3-4 hours), Little Adam's Peak is easy (45 minutes). All are guided.",
      },
      {
        q: 'What is the weather like in the hill country?',
        a: 'Nuwara Eliya averages 15-18°C — bring a light jacket. Ella and Haputale are warmer. Best weather November to April.',
      },
    ],
  },
  {
    slug: 'grand-sri-lanka-odyssey',
    title: 'Grand Sri Lanka Odyssey',
    category: 'Cultural',
    duration: 15,
    startingPrice: 3800,
    route: ['Colombo', 'Sigiriya', 'Polonnaruwa', 'Trincomalee', 'Kandy', 'Nuwara Eliya', 'Ella', 'Yala', 'Galle'],
    highlights: [
      'Trincomalee beaches & Pigeon Island snorkeling',
      'Polonnaruwa Ancient City by bicycle',
      'All UNESCO World Heritage Sites of Sri Lanka',
      'Hot air balloon over Sigiriya at sunrise',
      'Wild leopard safaris at Yala',
    ],
    image: 'https://images.unsplash.com/photo-1546913900-fe42f04d6e28?w=800&q=80',
    heroImage: 'https://images.unsplash.com/photo-1546913900-fe42f04d6e28?w=1600&q=90',
    description:
      "The definitive Sri Lanka experience — 15 days covering every UNESCO site, the finest wildlife, the most scenic train journeys, tropical beaches, and the best of the southern coast. The journey of a lifetime.",
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Colombo',
        description: 'VIP airport reception. Welcome briefing with your personal SLTDA guide. Rooftop welcome dinner.',
        accommodation: 'Shangri-La Colombo (5-Star)',
        meals: ['Dinner'],
      },
      {
        day: 2,
        title: 'Sigiriya — The Rock Fortress',
        description:
          "Drive to Sigiriya. Climb the magnificent Lion Rock fortress, view the ancient frescoes, and walk the Royal Gardens. Afternoon Pidurangala Rock sunset.",
        accommodation: 'Water Garden Sigiriya (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 3,
        title: 'Hot Air Balloon Over Sigiriya',
        description:
          "Pre-dawn hot air balloon flight over the Cultural Triangle — an unforgettable sunrise bird's eye view. Afternoon Dambulla Cave Temple visit.",
        accommodation: 'Water Garden Sigiriya (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 4,
        title: 'Polonnaruwa Ancient City',
        description:
          "Full day at the UNESCO ancient city of Polonnaruwa. Hire bicycles to explore: Royal Palace, Gal Vihara Buddha statues, Parakrama Samudra reservoir.",
        accommodation: 'Deer Park Hotel Sigiriya (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 5,
        title: 'Trincomalee — Blue Water & History',
        description:
          "Drive east to Trincomalee. Visit Koneswaram Temple perched on a clifftop. Afternoon beach at Nilaveli. Snorkeling at Pigeon Island.",
        accommodation: 'Trinco Blu by Cinnamon (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 6,
        title: 'Trincomalee Free Day',
        description:
          'Morning whale shark snorkeling (seasonal) or diving. Afternoon visit War Cemetery and Fort Frederick. Sunset dolphin watching boat trip.',
        accommodation: 'Trinco Blu by Cinnamon (5-Star)',
        meals: ['Breakfast'],
      },
      {
        day: 7,
        title: 'Kandy — Cultural Capital',
        description:
          "Drive inland to Kandy. Temple of the Tooth, Kandy Lake, botanical gardens. Evening Kandyan dance performance.",
        accommodation: 'Amaya Hills Kandy (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 8,
        title: 'Scenic Train to Nuwara Eliya',
        description:
          'First class scenic train from Kandy through the highlands. Tea estate walks, waterfall stops. Nuwara Eliya colonial exploration.',
        accommodation: 'Heritance Tea Factory (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 9,
        title: "Horton Plains & World's End",
        description:
          "Pre-dawn hike to World's End — a 870m sheer cliff drop offering views across the southern plains on clear days.",
        accommodation: 'Heritance Tea Factory (5-Star)',
        meals: ['Breakfast', 'Packed Lunch'],
      },
      {
        day: 10,
        title: 'Ella — Scotland of Sri Lanka',
        description: "Scenic train to Ella. Nine Arch Bridge, Ella Rock hike, sky bar sunset cocktails.",
        accommodation: '98 Acres Resort Ella (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 11,
        title: 'Yala — Wild Leopard Safari',
        description:
          "Transfer to Yala National Park. Afternoon jeep safari — world's highest wild leopard density.",
        accommodation: 'Wild Coast Tented Lodge (5-Star Glamping)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 12,
        title: 'Full Day Yala Safari',
        description:
          'Two safari drives at golden hour. Spot leopards, sloth bears, crocodiles, elephants, and rare birds.',
        accommodation: 'Wild Coast Tented Lodge (5-Star Glamping)',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
      },
      {
        day: 13,
        title: 'Mirissa Whale Watching',
        description:
          'Morning whale watching catamaran. Blue whales, sperm whales, spinner dolphins. Afternoon beach at Mirissa.',
        accommodation: 'Shangri-La Hambantota (5-Star)',
        meals: ['Breakfast', 'Lunch'],
      },
      {
        day: 14,
        title: 'Galle Fort — Final Day',
        description:
          'UNESCO Galle Dutch Fort walking tour. Boutique shopping, sundowners on the ramparts. Celebratory farewell dinner.',
        accommodation: 'Amangalla Galle Fort (5-Star)',
        meals: ['Breakfast', 'Dinner'],
      },
      {
        day: 15,
        title: 'Departure',
        description: 'Transfer to BIA. The end of a Grand Sri Lanka Odyssey.',
        accommodation: '',
        meals: ['Breakfast'],
      },
    ],
    inclusions: [
      'All accommodation (14 nights) in top-rated 5-star properties',
      'Hot air balloon flight over Sigiriya',
      'First class scenic train reservations',
      'All jeep safaris and park fees',
      'Whale watching catamaran',
      'Pigeon Island snorkeling trip',
      'All entrance fees for all sites mentioned',
      'Private A/C luxury vehicle throughout',
      'Personal SLTDA guide for the full journey',
      'Airport VIP meet & greet',
    ],
    exclusions: [
      'International airfare',
      'Sri Lanka ETA visa (USD 20)',
      'Travel insurance',
      'Personal expenses & tips',
      'Optional scuba diving courses',
    ],
    faqs: [
      {
        q: 'Is 15 days too long?',
        a: "Not at all — Sri Lanka has so much to offer. This tour gives you just the right pace without rushing. Many guests say they wished they had more time!",
      },
      {
        q: 'Is this suitable for families with children?',
        a: "Yes! Children love the safaris, train rides, and beach days. We adjust the pace for families. Children under 5 travel free on most excursions.",
      },
    ],
  },
]

export const destinations: Destination[] = [
  {
    name: 'Sigiriya',
    slug: 'sigiriya',
    description:
      "An ancient rock fortress rising 200 metres above the jungle floor, Sigiriya is Sri Lanka's most iconic landmark. The 5th-century citadel is a UNESCO World Heritage Site featuring stunning frescoes, mirror walls, and royal water gardens.",
    bestTimeToVisit: 'December – April',
    weatherBadge: 'Dry & Sunny',
    activities: ['Rock fortress climb', 'Frescoes & Mirror Wall', 'Village cycle tour', 'Pidurangala Rock hike', 'Hot air ballooning'],
    image: 'https://images.unsplash.com/photo-1562602833-0f4ab2fc46e5?w=600&q=80',
  },
  {
    name: 'Kandy',
    slug: 'kandy',
    description:
      "Nestled in a highland valley, Kandy is Sri Lanka's cultural capital and home to the sacred Temple of the Tooth Relic — the most venerated Buddhist shrine on the island. Its scenic lake and vibrant markets make it unmissable.",
    bestTimeToVisit: 'Year-Round',
    weatherBadge: 'Warm & Pleasant',
    activities: ['Temple of the Tooth', 'Peradeniya Botanical Gardens', 'Kandyan Dance Performance', 'Gem Museum', 'Kandy Market'],
    image: 'https://images.unsplash.com/photo-1546913900-fe42f04d6e28?w=600&q=80',
  },
  {
    name: 'Nuwara Eliya',
    slug: 'nuwara-eliya',
    description:
      "Sri Lanka's highest city sits at 1,868m amid emerald tea estates and cool misty air. Dubbed 'Little England' for its colonial bungalows and manicured gardens, it's the heart of Ceylon tea country.",
    bestTimeToVisit: 'December – April',
    weatherBadge: 'Cool & Misty',
    activities: ['Tea factory tour', 'Tea estate walk', 'Gregory Lake boat ride', 'Victoria Park', 'Horton Plains day trip'],
    image: 'https://images.unsplash.com/photo-1570731090363-3b1f07a2e0ef?w=600&q=80',
  },
  {
    name: 'Ella',
    slug: 'ella',
    description:
      "A charming hill village surrounded by waterfalls, tea estates, and jungle peaks, Ella offers the perfect blend of adventure and relaxation. Its legendary Nine Arch Bridge and the scenic train journey are bucket-list experiences.",
    bestTimeToVisit: 'Year-Round',
    weatherBadge: 'Warm & Green',
    activities: ['Nine Arch Bridge', "Little Adam's Peak hike", 'Ella Rock summit', 'Ravana Falls', 'Scenic train ride'],
    image: 'https://images.unsplash.com/photo-1538970272646-f61fabb3bfbe?w=600&q=80',
  },
  {
    name: 'Yala',
    slug: 'yala',
    description:
      "Yala National Park is the world's best place to spot wild leopards, with the highest leopard density on earth. The park also hosts wild elephants, sloth bears, crocodiles, and 215 bird species across scrub jungle and coastal wetlands.",
    bestTimeToVisit: 'February – July',
    weatherBadge: 'Hot & Dry',
    activities: ['Leopard safari jeep tour', 'Elephant herds', 'Sloth bear watching', 'Bird safari', 'Crocodile watching'],
    image: 'https://images.unsplash.com/photo-1534759926976-b40f2c5a6a09?w=600&q=80',
  },
  {
    name: 'Galle',
    slug: 'galle',
    description:
      "The jewel of the south coast, Galle's 16th-century Dutch Fort is a UNESCO World Heritage Site perfectly preserved on a rocky promontory. Inside its ramparts you'll find boutique hotels, art galleries, and the finest sundowners in Asia.",
    bestTimeToVisit: 'November – April',
    weatherBadge: 'Sunny & Breezy',
    activities: ['Dutch Fort walking tour', 'Lighthouse visit', 'Boutique shopping', 'Sundowners on ramparts', 'National Museum'],
    image: 'https://images.unsplash.com/photo-1573599852326-3ef84a5dd3d4?w=600&q=80',
  },
  {
    name: 'Mirissa',
    slug: 'mirissa',
    description:
      "A perfect crescent of golden sand lined with swaying palms, Mirissa is Sri Lanka's most beautiful beach. It's also one of the world's top destinations for blue whale watching, with sightings almost guaranteed December to April.",
    bestTimeToVisit: 'November – April',
    weatherBadge: 'Sunny & Tropical',
    activities: ['Blue whale watching', 'Surfing', 'Snorkeling at Parrot Rock', 'Sunset beach bars', 'Boat to Secret Beach'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  },
]

export const fleet: Vehicle[] = [
  {
    id: 'luxury-sedan',
    name: 'Toyota Axio / Honda Fit',
    type: 'Luxury Sedan',
    passengers: 2,
    luggage: '2 large suitcases',
    ac: true,
    features: ['Leather seats', 'USB charging', 'Music system', 'SLTDA certified driver', 'WiFi hotspot', 'Complimentary water'],
    image: 'https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80',
  },
  {
    id: 'luxury-suv',
    name: 'Toyota Land Cruiser Prado',
    type: 'Luxury SUV',
    passengers: 4,
    luggage: '4 large suitcases',
    ac: true,
    features: ['Premium leather', '4WD for safari & hills', 'USB + 12V charging', 'Cooler box', 'Music system', 'SLTDA guide', 'First aid kit', 'Complimentary water & snacks'],
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80',
  },
  {
    id: 'kdh-van',
    name: 'Toyota KDH High-Roof Van',
    type: 'Tourist Van',
    passengers: 8,
    luggage: '8 cabin bags + luggage hold',
    ac: true,
    features: ['Reclining seats', 'Large windows', 'USB charging x4', 'Music system', 'SLTDA guide + driver', 'Luggage hold', 'Complimentary water'],
    image: 'https://images.unsplash.com/photo-1570125666751-6e88da35b1cf?w=600&q=80',
  },
  {
    id: 'mini-coach',
    name: 'Rosa Mini Coach',
    type: 'Mini Coach',
    passengers: 20,
    luggage: 'Undercarriage luggage hold',
    ac: true,
    features: ['Reclining coach seats', 'Overhead luggage bins', 'PA system', 'USB charging', 'Toilet on board', 'SLTDA guide', 'Emergency kit'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600&q=80',
  },
]

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah & James Thompson',
    country: 'United Kingdom',
    rating: 5,
    text: "Absolute perfection! Our 10-day honeymoon package exceeded every expectation. The scenic train from Kandy to Ella was the highlight of our lives. Our guide Nimal was incredibly knowledgeable and made us feel so welcome. The hotel choices were exquisite. We'll be recommending Sri Lanka Bespoke to every couple we know!",
    platform: 'TripAdvisor',
    avatar: 'https://i.pravatar.cc/80?img=1',
    tourTaken: 'Ceylon Honeymoon Paradise',
  },
  {
    id: '2',
    name: 'Marcus Weller',
    country: 'Germany',
    rating: 5,
    text: "The leopard safari at Yala was the most breathtaking wildlife experience of my life. We spotted 3 leopards in one morning! The team at Sri Lanka Bespoke handled everything flawlessly — transfers, accommodations, all perfect. The WhatsApp support was incredibly responsive even at 6am.",
    platform: 'Google',
    avatar: 'https://i.pravatar.cc/80?img=3',
    tourTaken: 'Wild Sri Lanka — Yala Safari',
  },
  {
    id: '3',
    name: 'The Patel Family',
    country: 'Canada',
    rating: 5,
    text: "We were a family of 5 including elderly parents and two young children. The team crafted a perfect itinerary at a comfortable pace. The KDH van was spacious and our guide Sunil was endlessly patient and entertaining. Kids absolutely loved the elephant orphanage. Highly recommend!",
    platform: 'TripAdvisor',
    avatar: 'https://i.pravatar.cc/80?img=5',
    tourTaken: 'Classic Cultural Triangle Explorer',
  },
  {
    id: '4',
    name: 'Claire Beaumont',
    country: 'France',
    rating: 5,
    text: "As a solo female traveler, safety was my biggest concern. From the first WhatsApp message to airport departure, I felt completely safe and cared for. The tailor-made process was fantastic — they listened to exactly what I wanted and delivered something even better.",
    platform: 'Google',
    avatar: 'https://i.pravatar.cc/80?img=9',
    tourTaken: 'Misty Hills & Scenic Rails',
  },
  {
    id: '5',
    name: 'Robert & Anna Kowalski',
    country: 'Australia',
    rating: 5,
    text: "Our Grand Sri Lanka Odyssey was truly the journey of a lifetime. 15 days, every single day magical. The hot air balloon over Sigiriya at sunrise was indescribable. Trincomalee's beaches were unexpectedly stunning — a hidden gem. 10/10 without question.",
    platform: 'TripAdvisor',
    avatar: 'https://i.pravatar.cc/80?img=11',
    tourTaken: 'Grand Sri Lanka Odyssey',
  },
  {
    id: '6',
    name: 'Yuki Tanaka',
    country: 'Japan',
    rating: 5,
    text: "Professional, punctual, and passionate about Sri Lanka. Our guide was a walking encyclopedia of history, nature, and culture. The Ayurveda retreat in Bentota was life-changing. The website made it so easy to plan — and the actual trip was even better than the photos suggested!",
    platform: 'Google',
    avatar: 'https://i.pravatar.cc/80?img=15',
    tourTaken: 'Southern Bliss — Beach & Wellness',
  },
]

export const stats: Stat[] = [
  { value: '500+', label: 'Happy Travelers', icon: 'Users' },
  { value: '100%', label: 'Tailor-Made', icon: 'Heart' },
  { value: '15+', label: 'Years Experience', icon: 'Award' },
  { value: '24/7', label: 'Chauffeur Support', icon: 'Clock' },
]
