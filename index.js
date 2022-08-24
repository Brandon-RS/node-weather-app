const { inquirerMenu, stop, readInput } = require("./helpers/inquirer");
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
        await searching.city(place)

        // [ ]: Search places.
        // [ ]: Select place.
        // [ ]: Weather.
        // [ ]: Show resulta.

        console.log('\nAbout city: \n'.green)
        console.log('City:',)
        console.log('Lat:',)
        console.log('Lng:',)
        console.log('Temperature:',)
        console.log('Minimun:',)
        console.log('Maximun:',)
        break;

      case 2:
        console.log('First option!')
        break;
    }

    if (opt !== 0) {
      await stop()
    }

  } while (opt !== 0);
}
main()

/* 
Para pruebas rápidas del endpoint
https://reqres.in/
*/
