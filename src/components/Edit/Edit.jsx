import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Domo from "ryuu.js";
import { triggerWorkflow } from "../Utility/Workflow";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Domo.get(
          `/domo/datastores/v1/collections/project/documents/${id}`,
        );

        setName(res.content?.name || "");
        setAge(res.content?.Age || "");
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      content: {
        name: name,
        Age: age,
      },
    };

    try {
      await Domo.put(
        `/domo/datastores/v1/collections/project/documents/${id}`,
        updatedData,
      );
      triggerWorkflow("Updated", updatedData.content);
      navigate(`/cardpage/${id}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button
        className="absolute top-8 left-8 px-4 py-2 rounded-full bg-black text-white"
        onClick={() => navigate(`/cardpage/${id}`)}
      >
        {" "}
        {" < "} Back
      </button>
      <form
        onSubmit={handleUpdate}
        className="bg-gradient-to-br from-[#1a5f4d] to-[#517a6f] p-10 rounded-2xl w-[320px] text-center shadow-2xl leading-loose"
      >
        <h2 className="text-2xl text-white font-bold mb-4">Edit Data</h2>

        <input
          type="text"
          className="w-[90%] p-3 my-2 rounded-lg border border-gray-300 outline-none"
          value={name}
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-[90%] p-3 my-2 rounded-lg border border-gray-300 outline-none"
          type="number"
          value={age}
          placeholder="Enter Age"
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <button
          className="w-full py-3 mt-4 rounded-lg text-white bg-gradient-to-br from-[#29413b] to-[#113e32] transition hover:scale-[1.04] hover:shadow-lg"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default Edit;
