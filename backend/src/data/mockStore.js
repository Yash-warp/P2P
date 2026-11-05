export const INITIAL_CATEGORIES = [
  { id: 'cameras', name: 'Cameras & Lenses', icon: '📷', count: 18, color: '#30105E' },
  { id: 'tools', name: 'Power Tools', icon: '🛠️', count: 14, color: '#7C3AED' },
  { id: 'camping', name: 'Camping & Outdoors', icon: '⛺', count: 12, color: '#C4B5FD' },
  { id: 'bikes', name: 'Bikes & Mobility', icon: '🚲', count: 9, color: '#E9D5FF' },
  { id: 'drones', name: 'Drones & Action Cams', icon: '🚁', count: 8, color: '#30105E' },
  { id: 'audio', name: 'Audio & DJ Gear', icon: '🎧', count: 11, color: '#7C3AED' }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Sony Alpha A7 IV + 24-70mm f/2.8 GM Lens',
    category: 'cameras',
    categoryLabel: 'Cameras & Lenses',
    pricePerDay: 1800,
    replacementValue: 240000,
    securityDeposit: 5000,
    distanceKm: 0.8,
    location: 'Indiranagar, Bangalore',
    rating: 4.95,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'owner-1',
      name: 'Aditya Rao',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 4.98,
      completedRentals: 47,
      responseTime: '< 10 mins',
      memberSince: 'Mar 2023'
    },
    description: 'Flagship full-frame hybrid mirrorless camera paired with the ultra-sharp G Master 24-70mm zoom lens. Ideal for commercial shoots, events, cinematic videos, and portraits. Includes 2 high-capacity batteries, 128GB Pro V90 SD card, dual charger, and peak design strap.',
    features: ['33MP Full-Frame Exmor R CMOS Sensor', '4K 60p 10-bit 4:2:2 video', 'Real-time Eye AF for humans/animals', '7K oversampling', 'Includes 2x 128GB V90 memory cards'],
    badge: 'Popular',
    available: true,
    minRentalDays: 1
  },
  {
    id: 'prod-2',
    title: 'DJI Mini 4 Pro Drone + Fly More Combo',
    category: 'drones',
    categoryLabel: 'Drones & Action Cams',
    pricePerDay: 2200,
    replacementValue: 110000,
    securityDeposit: 6000,
    distanceKm: 1.2,
    location: 'Koramangala, Bangalore',
    rating: 4.9,
    reviewsCount: 24,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'owner-2',
      name: 'Rohan Sharma',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 4.89,
      completedRentals: 31,
      responseTime: '< 15 mins',
      memberSince: 'Jan 2023'
    },
    description: 'Under 249g ultra-portable drone with omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and 20km FHD video transmission. Comes with RC 2 screen remote, 3 intelligent flight batteries (over 90 mins total flight time), and ND filter kit.',
    features: ['< 249g weight (no DGCA registration needed for non-commercial)', '4K/60fps HDR True Vertical Shooting', 'Omnidirectional Obstacle Sensing', '3 Flight Batteries + Multi-charger', 'ND Filter set included (ND16/64/256)'],
    badge: 'Trending',
    available: true,
    minRentalDays: 1
  },
  {
    id: 'prod-3',
    title: 'DeWalt 20V Max XR Brushless Hammer Drill & Impact Driver Kit',
    category: 'tools',
    categoryLabel: 'Power Tools',
    pricePerDay: 450,
    replacementValue: 28000,
    securityDeposit: 1500,
    distanceKm: 0.5,
    location: 'HSR Layout, Bangalore',
    rating: 4.88,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'owner-3',
      name: 'Karthik Pillai',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 4.95,
      completedRentals: 63,
      responseTime: '< 5 mins',
      memberSince: 'Nov 2022'
    },
    description: 'High-torque industrial grade brushless hammer drill and 1/4" impact driver set. Perfect for home DIY renovations, mounting heavy TV brackets, woodworking, or masonry drilling. Includes 2x 4.0Ah XR batteries, fast charger, masonry/wood drill bit organizer.',
    features: ['Brushless motor produces up to 57% more run time', '3-mode LED light for dark workspaces', 'Complete 30-piece drill and screwdriver bits included', 'Heavy-duty rugged TSTAK carrying case'],
    badge: 'Superhost',
    available: true,
    minRentalDays: 1
  },
  {
    id: 'prod-4',
    title: 'Quechua Arpenaz 4.1 Family Camping Tent (4 Person)',
    category: 'camping',
    categoryLabel: 'Camping & Outdoors',
    pricePerDay: 650,
    replacementValue: 18000,
    securityDeposit: 2000,
    distanceKm: 2.1,
    location: 'Indiranagar, Bangalore',
    rating: 4.82,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'owner-4',
      name: 'Pooja Hegde',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 4.91,
      completedRentals: 28,
      responseTime: '< 20 mins',
      memberSince: 'Feb 2023'
    },
    description: 'Spacious 4-person tent with pre-assembled bedroom and high stand-up living room (1.9m height). Completely waterproof, wind resistant up to 50 km/h, and includes UPF 30 sun protection. Comes with ground tarp, stakes, and high-flow air pump.',
    features: ['5 sqm stand-up living area with groundsheet', 'Resists tropical rainstorms (2000mm rating)', 'Fresh & Black fabric maintains cool interior in daytime', 'Compact carrying bag (10 kg)'],
    badge: 'Popular',
    available: true,
    minRentalDays: 2
  },
  {
    id: 'prod-5',
    title: 'Trek FX 3 Disc Hybrid City / Touring Bicycle',
    category: 'bikes',
    categoryLabel: 'Bikes & Mobility',
    pricePerDay: 550,
    replacementValue: 65000,
    securityDeposit: 3000,
    distanceKm: 1.5,
    location: 'Koramangala, Bangalore',
    rating: 4.92,
    reviewsCount: 27,
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'owner-5',
      name: 'Vikram Sundaram',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 4.87,
      completedRentals: 35,
      responseTime: '< 10 mins',
      memberSince: 'Dec 2022'
    },
    description: 'Lightweight Alpha Gold Aluminum frame with carbon fiber fork and hydraulic disc brakes for supreme all-weather stopping power. Includes high-security U-lock, smartphone mount, front/rear rechargeable LED lights, and lightweight helmet.',
    features: ['Shimano Deore 1x10 drivetrain', 'Tubeless-ready puncture resistant tires', 'IsoZone handlebar vibration damper', 'Includes helmet, lock & high-pressure mini pump'],
    badge: 'Verified',
    available: true,
    minRentalDays: 1
  },
  {
    id: 'prod-6',
    title: 'JBL PartyBox 310 Portable Bluetooth Speaker (240W)',
    category: 'audio',
    categoryLabel: 'Audio & DJ Gear',
    pricePerDay: 1200,
    replacementValue: 42000,
    securityDeposit: 4000,
    distanceKm: 3.0,
    location: 'Whitefield, Bangalore',
    rating: 4.96,
    reviewsCount: 51,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
    ],
    owner: {
      id: 'owner-6',
      name: 'Naveen Kumar',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 4.99,
      completedRentals: 72,
      responseTime: '< 5 mins',
      memberSince: 'Aug 2022'
    },
    description: 'Huge 240-watt JBL Pro Sound with synchronized dazzling dynamic light show. Features built-in wheels and telescopic handle for effortless roll-away portability. Up to 18 hours of battery life with dual mic and guitar inputs for karaoke & outdoor events.',
    features: ['240 Watts RMS output with Bass Boost', 'Built-in wheels and suitcase handle', 'IPX4 splashproof protection for poolside events', 'Includes 2 wireless UHF karaoke microphones'],
    badge: 'Popular',
    available: true,
    minRentalDays: 1
  }
];

export const INITIAL_RENTALS = [
  {
    id: 'rent-101',
    productId: 'prod-1',
    productTitle: 'Sony Alpha A7 IV + 24-70mm f/2.8 GM Lens',
    productImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-11-10',
    endDate: '2026-11-13',
    days: 3,
    dailyPrice: 1800,
    totalRent: 5400,
    securityDeposit: 5000,
    totalPaid: 10400,
    status: 'in_progress',
    statusLabel: 'Active Rental',
    owner: { name: 'Aditya Rao', phone: '+91 98450 12345' },
    renter: { name: 'Yash Sharma', phone: '+91 99887 66554' },
    meetupLocation: 'Indiranagar 100ft Road Metro, Bangalore',
    handoverVerified: true,
    pickupCode: 'RC-8291'
  },
  {
    id: 'rent-102',
    productId: 'prod-3',
    productTitle: 'DeWalt 20V Max XR Brushless Hammer Drill',
    productImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    startDate: '2026-10-15',
    endDate: '2026-10-17',
    days: 2,
    dailyPrice: 450,
    totalRent: 900,
    securityDeposit: 1500,
    totalPaid: 2400,
    status: 'completed',
    statusLabel: 'Completed',
    owner: { name: 'Karthik Pillai', phone: '+91 97410 54321' },
    renter: { name: 'Yash Sharma', phone: '+91 99887 66554' },
    meetupLocation: 'HSR BDA Complex, Bangalore',
    handoverVerified: true,
    pickupCode: 'RC-4412'
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    recipient: {
      name: 'Aditya Rao',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      itemTitle: 'Sony Alpha A7 IV',
      verified: true
    },
    unread: true,
    lastMessage: 'Sure! I can meet you at the Indiranagar Metro Station at 10 AM.',
    lastTimestamp: '10:45 AM',
    messages: [
      { id: 'm1', sender: 'me', text: 'Hi Aditya, is the Sony A7 IV available this coming weekend for 3 days?', timestamp: '10:30 AM' },
      { id: 'm2', sender: 'them', text: 'Hi Yash! Yes it is fully available. The kit includes 2 batteries and 128GB high-speed card.', timestamp: '10:38 AM' },
      { id: 'm3', sender: 'me', text: 'Awesome, can we coordinate the pickup location around Indiranagar?', timestamp: '10:40 AM' },
      { id: 'm4', sender: 'them', text: 'Sure! I can meet you at the Indiranagar Metro Station at 10 AM.', timestamp: '10:45 AM' }
    ]
  }
];

export const INITIAL_USER = {
  id: 'usr-current',
  name: 'Yash Sharma',
  email: 'yash@lendit.community',
  phone: '+91 98765 43210',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  location: 'Indiranagar, Bangalore',
  verified: true,
  digiLockerVerified: true,
  rating: 4.96,
  reviewsCount: 14,
  totalEarnings: 28400,
  activeListingsCount: 3,
  completedRentalsCount: 18,
  savedWishlistCount: 5,
  memberSince: 'January 2023'
};

