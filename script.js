const progressContainer = document.querySelector('.progress-container')
const progressValue = document.querySelector('.progress-value')
const form = document.querySelector('form')
const inputEl = document.querySelector('#task-input')
const hardnessLevel = document.querySelector('#hardness-level')
const template = document.querySelector('template')
const taskList = document.querySelector('.task-list')

const tasks = []

let totalProgress = 0
const maxProgress = 100

// =========== FUCTIONS ==============
// DISPLAY TASKS
const displayTasks = function (tasks) {
  taskList.innerHTML = ''

  tasks.forEach(task => {
    const taskTemplate = template.content.cloneNode(true).children[0]
    const checkbox = taskTemplate.querySelector('.list-item-checkbox')
    const taskText = taskTemplate.querySelector('.list-item-text')
    const taskHardness = taskTemplate.querySelector('.list-item-level')

    checkbox.checked = task.isCompleted
    checkbox.id = task.id
    taskText.textContent = task.taskName
    taskHardness.textContent = task.hardnessLevel
    taskHardness.classList.add(`${task.hardnessLevel}`)
    taskList.append(taskTemplate)
  })
}

// CREATE TASK AND PUSH TO TASKS ARRAY
const createTask = function (taskName, hardnessLevel) {
  const hardnessLevelNum =
    hardnessLevel === 'hard' ? 3 : hardnessLevel === 'medium' ? 2 : 1

  const task = {
    id: Date.now().toString(),
    taskName,
    hardnessLevel,
    hardnessLevelNum,
    isCompleted: false
  }
  tasks.push(task)

  // whenever I add a new task the progress should be updated
  fillProgress()
}

// ADDING TASK TO THE TASK LIST
const addTask = function (e) {
  e.preventDefault()

  // Guard clause
  if (!inputEl.value || hardnessLevel.value.toLowerCase() === 'select') {
    alert('Please enter the task and Select the hardness level')
    return
  }

  createTask(inputEl.value, hardnessLevel.value)
  displayTasks(tasks)

  inputEl.value = ''
}

// CALCULATE THE TOTAL HARDNESS OF THE TASKS
const calculateTotalHardness = function () {
  return tasks.reduce((sum, task) => sum + task.hardnessLevelNum, 0)
}

// FILL THE PROGRESS BASED ON THE TASKS HARDNESS
const fillProgress = function () {
  const completedHardness = tasks.reduce(
    (sum, task) =>
      task.isCompleted === true ? sum + task.hardnessLevelNum : sum,
    0
  )
  const totalHardness = calculateTotalHardness()
  totalProgress = Math.ceil((maxProgress * completedHardness) / totalHardness)

  progressValue.textContent = totalProgress
  progressContainer.style.width = `${totalProgress}%`
}

// MARK A TASK COMPLETE (OR) NOT COMPLETE
const markAsComplete = function (e) {
  if (e.target.classList.contains('list-item-checkbox')) {
    const selectedTask = tasks.find(task => task.id === e.target.id)
    selectedTask.isCompleted = e.target.checked
    displayTasks(tasks)

    fillProgress(selectedTask)
  }
}

form.addEventListener('submit', addTask)
taskList.addEventListener('click', markAsComplete)

// INITIAL
displayTasks(tasks)
