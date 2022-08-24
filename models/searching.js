const axios = require("axios")

class Searching {

  history = ['Tegusigalpa', 'Madrid', 'San Jose']

  constructor() {
    // TODO: read db if exists
  }

  get getParamsMapBox() {
    return {
      'access_token': 'pk.eyJ1IjoiYnJhbmRvbi1ycyIsImEiOiJjbDZzNzJ3YWQxYjc3M2RwMDFwMHpxZjUyIn0.0IEYN0zORK3Fi0ZFF016tA',
      'limit': 5,
      'language': 'es'
    }
  }

  async city(place = '') {

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.getParamsMapBox
      })

      const resp = await instance.get()
      console.log(resp.data)

      return []
    } catch (error) {
      return []
    }



  }

}

module.exports = Searching