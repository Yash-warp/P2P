import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../data/mockStore.js';

let products = [...INITIAL_PRODUCTS];

export const getListings = (req, res) => {
  const { category, search, minPrice, maxPrice, location, sort } = req.query;
  let results = [...products];

  if (category && category !== 'all') {
    results = results.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q)
    );
  }

  if (minPrice) {
    results = results.filter(p => p.pricePerDay >= Number(minPrice));
  }

  if (maxPrice) {
    results = results.filter(p => p.pricePerDay <= Number(maxPrice));
  }

  if (location) {
    const loc = location.toLowerCase();
    results = results.filter(p => p.location.toLowerCase().includes(loc));
  }

  if (sort === 'price-low') {
    results.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (sort === 'price-high') {
    results.sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'distance') {
    results.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
};

export const getListingById = (req, res) => {
  const item = products.find(p => p.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Listing not found' });
  }
  res.json({ success: true, data: item });
};

export const createListing = (req, res) => {
  const { title, category, pricePerDay, securityDeposit, replacementValue, location, description, features, images } = req.body;

  if (!title || !category || !pricePerDay) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide title, category, and pricePerDay' 
    });
  }

  const categoryObj = INITIAL_CATEGORIES.find(c => c.id === category) || { name: category };

  const newListing = {
    id: `prod-${Date.now()}`,
    title,
    category,
    categoryLabel: categoryObj.name,
    pricePerDay: Number(pricePerDay),
    securityDeposit: Number(securityDeposit) || Number(pricePerDay) * 2,
    replacementValue: Number(replacementValue) || Number(pricePerDay) * 25,
    distanceKm: 1.0,
    location: location || 'Indiranagar, Bangalore',
    rating: 5.0,
    reviewsCount: 0,
    image: (images && images.length > 0) ? images[0] : 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    images: images || ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    owner: {
      id: 'usr-current',
      name: 'Yash Sharma',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      verified: true,
      digiLockerVerified: true,
      rating: 5.0,
      completedRentals: 0,
      responseTime: '< 5 mins',
      memberSince: 'Just now'
    },
    description: description || 'High quality equipment in mint condition.',
    features: Array.isArray(features) ? features : (features ? [features] : ['Inspected & verified condition']),
    badge: 'New',
    available: true,
    minRentalDays: 1,
    createdAt: new Date().toISOString()
  };

  products.unshift(newListing);

  res.status(201).json({
    success: true,
    message: 'Listing published successfully!',
    data: newListing
  });
};

export const updateListing = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Listing not found' });
  }

  products[index] = {
    ...products[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json({
    success: true,
    message: 'Listing updated successfully',
    data: products[index]
  });
};

export const deleteListing = (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Listing not found' });
  }

  const deleted = products.splice(index, 1);
  res.json({
    success: true,
    message: 'Listing removed successfully',
    data: deleted[0]
  });
};

export const getCategories = (req, res) => {
  const categoriesWithLiveCounts = INITIAL_CATEGORIES.map(cat => ({
    ...cat,
    count: products.filter(p => p.category === cat.id).length
  }));

  res.json({
    success: true,
    data: categoriesWithLiveCounts
  });
};

