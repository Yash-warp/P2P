import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  CheckCircle2 
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
    <div className="fixed inset-0 z-[140] bg-[#30105E]/40 backdrop-blur-sm flex flex-col items-center justify-center p-4 overflow-y-auto animate-in fade-in">
      <div className="w-full max-w-[440px] my-auto">
        
        {/* Main Card - Deep Purple + Lavender Theme */}
        <div className="relative bg-white rounded-[32px] p-8 sm:p-10 shadow-2xl border border-[#E9D5FF] animate-in zoom-in-95 duration-200">
          
          {/* Close Button */}
          <button
            onClick={() => {
              setIsAuthModalOpen(false);
              setIsResetSent(false);
            }}
            className="absolute top-5 right-5 p-2 rounded-full text-[#30105E]/40 hover:text-[#30105E] hover:bg-[#FAF8FF] transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Heading */}
          <div className="text-center mb-7">
            <h2 className="text-2xl sm:text-[28px] font-display font-black text-[#30105E] tracking-tight">
              {authMode === 'login' && (
                <>Welcome <span className="text-[#7C3AED]">back.</span></>
              )}
              {authMode === 'signup' && (
                <>Get <span className="text-[#7C3AED]">started.</span></>
              )}
              {authMode === 'forgot' && (
                <>Reset <span className="text-[#7C3AED]">password.</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-[#30105E]/70 font-medium mt-1.5">
              {authMode === 'login' && 'Sign in to rent or list gear near you.'}
              {authMode === 'signup' && 'Create your account to rent or list gear near you.'}
              {authMode === 'forgot' && 'Enter your email to receive a reset link.'}
            </p>
          </div>

          {/* Form Content */}
          {isResetSent ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E9D5FF] text-[#7C3AED] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-[#30105E] text-sm">Reset link sent</h4>
              <p className="text-xs text-[#30105E]/70">
                We've sent password reset instructions to your email address.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsResetSent(false);
                  setAuthMode('login');
                }}
                className="text-xs font-bold text-[#7C3AED] hover:underline pt-2 block mx-auto"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {/* Full Name (Sign Up Only) */}
              {authMode === 'signup' && (
                <div className="relative mb-3.5">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-[#7C3AED]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full pl-11 pr-4 py-3.5 bg-[#FAF8FF] border border-[#E9D5FF] focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 rounded-xl text-sm font-medium text-[#30105E] placeholder:text-[#30105E]/40 transition-all focus:outline-none"
                  />
                </div>
              )}

              {/* Email Address */}
              <div className="relative mb-3.5">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-[#7C3AED]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-11 pr-4 py-3.5 bg-[#FAF8FF] border border-[#E9D5FF] focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 rounded-xl text-sm font-medium text-[#30105E] placeholder:text-[#30105E]/40 transition-all focus:outline-none"
                />
              </div>

              {/* Password */}
              {authMode !== 'forgot' && (
                <div className="relative mb-2">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-[#7C3AED]" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-11 pr-11 py-3.5 bg-[#FAF8FF] border border-[#E9D5FF] focus:border-[#7C3AED] focus:bg-white focus:ring-2 focus:ring-[#7C3AED]/20 rounded-xl text-sm font-medium text-[#30105E] placeholder:text-[#30105E]/40 transition-all focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#30105E]/40 hover:text-[#7C3AED]"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              )}

              {/* Forgot password? link */}
              {authMode === 'login' && (
                <div className="flex justify-end mb-6">
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-xs text-[#7C3AED] hover:text-[#6D28D9] font-semibold transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {authMode === 'signup' && <div className="mb-6"></div>}
              {authMode === 'forgot' && <div className="mb-6"></div>}

              {/* Main Submit Button - Primary Violet (#7C3AED) */}
              <button
                type="submit"
                className="w-full py-3.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-display font-bold text-sm rounded-xl shadow-[0_4px_14px_rgba(124,58,237,0.35)] hover:shadow-[0_6px_20px_rgba(124,58,237,0.45)] active:scale-[0.99] transition-all cursor-pointer text-center"
              >
                {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
              </button>

              {/* Divider: "or" */}
              {authMode !== 'forgot' && (
                <>
                  <div className="relative flex items-center justify-center my-6">
                    <div className="flex-grow border-t border-[#E9D5FF]"></div>
                    <span className="flex-shrink mx-4 text-xs text-[#30105E]/40 font-semibold uppercase tracking-wider">or</span>
                    <div className="flex-grow border-t border-[#E9D5FF]"></div>
                  </div>

                  {/* Continue with Google */}
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 px-4 bg-white hover:bg-[#FAF8FF] border border-[#E9D5FF] rounded-xl text-sm font-semibold text-[#30105E] flex items-center justify-center gap-3 transition-all active:scale-[0.99] shadow-2xs"
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
              <p className="mt-8 text-center text-xs sm:text-sm text-[#30105E]/70 font-medium">
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

        {/* Legal Disclaimer Outside the Card */}
        <p className="mt-6 text-center text-[11px] sm:text-xs text-[#30105E]/60 leading-relaxed max-w-xs mx-auto">
          By continuing, you agree to Rentic's Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  );
};
