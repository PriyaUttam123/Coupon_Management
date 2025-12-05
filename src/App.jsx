import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCoupon from './pages/CreateCoupon';
import TestCoupon from './pages/TestCoupon';
import { PlusCircle, Search, Tag, BarChart3, Settings } from 'lucide-react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Navbar / Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">CouponManager</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
            <span className="hover:text-blue-600 cursor-pointer transition-colors">Documentation</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Coupon Management
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Manage your discounts, test eligibility rules, and optimize your sales strategy from one central hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Create Card */}
          <Link
            to="/create"
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <PlusCircle className="w-24 h-24 text-blue-600 transform rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <PlusCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                Create New Coupon
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Launch a new discount campaign. Set rules, limits, validity periods, and eligibility criteria.
              </p>
            </div>
          </Link>

          {/* Test Card */}
          <Link
            to="/test"
            className="group relative bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl hover:border-purple-200 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Search className="w-24 h-24 text-purple-600 transform -rotate-12" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                Test Logic
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Simulate cart scenarios and user profiles to verify that the correct coupons are being applied.
              </p>
            </div>
          </Link>


        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateCoupon />} />
        <Route path="/test" element={<TestCoupon />} />
      </Routes>
    </Router>
  )
}

export default App
