const weatherForm = document.querySelector("form");
const search = document.querySelector("input")

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  const url = 'http://localhost:3000/weather?address=' + location
  const p1 = document.getElementById('para-1')
  const p2 = document.getElementById('para-2')

  p1.textContent = ''
  p2.textContent = 'Loading...'
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        p1.textContent = data.error
        p2.textContent = ''
      } else {
        p1.textContent = data.location
        p2.textContent = data.forecast
      }
    })
  })

})
