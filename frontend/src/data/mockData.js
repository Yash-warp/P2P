export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Gear', icon: 'Sparkles', count: 48 },
  { id: 'cameras', name: 'Cameras', icon: 'Camera', count: 14, tag: 'Popular' },
  { id: 'drones', name: 'Drones', icon: 'Plane', count: 8, tag: 'High Demand' },
  { id: 'tools', name: 'Tools', icon: 'Wrench', count: 12, tag: 'Trending' },
  { id: 'camping', name: 'Camping', icon: 'Tent', count: 9, tag: 'Weekend' },
  { id: 'bikes', name: 'Bikes', icon: 'Bike', count: 7, tag: 'Eco' },
  { id: 'audio', name: 'Audio', icon: 'Headphones', count: 6, tag: 'Studio' },
  { id: 'gaming', name: 'VR & Gaming', icon: 'Gamepad2', count: 5, tag: 'Hot' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Sony Alpha a7 III Mirrorless Camera',
    category: 'cameras',
    brand: 'Sony',
    condition: 'Like New',
    pricePerDay: 850,
    securityDeposit: 5000,
    minRentalDays: 1,
    location: 'Indiranagar, Bangalore',
    distance: 1.2,
    rating: 4.9,
    reviewCount: 42,
    rentalsCompleted: 56,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: true,
    isSuperhost: true,
    owner: {
      id: 'owner-1',
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      responseRate: '100%',
      responseTime: 'Under 15 mins',
      joinedDate: 'Jan 2024',
      verifiedId: true,
      totalRentals: 64,
      bio: 'Professional freelance photographer in Indiranagar. Happy to share my backup gear with fellow creators!'
    },
    description: 'The industry-standard full-frame hybrid mirrorless camera. Outstanding 24.2MP resolution, 4K HDR video, and 5-axis optical image stabilization. Comes with Sony 28-70mm f/3.5-5.6 OSS lens and dual batteries.',
    specs: [
      { label: 'Sensor', value: '24.2 MP Full-Frame Exmor R CMOS' },
      { label: 'Video', value: '4K HDR 30p, Full HD 120p' },
      { label: 'ISO Range', value: '100 - 51,200 (Exp 204,800)' },
      { label: 'Stabilization', value: '5-Axis In-Body Stabilization' },
      { label: 'Mount', value: 'Sony E-Mount' }
    ],
    included: [
      'Sony A7 III Body + 28-70mm Lens',
      '2x NP-FZ100 Rechargeable Batteries',
      'Dual Bay USB-C Quick Charger',
      '128GB SanDisk Extreme PRO V30 SD Card',
      'Padded Lowepro Shoulder Bag'
    ],
    rules: [
      'Original Govt ID (Aadhaar/Driving License) required at pickup',
      'Return with clean lens optics & fully charged batteries',
      'No rain/water exposure without waterproof housing',
      'Late returns incur ₹150/hour fee'
    ]
  },
  {
    id: 'prod-2',
    title: 'DJI Mini 3 Pro Drone with Smart RC Controller',
    category: 'drones',
    brand: 'DJI',
    condition: 'Like New',
    pricePerDay: 1199,
    securityDeposit: 6000,
    minRentalDays: 1,
    location: 'HSR Layout, Bangalore',
    distance: 0.8,
    rating: 5.0,
    reviewCount: 38,
    rentalsCompleted: 49,
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: true,
    isSuperhost: true,
    owner: {
      id: 'owner-2',
      name: 'Arjun Verma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5.0,
      responseRate: '98%',
      responseTime: 'Under 10 mins',
      joinedDate: 'Mar 2024',
      verifiedId: true,
      totalRentals: 49,
      bio: 'Licensed drone pilot and tech enthusiast. I maintain all my equipment in pristine condition.'
    },
    description: 'Under 249g lightweight travel drone equipped with 4K/60fps video, true vertical shooting for Instagram/TikTok reels, tri-directional obstacle sensing, and up to 34 minutes flight time per battery.',
    specs: [
      { label: 'Weight', value: '249g (No DGCA license required for recreation)' },
      { label: 'Video', value: '4K HDR at 60fps, 1080p at 120fps slow-mo' },
      { label: 'Max Flight Time', value: '34 mins per battery' },
      { label: 'Max Range', value: '12 km with DJI O3 Transmission' },
      { label: 'Obstacle Sensing', value: 'Forward, Backward & Downward' }
    ],
    included: [
      'DJI Mini 3 Pro Drone',
      'DJI RC Controller with built-in FHD 5.5" screen',
      '3x Intelligent Flight Batteries (Fly More Plus)',
      'Two-Way Charging Hub',
      'Spare Propellers & Screwdriver',
      'Waterproof Hard Case + ND Filter Set (ND16, ND64, ND256)'
    ],
    rules: [
      'Fly responsibly adhering to local DGCA red/yellow zone restrictions',
      'No flying in heavy wind (>25 km/h) or rainfall',
      'Return with all 3 batteries recharged',
      'Security deposit refundable instantly upon drone inspection'
    ]
  },
  {
    id: 'prod-3',
    title: 'Bosch Professional 800W Rotary Hammer Drill Kit',
    category: 'tools',
    brand: 'Bosch',
    condition: 'Excellent',
    pricePerDay: 299,
    securityDeposit: 1500,
    minRentalDays: 1,
    location: 'Koramangala, Bangalore',
    distance: 0.6,
    rating: 4.8,
    reviewCount: 31,
    rentalsCompleted: 44,
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: false,
    isSuperhost: false,
    owner: {
      id: 'owner-3',
      name: 'Sneha Nair',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      rating: 4.88,
      responseRate: '95%',
      responseTime: 'Under 30 mins',
      joinedDate: 'Jun 2024',
      verifiedId: true,
      totalRentals: 38,
      bio: 'Interior designer & DIY creator in Koramangala 4th block.'
    },
    description: 'Powerful 800W Bosch hammer drill capable of effortlessly drilling through concrete walls, brick, wood, and metal. Includes SDS-Plus chuck and high-grade masonry drill bit set.',
    specs: [
      { label: 'Power', value: '800 W Heavy Duty Motor' },
      { label: 'Impact Energy', value: '2.7 Joules' },
      { label: 'Max Drilling Concrete', value: '26 mm' },
      { label: 'Weight', value: '2.8 kg' }
    ],
    included: [
      'Bosch GBH 2-26 DRE Rotary Hammer',
      'Auxiliary Handle with Depth Gauge',
      '6-Piece SDS-Plus Masonry Bit Set (6mm - 16mm)',
      'Keyless Chuck Adapter for Wood/Metal bits',
      'Heavy Duty Bosch Carrying Case'
    ],
    rules: [
      'Wear safety goggles and ear protection provided in the kit',
      'Do not force the tool beyond specified materials',
      'Clean off wall dust before returning'
    ]
  },
  {
    id: 'prod-4',
    title: 'Coleman 4-Person Instant Cabin Tent with Rainfly',
    category: 'camping',
    brand: 'Coleman',
    condition: 'Like New',
    pricePerDay: 350,
    securityDeposit: 2000,
    minRentalDays: 1,
    location: 'Indiranagar, Bangalore',
    distance: 2.1,
    rating: 4.9,
    reviewCount: 29,
    rentalsCompleted: 35,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: true,
    isSuperhost: true,
    owner: {
      id: 'owner-4',
      name: 'Priya Desai',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 4.95,
      responseRate: '100%',
      responseTime: 'Under 10 mins',
      joinedDate: 'Feb 2024',
      verifiedId: true,
      totalRentals: 42,
      bio: 'Avid weekend camper and western ghats trekker. Clean, well-aired gear guaranteed!'
    },
    description: 'Sets up in literally 60 seconds with pre-attached poles. WeatherTec system with patented welded floors and inverted seams keeps you completely dry even during heavy Western Ghats monsoon showers.',
    specs: [
      { label: 'Capacity', value: '4 Persons (Fits 1 Queen Airbed)' },
      { label: 'Setup Time', value: '1 Minute Instant Setup' },
      { label: 'Dimensions', value: '8 x 7 ft with 4 ft 11 in center height' },
      { label: 'Weather Proofing', value: 'WeatherTec 1500mm Hydrostatic' }
    ],
    included: [
      'Coleman 4-Person Instant Tent',
      'Heavy Duty Waterproof Rainfly',
      'Ground Tarp & 12 Steel Stakes + Guy Lines',
      'Carrying Bag with Expandable Gusset',
      'Rechargeable Camping Lantern (Bonus)'
    ],
    rules: [
      'Please dry tent thoroughly before packing to prevent mold',
      'No open flames or smoking inside tent',
      'Shake out all dirt/grass before returning'
    ]
  },
  {
    id: 'prod-5',
    title: 'Yamaha FG800 Solid Top Acoustic Guitar',
    category: 'audio',
    brand: 'Yamaha',
    condition: 'Excellent',
    pricePerDay: 250,
    securityDeposit: 1500,
    minRentalDays: 1,
    location: 'Jayanagar, Bangalore',
    distance: 1.5,
    rating: 4.7,
    reviewCount: 19,
    rentalsCompleted: 24,
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: true,
    isSuperhost: false,
    owner: {
      id: 'owner-5',
      name: 'Sameer Varma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 4.8,
      responseRate: '92%',
      responseTime: 'Under 1 hour',
      joinedDate: 'May 2024',
      verifiedId: true,
      totalRentals: 26,
      bio: 'Guitarist and sound engineer in Jayanagar. All guitars re-strung with D\'Addario strings.'
    },
    description: 'Yamaha\'s standard acoustic model with authentic tone and outstanding playability. Features a solid spruce top with scalloped bracing for rich low-to-mid range warmth.',
    specs: [
      { label: 'Top Material', value: 'Solid Sitka Spruce' },
      { label: 'Back & Sides', value: 'Nato / Okume' },
      { label: 'Fingerboard', value: 'Rosewood / Walnut' },
      { label: 'Strings', value: 'D\'Addario EXP16 Coated Light' }
    ],
    included: [
      'Yamaha FG800 Acoustic Guitar',
      'Padded Yamaha Gig Bag with backpack straps',
      'Snark Clip-on Digital Tuner',
      'Guitar Capo & 5 Dunlop Picks',
      'Guitar Strap'
    ],
    rules: [
      'Always store in gig bag when not in use',
      'Do not expose to direct harsh sunlight or extreme humidity changes'
    ]
  },
  {
    id: 'prod-6',
    title: 'Trek Marlin 7 Mountain Bike (21-Speed, Large Frame)',
    category: 'bikes',
    brand: 'Trek',
    condition: 'Excellent',
    pricePerDay: 400,
    securityDeposit: 3000,
    minRentalDays: 1,
    location: 'Bellandur, Bangalore',
    distance: 0.9,
    rating: 4.8,
    reviewCount: 35,
    rentalsCompleted: 51,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: false,
    isSuperhost: true,
    owner: {
      id: 'owner-6',
      name: 'Neha Gupta',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.9,
      responseRate: '96%',
      responseTime: 'Under 20 mins',
      joinedDate: 'Apr 2024',
      verifiedId: true,
      totalRentals: 52,
      bio: 'Cyclist and marathoner. Love helping neighbors explore Bangalore on two wheels!'
    },
    description: 'Race-worthy mountain bike built around lightweight Alpha Silver Aluminum frame with RockShox suspension fork and Shimano Deore 1x10 drivetrain with hydraulic disc brakes.',
    specs: [
      { label: 'Frame', value: 'Alpha Silver Aluminum' },
      { label: 'Suspension', value: 'RockShox Judy, lockout, 100mm travel' },
      { label: 'Brakes', value: 'Shimano MT200 Hydraulic Disc' },
      { label: 'Tires', value: 'Bontrager XR2 Comp, 29 x 2.20' }
    ],
    included: [
      'Trek Marlin 7 MTB (Serviced monthly)',
      'Decathlon B\'Twin Cycling Helmet',
      'High-Security Combination Cable Lock',
      'Mini Frame Pump & Water Bottle Cage',
      'USB Rechargeable Front 400 Lumens & Rear Safety Lights'
    ],
    rules: [
      'Always lock bike securely when unattended',
      'Helmet mandatory during ride',
      'Wash off heavy trail mud before return'
    ]
  },
  {
    id: 'prod-7',
    title: 'Sony FX3 Cinema Line Full-Frame Camera Rig',
    category: 'cameras',
    brand: 'Sony',
    condition: 'Like New',
    pricePerDay: 2499,
    securityDeposit: 15000,
    minRentalDays: 1,
    location: 'Koramangala, Bangalore',
    distance: 1.8,
    rating: 5.0,
    reviewCount: 26,
    rentalsCompleted: 31,
    images: [
      'https://images.unsplash.com/photo-1589872766859-269229691799?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: false,
    isSuperhost: true,
    owner: {
      id: 'owner-1',
      name: 'Rahul Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 4.96,
      responseRate: '100%',
      responseTime: 'Under 15 mins',
      joinedDate: 'Jan 2024',
      verifiedId: true,
      totalRentals: 64,
      bio: 'Professional freelance photographer & videographer in Indiranagar.'
    },
    description: 'Netflix-approved Cinema Line camera designed for solo creators. 12.1MP Full-Frame back-illuminated sensor, 4K 120p recording, S-Cinetone color science, and top handle with dual XLR audio inputs.',
    specs: [
      { label: 'Sensor', value: '12.1MP Full-Frame Exmor R CMOS' },
      { label: 'Video', value: '4K up to 120p, 10-bit 4:2:2 All-Intra' },
      { label: 'Audio', value: 'XLR Handle Unit with 4-channel audio' },
      { label: 'Dynamic Range', value: '15+ stops with S-Log3' }
    ],
    included: [
      'Sony FX3 Body + XLR Top Audio Handle',
      'Sony FE 24-70mm f/2.8 GM II Lens',
      'SmallRig Cage with HDMI Cable Clamp',
      '3x Sony Z-Batteries + Quad Rapid Charger',
      '160GB CFexpress Type A Tough Card + Card Reader'
    ],
    rules: [
      'Commercial shoot ID and address verification mandatory',
      'Handled by experienced videographers only',
      'Full item inspection before & after rental'
    ]
  },
  {
    id: 'prod-8',
    title: 'Apple Vision Pro Spatial Computer (512GB)',
    category: 'gaming',
    brand: 'Apple',
    condition: 'Like New',
    pricePerDay: 1800,
    securityDeposit: 12000,
    minRentalDays: 1,
    location: 'Indiranagar, Bangalore',
    distance: 2.5,
    rating: 4.9,
    reviewCount: 15,
    rentalsCompleted: 18,
    images: [
      'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=1000&q=80'
    ],
    isAvailable: true,
    isInstantBook: true,
    isSuperhost: true,
    owner: {
      id: 'owner-7',
      name: 'Aditya Sen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 4.94,
      responseRate: '100%',
      responseTime: 'Under 15 mins',
      joinedDate: 'Feb 2024',
      verifiedId: true,
      totalRentals: 21,
      bio: 'AR/VR developer in Bangalore. Renting out for developers, demos, and curious tech fans!'
    },
    description: 'Experience revolutionary spatial computing with micro-OLED displays delivering 23 million pixels per eye, intuitive eye & hand tracking, and 3D spatial audio.',
    specs: [
      { label: 'Display', value: '23M Pixels Dual 4K Micro-OLED' },
      { label: 'Chipset', value: 'Apple M2 + R1 Spatial Real-Time Chip' },
      { label: 'Tracking', value: 'Precision Eye & Finger Tracking' },
      { label: 'Storage', value: '512 GB' }
    ],
    included: [
      'Apple Vision Pro with Solo Knit & Dual Loop Bands',
      'Light Seal (Size 21W) + 2x Cushion pads',
      'External Battery Pack + USB-C 30W Power Adapter',
      'Protective Front Glass Cover + Hard Travel Case'
    ],
    rules: [
      'Guest Mode will be pre-configured for your Apple ID',
      'No physical modifications or dropping',
      'Indoor use only in clean environments'
    ]
  }
];

export const LIVE_ACTIVITY_STREAM = [
  { id: 1, user: 'Rahul S.', location: 'Koramangala', action: 'rented', item: 'Sony Alpha a7 III Mirrorless Camera', time: '2m ago', icon: 'Camera' },
  { id: 2, user: 'Ananya M.', location: 'Indiranagar', action: 'earned ₹2,400 with', item: 'Coleman 4-Person Camping Tent', time: '5m ago', icon: 'IndianRupee' },
  { id: 3, user: 'Vikram P.', location: 'HSR Layout', action: 'listed new gear', item: 'DJI Mini 3 Pro Drone', time: '8m ago', icon: 'PlusCircle' },
  { id: 4, user: 'Rohit K.', location: 'Whitefield', action: 'rented', item: 'Bosch Professional Power Drill', time: '12m ago', icon: 'Wrench' },
  { id: 5, user: 'Neha G.', location: 'Bellandur', action: 'earned ₹3,200 with', item: 'Trek 21-Speed Mountain Bike', time: '18m ago', icon: 'IndianRupee' },
  { id: 6, user: 'Sameer V.', location: 'Jayanagar', action: 'rented', item: 'Yamaha Solid Top Acoustic Guitar', time: '24m ago', icon: 'Music' },
  { id: 7, user: 'Devika R.', location: 'Indiranagar', action: 'earned ₹7,500 with', item: 'Sony FX3 Cinema Rig', time: '35m ago', icon: 'IndianRupee' },
  { id: 8, user: 'Kunal B.', location: 'Sadashivanagar', action: 'listed new gear', item: 'Rode Wireless GO II Dual Kit', time: '42m ago', icon: 'PlusCircle' },
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Rahul Sharma',
    role: 'Lender & Freelance Videographer',
    location: 'Koramangala, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    item: 'Sony FX3 & A7 III',
    rating: 5,
    earnings: '₹48,500 earned',
    quote: "I've made over ₹48,000 in 3 months just renting out my photography backup body when I'm not shooting on weekdays. The QR handover and verified borrower profiles make it completely stress-free."
  },
  {
    id: 't-2',
    name: 'Priya Desai',
    role: 'Renter & Weekend Trekker',
    location: 'Indiranagar, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    item: 'Camping Tent & Trekking Gear',
    rating: 5,
    earnings: 'Saved ₹14,000',
    quote: "Rented high-end camping equipment for our 3-day Coorg trip from a neighbor just 400 meters away. Saved ₹14,000 compared to buying new gear that would otherwise sit in my closet forever."
  },
  {
    id: 't-3',
    name: 'Arjun Verma',
    role: 'Lender & Tech Enthusiast',
    location: 'HSR Layout, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    item: 'DJI Mini 3 Pro Drone',
    rating: 5,
    earnings: '₹32,000 earned',
    quote: "Lendit's security deposit escrow gave me the confidence to rent out my drone. Borrowers treat the gear with immense respect, and customer support was instant when I had a question."
  }
];

export const TRUST_FEATURES = [
  {
    icon: 'ShieldCheck',
    title: '100% ID Verified Neighbors',
    badge: 'Govt DigiLocker Verified',
    description: 'Every renter and lender is verified with official government IDs, phone numbers, and neighborhood address checks before booking.'
  },
  {
    icon: 'Lock',
    title: 'Secure Escrow Protection',
    badge: 'Zero Risk Payments',
    description: 'Security deposits and rental payments are held safely in escrow. Deposits are released back to the renter as soon as the item is returned in sound condition.'
  },
  {
    icon: 'QrCode',
    title: 'QR Code Safe Handover',
    badge: 'Digital Proof of Handover',
    description: 'Lenders and renters scan an in-app encrypted QR code during meetups to timestamp item condition and instantly activate insurance protection.'
  },
  {
    icon: 'MapPin',
    title: 'Hyperlocal Neighborhoods',
    badge: 'Within 1-5 km',
    description: 'Find items within walking or short driving distance. Coordinate handovers conveniently without expensive shipping or days of waiting.'
  }
];

