import React from "react";
import img from "../assets/Contact us.gif";
import { FaUser, FaEnvelope, FaPhone, FaCommentDots } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="pt-20 px-4 min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-white to-red-200">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        
        <div className="flex justify-center">
          <img src={img} alt="Contact Us" className="w-full max-w-md drop-shadow-xl" />
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white/30 transition hover:shadow-red-200">
          <h2 className="text-3xl font-extrabold text-green-600 text-center mb-2" style={{ fontFamily: "'Tektur', cursive" }}>
            Let’s Talk 
          </h2>
          <p className="text-center text-gray-700 mb-6">
            Fill out the form and we'll get back to you shortly.
          </p>

          <form className="flex flex-col gap-4">
            <div className="flex items-center border rounded-md px-3 py-2 bg-white">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Your Name"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white">
              <FaPhone className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-full outline-none bg-transparent"
              />
            </div>
            <div className="flex items-start border rounded-md px-3 py-2 bg-white">
              <FaCommentDots className="text-gray-500 mt-1 mr-2" />
              <textarea
                rows="3"
                placeholder="Your Message"
                className="w-full outline-none bg-transparent resize-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-red-600 text-white py-3 rounded-full shadow-md transition duration-300"
            >
              Shoot Message 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
