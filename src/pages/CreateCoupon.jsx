import { useState } from 'react';
import { ChevronDown, ChevronUp, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { createCoupon } from '../api/api';

const CreateCoupon = () => {
    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: 'FLAT',
        discountValue: '',
        maxDiscount: '',
        startDate: '',
        endDate: '',
        usageLimit: '',
        allowedTiers: [],
        minLifetimeSpend: '',
        minOrders: '',
        firstOrderOnly: false,
        allowedCountries: [],
        minCartValue: '',
        applicableCategories: [],
        excludedCategories: [],
        minItemCount: '',
    });

    const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleMultiSelectChange = (e, field) => {
        const options = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData((prev) => ({
            ...prev,
            [field]: options,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            await createCoupon(formData);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            // Optional: Reset form here
        } catch (err) {
            setError(err.message || 'Failed to create coupon');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                        Create New Coupon
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Define the rules and limits for your new discount campaign.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Details Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-shadow hover:shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                            Basic Details
                        </h2>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                            <div className="col-span-2">
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    id="code"
                                    required
                                    placeholder="e.g., SUMMER2025"
                                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 placeholder-gray-400 uppercase tracking-wider font-semibold"
                                    value={formData.code}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="3"
                                    placeholder="Describe the coupon..."
                                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="discountType" className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                                <div className="relative">
                                    <select
                                        name="discountType"
                                        id="discountType"
                                        className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 appearance-none"
                                        value={formData.discountType}
                                        onChange={handleChange}
                                    >
                                        <option value="FLAT">Flat Amount ($)</option>
                                        <option value="PERCENT">Percentage (%)</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 mb-1">
                                    Discount Value {formData.discountType === 'PERCENT' ? '(%)' : '($)'}
                                </label>
                                <input
                                    type="number"
                                    name="discountValue"
                                    id="discountValue"
                                    required
                                    placeholder="0"
                                    min="0"
                                    step="0.01"
                                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                    value={formData.discountValue}
                                    onChange={handleChange}
                                />
                            </div>

                            {formData.discountType === 'PERCENT' && (
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="maxDiscount" className="block text-sm font-medium text-gray-700 mb-1">Max Discount Amount ($)</label>
                                    <input
                                        type="number"
                                        name="maxDiscount"
                                        id="maxDiscount"
                                        placeholder="Unlimited"
                                        min="0"
                                        className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                        value={formData.maxDiscount}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Validity & Limits Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 transition-shadow hover:shadow-md">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-green-500 rounded-full"></span>
                            Validity & Limits
                        </h2>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    type="datetime-local"
                                    name="startDate"
                                    id="startDate"
                                    required
                                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    type="datetime-local"
                                    name="endDate"
                                    id="endDate"
                                    required
                                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label htmlFor="usageLimit" className="block text-sm font-medium text-gray-700 mb-1">Usage Limit Per User</label>
                                <input
                                    type="number"
                                    name="usageLimit"
                                    id="usageLimit"
                                    placeholder="Unlimited"
                                    min="1"
                                    className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                    value={formData.usageLimit}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Eligibility Section (Collapsible) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md">
                        <button
                            type="button"
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                            onClick={() => setIsEligibilityOpen(!isEligibilityOpen)}
                        >
                            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                                <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                                Eligibility Rules
                            </h2>
                            {isEligibilityOpen ? <ChevronUp className="h-6 w-6 text-gray-500" /> : <ChevronDown className="h-6 w-6 text-gray-500" />}
                        </button>

                        {isEligibilityOpen && (
                            <div className="p-6 md:p-8 space-y-6 border-t border-gray-100 animate-fade-in-down">
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Allowed User Tiers</label>
                                        <select
                                            multiple
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 h-32"
                                            value={formData.allowedTiers}
                                            onChange={(e) => handleMultiSelectChange(e, 'allowedTiers')}
                                        >
                                            <option value="bronze">Bronze</option>
                                            <option value="silver">Silver</option>
                                            <option value="gold">Gold</option>
                                            <option value="platinum">Platinum</option>
                                        </select>
                                        <p className="mt-1 text-xs text-gray-500">Hold Ctrl (Cmd) to select multiple.</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Allowed Countries</label>
                                        <select
                                            multiple
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 h-32"
                                            value={formData.allowedCountries}
                                            onChange={(e) => handleMultiSelectChange(e, 'allowedCountries')}
                                        >
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="AU">Australia</option>
                                            <option value="IN">India</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="minLifetimeSpend" className="block text-sm font-medium text-gray-700 mb-1">Min Lifetime Spend ($)</label>
                                        <input
                                            type="number"
                                            name="minLifetimeSpend"
                                            id="minLifetimeSpend"
                                            placeholder="0"
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                            value={formData.minLifetimeSpend}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="minOrders" className="block text-sm font-medium text-gray-700 mb-1">Min Past Orders</label>
                                        <input
                                            type="number"
                                            name="minOrders"
                                            id="minOrders"
                                            placeholder="0"
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                            value={formData.minOrders}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="minCartValue" className="block text-sm font-medium text-gray-700 mb-1">Min Cart Value ($)</label>
                                        <input
                                            type="number"
                                            name="minCartValue"
                                            id="minCartValue"
                                            placeholder="0"
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                            value={formData.minCartValue}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="minItemCount" className="block text-sm font-medium text-gray-700 mb-1">Min Item Count</label>
                                        <input
                                            type="number"
                                            name="minItemCount"
                                            id="minItemCount"
                                            placeholder="0"
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                            value={formData.minItemCount}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Applicable Categories</label>
                                        <select
                                            multiple
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 h-32"
                                            value={formData.applicableCategories}
                                            onChange={(e) => handleMultiSelectChange(e, 'applicableCategories')}
                                        >
                                            <option value="electronics">Electronics</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="home">Home & Garden</option>
                                            <option value="beauty">Beauty</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Excluded Categories</label>
                                        <select
                                            multiple
                                            className="block w-full px-4 py-3 rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900 h-32"
                                            value={formData.excludedCategories}
                                            onChange={(e) => handleMultiSelectChange(e, 'excludedCategories')}
                                        >
                                            <option value="clearance">Clearance</option>
                                            <option value="giftcards">Gift Cards</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 flex items-center">
                                        <input
                                            type="checkbox"
                                            name="firstOrderOnly"
                                            id="firstOrderOnly"
                                            className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                                            checked={formData.firstOrderOnly}
                                            onChange={handleChange}
                                        />
                                        <label htmlFor="firstOrderOnly" className="ml-2 block text-sm font-medium text-gray-700 cursor-pointer">
                                            Valid for First Order Only
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="inline-flex items-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            Create Coupon
                        </button>
                    </div>
                </form>

                {showSuccess && (
                    <div className="fixed bottom-5 right-5 bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3 animate-fade-in-up">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                            <p className="font-bold">Success!</p>
                            <p className="text-sm">Coupon created successfully.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateCoupon;
