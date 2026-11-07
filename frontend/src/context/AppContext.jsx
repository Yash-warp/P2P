
import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, LIVE_ACTIVITY_STREAM } from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation / View State
  const [activeView, setActiveView] = useState('home');
  const [selectedLandingRole, setSelectedLandingRole] = useState(null);

  // Landing page role selection
  const selectLandingRole = (role) => {
    setSelectedLandingRole(role);
    setActiveView(role === 'borrower' ? 'home' : 'lender-home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [selectedProductId, setSelectedProductId] = useState('prod-1');
  const [dashboardTab, setDashboardTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentLocation, setCurrentLocation] = useState('Indiranagar, Bangalore');
  const [chatActiveThreadId, setChatActiveThreadId] = useState('conv-1');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingProduct, setBookingProduct] = useState(null);
  const [cardModalProduct, setCardModalProduct] = useState(null);
  const [toast, setToast] = useState(null);

  // User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lendit_user') || localStorage.getItem('rentic_user');

    return saved ? JSON.parse(saved) : {
      id: 'user-current',
      name: 'Yash Sharma',
      email: 'yash@example.com',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      role: 'both',
      location: 'Indiranagar, Bangalore',
      verified: true,
      digilockerVerified: true,
      memberSince: 'March 2024',
      walletBalance: 4850,
      upiId: 'yashsharma@okhdfcbank'
    };
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Helper to normalize product properties
  const normalizeProduct = (p) => {
    const primaryImg =
      (Array.isArray(p.images) && p.images[0]) ||
      p.image ||
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80';

    const allImgs =
      (Array.isArray(p.images) && p.images.length > 0)
        ? p.images
        : [primaryImg];

    const dist =
      p.distance !== undefined
        ? p.distance
        : (p.distanceKm !== undefined ? p.distanceKm : 1.2);

    const reviews =
      p.reviewCount !== undefined
        ? p.reviewCount
        : (p.reviewsCount !== undefined ? p.reviewsCount : 24);

    const ownerObj = p.owner ? {
      ...p.owner,
      verified: p.owner.verified !== undefined ? p.owner.verified : !!p.owner.verifiedId,
      verifiedId: p.owner.verifiedId !== undefined ? p.owner.verifiedId : !!p.owner.verified
    } : {
      name: 'Verified Host',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verified: true,
      verifiedId: true
    };

    return {
      ...p,
      image: primaryImg,
      images: allImgs,
      distance: dist,
      distanceKm: dist,
      reviewCount: reviews,
      reviewsCount: reviews,
      owner: ownerObj
    };
  };

  // Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('lendit_products') || localStorage.getItem('rentic_products');
    const raw = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    return raw.map(normalizeProduct);
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('lendit_wishlist') || localStorage.getItem('rentic_wishlist');
    return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
  });

  // User Rentals (As a Renter)
  const [myRentals, setMyRentals] = useState(() => {
    const saved = localStorage.getItem('lendit_my_rentals') || localStorage.getItem('rentic_my_rentals');

    return saved ? JSON.parse(saved) : [
      {
        id: 'rent-101',
        productId: 'prod-4',
        productTitle: 'Coleman 4-Person Instant Cabin Tent with Rainfly',
        productImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
        ownerName: 'Priya Desai',
        ownerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
        startDate: '2026-11-10',
        endDate: '2026-11-12',
        durationDays: 2,
        dailyRate: 350,
        totalAmount: 735,
        depositAmount: 2000,
        status: 'approved',
        handoverCode: 'RENT-7829-QC',
        handoverVerified: false,
        deliveryMethod: 'Self Pickup'
      },
      {
        id: 'rent-102',
        productId: 'prod-3',
        productTitle: 'Bosch Professional 800W Rotary Hammer Drill Kit',
        productImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=600&q=80',
        ownerName: 'Sneha Nair',
        ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        startDate: '2026-10-24',
        endDate: '2026-10-25',
        durationDays: 1,
        dailyRate: 299,
        totalAmount: 314,
        depositAmount: 1500,
        status: 'completed',
        handoverCode: 'RENT-4491-XD',
        handoverVerified: true,
        deliveryMethod: 'Self Pickup'
      }
    ];
  });

  // Rental Requests (As an Owner / Lender)
  const [rentalRequests, setRentalRequests] = useState(() => {
    const saved = localStorage.getItem('lendit_requests') || localStorage.getItem('rentic_requests');

    return saved ? JSON.parse(saved) : [
      {
        id: 'req-201',
        productId: 'prod-1',
        productTitle: 'Sony Alpha a7 III Mirrorless Camera',
        renterName: 'Rohan Mehra',
        renterAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        renterRating: 4.9,
        startDate: '2026-11-06',
        endDate: '2026-11-08',
        durationDays: 2,
        totalPayout: 1700,
        status: 'pending',
        createdAt: '1 hour ago',
        purpose: 'Weekend wedding cinematography in Indiranagar'
      }
    ];
  });

  // Messages / Chat Conversations
  const [conversations, setConversations] = useState([
    {
      id: 'conv-1',
      participantName: 'Rahul Sharma',
      participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      itemTitle: 'Sony Alpha a7 III Mirrorless Camera',
      itemPrice: 850,
      unread: false,
      messages: [
        { sender: 'them', text: 'Hi Yash! Yes, the Sony A7III is available this weekend with both batteries charged.', time: '10:24 AM' },
        { sender: 'me', text: 'Awesome! Does it also include the 28-70mm lens mentioned?', time: '10:26 AM' },
        { sender: 'them', text: 'Yes, full lens and lens hood included. You can pick it up from Indiranagar 100ft road near Toit.', time: '10:28 AM' }
      ]
    },
    {
      id: 'conv-2',
      participantName: 'Priya Desai',
      participantAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      itemTitle: 'Coleman 4-Person Instant Cabin Tent',
      itemPrice: 350,
      unread: true,
      messages: [
        { sender: 'them', text: 'Booking confirmed! I also packed 4 sleeping pads and the rechargeable lantern for your Coorg trip.', time: 'Yesterday' }
      ]
    },
    {
      id: 'conv-3',
      participantName: 'Lendit SafeEscrow Support',
      participantAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      itemTitle: 'DigiLocker Verification Verified',
      itemPrice: 0,
      unread: false,
      messages: [
        { sender: 'them', text: 'Your government DigiLocker ID verification is complete and your Superhost eligibility badge is active.', time: '3 days ago' }
      ]
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 'notif-1', title: 'Booking Approved!', desc: 'Priya accepted your booking for Coleman 4-Person Tent.', time: '2 hours ago', read: false, type: 'success' },
    { id: 'notif-2', title: 'New Rental Request', desc: 'Rohan requested your Sony A7 III for 2 days.', time: '4 hours ago', read: false, type: 'info' },
    { id: 'notif-3', title: 'Security Deposit Refunded', desc: '₹1,500 deposit for Bosch Drill released back to your bank.', time: 'Yesterday', read: true, type: 'payment' }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('lendit_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lendit_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lendit_my_rentals', JSON.stringify(myRentals));
  }, [myRentals]);

  useEffect(() => {
    localStorage.setItem('lendit_requests', JSON.stringify(rentalRequests));
  }, [rentalRequests]);

  useEffect(() => {
    localStorage.setItem('lendit_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lendit_auth', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  // Actions
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from saved wishlist', 'info');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to your wishlist!', 'success');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (view, extra = {}) => {
    setActiveView(view);

    if (extra.tab) setDashboardTab(extra.tab);
    if (extra.productId) setSelectedProductId(extra.productId);
    if (extra.category) setSelectedCategory(extra.category);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openBookingModal = (product) => {
    setBookingProduct(product);
    setIsBookingModalOpen(true);
  };

  const openProductCardModal = (product) => {
    setCardModalProduct(product);
  };

  const closeProductCardModal = () => {
    setCardModalProduct(null);
  };

  const createBooking = (bookingData) => {
    const newRental = {
      id: 'rent-' + Date.now(),
      productId: bookingProduct.id,
      productTitle: bookingProduct.title,
      productImage: bookingProduct.images[0],
      ownerName: bookingProduct.owner.name,
      ownerAvatar: bookingProduct.owner.avatar,
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      durationDays: bookingData.durationDays,
      dailyRate: bookingProduct.pricePerDay,
      totalAmount: bookingData.totalPrice,
      depositAmount: bookingProduct.securityDeposit,
      status: 'approved',
      handoverCode: 'RENT-' + Math.floor(1000 + Math.random() * 9000) + '-QR',
      handoverVerified: false,
      deliveryMethod: bookingData.deliveryMethod
    };

    setMyRentals([newRental, ...myRentals]);
    setIsBookingModalOpen(false);
    showToast(`Booking confirmed for ${bookingProduct.title}!`, 'success');
    navigateTo('dashboard', { tab: 'rentals' });
  };

  const approveRentalRequest = (requestId) => {
    setRentalRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status: 'approved' };
      }
      return req;
    }));

    showToast('Rental request approved! Renter notified.', 'success');
  };

  const declineRentalRequest = (requestId) => {
    setRentalRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status: 'declined' };
      }
      return req;
    }));

    showToast('Rental request declined.', 'info');
  };

  const addProductListing = (newProduct) => {
    const item = normalizeProduct({
      ...newProduct,
      id: 'prod-' + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      rentalsCompleted: 0,
      isAvailable: true,
      owner: {
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        rating: 5.0,
        responseRate: '100%',
        responseTime: 'Instant',
        joinedDate: 'Just now',
        verifiedId: true,
        verified: true,
        totalRentals: 0,
        bio: 'Local verified host sharing equipment with neighbors.'
      }
    });

    setProducts([item, ...products]);
    showToast(`"${item.title}" successfully published!`, 'success');
    navigateTo('marketplace');
  };

  const sendChatMessage = (threadId, text) => {
    if (!text.trim()) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === threadId) {
        const updatedMessages = [
          ...conv.messages,
          { sender: 'me', text, time: 'Just now' }
        ];

        return { ...conv, messages: updatedMessages };
      }

      return conv;
    }));

    // Simulate smart auto-reply from owner after 1.5 seconds
    setTimeout(() => {
      setConversations(prev => prev.map(conv => {
        if (conv.id === threadId) {
          const autoReplies = [
            "Sounds great! Looking forward to meeting you for the handover.",
            "Perfect. I'll have the gear ready, fully charged and packed safely.",
            "Got it! Feel free to call or ping me if you need directions to the pickup spot.",
            "Confirmed! I've set aside the accessories as well."
          ];

          const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];

          return {
            ...conv,
            messages: [
              ...conv.messages,
              { sender: 'them', text: randomReply, time: 'Just now' }
            ]
          };
        }

        return conv;
      }));
    }, 1500);
  };

  const loginDemo = (role = 'renter') => {
    setIsLoggedIn(true);

    if (role === 'lender') {
      setCurrentUser({
        id: 'user-lender',
        name: 'Rahul Sharma',
        email: 'rahul.lens@example.com',
        phone: '+91 99887 66554',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        role: 'lender',
        location: 'Indiranagar, Bangalore',
        verified: true,
        digilockerVerified: true,
        memberSince: 'January 2024',
        walletBalance: 48500,
        upiId: 'rahullens@upi'
      });
    } else {
      setCurrentUser({
        id: 'user-renter',
        name: 'Yash Sharma',
        email: 'yash@example.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        role: 'both',
        location: 'Indiranagar, Bangalore',
        verified: true,
        digilockerVerified: true,
        memberSince: 'March 2024',
        walletBalance: 4850,
        upiId: 'yashsharma@okhdfcbank'
      });
    }

    setIsAuthModalOpen(false);
    setActiveView('feed');
    showToast(`Logged in successfully as ${role === 'lender' ? 'Rahul (Lender)' : 'Yash (Renter)'}!`);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActiveView('home');
    setSelectedLandingRole(null);
    showToast('Signed out successfully.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        activeView,
        setActiveView,
        navigateTo,

        // Landing role selection
        selectedLandingRole,
        setSelectedLandingRole,
        selectLandingRole,

        selectedProductId,
        setSelectedProductId,
        navigateToProduct,
        dashboardTab,
        setDashboardTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        currentLocation,
        setCurrentLocation,
        products,
        setProducts,
        wishlist,
        toggleWishlist,
        isWishlisted,
        myRentals,
        rentalRequests,
        approveRentalRequest,
        declineRentalRequest,
        createBooking,
        addProductListing,
        conversations,
        chatActiveThreadId,
        setChatActiveThreadId,
        sendChatMessage,
        notifications,
        currentUser,
        setCurrentUser,
        isLoggedIn,
        loginDemo,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        isBookingModalOpen,
        setIsBookingModalOpen,
        bookingProduct,
        openBookingModal,
        cardModalProduct,
        setCardModalProduct,
        openProductCardModal,
        closeProductCardModal,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
