"use client";

import { useState } from "react";
import useCon from '../../../hooks/useCon';

export default function FAQAccordion() {
      const { config } = useCon();
        const { 
    deliveryChargeOutsideDhaka: outsideCharge,
    deliveryChargeInsideDhaka: insideCharge 
  } = config;

  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const items = [
    {
      title: "Shipping and Delivery",
      content: (
        <div className="space-y-3">
          <p className="mb-3">We offer nationwide shipping across Bangladesh with fast delivery times:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-1">Delivery Time</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Inside Dhaka:</span>
                  <span className="font-medium">1-2 days</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Outside Dhaka:</span>
                  <span className="font-medium">2-3 days</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-1">Delivery Charge</h4>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span className="text-gray-600">Inside Dhaka:</span>
                  <span className="font-medium">{insideCharge} Taka</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Outside Dhaka:</span>
                  <span className="font-medium">{outsideCharge} Taka</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Return and Refund",
      content: (
        <div className="space-y-3">
          <p>You can return items within 30 days of purchase for a full refund. Items must be in original condition.</p>
          
          <div className="bg-red-50 p-3 rounded-lg">
            <h4 className="font-semibold text-red-800 mb-2">Important Return Policy</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>If wrong or damaged product is delivered, make instant return</span>
              </li>
              <li className="flex items-start">
                <svg className="h-4 w-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Refund processed within 3-5 business days after return approval</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full flex flex-col mt-5 border border-gray-200 rounded-lg overflow-hidden">
      {items.map((item, index) => (
        <div key={index} className="overflow-hidden border-b border-gray-200 last:border-b-0">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex cursor-pointer items-center justify-between text-left px-4 py-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              {index === 0 ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
              )}
              <span className="font-medium text-gray-800">{item.title}</span>
            </div>
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-gray-500 transform transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`} 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          
          {openIndex === index && (
            <div className="px-4 py-3 bg-gray-50 pl-12 text-gray-600">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}