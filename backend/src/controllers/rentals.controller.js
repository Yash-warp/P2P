import { INITIAL_RENTALS } from '../data/mockStore.js';

let rentals = [...INITIAL_RENTALS];

export const getRentals = (req, res) => {
  const { status, role } = req.query;
  let results = [...rentals];

  if (status && status !== 'all') {
    results = results.filter(r => r.status === status);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
};

export const getRentalById = (req, res) => {
  const rental = rentals.find(r => r.id === req.params.id);
  if (!rental) {
    return res.status(404).json({ success: false, message: 'Rental request not found' });
  }
  res.json({ success: true, data: rental });
};

export const createRentalRequest = (req, res) => {
  const { 
    productId, 
    productTitle, 
    productImage, 
    startDate, 
    endDate, 
    days, 
    dailyPrice, 
    securityDeposit,
    meetupLocation,
    notes 
  } = req.body;

  if (!productId || !startDate || !endDate || !days) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide productId, startDate, endDate, and rental days' 
    });
  }

  const calculatedRent = Number(dailyPrice) * Number(days);
  const deposit = Number(securityDeposit) || 2000;
  const totalPaid = calculatedRent + deposit;

  const newRental = {
    id: `rent-${Date.now().toString().slice(-4)}`,
    productId,
    productTitle: productTitle || 'Rented Equipment',
    productImage: productImage || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    startDate,
    endDate,
    days: Number(days),
    dailyPrice: Number(dailyPrice),
    totalRent: calculatedRent,
    securityDeposit: deposit,
    totalPaid,
    status: 'pending',
    statusLabel: 'Pending Approval',
    owner: { name: 'Verified Lender', phone: '+91 98450 12345' },
    renter: { name: 'Yash Sharma', phone: '+91 98765 43210' },
    meetupLocation: meetupLocation || 'Neighborhood Hub / Doorstep Handover',
    handoverVerified: false,
    pickupCode: `RC-${Math.floor(1000 + Math.random() * 9000)}`,
    notes: notes || '',
    createdAt: new Date().toISOString()
  };

  rentals.unshift(newRental);

  res.status(201).json({
    success: true,
    message: 'Rental booking request sent to owner!',
    data: newRental
  });
};

export const updateRentalStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const rental = rentals.find(r => r.id === id);
  if (!rental) {
    return res.status(404).json({ success: false, message: 'Rental request not found' });
  }

  const validStatuses = {
    'pending': 'Pending Approval',
    'accepted': 'Accepted & Awaiting Pickup',
    'in_progress': 'Active Rental',
    'completed': 'Completed & Deposit Refunded',
    'cancelled': 'Cancelled'
  };

  if (!validStatuses[status]) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid status. Valid statuses: ${Object.keys(validStatuses).join(', ')}` 
    });
  }

  rental.status = status;
  rental.statusLabel = validStatuses[status];
  rental.updatedAt = new Date().toISOString();

  res.json({
    success: true,
    message: `Rental status updated to ${rental.statusLabel}`,
    data: rental
  });
};

