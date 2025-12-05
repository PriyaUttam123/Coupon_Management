import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

const CouponCard = ({ coupon }) => {
    if (!coupon) return null;

    return (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 shadow-sm relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-100 rounded-full opacity-50 blur-xl"></div>

            <div className="flex items-start justify-between relative z-10">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            BEST OFFER
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-wide flex items-center gap-2">
                        {coupon.code}
                        <Sparkles className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </h3>
                    <p className="text-gray-600 mt-1">{coupon.description}</p>
                </div>
                <div className="bg-white p-3 rounded-full shadow-sm">
                    <Tag className="w-8 h-8 text-blue-600" />
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-dashed border-blue-200">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-sm text-gray-500 mb-1">You Save</p>
                        <p className="text-3xl font-bold text-blue-600">
                            ${coupon.discountAmount}
                        </p>
                    </div>
                    {coupon.finalPrice && (
                        <div className="text-right">
                            <p className="text-sm text-gray-500 mb-1">Final Price</p>
                            <p className="text-xl font-semibold text-gray-900">${coupon.finalPrice}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CouponCard;
