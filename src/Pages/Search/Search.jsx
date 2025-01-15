import React, { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchedResults from "../../components/SearchComponents/SearchedResults";
import { useSearchParams } from "react-router-dom";
import { useLazySearchUserQuery } from "../../rtkQuery/authQuery";
import SearchSkeleton from "../../components/SearchComponents/SearchSkeleton";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchUser, { data: searchResults, isFetching, error, isLoading }] =
    useLazySearchUserQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedTerm) {
      searchUser({ username: debouncedTerm });
    }
  }, [debouncedTerm, searchUser]);

  return (
    <div className="p-4">
      <div className="border border-gray-700 bg-black rounded-xl flex items-center px-4 py-1">
        <IoIosSearch size={25} className="text-gray-600" />
        <input
          type="search"
          name="search"
          id=""
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full  outline-none py-2 rounded-xl px-4 bg-transparent"
        />
      </div>

      <div className="p-4">
        {isLoading && (
          <div>
            <SearchSkeleton />
            <SearchSkeleton />
            <SearchSkeleton />
          </div>
        )}

        {searchResults?.map((user) => (
          <div key={user._id}>
            <SearchedResults
              username={user.username}
              profilePicture={user.profilePicture}
              fullname={user.fullName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
