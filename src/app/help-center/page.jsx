import React from 'react';

const page = () => {
    return (
        <div className='min-h-screen bg-white max-w-[1400px] mx-auto py-10 px-4'>
            <h1 className="text-3xl font-bold mb-6">Help Center</h1>
            <p className="mb-8 text-gray-600">
                Welcome to our Help Center! Here you can find answers to frequently asked questions,
                get support for your orders, and learn more about our services.
            </p>

            <div className="space-y-8">
                {/* Section 1 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">📦 Order & Shipping</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Track your order in the "My Orders" section.</li>
                        <li>Standard delivery takes 3–5 business days.</li>
                        <li>We offer free shipping on orders over $50.</li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">💳 Payments & Refunds</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>We accept credit cards, debit cards, and digital wallets.</li>
                        <li>Refunds are processed within 5–7 business days.</li>
                        <li>Contact support if you notice any unauthorized charges.</li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">🔒 Account & Security</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Change your password regularly to keep your account secure.</li>
                        <li>Enable two-factor authentication for extra protection.</li>
                        <li>If you suspect suspicious activity, contact us immediately.</li>
                    </ul>
                </section>

                {/* Contact Section */}
                <section className="bg-gray-100 p-4 rounded-lg">
                    <h2 className="text-xl font-semibold mb-2">📞 Need More Help?</h2>
                    <p className="text-gray-700">
                        Our support team is available 24/7.  
                        Email us at <a href="mailto:support@example.com" className="text-blue-600 underline">info@bookforest.com</a>  
                        or call us at <span className="font-semibold">+8801734346050</span>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default page;
