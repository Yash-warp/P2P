export const getActivityFeed = (req, res) => {
  const events = [
    { id: 1, type: 'rental', user: 'Ananya S.', item: 'Sony A7 IV', location: 'Indiranagar', time: '4m ago', icon: '📸' },
    { id: 2, type: 'listing', user: 'Vikram R.', item: 'DeWalt 20V Drill', location: 'Koramangala', time: '11m ago', icon: '🛠️' },
    { id: 3, type: 'payout', user: 'Karthik P.', amount: '₹3,600', location: 'HSR Layout', time: '19m ago', icon: '💰' },
    { id: 4, type: 'rental', user: 'Pooja H.', item: 'Quechua 4-Person Tent', location: 'Whitefield', time: '32m ago', icon: '⛺' },
    { id: 5, type: 'listing', user: 'Rohan M.', item: 'DJI Mini 4 Pro Drone', location: 'Jayanagar', time: '45m ago', icon: '🚁' },
    { id: 6, type: 'rental', user: 'Tanvi K.', item: 'Trek FX 3 Hybrid Bike', location: 'Bandra West', time: '1h ago', icon: '🚲' }
  ];

  res.json({
    success: true,
    data: events
  });
};

