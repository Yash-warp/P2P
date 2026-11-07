import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Package, 
  CalendarCheck, 
  Inbox, 
  Heart, 
  Bell, 
  ShieldCheck, 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Trash2, 
  Edit3, 
  ArrowUpRight, 
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';

export const DashboardView = () => {
  const { 
    currentUser, 
    setCurrentUser,
    dashboardTab, 
    setDashboardTab, 
    myRentals, 
    rentalRequests, 
    approveRentalRequest, 
    declineRentalRequest,
    products, 
    setProducts,
    wishlist, 
    toggleWishlist, 
    navigateToProduct, 
    openBookingModal, 
    notifications, 
    navigateTo, 
    showToast,
    setChatActiveThreadId,
    isLoggedIn,
    logout
  } = useApp();

  const [activeQrModal, setActiveQrModal] = useState(null);

  // Filter listings owned by current user
  const myListings = products.filter(p => p.owner.id === currentUser.id || p.owner.name === currentUser.name);


  const handleDeleteListing = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      setProducts(products.filter(p => p.id !== id));
      showToast(`Listing "${title}" removed.`, 'info');
    }
  };

  const handleToggleListingActive = (id) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, isAvailable: !p.isAvailable };
      }
      return p;
    }));
    showToast('Listing availability updated.');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#DFC5FE]/55 via-[#EEDBFE]/40 to-[#DFC5FE]/30 text-[#30105E] ${isLoggedIn ? 'pt-6 pb-24' : 'pt-28 pb-20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* User Overview Top Banner */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white/95 backdrop-blur-md border border-[#DFC5FE] shadow-neu-pill mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover ring-4 ring-[#C4B5FD]"
              />
              <span className="absolute -bottom-1 -right-1 bg-[#7C3AED] text-white p-1 rounded-full shadow-sm" title="DigiLocker Verified">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-[#30105E]">
                  {currentUser.name}
                </h1>
                <span className="bg-[#C4B5FD] text-[#30105E] text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                  Verified Host
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#30105E]/70 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#7C3AED]" /> {currentUser.location}</span>
                <span>•</span>
                <span>Member since {currentUser.memberSince}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigateTo('list-item')}
              className="px-5 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs tracking-tight shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>List New Gear</span>
            </button>
            <button
              onClick={() => navigateTo('messages')}
              className="px-4 py-2.5 rounded-2xl bg-[#E9D5FF] hover:bg-[#DDD6FE] text-[#30105E] font-bold text-xs transition-all flex items-center gap-1.5 border border-[#C4B5FD]"
            >
              <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
              <span>Inbox</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-[#DFC5FE]">
          {[
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'rentals', label: `My Rentals (${myRentals.length})`, icon: CalendarCheck },
            { id: 'requests', label: `Requests (${rentalRequests.filter(r => r.status === 'pending').length})`, icon: Inbox },
            { id: 'listings', label: `My Gear (${myListings.length})`, icon: Package },
            { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'profile', label: 'Profile Settings', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = dashboardTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setDashboardTab(tab.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#30105E] text-white shadow-md'
                    : 'bg-white/85 hover:bg-white text-[#30105E] border border-[#DFC5FE] shadow-2xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C4B5FD]' : 'text-[#7C3AED]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT */}

        {/* 1. OVERVIEW TAB */}
        {dashboardTab === 'overview' && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-5 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill">
                <span className="text-xs font-semibold text-[#30105E]/60 uppercase tracking-wider block">Rental Requests</span>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] mt-1">
                  {rentalRequests.filter(r => r.status === 'pending').length}
                </div>
                <button 
                  onClick={() => setDashboardTab('requests')}
                  className="mt-3 text-xs font-bold text-[#7C3AED] hover:underline flex items-center gap-1"
                >
                  Review Requests <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill">
                <span className="text-xs font-semibold text-[#30105E]/60 uppercase tracking-wider block">Active Rentals</span>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] mt-1">
                  {myRentals.filter(r => r.status === 'approved' || r.status === 'active').length}
                </div>
                <span className="text-[11px] text-[#7C3AED] font-semibold mt-1 block">In Progress</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill">
                <span className="text-xs font-semibold text-[#30105E]/60 uppercase tracking-wider block">Listed Items</span>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] mt-1">
                  {myListings.length}
                </div>
                <span className="text-[11px] text-[#30105E]/60 mt-1 block">Available for Rent</span>
              </div>

              <div className="p-5 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill">
                <span className="text-xs font-semibold text-[#30105E]/60 uppercase tracking-wider block">Saved in Wishlist</span>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] mt-1">
                  {wishlist.length}
                </div>
                <span className="text-[11px] text-[#30105E]/60 mt-1 block">Quick Book Items</span>
              </div>
            </div>

            {/* Recent Rental Bookings Quick List */}
            <div className="p-6 rounded-[32px] bg-white border border-[#E9D5FF] shadow-neu-pill">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-lg text-[#30105E]">Active & Recent Rentals</h3>
                <button
                  onClick={() => setDashboardTab('rentals')}
                  className="text-xs font-bold text-[#7C3AED] hover:underline"
                >
                  View All ({myRentals.length})
                </button>
              </div>

              <div className="space-y-3">
                {myRentals.slice(0, 2).map((rental) => (
                  <div
                    key={rental.id}
                    className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={rental.productImage}
                        alt={rental.productTitle}
                        className="w-14 h-14 rounded-xl object-cover ring-1 ring-[#C4B5FD]"
                      />
                      <div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          rental.status === 'approved' ? 'bg-[#E9D5FF] text-[#30105E]' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {rental.status}
                        </span>
                        <h4 className="font-display font-bold text-sm text-[#30105E] mt-0.5 line-clamp-1">
                          {rental.productTitle}
                        </h4>
                        <div className="text-xs text-[#30105E]/70">
                          {rental.startDate} to {rental.endDate} ({rental.durationDays} days) • ₹{rental.totalAmount}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveQrModal(rental)}
                      className="px-4 py-2 rounded-xl bg-[#30105E] text-white text-xs font-bold hover:bg-[#230b45] flex items-center gap-1.5 shadow-xs"
                    >
                      <QrCode className="w-3.5 h-3.5 text-[#C4B5FD]" />
                      <span>Handover QR Code</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. MY RENTALS TAB */}
        {dashboardTab === 'rentals' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-xl text-[#30105E]">My Gear Rentals (Borrower View)</h3>
              <button
                onClick={() => navigateTo('marketplace')}
                className="text-xs font-bold text-[#7C3AED] hover:underline"
              >
                + Rent More Gear
              </button>
            </div>

            <div className="grid gap-4">
              {myRentals.map((rental) => (
                <div
                  key={rental.id}
                  className="p-5 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={rental.productImage}
                      alt={rental.productTitle}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 ring-1 ring-[#C4B5FD]"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          rental.status === 'approved' ? 'bg-[#E9D5FF] text-[#30105E]' :
                          rental.status === 'completed' ? 'bg-[#FAF8FF] text-[#30105E]/70 border border-[#E9D5FF]' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {rental.status}
                        </span>
                        <span className="text-xs text-[#30105E]/50">ID: {rental.id}</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#30105E]">
                        {rental.productTitle}
                      </h4>
                      <p className="text-xs text-[#30105E]/70 mt-1">
                        Dates: <strong>{rental.startDate}</strong> to <strong>{rental.endDate}</strong> ({rental.durationDays} days)
                      </p>
                      <p className="text-xs text-[#30105E]/70 mt-0.5">
                        Owner: <strong>{rental.ownerName}</strong> • {rental.deliveryMethod}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-[#E9D5FF]/60">
                    <div className="text-left md:text-right mr-2">
                      <div className="text-xs text-[#30105E]/60">Total Paid</div>
                      <div className="font-display font-black text-lg text-[#30105E]">₹{rental.totalAmount}</div>
                      <div className="text-[10px] text-[#7C3AED] font-semibold">₹{rental.depositAmount} deposit escrow</div>
                    </div>

                    <button
                      onClick={() => setActiveQrModal(rental)}
                      className="px-4 py-2.5 rounded-xl bg-[#30105E] hover:bg-[#230b45] text-white text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      <QrCode className="w-4 h-4 text-[#C4B5FD]" />
                      <span>Handover QR</span>
                    </button>

                    <button
                      onClick={() => {
                        setChatActiveThreadId,
    isLoggedIn,
    logout('conv-1');
                        navigateTo('messages');
                      }}
                      className="px-4 py-2.5 rounded-xl border border-[#E9D5FF] hover:bg-[#FAF8FF] text-[#30105E] text-xs font-bold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#7C3AED]" />
                      <span>Chat</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. RENTAL REQUESTS TAB (Owner View) */}
        {dashboardTab === 'requests' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-[#30105E]">Incoming Rental Requests (Lender View)</h3>

            {rentalRequests.length > 0 ? (
              <div className="space-y-4">
                {rentalRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-6 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={req.renterAvatar}
                        alt={req.renterName}
                        className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#C4B5FD]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-base text-[#30105E]">{req.renterName}</h4>
                          <span className="text-xs text-amber-500 font-bold flex items-center">
                            ★ {req.renterRating}
                          </span>
                          <span className="text-[10px] text-[#30105E] font-bold bg-[#E9D5FF] px-2 py-0.5 rounded border border-[#C4B5FD]/50">
                            DigiLocker Verified
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#30105E] mt-1">
                          Requested item: <strong className="text-[#7C3AED]">{req.productTitle}</strong>
                        </p>
                        <p className="text-xs text-[#30105E]/70 mt-0.5">
                          Dates: {req.startDate} to {req.endDate} ({req.durationDays} days) • Purpose: "{req.purpose}"
                        </p>
                        <div className="mt-2 text-xs font-bold text-[#30105E]">
                          Net Payout: <span className="text-[#7C3AED] font-black">₹{req.totalPayout}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      {req.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => approveRentalRequest(req.id)}
                            className="flex-1 md:flex-initial px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#C4B5FD]" />
                            <span>Approve Request</span>
                          </button>
                          <button
                            onClick={() => declineRentalRequest(req.id)}
                            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center gap-1.5"
                          >
                            <XCircle className="w-4 h-4" />
                            <span>Decline</span>
                          </button>
                        </>
                      ) : (
                        <span className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
                          req.status === 'approved' ? 'bg-[#E9D5FF] text-[#30105E]' : 'bg-slate-100 text-slate-600'
                        }`}>
                          Status: {req.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-3xl border border-[#E9D5FF]">
                <p className="text-sm text-[#30105E]/60">No pending rental requests at this moment.</p>
              </div>
            )}
          </div>
        )}

        {/* 4. MY GEAR LISTINGS TAB */}
        {dashboardTab === 'listings' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-xl text-[#30105E]">My Listed Equipment</h3>
                <p className="text-xs text-[#30105E]/60">Manage your gear, pricing, and availability</p>
              </div>
              <button
                onClick={() => navigateTo('list-item')}
                className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add New Listing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myListings.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                      <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover" />
                      <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.isAvailable ? 'bg-[#7C3AED] text-white' : 'bg-slate-500 text-white'
                      }`}>
                        {item.isAvailable ? 'Active' : 'Paused'}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base text-[#30105E] line-clamp-1">{item.title}</h4>
                    <p className="text-xs text-[#30105E]/70 capitalize">{item.category} • ₹{item.pricePerDay} /day</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 flex items-center justify-between text-xs">
                    <button
                      onClick={() => handleToggleListingActive(item.id)}
                      className="font-bold text-[#7C3AED] hover:underline"
                    >
                      {item.isAvailable ? 'Pause Listing' : 'Make Active'}
                    </button>

                    <button
                      onClick={() => handleDeleteListing(item.id, item.title)}
                      className="text-rose-600 hover:text-rose-800 p-1 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. WISHLIST TAB */}
        {dashboardTab === 'wishlist' && (
          <div className="space-y-6">
            <h3 className="font-display font-bold text-xl text-[#30105E]">Saved Wishlist ({wishlist.length})</h3>

            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.filter(p => wishlist.includes(p.id)).map((product) => (
                  <div
                    key={product.id}
                    className="rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-rose-500 shadow-sm"
                        >
                          <Heart className="w-4 h-4 fill-rose-500" />
                        </button>
                      </div>

                      <h4 
                        onClick={() => navigateToProduct(product.id)}
                        className="font-display font-bold text-base text-[#30105E] cursor-pointer hover:text-[#7C3AED]"
                      >
                        {product.title}
                      </h4>
                      <p className="text-xs text-[#30105E]/70 mt-1">₹{product.pricePerDay} /day • {product.location}</p>
                    </div>

                    <button
                      onClick={() => openBookingModal(product)}
                      className="mt-4 w-full py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs transition-all shadow-xs"
                    >
                      Rent Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-[#E9D5FF]">
                <Heart className="w-8 h-8 text-[#C4B5FD] mx-auto mb-2" />
                <p className="text-sm text-[#30105E]/70 font-medium">Your wishlist is currently empty.</p>
                <button
                  onClick={() => navigateTo('marketplace')}
                  className="mt-4 px-5 py-2 rounded-xl bg-[#7C3AED] text-white font-bold text-xs hover:bg-[#6D28D9]"
                >
                  Browse Marketplace
                </button>
              </div>
            )}
          </div>
        )}


        {/* 7. NOTIFICATIONS TAB */}
        {dashboardTab === 'notifications' && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="font-display font-bold text-xl text-[#30105E]">Notifications</h3>
            {notifications.map((n) => (
              <div
                key={n.id}
                className="p-4 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill flex items-start justify-between gap-4"
              >
                <div>
                  <h4 className="font-display font-bold text-sm text-[#30105E]">{n.title}</h4>
                  <p className="text-xs text-[#30105E]/70 mt-0.5">{n.desc}</p>
                  <span className="text-[10px] text-[#30105E]/50 mt-1 block">{n.time}</span>
                </div>
                {!n.read && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] shrink-0 mt-1"></span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 8. PROFILE SETTINGS TAB */}
        {dashboardTab === 'profile' && (
          <div className="p-8 rounded-[32px] bg-white border border-[#E9D5FF] shadow-neu-pill max-w-2xl space-y-6">
            <h3 className="font-display font-bold text-xl text-[#30105E]">Profile & Verification Settings</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#30105E]/70 uppercase tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  value={currentUser.name}
                  onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#30105E]/70 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  value={currentUser.email}
                  onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#30105E]/70 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="text"
                  value={currentUser.phone}
                  onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#30105E]/70 uppercase tracking-wider mb-1">Neighborhood & City</label>
                <input
                  type="text"
                  value={currentUser.location}
                  onChange={(e) => setCurrentUser({ ...currentUser, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#E9D5FF]/40 border border-[#C4B5FD] flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#30105E]">DigiLocker Government ID Check</div>
                  <div className="text-[#30105E]/70 text-[11px]">Aadhaar and PAN verified by UIDAI sandbox.</div>
                </div>
                <span className="bg-[#7C3AED] text-white font-bold text-xs px-3 py-1 rounded-full">
                  VERIFIED ✓
                </span>
              </div>

              <button
                onClick={() => showToast('Profile updated successfully!')}
                className="px-6 py-3 rounded-xl bg-[#7C3AED] text-white font-bold text-xs hover:bg-[#6D28D9] transition-all shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Handover QR Modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-[130] bg-[#30105E]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-[#E9D5FF]">
            <h3 className="font-display font-bold text-xl text-[#30105E]">Handover QR Code</h3>
            <p className="text-xs text-[#30105E]/70 mt-1">
              Show this code to {activeQrModal.ownerName} during physical gear inspection.
            </p>

            <div className="my-6 p-4 rounded-3xl bg-[#FAF8FF] border border-[#E9D5FF] inline-block shadow-inner">
              <div className="w-48 h-48 bg-white border border-[#E9D5FF] p-2 rounded-2xl flex flex-col justify-between items-center relative">
                <div className="grid grid-cols-6 gap-1 w-full h-full p-2">
                  {[...Array(36)].map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 && i % 3 === 0) || i < 8 || i > 28 ? 'bg-[#30105E]' : 'bg-[#E9D5FF]'
                      }`}
                    ></div>
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-[#30105E] mt-1">
                  {activeQrModal.handoverCode}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-[#30105E] font-bold bg-[#E9D5FF] py-1.5 px-3 rounded-full mb-4 border border-[#C4B5FD]/60">
              SafeEscrow Active • Deposit Protected
            </div>

            <button
              onClick={() => setActiveQrModal(null)}
              className="w-full py-2.5 rounded-xl bg-[#30105E] text-white font-bold text-xs hover:bg-[#230b45]"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
