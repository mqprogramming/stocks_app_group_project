const baseURL = 'http://localhost:3000/api/shares_portfolio/';

export default {
  getPortfolio(){
    return fetch(baseURL)
    .then(res => res.json())
  },
  postPortfolio(payload){
    return fetch(baseURL, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json'},
    })
    .then(res => res.json())
  },
  deletePortfolio(id) {
    return fetch(baseURL + id, {
      method:'DELETE',
    });
  }

}


      