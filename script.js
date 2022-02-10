const inputEl = document.getElementById('input-value')
const btn = document.querySelector('button')
const progressContainer = document.querySelector('.progress-container')

btn.addEventListener('click', function () {
  const value = Number(inputEl.value)
  progressContainer.style.width = `${value}%`
})
