require('colors')
const inquirer = require('inquirer')

const questions = [
  {
    type: 'list',
    name: 'option',
    message: 'What would you like to do?',
    choices: [
      { value: 1, name: `${'1.'.green} Search place` },
      { value: 2, name: `${'2.'.green} History` },
      { value: 0, name: `${'0.'.green} Exit` },
    ]
  }
]

const inquirerMenu = async () => {

  console.clear()

  console.log('==========================='.green)
  console.log('     Select an option  '.green)
  console.log('===========================\n'.green)

  const { option } = await inquirer.prompt(questions)

  return option

}

const stop = async () => {

  const question = [
    {
      type: 'input',
      name: 'stop',
      message: `Press ${'ENTER'.green} to continue:`
    }
  ]

  const { stop } = await inquirer.prompt(question)

  return stop

}

const readInput = async (message) => {

  const question = {
    type: 'input',
    name: 'desc',
    message,
    validate(value) {
      if (value.length === 0) {
        return 'Please, write a something!'
      }
      return true
    }
  }

  const { desc } = await inquirer.prompt(question)
  return desc

}

const listPlaces = async (places = []) => {

  const choices = places.map((place, i) => {

    const idx = `${i + 1}.`.green

    return {
      value: place.id,
      name: `${idx} ${place.name}`
    }
  })

  choices.unshift({
    value: '0',
    name: '0.'.green + ' Cancel'
  })

  const questions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select place',
      choices
    }
  ]

  const { id } = await inquirer.prompt(questions)
  return id

}

const confirm = async (message = '') => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message: message.red,
    }
  ]

  const {ok} = await inquirer.prompt(question)
  return ok
}

const showCheckList = async (tasks = []) => {

  const choices = tasks.map((task, i) => {

    const idx = `${i + 1}.`.green

    return {
      value: task.id,
      name: `${idx} ${task.description}`,
      checked: task.completedIn ? true : false
    }
  })

  const questions = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selections',
      choices
    }
  ]

  const { ids } = await inquirer.prompt(questions)
  return ids

}

module.exports = {
  inquirerMenu,
  stop,
  readInput,
  listPlaces,
  confirm,
  showCheckList,
}
