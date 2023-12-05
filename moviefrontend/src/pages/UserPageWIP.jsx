import React from 'react';
import RatedForUid from '../components/RatedForUid.jsx';
import Bookmarks from '../components/Bookmarks.jsx';

const UserPageWIP = () => {

    const userid = "1";

  
    return (
      <div>
        <RatedForUid userid={userid} />
        <Bookmarks userid={userid}/>
      </div>
    );
  };

export default UserPageWIP;