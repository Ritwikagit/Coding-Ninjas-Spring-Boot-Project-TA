import React from "react";
import { Link } from "react-router-dom";
import { IoBag } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";

const Home = () => {
  return (
    <div className="px-60">
      <div className="flex flex-col items-center pt-20">
        <div className="text-white bg-blue-400 text-4xl p-2 rounded-full">
          <IoBag />
        </div>

        <h1 className="text-6xl font-bold py-4">FreelanceHub</h1>
        <p className="text-xl text-center opacity-50">
          Connect talented freelancers with exciting projects. Built with Spring
          Boot microservices and React.
        </p>

        <Link to="/signin" className="bg-blue-400 px-5 py-3 text-white rounded-md flex gap-4 items-center my-14 font-semibold">
          Get Started <FaArrowRight />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-x-10">
        <div className="flex flex-col border border-blue-100 rounded-2xl p-6">
          <p className="pb-4">
            <IoMdPeople className="text-blue-400 bg-blue-200 text-5xl p-2 rounded-2xl" />
          </p>
          <h3 className="text-xl font-semibold pb-1">For Clients</h3>
          <p className="text-sm opacity-70">
            Post projects, specify required skills, and find the perfect
            freelancer match with AI-powered scoring.
          </p>
        </div>
        <div className="flex flex-col border border-blue-100 rounded-2xl p-6">
          <p className="pb-4">
            <IoMdPeople className="text-blue-400 bg-blue-200 text-5xl p-2 rounded-2xl" />
          </p>
          <h3 className="text-xl font-semibold pb-1">For Freelancers</h3>
          <p className="text-sm opacity-70">
            Showcase your skills, discover matching projects, and submit competitive bids to land your next gig.
          </p>
        </div>
        <div className="flex flex-col border border-blue-100 rounded-2xl p-6">
          <p className="pb-4">
            <IoBag className="text-green-600 bg-green-200 text-5xl p-2 rounded-2xl" />
          </p>
          <h3 className="text-xl font-semibold pb-1">Smart Matching</h3>
          <p className="text-sm opacity-70">
            Our platform calculates match scores based on skills, helping clients find the best talent quickly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
