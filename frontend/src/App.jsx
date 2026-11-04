import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';

// Homepage Sections
import { Hero } from './components/Hero';
import { NearbyPreview } from './components/NearbyPreview';
import { ActivityTicker } from './components/ActivityTicker';
import { TrendingListings } from './components/TrendingListings';
import { SeeInAction } from './components/SeeInAction';
import { OwnerEarningsCalculator } from './components/OwnerEarningsCalculator';
import { HowItWorks } from './components/HowItWorks';
import { TrustSafety } from './components/TrustSafety';
import { Testimonials } from './components/Testimonials';
import { AppDownloadCTA } from './components/AppDownloadCTA';
import { FinalCTA } from './components/FinalCTA';

// Feed View & Bottom Navigation Bar
import { FeedView } from './components/FeedView';
import { BottomNavBar } from './components/BottomNavBar';

// Additional Pages
import { MarketplaceView } from './components/MarketplaceView';
import { ProductDetailView } from './components/ProductDetailView';
import { DashboardView } from './components/DashboardView';
import { ListItemView } from './components/ListItemView';
import { ChatView } from './components/ChatView';

// Toast Notification
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function App() {
  const { activeView, toast, isLoggedIn } = useApp();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#30105E] selection:bg-[#C4B5FD] selection:text-[#30105E] font-body antialiased">
      
      {/* Sticky Blurred Floating Navbar (rendered ONLY on public marketing pages when logged out) */}
      {!isLoggedIn && <Navbar />}

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Logged In Feed View: 1:1 copy of https://www.rentic.in/feed */}
        {activeView === 'feed' && <FeedView />}

        {/* Marketing Landing Page (Default for logged out visitors) */}
        {activeView === 'home' && (
          <>
            {/* Section A & B: Hero Section */}
            <Hero />

            {/* Section C: Nearby Marketplace Preview */}
            <NearbyPreview />

            {/* Section D: Live Activity Ticker */}
            <ActivityTicker />

            {/* Section E: Trending Near You */}
            <TrendingListings />

            {/* Video Section: See Rentic in Action */}
            <SeeInAction />

            {/* Section F & G: Owner Earnings Section & Rental Income Calculator */}
            <OwnerEarningsCalculator />

            {/* Section H: How Rentic Works */}
            <HowItWorks />

            {/* Section I: Trust & Safety */}
            <TrustSafety />

            {/* Section J: Testimonials (Trusted by locals) */}
            <Testimonials />

            {/* Mobile App Section */}
            <AppDownloadCTA />

            {/* Section K: Final CTA */}
            <FinalCTA />
          </>
        )}

        {/* Dedicated Marketplace Page */}
        {activeView === 'marketplace' && <MarketplaceView />}

        {/* Product Details Page */}
        {activeView === 'product-detail' && <ProductDetailView />}

        {/* User Dashboard & Owner Center */}
        {activeView === 'dashboard' && <DashboardView />}

        {/* Create New Listing Page */}
        {activeView === 'list-item' && <ListItemView />}

        {/* User-to-User Messages & Chat View */}
        {activeView === 'messages' && <ChatView />}
      </main>

      {/* Global Footer (rendered ONLY when logged out on marketing pages) */}
      {!isLoggedIn && <Footer />}

      {/* Persistent Rentic App Bottom Navigation Bar for ALL views when logged in */}
      {isLoggedIn && <BottomNavBar />}

      {/* Booking Modal Flow */}
      <BookingModal />

      {/* Authentication Modal */}
      <AuthModal />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-[160] max-w-sm flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E9D5FF] text-[#30105E] shadow-2xl animate-in slide-in-from-bottom-5 duration-300">
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-[#7C3AED] shrink-0" />}
          <p className="text-xs font-semibold leading-relaxed">{toast.message}</p>
        </div>
      )}

    </div>
  );
}
export default App;
