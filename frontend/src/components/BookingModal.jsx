import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Calendar, 
  ShieldCheck, 
  CreditCard, 
  MapPin, 
  CheckCircle2, 
  Lock, 
  QrCode,
  ArrowRight
} from 'lucide-react';

export const BookingModal = () => {
  const { 
    isBookingModalOpen, 
    setIsBookingModalOpen, 
    bookingProduct, 
    currentUser, 
    isLoggedIn, 
    createBooking,
    setIsAuthModalOpen,
    setAuthMode
  } = useApp();

  const [startDate, setStartDate] = useState('2026-11-10');
  const [endDate, setEndDate] = useState('2026-11-12');
  const [deliveryMethod, setDeliveryMethod] = useState('Self Pickup');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isBookingModalOpen || !bookingProduct) return null;

  // Days calculation
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const days = isNaN(diffTime) || diffTime < 1 ? 1 : diffTime;

  const baseRental = bookingProduct.pricePerDay * days;
  const deliveryFee = deliveryMethod === 'Doorstep Courier' ? 149 : 0;
  const serviceFee = Math.round(baseRental * 0.05);
  const totalRental = baseRental + deliveryFee + serviceFee;
  const deposit = bookingProduct.securityDeposit;
  const grandTotal = totalRental + deposit;

  const handleConfirmBooking = () => {
    if (!isLoggedIn) {
      setIsBookingModalOpen(false);
      setAuthMode('login');
      setIsAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      createBooking({
        startDate,
        endDate,
        durationDays: days,
        totalPrice: totalRental,
        deliveryMethod
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[120] bg-[#30105E]/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#E9D5FF] my-8 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsBookingModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-[#30105E]/50 hover:text-[#30105E] hover:bg-[#FAF8FF] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-8">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-2.5 py-0.5 rounded-full w-max mb-2">
            <Lock className="w-3 h-3 text-[#7C3AED]" />
            <span>SafeEscrow™ Protected Booking</span>
          </div>
          <h3 className="font-display font-black text-2xl text-[#30105E]">
            Request to Book Gear
          </h3>
        </div>

        {/* Product Snapshot */}
        <div className="mt-4 p-4 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] flex items-center gap-3">
          <img
            src={bookingProduct.images[0]}
            alt={bookingProduct.title}
            className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-[#C4B5FD]"
          />
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-bold uppercase text-[#7C3AED]">{bookingProduct.brand} • {bookingProduct.category}</div>
            <h4 className="font-display font-bold text-sm text-[#30105E] truncate">{bookingProduct.title}</h4>
            <div className="text-xs text-[#30105E]/80 font-semibold mt-0.5">
              ₹{bookingProduct.pricePerDay} /day • Hosted by {bookingProduct.owner.name}
            </div>
          </div>
        </div>

        {/* Form Controls */}
        <div className="mt-6 space-y-4">
          
          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                Pickup Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs font-bold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                Return Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs font-bold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
            </div>
          </div>

          {/* Delivery Method */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
              Handover Option
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDeliveryMethod('Self Pickup')}
                className={`p-2.5 rounded-xl text-left border text-xs font-semibold ${
                  deliveryMethod === 'Self Pickup'
                    ? 'bg-[#30105E] text-white border-[#30105E]'
                    : 'bg-[#FAF8FF] text-[#30105E] border-[#E9D5FF]'
                }`}
              >
                <div>Self Pickup (Free)</div>
                <div className="text-[10px] opacity-75">Meet in {bookingProduct.location.split(',')[0]}</div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryMethod('Doorstep Courier')}
                className={`p-2.5 rounded-xl text-left border text-xs font-semibold ${
                  deliveryMethod === 'Doorstep Courier'
                    ? 'bg-[#30105E] text-white border-[#30105E]'
                    : 'bg-[#FAF8FF] text-[#30105E] border-[#E9D5FF]'
                }`}
              >
                <div>Doorstep (+₹149)</div>
                <div className="text-[10px] opacity-75">Delivered in 2-4 hrs</div>
              </button>
            </div>
          </div>

          {/* Borrower ID Status */}
          <div className="p-3 rounded-xl bg-[#E9D5FF]/60 border border-[#C4B5FD] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#30105E] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span>DigiLocker ID Check: <strong>Verified</strong></span>
            </div>
            <span className="text-[11px] font-bold text-[#7C3AED]">Pre-Approved ✓</span>
          </div>

          {/* Payment Breakdown */}
          <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] space-y-2 text-xs">
            <div className="flex justify-between text-[#30105E]/80">
              <span>Rental ({days} days @ ₹{bookingProduct.pricePerDay}/day)</span>
              <span className="font-bold text-[#30105E]">₹{baseRental}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between text-[#30105E]/80">
                <span>Doorstep Courier Fee</span>
                <span className="font-bold text-[#30105E]">₹{deliveryFee}</span>
              </div>
            )}
            <div className="flex justify-between text-[#30105E]/80">
              <span>Platform Service Fee (5%)</span>
              <span className="font-bold text-[#30105E]">₹{serviceFee}</span>
            </div>
            <div className="flex justify-between text-[#30105E] font-bold bg-[#E9D5FF] p-1.5 rounded-lg border border-[#C4B5FD]/60">
              <span>Refundable Security Deposit (Held in Escrow):</span>
              <span>₹{deposit}</span>
            </div>

            <div className="pt-2 border-t border-[#E9D5FF] flex justify-between font-display font-black text-sm text-[#30105E]">
              <span>Total Amount Authorised:</span>
              <span>₹{grandTotal}</span>
            </div>
            <p className="text-[10px] text-[#30105E]/60">
              *Security deposit of ₹{deposit} is 100% refunded immediately upon equipment return.
            </p>
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-2 cursor-pointer select-none text-xs text-[#30105E]/80">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded text-[#7C3AED] focus:ring-[#7C3AED]"
            />
            <span>
              I agree to the lender's guidelines and understand that an encrypted QR code scan is required during handover.
            </span>
          </label>

        </div>

        {/* Action Button */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            disabled={!agreeTerms || isSubmitting}
            onClick={handleConfirmBooking}
            className="w-full py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-display font-black text-sm transition-all duration-150 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
          >
            {isSubmitting ? (
              <span>Authorizing Escrow Reservation...</span>
            ) : (
              <>
                <span>Confirm & Authorize ₹{grandTotal}</span>
                <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <button
            onClick={() => setIsBookingModalOpen(false)}
            className="w-full py-2 text-xs font-bold text-[#30105E]/60 hover:text-[#30105E] transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
