const fs = require('fs')

const axios = require("axios")

class Searching {

  history = []
  dbPath = './db/db.json'

  constructor() {
    this.readDB()
  }

  get getParamsMapBox() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es'
    }
  }

  get getParamsOpenWeather() {
    return {
      'appid': process.env.OPENWEATHER_KEY,
      'units': 'metric',
      'lang': 'en',
    }
  }

  get historyCap() {

    return this.history.map(place => {
      let words = place.split(' ')
      words = words.map(p => p[0].toUpperCase() + p.substring(1))

      return words.join(' ')
    })

  }

  async city(place = '') {

    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.getParamsMapBox
      })

      const resp = await instance.get()

      return resp.data.features.map(place => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1]
      }))

    } catch (error) {
      return []
    }

  }

  async weatherPlace(lat, lon) {

    try {

      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          ...this.getParamsOpenWeather,
          lat,
          lon,
        }
      })

      const resp = await instance.get()
      const { main, weather } = resp.data

      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      }

    } catch (error) {
      console.log(error)
    }

  }

  addHistory(place = '') {

    if (this.history.includes(place.toLocaleLowerCase())) {
      return null;
    }
    this.history.unshift(place.toLocaleLowerCase())

    this.saveDB()

  }

  saveDB() {

    const payload = {
      history: this.history
    }
    fs.writeFileSync(this.dbPath, JSON.stringify(payload))

  }

  readDB() {

    if (!fs.existsSync(this.dbPath)) {
      return null
    }

    const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' })
    const data = JSON.parse(info)

    this.history = data.history

  }

}

module.exports = Searching