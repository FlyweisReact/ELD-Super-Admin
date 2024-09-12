/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { returnFullName } from "../utils/utils";
import { Dropdown } from "antd";

function AutocompleteSearch() {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const CompanyDetailSaver = () => {
    
  }

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const filtered = companyListings?.filter((fruit) =>
      fruit?.companyName?.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  useEffect(() => {
    getApi(endPoints.company.getAll({ limit: 1000 }), {
      setResponse: setData,
    });
  }, []);

  const companyListings = data?.data?.docs?.map((i) => ({
    companyName: returnFullName(i),
    id: i?._id,
  }));

  // Search results for the dropdown menu
  const searchResults = filteredSuggestions?.length
    ? filteredSuggestions?.map((suggestion, index) => ({
        label: (
          <Link
            to={`/Dashboard/${suggestion?.id}`}
            style={{ fontWeight: "bold" }}
          >
            {suggestion?.companyName}
          </Link>
        ),
        key: `${index}`,
      }))
    : [];

  return (
    <div className="search-dropdown">
      <Dropdown
        menu={{
          items: searchResults,
        }}
        trigger={["click"]}
      >
        <div>
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
    </div>
  );
}

export default AutocompleteSearch;
