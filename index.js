require('dotenv').config()

const { inquirerMenu, stop, readInput, listPlaces } = require("./helpers/inquirer");
const Searching = require("./models/searching");

const main = async () => {

  const searching = new Searching()
  let opt

  do {

    opt = await inquirerMenu()

    switch (opt) {

      case 1:

        // [x]: Show message.
        const place = await readInput('City:')

        // [x]: Search places.
        const places = await searching.city(place)

        // [x]: Select place.
        const id = await listPlaces(places)
        if (id === '0') continue
        const selectedPlace = places.find(place => place.id === id)

        // [x]: description!
        searching.addHistory(selectedPlace.name)

        // [x]: Weather.
        const weather = await searching.weatherPlace(selectedPlace.lat, selectedPlace.lng)

        // [x]: Show result.
        console.clear()
        console.log('\nAbout city: \n'.green)
        console.log('City:', selectedPlace.name)
        console.log('Lat:', selectedPlace.lat)
        console.log('Lng:', selectedPlace.lng)
        console.log('Temperature:', weather.temp)
        console.log('Minimun:', weather.min)
        console.log('Maximun:', weather.max)
        console.log('Desc:', weather.desc)
        break;

      case 2:
        // searching.history.forEach((place, i) => {
        //   const idx = `${i + 1}. `.green
        //   console.log(`${idx}${place}`)
        // })

        searching.historyCap.forEach((place, i) => {
          const idx = `${i + 1}. `.green
          console.log(`${idx}${place}`)
        })

        // searching.readDB()
        break;
    }

    opt !== 0 ? await stop() : console.clear()

  } while (opt !== 0);
}
main()

/* 
Para pruebas rápidas del endpoint
https://reqres.in/
*/
