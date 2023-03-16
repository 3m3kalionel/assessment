import React, { useState } from "react";

import TextHighlighter from "./TextHighlighter";

import { fetchData } from "../utils";
import { useOnClickOutside } from "../hooks";
import { searchResultsType } from "../types";

let timeout: NodeJS.Timeout;

const AutoComplete = () => {
  const [searchString, setSearchString] = useState<string>("");
  const [autoComplete, setAutoComplete] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<searchResultsType[]>([]);

  const { wrapperRef } = useOnClickOutside(setAutoComplete);

  const clearTimer = (): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  const doSearch = (searchString: string) => {
    if (searchString.length >= 3) {
      timeout = setTimeout(() => {
        fetchData(searchString, setSearchResults);
      }, 2000);
    }
  };

  const onTextChange = (value: string): void => {
    setSearchString(value);
    if (!value.trim()) {
      setAutoComplete(false);
    } else {
      setAutoComplete(true);
    }
  };

  const handleOnClick = (): void => {
    setAutoComplete(true);
  };

  return (
    <div className="auto-complete" ref={wrapperRef}>
      {
        <div className="input-wrapper">
          <input
            className="form-control"
            placeholder="Search..."
            value={searchString}
            aria-labelledby="search"
            aria-label="Search"
            onClick={() => {
              if (!autoComplete) {
                handleOnClick();
              }
            }}
            onKeyDown={clearTimer}
            onKeyUp={(e) => doSearch(searchString)}
            onChange={({ target: { value } }) => {
              onTextChange(value);
            }}
          />
        </div>
      }
      {autoComplete && (
        <div className="search-results">
          {searchString && searchResults.length ? (
            searchResults.map(({ pageid, snippet, title }) => (
              <div
                key={pageid}
                className="search-result"
                onClick={() => {
                  setAutoComplete(false);
                }}
              >
                <div className="result-text">
                  <TextHighlighter
                    text={title}
                    textToMatch={searchString}
                    className="styled-matching-text"
                  />
                  <div className="description">
                    {/* <p
                      dangerouslySetInnerHTML={{ __html: snippet }}
                    ></p> */}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="search-result-container">
              <div className="no-result-text">
                <h4>
                  ...
                </h4>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
