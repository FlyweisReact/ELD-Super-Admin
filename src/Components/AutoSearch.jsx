/** @format */

import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getApi } from "../Repository/Api";
import endPoints from "../Repository/apiConfig";
import { debouncedSetQuery, returnFullName } from "../utils/utils";
import { Dropdown } from "antd";

function AutocompleteSearch() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const CompanyDetailSaver = (id) => {
    localStorage.setItem("companyId", id);
    navigate(`/Logbook`);
  };

  const fetchCompanyListing = useCallback(() => {
    getApi(endPoints.companies.getAll({ limit: 50, search: inputValue }), {
      setResponse: setData,
    });
  }, [inputValue]);

  useEffect(() => {
    fetchCompanyListing();
  }, [fetchCompanyListing]);

  const searchResults = data?.data?.docs?.length
    ? data?.data?.docs?.map((suggestion, index) => ({
        label: (
          <button
            className="font-bold"
            onClick={() => CompanyDetailSaver(suggestion?._id)}
          >
            {returnFullName(suggestion)
              ? returnFullName(suggestion)
              : suggestion?.email}
          </button>
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
