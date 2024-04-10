// SearchBar.js
import React from "react";

function SearchBar(props) {
    return (
      <div className="pt-20">
        <div className="bg-white p-4 shadow rounded">
          <div className="max-w-screen-lg mx-auto">
            <form className="flex justify-between items-center flex-row">
              {/* Search input */}
              <div className="flex-grow mr-4">
                <label htmlFor="search" className="sr-only">
                  Search for job title, keywords, or company
                </label>
                <input
                  id="search"
                  type="text"
                  className="w-full px-4 py-3 border border-medium-green shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg"
                  placeholder="Search for job title, keywords, or company"
                  value={props.searchTerm}
                  onChange={(event) =>
                    props.onSearchTermChange(event.target.value)
                  }
                />
              </div>
              <div>
                <label htmlFor="location" className="sr-only">
                  Enter city name for location
                </label>
                <input
                  id="location"
                  type="text"
                  className="w-full px-4 py-3 border border-medium-green shadow-md rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-lg"
                  placeholder="Enter city name for location"
                  value={props.locationTerm}
                  onChange={(event) =>
                    props.onLocationTermChange(event.target.value)
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default SearchBar;
