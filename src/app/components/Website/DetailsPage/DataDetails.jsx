import React, { useEffect, useState } from "react";
import "../../../../styles/productDetails.css";
import { motion } from "framer-motion";
import { useCart } from "../../../hooks/useCart";
import FAQAccordion from "./FAQAccordion"
import Link from "next/link";
const DataDetails = ({ product }) => {
  const { addToCart, removeFromCart, isInCart, updateCart, cart } = useCart();
  const productInCart = isInCart(product._id);
  const cartItem = cart.find((item) => item._id === product._id);
  const [quantity, setQuantity] = useState(1);

  // Calculate discounted price
  const calculateDiscount = () => {
    if (product.discount && product.discountValue) {
      if (product.discountType === "percentage") {
        return product.price - (product.price * product.discountValue) / 100;
      }
      return product.price - product.discountValue;
    }
    return product.price;
  };

  const discountedPrice = calculateDiscount();
  const hasDiscount = product.discount && product.discountValue;
  const rating = product.rating || 0;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Add to cart function

  // Render star rating (unchanged)
  const renderStars = () => {
    const stars = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`full-${i}`}
          className="w-4 h-4 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative w-4 h-4">
          <svg
            className="absolute w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg
            className="absolute w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      );
    }

    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-${i}`}
          className="w-4 h-4 text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  // Sync quantity with cart item when it changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const handleCartAction = () => {
    if (productInCart) {
      removeFromCart(product._id);
    } else {
      addToCart({ ...product, quantity });
    }
  };

  const handleBuyNowAction = () => {
    addToCart({ ...product, quantity });
    // Redirect to shipping page after adding to cart
    window.location.href = "/cart";
    // Or if you're using React Router:
    // navigate('/shipping');
  };

  const updateQuantity = (newQuantity) => {
    // Validate quantity
    newQuantity = Math.max(1, Math.min(newQuantity, product.stock));
    setQuantity(newQuantity);

    // If product is in cart, update cart immediately
    if (productInCart) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: newQuantity } : item
      );
      updateCart(updatedCart);
    }
  };

  const handleIncrement = () => updateQuantity(quantity + 1);
  const handleDecrement = () => updateQuantity(quantity - 1);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    updateQuantity(value);
  };

  return (
    <div className="fontPoppins bangla-text flex flex-col gap-4 ">
      <h1 className="text-title font-bold">{product.title}</h1>
      <div className="flex flex-row gap-10">
        <h1 className="text-author-data font-semibold">
          <span className="text-author">Author : </span>
          {product.author.name}
        </h1>
        <div className="flex items-center gap-1">
          <div className="flex">{renderStars()}</div>
          <span className="text-ratting ml-1 font-semibold">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
      <hr className="des-line w-full"></hr>
      <div className="mt-1">
        <h1 className="font-semibold flex items-center gap-2">
          {product.stock <= 15 ? (
            <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded-lg text-sm flex items-center gap-1">
              ⚠️ Low Stock Only {product.stock} left!
            </span>
          ) : (
            <div className="in-stock w-20 py-1 rounded text-white flex justify-center items-center">
              <h1 className="font-semibold">Stock : {product.stock}</h1>
            </div>
          )}
        </h1>
        {hasDiscount ? (
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                BDT {discountedPrice.toFixed(2)}
              </span>
              <del className="text-sm text-gray-500">
                BDT {product.price.toFixed(2)}
              </del>
            </div>
            {product.discountType === "percentage" && (
              <span className="text-xs text-red-600">
                You save BDT {(product.price - discountedPrice).toFixed(2)} (
                {product.discountValue}%)
              </span>
            )}
          </div>
        ) : (
          <span className="text-lg font-bold text-gray-900">
            BDT {product.price.toFixed(2)}
          </span>
        )}
      </div>
      <h1 className="description indent-8">{product.description} ...</h1>
      <hr className="des-line w-full"></hr>
      <div className="flex flex-col gap-2 ">
        <h1 className="quantity font-semibold fontPoppins">Quantity</h1>
        <div className="flex flex-row layoutFlexOne gap-5">
          <div className="flex flex-row w-[50%] largeWidth  items-center justify-between rounded-md border border-gray-300 dark:border-gray-300 px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-400 dark:bg-white">
            <button
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className={`p-1 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-colors duration-200 ${
                quantity <= 1
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-700 dark:text-gray-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 12H4"
                />
              </svg>
            </button>

            <input
              type="number"
              value={quantity}
              min="1"
              max={product.stock}
              onChange={handleInputChange}
              aria-label="Quantity"
              className="w-12 flex-1 text-center bg-transparent border-none focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none dark:text-gray-900 font-medium"
            />

            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
              className={`p-1 cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-colors duration-200 ${
                quantity >= product.stock
                  ? "opacity-50 cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-100 text-gray-700 dark:text-gray-900"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-row layoutFlexOne gap-5">
            <motion.button
              onClick={handleCartAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={` transition-colors duration-200 cursor-pointer addCartButtons px-6 py-3.5 rounded-md flex items-center justify-center gap-2 ${
                productInCart
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {productInCart ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                )}
              </svg>
              {productInCart ? "Remove from Cart" : "Add to Cart"}
            </motion.button>
            <motion.button
              onClick={handleBuyNowAction}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`transition-all duration-200 text-[14px] cursor-pointer px-6 py-3 rounded-md flex items-center justify-center gap-2 font-medium ${
                productInCart
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              }`}
            >
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Buy Now
              </>
            </motion.button>
          </div>
          
        </div>
       <div className="mt-5 flex flex-row layoutFlexOne gap-4 w-full">
  {/* Instant Return Policy Card */}
  <Link href="/privacy-policy" className="w-full cursor-pointer">
  <div className="w-full bg-white p-2 rounded-lg shadow-sm flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="p-1 bg-gray-100 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#50C878]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
      </svg>
    </div>
    <div>
      <h1 className="font-medium text-gray-800 text-[14px]">Instant Return Policy</h1>
    </div>
  </div>
  </Link>

  {/* Fast Shipping Card */}
  <Link href="/store-pickup" className="w-full cursor-pointer">
  <div className="w-full bg-white p-2 rounded-lg shadow-sm flex items-center gap-4 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="p-1 bg-gray-100 rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
    <div>
      <h1 className="font-medium text-gray-800 text-[14px]">Fast & Free Shipping</h1>
    </div>
  </div>
  </Link>
       </div>
<div className="flex flex-col w-full mt-5">
  <div className="flex flex-row justify-between w-full h-16 gap-1">
    {/* Ordered - Today's Date */}
    <div className="flex flex-col items-center w-full relative">
      <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="absolute top-12 mt-1 text-center">
        <div className="text-sm font-medium text-gray-800">Ordered</div>
        <div className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
      </div>
      <div className="absolute top-5 w-full h-1 bg-blue-200 left-1/2"></div>
    </div>

    {/* Ready - Next Date */}
    <div className="flex flex-col items-center w-full relative">
      <div className="z-10 flex items-center justify-center w-10 h-10 bg-blue-200 rounded-full border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="absolute top-12 mt-1 text-center">
        <div className="text-sm font-medium text-gray-800">Ready</div>
        <div className="flex flex-row items-center gap-2">
          <div className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
        -
        <div className="text-xs text-gray-500">
          {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        </div>
      </div>
      <div className="absolute top-5 w-full h-1 bg-blue-200 left-1/2"></div>
    </div>

    {/* Delivered - Tomorrow's Date */}
    <div className="flex flex-col items-center w-full relative">
      <div className="z-10 flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full border-2 border-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-2a1 1 0 00-.293-.707l-3-3A1 1 0 0016 7h-1V5a1 1 0 00-1-1H3z" />
        </svg>
      </div>
      <div className="absolute top-12 mt-1 text-center">
        <div className="text-sm font-medium text-gray-800">Delivered</div>
        <div className="flex flex-row items-center gap-2">
        
        <div className="text-xs text-gray-500">
          {new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        -
<div className="text-xs text-gray-500">
          {new Date(Date.now() + 172800000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        </div>
        
      </div>
    </div>
  </div>

</div>
<div className="mt-10 flex flex-col  justify-center items-center">
  <h1 className="text-xl font-bold text-[#50C878]">Need Help Contact Us</h1>
  <h1 className="mt-2 text-black font-semibold">Call us at : +8801734346050</h1>
<a
  href="https://wa.me/8801734346050"
  target="_blank"
  rel="noopener noreferrer"
>
  <button className="px-4 cursor-pointer fontPoppins py-2 mt-5 text-[14px] bg-[#50C878] text-white rounded-lg hover:bg-[#45b06f] transition-colors">
    Chat on WhatsApp
  </button>
</a>
</div>
<div>
  <FAQAccordion></FAQAccordion>
</div>
      </div>
      <hr className="des-line w-full mt-6"></hr>
      <div className="fontPoppins">
        <h1 className="categoryText">
          <span>Category :</span> {product.parentCategory.title}
        </h1>
        <h1 className="categoryText">Tags : {product.tags.join(", ")}</h1>
      </div>
      <div class="social-icons mt-4">
        <a
          className="cursor-pointer"
          href="https://www.facebook.com/profile.php?id=61571047718168&rdid=bn7i0Ydnh3ytv117&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CNTmoEddS%2F#"
          target="_blank"
          aria-label="Facebook"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#50C878">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </a>

        <a
          className="cursor-pointer"
          href="https://www.instagram.com/bookforest2025?utm_source=qr&igsh=MWh2cTUydmFvd2IwaQ%3D%3D"
          target="_blank"
          aria-label="Instagram"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#50C878">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
        </a>

        <a
          className="cursor-pointer"
          href="https://www.linkedin.com/in/book-forest-27502b379/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          aria-label="LinkedIn"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#50C878">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        {/* 
        <a className="cursor-pointer" href="#" target="_blank" aria-label="YouTube">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#50C878">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
          </svg>
        </a> */}

        <a
          className="cursor-pointer"
          href="https://x.com/BookForest2025?t=6H2hD3PaUSou4-kFFN_X9g&s=09"
          target="_blank"
          aria-label="X"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#50C878">
            <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
          </svg>
        </a>
        <a
          className="cursor-pointer"
          href="https://www.tiktok.com/@book.forest2?_t=ZS-8yeKXSCgzGE&_r=1"
          target="_blank"
          aria-label="TikTok"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#50C878">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default DataDetails;
