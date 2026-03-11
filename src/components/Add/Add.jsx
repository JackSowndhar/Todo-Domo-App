import React from "react";
import Domo from "ryuu.js";
import { useNavigate } from "react-router-dom";
import { triggerWorkflow } from "../Utility/Workflow";

const Add = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const age = e.target.age.value;

    try {
      const res = await Domo.post(
        "/domo/datastores/v1/collections/project/documents",
        {
          content: {
            name: name,
            Age: age,
          },
        },
      );
      triggerWorkflow("Added", res.content);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="absolute top-8 left-8 px-4 py-2 rounded-full bg-black text-white"
        onClick={() => navigate("/")}
      >
        {" "}
        {" < "} Back
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl w-[320px] text-center shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Add New Data</h2>

        <input
          className="w-[90%] p-3 my-2 rounded-lg border border-gray-300 outline-none focus:border-[#0f5848] focus:shadow-lg"
          name="name"
          type="text"
          placeholder="Enter Name"
          required
        />

        <input
          className="w-[90%] p-3 my-2 rounded-lg border border-gray-300 outline-none focus:border-[#0f5848] focus:shadow-lg"
          name="age"
          type="number"
          placeholder="Enter Age"
          required
        />

        <button
          className="w-full py-3 mt-4 rounded-lg text-white bg-gradient-to-r from-[#0f5848] to-[#21332d] hover:scale-105 transition"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
