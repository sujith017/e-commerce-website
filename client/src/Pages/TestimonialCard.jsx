// Components/TestimonialCard.jsx
import React from "react";

const TestimonialCard = ({ name, text, avatar }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-sm text-center">
      {avatar && (
        <img
          src={avatar}
          alt={name}
          className="w-16 h-16 mx-auto rounded-full mb-2"
        />
      )}
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-gray-600 italic">"{text}"</p>
    </div>
  );
};

export default TestimonialCard;
