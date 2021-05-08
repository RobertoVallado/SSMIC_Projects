//using extra file as module

 class EasyHTTP { 
  async get(url) { //makes get req
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async post(url, data) { // makes post request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json' //?? arbitrary syntax?
      },
      body: JSON.stringify(data)
    });

    const resData = await response.json();
    return resData;
  }

   async put(url, data) { //put request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const resData = await response.json();
    return resData;
  }

  async delete(url) { //delete rquest
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    });

    const resData = await 'Resource Deleted...';
    return resData;
  }
 }
