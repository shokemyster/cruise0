import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import heroBg from "./assets/hero_bg.png";

export default function App() {
  const { isLoading, isAuthenticated, loginWithRedirect, logout, user, error: auth0Error } = useAuth0();

  const [displayError, setDisplayError] = useState(null);
  const [displaySuccess, setDisplaySuccess] = useState(null);

  useEffect(() => {
    if (auth0Error) {
      setDisplayError(auth0Error.message);
    }
  }, [auth0Error]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get("error");
    const authErrorDescription = params.get("error_description");
    const logoutParam = params.get("logout");

    if (authError) {
      setDisplayError(authErrorDescription || "Authentication failed");
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (logoutParam === "success") {
      setDisplaySuccess("You have successfully logged out.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="font-bold text-2xl tracking-tight text-blue-900">Cruise0</span>
            </div>

            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 bg-gray-100 rounded-full pl-3 pr-4 py-1.5 border border-gray-200 shadow-sm">
                    <img src={user?.picture} alt={user?.name || "User"} className="w-8 h-8 rounded-full shadow-sm" />
                    <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={() => logout({ logoutParams: { returnTo: `${window.location.origin}?logout=success` } })}
                    className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition"
                  >
                    Log out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => loginWithRedirect()}
                    className="text-sm font-semibold text-gray-700 hover:text-blue-600 transition"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup", prompt: "login" } })}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-blue-600/20 transition-all hover:-translate-y-0.5"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Success Message */}
      {displaySuccess && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-3xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4 shadow-lg flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm font-bold text-green-800">
                  Logged Out
                </h2>
                <p className="mt-1 text-sm text-green-700">
                  {displaySuccess}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setDisplaySuccess(null)}
              className="text-green-400 hover:text-green-600 transition"
              aria-label="Close message"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Auth Error Message */}
      {displayError && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-3xl">
          {displayError.toLowerCase().includes("verify your email") ? (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-lg flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-blue-800">
                    Verification Required
                  </h2>
                  <p className="mt-1 text-sm text-blue-700">
                    Account created! {displayError}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button 
                      onClick={() => loginWithRedirect()}
                      className="text-xs font-semibold bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1.5 rounded-lg transition"
                    >
                      I've verified my email
                    </button>
                    <button 
                      onClick={() => loginWithRedirect({ authorizationParams: { prompt: "login" } })}
                      className="text-xs font-medium text-blue-700 hover:text-blue-900 underline transition"
                    >
                      Use different account
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setDisplayError(null)}
                className="text-blue-400 hover:text-blue-600 transition"
                aria-label="Close message"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 shadow-lg flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold">
                  !
                </div>
                <div>
                  <h2 className="text-sm font-bold text-red-800">
                    Authentication failed
                  </h2>
                  <p className="mt-1 text-sm text-red-700">
                    {displayError}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <button 
                      onClick={() => loginWithRedirect()}
                      className="text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-lg transition"
                    >
                      Try Again
                    </button>
                    <button 
                      onClick={() => loginWithRedirect({ authorizationParams: { prompt: "login" } })}
                      className="text-xs font-medium text-red-700 hover:text-red-900 underline transition"
                    >
                      Use different account
                    </button>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setDisplayError(null)}
                className="text-red-400 hover:text-red-600 transition"
                aria-label="Close error message"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hero Section */}
      <div className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden h-[600px]">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Luxury Resort" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-900/30 to-gray-50/90"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-6">
            Find your next perfect stay
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-blue-50 drop-shadow max-w-3xl mx-auto font-light">
            Discover exclusive resorts, luxury villas, and unforgettable experiences worldwide.
          </p>
        </div>
      </div>

      {/* Search/Booking Widget */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 backdrop-blur-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Location</label>
              <input type="text" placeholder="Where are you going?" className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-3 outline-none transition" />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Check in</label>
              <input type="date" className="w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-3 outline-none transition" />
            </div>
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Check out</label>
              <input type="date" className="w-full bg-gray-50 border border-gray-200 text-gray-500 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent px-4 py-3 outline-none transition" />
            </div>
            <div className="col-span-1">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:shadow-blue-600/50 hover:-translate-y-0.5 flex justify-center items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 bg-white">
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80" alt="Maldives" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                <span className="text-sm font-bold text-gray-900">4.9</span>
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900">Maldives Resort</h3>
              <p className="text-gray-500 text-sm mt-1">Tropical paradise, overwater villas</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">$450 <span className="text-sm font-normal text-gray-500">/ night</span></p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 bg-white">
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80" alt="Bali" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                <span className="text-sm font-bold text-gray-900">4.8</span>
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900">Bali Villas</h3>
              <p className="text-gray-500 text-sm mt-1">Private pools, jungle views</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">$220 <span className="text-sm font-normal text-gray-500">/ night</span></p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 bg-white">
            <div className="h-48 bg-gray-200 overflow-hidden relative">
              <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80" alt="Santorini" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                <span className="text-sm font-bold text-gray-900">4.7</span>
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-900">Santorini Suites</h3>
              <p className="text-gray-500 text-sm mt-1">Ocean cliffside, sunsets</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold text-gray-900">$310 <span className="text-sm font-normal text-gray-500">/ night</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}