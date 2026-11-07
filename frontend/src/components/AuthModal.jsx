import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  Box,
  Sparkles,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authMode, 
    setAuthMode, 
    loginDemo,
    showToast 
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'forgot') {
      setIsResetSent(true);
      if (showToast) {
        showToast('success', 'Password reset link sent to your email.');
      }
      return;
    }

    loginDemo('renter');
  };

  const handleGoogleSignIn = () => {
    loginDemo('renter');
  };

  return (
    <div className="fixed inset-0 z-[140] bg-[#0c071d]/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-4xl my-auto bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-[#E9D5FF]/60 flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Left Column - Dark Purple / Midnight Navy */}
        <div className="relative md:w-[46%] bg-gradient-to-br from-[#1d1338] via-[#170e30] to-[#100824] p-7 sm:p-9 lg:p-10 flex flex-col justify-between text-white overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#4C1D95]/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
              <Box className="w-5 h-5 text-[#1d1338]" strokeWidth={2.2} />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-display">
              Lendit.
            </span>
          </div>

          {/* Middle Value Proposition */}
          <div className="relative z-10 my-8 sm:my-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-semibold text-white/90 tracking-wider mb-5">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>SHARE MORE. OWN LESS.</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold leading-[1.18] tracking-tight">
              <span className="text-[#A78BFA]/60 block font-bold">Your next useful</span>
              <span className="text-[#A78BFA]/60">thing is </span>
              <span className="text-white">closer</span>
              <span className="text-white block">than you think.</span>
            </h2>

            {/* Subtext */}
            <p className="mt-4 text-xs sm:text-sm text-purple-200/70 leading-relaxed font-normal max-w-sm">
              Find what you need nearby, lend what you don't use every day, and make sharing work for everyone.
            </p>
          </div>

          {/* Bottom Trust Badge & Footer */}
          <div className="relative z-10 space-y-5">
            {/* Community Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur-sm flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-[13px] font-semibold text-white">
                  A community built on sharing
                </h4>
                <p className="text-[11px] sm:text-xs text-purple-200/60 leading-normal mt-0.5">
                  Discover local listings and connect with people around you.
                </p>
              </div>
            </div>

            {/* Kicker Footer */}
            <p className="text-[10px] tracking-[0.2em] font-semibold text-white/40 uppercase">
              LESS CLUTTER. MORE POSSIBILITIES.
            </p>
          </div>
        </div>

        {/* Right Column - Clean White Form */}
        <div className="relative md:w-[54%] bg-white p-7 sm:p-9 lg:p-10 flex flex-col justify-between">
          
          {/* Close Button */}
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setIsResetSent(false);
            }}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div>
            {/* Kicker & Title */}
            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-wider text-[#7C3AED] uppercase block mb-1">
                WELCOME TO LENDIT
              </span>
              <h3 className="text-2xl sm:text-[28px] font-extrabold text-gray-900 tracking-tight">
                {authMode === 'login' && 'Welcome back.'}
                {authMode === 'signup' && 'Create an account.'}
                {authMode === 'forgot' && 'Reset password.'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-normal">
                {authMode === 'login' && 'Sign in to pick up where you left off.'}
                {authMode === 'signup' && 'Join your local neighborhood sharing network.'}
                {authMode === 'forgot' && "Enter your email and we'll send a recovery link."}
              </p>
            </div>

            {/* Form Content */}
            {isResetSent ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-gray-900 text-base">Reset link sent</h4>
                <p className="text-xs sm:text-sm text-gray-500 max-w-xs mx-auto">
                  We've sent password reset instructions to your email address.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsResetSent(false);
                    setAuthMode('login');
                  }}
                  className="text-xs font-bold text-[#7C3AED] hover:underline pt-3 block mx-auto"
                >
                  Back to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Full Name (Sign Up Only) */}
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Full name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <User className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#f8f9fa] border border-gray-200 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15 rounded-xl text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-[#f8f9fa] border border-gray-200 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15 rounded-xl text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all focus:outline-none"
                    />
                  </div>
                </div>

                {/* Password Field */}
                {authMode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-gray-700">
                        Password
                      </label>
                      {authMode === 'login' && (
                        <button
                          type="button"
                          onClick={() => setAuthMode('forgot')}
                          className="text-xs font-medium text-[#7C3AED] hover:underline"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                        <Lock className="h-4 w-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-[#f8f9fa] border border-gray-200 focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/15 rounded-xl text-sm font-medium text-gray-800 placeholder:text-gray-400 transition-all focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 sm:py-3.5 bg-[#241744] hover:bg-[#1a0f35] active:scale-[0.99] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span>
                    {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  </span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {/* Divider */}
                {authMode !== 'forgot' && (
                  <>
                    <div className="relative flex items-center justify-center pt-2 pb-1">
                      <div className="flex-grow border-t border-gray-200"></div>
                      <span className="flex-shrink mx-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        or continue with
                      </span>
                      <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    {/* Google Auth Button */}
                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full py-2.5 sm:py-3 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm font-semibold text-gray-700 flex items-center justify-center gap-2.5 transition-all active:scale-[0.99] shadow-2xs"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>
                  </>
                )}

                {/* Mode Switcher */}
                <p className="pt-2 text-center text-xs text-gray-500 font-medium">
                  {authMode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('signup')}
                        className="font-bold text-[#7C3AED] hover:underline"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthMode('login')}
                        className="font-bold text-[#7C3AED] hover:underline"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>

              </form>
            )}
          </div>

          {/* Legal Disclaimer */}
          <p className="mt-5 text-center text-[10px] text-gray-400 leading-relaxed">
            By continuing, you agree to Lendit's Terms of Service and Privacy Policy.
          </p>

        </div>

      </div>
    </div>
  );
};
