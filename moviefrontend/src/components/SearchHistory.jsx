import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';

const SearchHistory = ({ userid }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    fetchSearchHistory(userid);
  }, [userid]);

  function fetchSearchHistory(uid) {
    fetch(`http://localhost:5001/api/searchhistory/${uid}`)
      .then((res) => res.json())
      .then((json) => {
        setSearchHistory(json);
      })
      .catch((error) => {
        console.error('Error fetching search history:', error);
      });
  }

  return (
    <div>
      <table className="table table-bordered table-black-background">
        <thead>
          <tr>
            <th>Search String</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
            searchHistory.map((entry, index) => (
              <tr key={index}>
                <td>
                  <NavLink
                    to={`/search/${entry.search_string}`}
                    style={{ textDecoration: 'underline', color: 'blue' }}
                    key={entry.search_string}
                  >
                    {entry.search_string}
                  </NavLink>
                </td>
                <td>{entry.time}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No search history found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchHistory;
