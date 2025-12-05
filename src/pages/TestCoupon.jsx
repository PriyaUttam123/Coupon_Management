import React, { useState } from 'react';
import InputField from '../components/InputField';
import SelectField from '../components/SelectField';
import CouponCard from '../components/CouponCard';
import { Search, ShoppingCart, User, Package } from 'lucide-react';
import { getBestCoupon } from '../api/api';

const TestCoupon = () => {
    const [userData, setUserData] = useState({
        userId: 'USER123',
        userTier: 'gold',
        country: 'US',
        lifetimeSpend: 500,
        ordersPlaced: 10
    });

    const [cartJson, setCartJson] = useState(JSON.stringify([
        {
            "productId": "PROD001",
            "category": "electronics",
            "unitPrice": 299.99,
            "quantity": 1
        },
        {
            "productId": "PROD002",
            "category": "fashion",
            "unitPrice": 49.99,
            "quantity": 2
        }
    ], null, 2));

    const [bestCoupon, setBestCoupon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGetBestCoupon = async () => {
        setLoading(true);
        setError(null);
        setBestCoupon(null);

        try {
            const cart = JSON.parse(cartJson);
            const requestData = {
                user: userData,
                cart: cart
            };

            const response = await getBestCoupon(requestData);
            setBestCoupon(response);
        } catch (err) {
            if (err instanceof SyntaxError) {
                setError("Invalid Cart JSON format");
            } else {
                setError(err.message || "Failed to find coupon");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        Test Coupon Logic
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Simulate cart and user scenarios to find the best available coupon.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* User Configuration */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" />
                                User Simulation
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <InputField
                                    label="User ID"
                                    id="userId"
                                    value={userData.userId}
                                    onChange={handleUserChange}
                                />
                                <SelectField
                                    label="User Tier"
                                    id="userTier"
                                    value={userData.userTier}
                                    onChange={handleUserChange}
                                    options={[
                                        { value: 'bronze', label: 'Bronze' },
                                        { value: 'silver', label: 'Silver' },
                                        { value: 'gold', label: 'Gold' },
                                        { value: 'platinum', label: 'Platinum' }
                                    ]}
                                />
                                <SelectField
                                    label="Country"
                                    id="country"
                                    value={userData.country}
                                    onChange={handleUserChange}
                                    options={[
                                        { value: 'US', label: 'United States' },
                                        { value: 'CA', label: 'Canada' },
                                        { value: 'UK', label: 'United Kingdom' },
                                        { value: 'IN', label: 'India' }
                                    ]}
                                />
                                <InputField
                                    label="Lifetime Spend ($)"
                                    id="lifetimeSpend"
                                    type="number"
                                    value={userData.lifetimeSpend}
                                    onChange={handleUserChange}
                                />
                                <InputField
                                    label="Orders Placed"
                                    id="ordersPlaced"
                                    type="number"
                                    value={userData.ordersPlaced}
                                    onChange={handleUserChange}
                                />
                            </div>
                        </div>

                        {/* Cart Configuration */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-col h-full">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5 text-green-500" />
                                Cart Context (JSON)
                            </h2>
                            <div className="flex-grow">
                                <textarea
                                    className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none"
                                    value={cartJson}
                                    onChange={(e) => setCartJson(e.target.value)}
                                    spellCheck="false"
                                />
                            </div>
                            <p className="mt-3 text-xs text-gray-500">
                                Enter cart items as a valid JSON array. Each object needs productId, category, unitPrice, and quantity.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Actions & Results */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5 text-purple-500" />
                                Actions
                            </h2>
                            <button
                                onClick={handleGetBestCoupon}
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Calculating...
                                    </span>
                                ) : (
                                    <>
                                        <Search className="w-5 h-5" />
                                        Find Best Coupon
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100 animate-fade-in-down">
                                    <strong>Error:</strong> {error}
                                </div>
                            )}
                        </div>

                        {/* Result Display */}
                        {bestCoupon && (
                            <div className="animate-fade-in-up">
                                <h3 className="text-lg font-semibold text-gray-700 mb-3 px-1">Recommended Coupon</h3>
                                <CouponCard coupon={bestCoupon} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestCoupon;
