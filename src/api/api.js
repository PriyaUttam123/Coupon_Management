const API_BASE_URL = 'http://localhost:8080/api'; // Change this to your actual backend URL

/**
 * Creates a new coupon.
 * @param {Object} couponData - The coupon data object.
 * @returns {Promise<Object>} - The created coupon response.
 */
export const createCoupon = async (couponData) => {
    try {
        constresponse = await fetch(`${API_BASE_URL}/coupons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(couponData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to create coupon:', error);
        throw error;
    }
};

/**
 * Finds the best applicable coupon for a given cart and user.
 * @param {Object} requestData - Object containing { user, cart }.
 * @returns {Promise<Object>} - The best coupon details.
 */
export const getBestCoupon = async (requestData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/coupons/best`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to get best coupon:', error);
        throw error;
    }
};

/**
 * Fetches all available coupons.
 * @returns {Promise<Array>} - List of coupons.
 */
export const getAllCoupons = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/coupons`);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch coupons:', error);
        throw error;
    }
};
