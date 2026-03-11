import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Domo from "ryuu.js";
import { triggerWorkflow } from "../Utility/Workflow";

const Cardpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const getCardDetails = async () => {
      try {
        const res = await Domo.get(
          `/domo/datastores/v1/collections/project/documents/${id}`,
        );

        console.log(res);
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };

    getCardDetails();
  }, [id]);

  if (!data) {
    return (
      <h2 className="flex justify-center items-center h-screen text-3xl text-white">
        Loading...
      </h2>
    );
  }

  const handleDelete = async () => {
    await Domo.delete(
      `/domo/datastores/v1/collections/project/documents/${data.id}`,
    );
    triggerWorkflow("Deleted", data.content);
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <button
        className="absolute top-8 left-8 px-4 py-2 rounded-full bg-black text-white"
        onClick={() => navigate("/")}
      >
        {" "}
        {" < "} Back
      </button>

      <div className="bg-gradient-to-br from-[#1a5f4d] to-[#517a6f] text-[#f5f5dc] p-10 rounded-2xl text-center w-[320px] shadow-2xl leading-loose ">
        <h2 className="text-[25px] font-bold">{data.content?.name}</h2>
        <p>
          <strong>Age:</strong> {data.content?.Age}
        </p>
        <p>
          <strong>Collection:</strong> project
        </p>{" "}
        <br />
        <button
          className="px-5 py-1 mr-3 rounded-lg text-white bg-gradient-to-br from-[#36665a] to-[#113e32] hover:scale-105 transition"
          onClick={() => navigate(`/edit/${data.id}`)}
        >
          Edit
        </button>
        <button
          className="px-5 py-1 rounded-lg text-white bg-gradient-to-r from-red-500 to-red-700 hover:scale-105 transition"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Cardpage;
