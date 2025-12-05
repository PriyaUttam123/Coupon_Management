import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateCoupon from './pages/CreateCoupon';
import TestCoupon from './pages/TestCoupon';
import { PlusCircle, Search } from 'lucide-react';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Coupon Management Dashboard</h1>
      <div className="flex gap-4">
        <Link
          to="/create"
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all font-medium text-lg"
        >
          <PlusCircle className="w-5 h-5" />
          Create New Coupon
        </Link>
        <Link
          to="/test"
          className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 transition-all font-medium text-lg"
        >
          <Search className="w-5 h-5" />
          Test Coupons
        </Link>
      </div>
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
