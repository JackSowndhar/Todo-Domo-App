import React, { useEffect, useState } from "react";
import Domo from "ryuu.js";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Method = () => {
  const [domodata, setDomodata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Domo.get(
          "/domo/datastores/v1/collections/project/documents",
        );
        setDomodata(res);
        setFilteredData(res);
        console.log(res);
      } catch (err) {
        console.error(err);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    const result = domodata.filter((item) =>
      item.content?.name?.toLowerCase().includes(search.toLowerCase()),
    );

    setFilteredData(result);
  }, [search, domodata]);

  const cardPage = (id) => {
    navigate(`/cardpage/${id}`);
  };

  return (
    <div className="w-[80%] h-[100vh] mx-auto text-center pt-10 ">
      <h1 className="text-[45px] font-bold tracking-[2px] text-[#f5f5dc] mb-8">
        TODO Domo-AppDB
      </h1>

      <div>
        <input
          className="px-5 py-3 mr-5 w-[250px] rounded-full text-[15px] shadow-lg outline-none"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Link to="/add">
          <button className="px-6 py-3 w-[250px] rounded-full text-white bg-gradient-to-r from-[#0f5848] to-[#21332d] transition hover:scale-[1.01] hover:shadow-xl">
            Add Data
          </button>
        </Link>
      </div>
      <br />

      {filteredData.map((item) => (
        <div
          key={item.id}
          className="grid place-items-center bg-gradient-to-br from-[#1a5f4d] to-[#3f635a] rounded-xl p-5 w-[350px] mx-auto my-5 text-white cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          onClick={() => cardPage(item.id)}
        >
          <h2 className="text-[25px] font-bold">{item.content?.name}</h2>
          <p>Age: {item.content?.Age}</p>
        </div>
      ))}
    </div>
  );
};

export default Method;
