/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { returnFullName } from "../utils/utils";
import { Dropdown } from "antd";

function AutocompleteSearch() {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const filtered = companyListings?.filter((fruit) =>
      fruit?.companyName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  useEffect(() => {
    getApi(endPoints.company.getAll({ limit: 100 }), {
      setResponse: setData,
    });
  }, []);

  const companyListings = data?.data?.docs?.map((i) => ({
    companyName: returnFullName(i),
    id: i?._id,
  }));

  console.log(data);

  console.log("companyListings", companyListings);

  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];

  return (
  

      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <div  >
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Search Company name or DOT"
            className="w-full pr-8"
          />
          <img
            src="../Vector (20).png"
            alt=""
            className="absolute top-2 right-4 w-[24px]"
          />
        </div>
      </Dropdown>


  );
}

export default AutocompleteSearch;
