"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Updated import

const GoMokuPage: React.FC = () => {
  const router = useRouter(); // Initialize the router

  return (
    <>
      <div>
        <button onClick={() => router.push("/")}>Back to Games List</button>{" "}
        {/* Back button */}
      </div>

      <div>
        <button
          onClick={() => {
            const message = encodeURIComponent("Check out this link: https://example.com");
            const imageUrl = "https://example.com/image.jpg"; // Replace with your image URL
            const telegramUrl = `tg://msg?text=${message}&url=${imageUrl}`;
            window.open(telegramUrl, "_blank");
          }}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Send Invitation to a friend
        </button>
      </div>
      {/* <GoMoku /> */}
    </>
  );
};

export default GoMokuPage;
