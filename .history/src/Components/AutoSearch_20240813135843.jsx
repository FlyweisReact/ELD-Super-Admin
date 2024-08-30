import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const company = ["Flyweis Technology Pvt. Ltd.", "Flyweis Group Pvt. Ltd.", "Flyweis IT Solutions",];

function AutocompleteSearch() {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [ data , setData ] = useState({})
  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    const filtered = company?.filter((fruit) =>
      fruit.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  console.log("filteredSuggestions" ,filteredSuggestions)

  return (
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
      <ul>
        {filteredSuggestions.map((suggestion) => (
          <li className="bg-[#E4E7E9] py-2 pl-4 mb-1 rounded-sm cursor-pointer" onClick={()=> navigate('/Dashboard')} key={suggestion}>
            {suggestion}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default AutocompleteSearch;
