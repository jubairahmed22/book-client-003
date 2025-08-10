import React from 'react';

const page = () => {
    return (
        <div className='min-h-screen bg-white max-w-[1400px] mx-auto py-10 px-4'>
            <h1 className="text-3xl font-bold mb-6">Store Pickup</h1>
            <p className="mb-8 text-gray-600">
                Our Store Pickup service allows you to shop online and collect your order 
                from your nearest store at your convenience.
            </p>

            <div className="space-y-8">
                {/* Section 1 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">🛒 How Store Pickup Works</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Place your order online and choose "Store Pickup" at checkout.</li>
                        <li>Select your preferred store location.</li>
                        <li>We'll notify you by email or SMS when your order is ready.</li>
                    </ul>
                </section>

                {/* Section 2 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">📍 Pickup Locations</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>
                            Octroy Mor, Kazla, Rajshahi-6204 (Beside University of Rajshahi)
                        </li>
                    </ul>
                    <p className="text-gray-600 mt-2">
                        More pickup locations are being added soon.
                    </p>
                </section>

                {/* Section 3 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">📦 Pickup Guidelines</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>Bring a valid photo ID and your order confirmation email.</li>
                        <li>Orders must be collected within 7 days of notification.</li>
                        <li>If you cannot collect it yourself, authorize someone else in writing.</li>
                    </ul>
                </section>

                {/* Section 4 */}
                <section>
                    <h2 className="text-xl font-semibold mb-2">💡 Benefits of Store Pickup</h2>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        <li>No shipping fees.</li>
                        <li>Pick up your items at your convenience.</li>
                        <li>Check the product before leaving the store.</li>
                    </ul>
                </section>

        
            </div>
        </div>
    );
};

export default page;
