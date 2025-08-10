import React from 'react';

const page = () => {
    return (
        <div className='min-h-screen bg-white max-w-[1400px] mx-auto py-10 px-4'>
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-8 text-gray-600">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect
                your personal information when you use our website or services.
            </p>

            <div className="space-y-8">
                {/* Section 1 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">📋 Information We Collect</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Personal details such as your name, email address, and phone number.</li>
                        <li>Billing and shipping addresses for order processing.</li>
                        <li>Usage data including IP address, browser type, and pages visited.</li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">💡 How We Use Your Information</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>To process and deliver your orders.</li>
                        <li>To improve our website and customer experience.</li>
                        <li>To send you updates, promotions, and important notifications.</li>
                    </ul>
                </section>

                {/* Section 3 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">🔒 Data Security</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>We implement strong security measures to protect your personal data.</li>
                        <li>Only authorized personnel have access to sensitive information.</li>
                        <li>We never sell your personal data to third parties.</li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">📢 Cookies & Tracking</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>We use cookies to enhance your browsing experience.</li>
                        <li>You can disable cookies in your browser settings at any time.</li>
                        <li>Some features may not work properly without cookies enabled.</li>
                    </ul>
                </section>

                {/* Contact Section */}
              
            </div>
        </div>
    );
};

export default page;
