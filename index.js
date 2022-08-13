const { inquirerMenu, stop } = require("./helpers/inquirer")

const main = async () => {

  let opt

  do {

    opt = await inquirerMenu()

    switch (opt) {

      case 1:
        console.log('First option!')
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
