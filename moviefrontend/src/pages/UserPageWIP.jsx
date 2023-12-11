import React, { useContext, useEffect } from 'react';
import RatedForUid from '../components/RatedForUid.jsx';
import Bookmarks from '../components/Bookmarks.jsx';
import UserContext from '../components/UserContext';
import SearchHistory from '../components/SearchHistory.jsx';
import { useNavigate } from 'react-router-dom';
import "./css/userpagecss.css";

const UserPageWIP = () => {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken === null) {
      // If userToken is null, navigate to the home screen
      navigate('/');
    }
  }, [userToken, navigate]);

  // If userToken is null, don't render the components
  if (userToken === null) {
    return null;
  }

  const userid = userToken.id;

  return (
    <div className='container'>
      <SearchHistory userid={userid}/>
      <RatedForUid userid={userid} />
      <Bookmarks userid={userid} />
    </div>
  );
};

export default UserPageWIP;
