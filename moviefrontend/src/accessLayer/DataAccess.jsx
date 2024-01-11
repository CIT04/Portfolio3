class DataAccess {
  constructor() {
    this.apiBaseUrl = 'http://localhost:5001';
  }

  async searchYouTubeTrailer(movieTitle) {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${encodeURIComponent(
          movieTitle + " trailer"
        )}&key=INSERT API KEY HERE (cannot put public api key when publishing on github)&part=snippet&type=video&videoEmbeddable=true&maxResults=1`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].id.videoId;
      }
    } catch (error) {
      console.error("Error searching YouTube:", error);
      throw error;
    }
  }

  async loginUser(username, password) {
    const loginCredentials = {
      Username: username,
      Password: password,
    };

    try {
      const response = await this.fetchData('api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginCredentials),
      });

     

      // Check if the response contains the expected properties
      if (response.id && response.username && response.token) {
        return response;
      } else {
        console.error('Invalid response format:', response);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  }


  async fetchData(endpoint, options) {
    try {
      const response = await fetch(`${this.apiBaseUrl}/${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`Error fetching data from ${endpoint}: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }
  async fetchMediaDetails(mediaId) {
    const endpoint = `api/media/${mediaId}`;
    return this.fetchData(endpoint);
  }

  async fetchSearchHistory(uid) {
    const endpoint = `api/searchhistory/${uid}`;
    return this.fetchData(endpoint);
  }

  async fetchTeamData(mediaId) {
    const endpoint = `api/media/team/${mediaId}`;
    return this.fetchData(endpoint);
  }

  async fetchBookmarks(userId) {
    const endpoint = `api/bookmark/${userId}`;
    return this.fetchData(endpoint);
  }

  
  async fetchRatings(userId) {
    const endpoint = `api/localrating/${userId}`;
    return this.fetchData(endpoint);
  }
  async fetchRatingsByMid(mid) {
    const endpoint = `api/localrating/bymid/${mid}`;
    return this.fetchData(endpoint);
  }

  async fetchRatingsForMedia(userId, mediaId) {
    const endpoint = `api/localrating/${userId}/${mediaId}`;
    return this.fetchData(endpoint);
  }
  
  async saveLocalRating(userId, mediaId, hasRated, localScore) {
    console.log("localscore:"+hasRated)
    const baseEndpoint = 'api/localrating';
    const endpoint = hasRated ? `${baseEndpoint}/update` : `${baseEndpoint}/create`;
    const method = hasRated ?'PUT': 'POST'; 

    return this.fetchData(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        U_id: userId,
        M_id: mediaId,
        LocalScore: localScore,
      }),
    });
  }

  async deleteSearchHistory(u_id) {
    const endpoint = `api/searchhistory/${u_id}`;
    try {
      const response = await this.fetchData(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error deleting search history:', error);
    }
  }
  
  async deleteLocalRating(userId, mediaId) {
    const endpoint = 'api/localrating/delete';

    try {
      const response = await this.fetchData(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          M_id: mediaId,
          U_id: userId,
        }),
      });

      return response;
    } catch (error) {
      console.error('Error deleting local rating:', error);
      throw error;
    }
  }
  async createBookmark(mediaId, userId) {
    const endpoint = 'api/bookmark/create';
    const method = 'POST';
    const body = JSON.stringify({ M_id: mediaId, U_id: userId });

    return this.fetchData(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  }

  async deleteBookmark(mediaId, userId) {
    const endpoint = 'api/bookmark/delete';
    const method = 'DELETE';
    const body = JSON.stringify({ M_id: mediaId, U_id: userId });

    return this.fetchData(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });
  }

}

export default DataAccess;
