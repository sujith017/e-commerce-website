import React from "react";
import { Link } from "react-router-dom";
import door from "../assets/fast-delivery.png";
import pay from "../assets/payment-method.png";
import sup from "../assets/support.png";
import TestimonialCard from "./TestimonialCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🖼️ Carousel image paths
import img1 from "../assets/images/1.jpg";
import img2 from "../assets/images/2.jpg";
import img3 from "../assets/images/3.jpg";
import img4 from "../assets/images/4.jpg";

const images = [img1, img2, img3, img4];

// 🎞️ Carousel component
const ImageCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="absolute -z-10 w-full h-screen overflow-hidden">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-screen object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* 🖼️ Carousel Background */}
      <div className="relative min-h-screen">
        <ImageCarousel />
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center space-y-3">
          {/* Add content here if needed */}
        </div>
      </div>

      {/* 🚚 Features */}
      <div className="my-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center bg-white">
            <img src={door} className="h-[80px]" alt="Doorstep Delivery" />
            <h1 className="text-2xl md:text-3xl font-semibold m-2">
              Fast Delivery
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Get your grocery delivered straight to your doorstep — safely, quickly, and on time.
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center bg-white">
            <img src={sup} className="h-[80px]" alt="24/7 Support" />
            <h1 className="text-2xl md:text-3xl font-semibold m-2">
              Anytime Support
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Our team is always just a message away to help you with anything — from orders to grocery tips!
            </p>
          </div>

          <div className="p-6 rounded-lg shadow-lg text-center flex flex-col items-center justify-center bg-white">
            <img src={pay} className="h-[80px]" alt="Secure Payments" />
            <h1 className="text-2xl md:text-3xl font-semibold m-2">
              Trusted Payments
            </h1>
            <p className="text-base md:text-lg text-gray-700">
              Shop confidently with secure and seamless payment options for a stress-free experience.
            </p>
          </div>
        </div>
      </div>

      {/* 🎉 Offer Banner */}
      <div className="bg-yellow-200 text-center p-4 rounded shadow mx-6">
        <h2 className="text-2xl font-bold">🔥 Festive Bonanza is On!</h2>
        <p className="text-gray-800">
          Enjoy up to <span className="font-semibold">50% OFF</span> on bestselling grocery. Don't miss out!
        </p>
      </div>

      {/* 🗣️ Testimonials */}
      <div className="my-5">
        <h2 className="text-3xl font-bold text-center mt-10 mb-4">
          💬 What Customers Are Saying
        </h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center px-6">
          <TestimonialCard
            name="Ravi"
            text="Super fast delivery, fresh produce, and a seamless shopping experience—love it!!"
          />
          <TestimonialCard
            name="Meena"
            text="Affordable prices, well-packed orders, and always reliable—my favorite grocery store!"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
