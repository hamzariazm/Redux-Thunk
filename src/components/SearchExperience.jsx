import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import _ from "lodash";

const SearchExperience = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const abortControllerRef = useRef(null);

  useEffect(() => {
    inputRef.current = _.debounce(onSearchText, 500);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const onSearchText = (input) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsLoading(true);
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    axios
      .get(`https://dummyjson.com/users/search?q=${input}`, {
        signal: abortController.signal,
      })
      .then((res) => {
        setResult(res.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Abort Controller");
        } else {
          console.log("Error occurred", error);
        }
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    inputRef.current(e.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Enter text to search"
        onChange={handleInputChange}
        value={input}
      ></input>
      {isLoading && <p className="loading">Loading...</p>}
      {result.map((user) => (
        <h3 key={user.id}>{user.firstName}</h3>
      ))}
    </div>
  );
};

export default SearchExperience;