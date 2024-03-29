// SearchBar.js
import React from "react";

function SearchBar(props) {
    return (
        <div className="pt-20">

            < div className="bg-white p-4 shadow rounded" >
                <div className="max-w-screen-lg mx-auto">
                    <form className="flex justify-between items-center">
                        <div className="flex-grow mr-4">
                            <label htmlFor="search" className="sr-only">Job title, keywords, or company</label>
                            <input
                                id="search"
                                type="text"
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                placeholder="Job title, keywords, or location"
                                value={props.searchTerm}
                                onChange={event => props.onSearchTermChange(event.target.value)}
                            />
                        </div>

                    </form>
                </div>
            </div >
        </div >
    );
}

export default SearchBar;
