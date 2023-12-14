import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Bookmark from './Bookmark';
import './css/bookmarks.css';
import { Collapse } from 'react-bootstrap';
import DataAccess from '../accessLayer/DataAccess';

const dataAccess = new DataAccess();
const SearchHistory = ({ userid }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
     
      const historyData = await dataAccess.fetchSearchHistory(userid);
      console.log('Received data:', historyData);
      setSearchHistory(historyData);
      console.log('Search history set:', searchHistory);
    } catch (error) {
      // Handle errors here
      console.error('Error fetching search history:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, [userid]);

  // remove unessesary charachters - keep safe against sql injections (add earlier in search to complely avoid injection)
  const sanitizeSearchString = (searchString) => {
    // Remove any unwanted characters using regex (allowing only alphanumeric and spaces)
    return searchString.replace(/[^a-zA-Z0-9\s]/g," ");
  };

  return (
    <div>
      <h2>Your Searches</h2>
      <button
        type="button"
        className="btn btn-warning"
        onClick={() => setOpen(!open)}
        aria-controls="searchHistoryCollapse" 
        aria-expanded={open}
      >
        <h2button>Click to expand or collapse</h2button>
      </button>
      <br />
      <br />

      <Collapse in={open} id="searchHistoryCollapse">
        <div>
          <table className="table table-bordered table-black-background">
            <thead>
              <tr>
                <th>Search Strings</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
                searchHistory.map((entry, index) => (
                  <tr key={index}>
                    <td>
                      <NavLink
                        to={`/search/${sanitizeSearchString(entry.search_string)}`}
                        style={{ textDecoration: 'underline', color: 'blue' }}
                        key={entry.search_string}
                      >
                        {sanitizeSearchString(entry.search_string)}
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
      </Collapse>
    </div>
  );
};

export default SearchHistory;