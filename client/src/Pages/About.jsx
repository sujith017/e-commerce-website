import React from "react";

const About = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen flex flex-col items-center">
      <h2 className="text-4xl font-extrabold text-center text-gray-800">About Vishal Super Market</h2>
      <p className="text-center text-gray-600 mt-2 text-lg">
        Celebrating moments with the brightest grocery since <span className="font-semibold">[Year of Establishment]</span>.
      </p>

      <div className="max-w-3xl mt-6 p-6 border border-gray-300 rounded-xl shadow-xl bg-white transition-transform duration-300 hover:scale-105">
        <h3 className="text-2xl font-semibold text-gray-800">Our Story</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          Vishal Super Market was founded with the vision of making celebrations more 
          memorable. Based in <span className="font-semibold">Sivakasi</span>, the heart of India's grocery industry, we 
          specialize in crafting high-quality, eco-friendly grocery.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-6">Our Commitment</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">
          🎇 <span className="font-semibold text-gray-700">Safety First:</span> All our products meet industry safety standards. <br />
          🌿 <span className="font-semibold text-gray-700">Eco-Friendly:</span> We strive to create grocery with minimal environmental impact. <br />
          ⭐ <span className="font-semibold text-gray-700">Customer Satisfaction:</span> We ensure the best experience for our customers.
        </p>

        <h3 className="text-2xl font-semibold text-gray-800 mt-6">Why Choose Us?</h3>
        <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-2">
          <li>Wide range of vibrant and high-quality grocery.</li>
          <li>Affordable prices with special festive discounts.</li>
          <li>Trusted by customers across India for over <span className="font-semibold">[X]</span> years.</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-800 mt-6">Visit Us</h3>
        <p className="mt-2 text-gray-600">
          📍 <strong className="text-gray-800">Location:</strong> Sivakasi, Tamil Nadu, India <br />
          📞 <strong className="text-gray-800">Call:</strong> +91 98765 43210 <br />
          📧 <strong className="text-gray-800">Email:</strong> info@srinivasgrocery.com
        </p>
      </div>
    </div>
  );
};

export default About;
