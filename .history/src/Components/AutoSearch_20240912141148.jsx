/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { debouncedSetQuery, returnFullName } from "../utils/utils";
import { Dropdown } from "antd";

function AutocompleteSearch() {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const CompanyDetailSaver = (id) => {
    localStorage.setItem("companyId", id);
    navigate(`/Dashboard/${id}`);
  };



  const fetchCompanyListing = useCallback(() => {
    getApi(endPoints.company.getAll({ limit: 50, search: inputValue }), {
      setResponse: setData,
    });
  }, [inputValue]);

  useEffect(() => {
    fetchCompanyListing();
  }, [fetchCompanyListing]);

  console.log(data?.data?.docs)

  const companyListings = data?.data?.docs?.map((i) => ({
    companyName: returnFullName(i),
    id: i?._id,
  }));

  // Search results for the dropdown menu
  const searchResults = data?.data?.docs?.length
    ? data?.data?.docs?.map((suggestion, index) => ({
        label: (
          <span
            className="font-bold"
            onClick={() => CompanyDetailSaver(suggestion?.id)}
          >
            {}
          </span>
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
            onChange={(e) => debouncedSetQuery(e.target.value, setInputValue)}
            placeholder="Search Company name"
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
