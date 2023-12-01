console.log('loaded')
const rootElement = document.querySelector("#root")

/* const fetchUrl = async (url) => {
  const data = await fetch(url)
  return data.json() */

  // if (data.ok) {
  //   /* ha a kapott válasz OK status kóddal rendelkezik */
  //   return data.json()
  // } else if (data.status === 400 || data.status === 404) {
  //   return data.json()
  // } else {
  //   /* ha a kapott válasz nem OK status kóddal rendelkezik */
  //   return "bad request"
  // } 
//}


const fetchUrl = async (url) => {
  const response = await fetch(url)
  return response.json()
}

const skeleton = () => `
  <header></header>
  <main></main>
`

const beerComponent = ({id, name, abv}) => `
  <div class="card text-bg-success mb-3" style="max-width: 18rem;">
    <div class="card-header">${name}</div>
    <div class="card-body">
      <h5 class="card-title">ID: ${id}</h5>
      <p class="card-text">ABV: ${abv}%</p>
    </div>
  </div>
`

const errorComponent = ({error, message}) => `
  <div class="card text-bg-danger mb-3" style="max-width: 18rem;">
    <div class="card-header">${error}</div>
    <div class="card-body">
      <p class="card-text">${message}</p>
    </div>
  </div>
`

const inputComponent = () => `
  <div>
    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="enter beer ID">
    <button type="button" class="btn btn-outline-warning">fetch!</button>
  </div>
`

const makeDomFromData = (element, data) => {
  element.innerHTML = skeleton()
  const headerElement = document.querySelector("header")
  const mainElement = document.querySelector("main")

  headerElement.insertAdjacentHTML("beforeend", inputComponent())

  const buttonElement = document.querySelector("button")
  buttonElement.addEventListener("click", async () =>{
    const beerId = document.querySelector("input").value
    
    const newBeerData = await fetchUrl(`/beers/${beerId}`)
    
    makeDomFromData(rootElement, newBeerData)
  })

  if (data.id) mainElement.insertAdjacentHTML("beforeend", beerComponent(data))
  else if (data.length) data.forEach(beer => mainElement.insertAdjacentHTML("beforeend", beerComponent(beer))) 
  else mainElement.insertAdjacentHTML("beforeend", errorComponent(data))
}



async function init() {
  const beerData = await fetchUrl("/beers")

  makeDomFromData(rootElement, beerData)

/*   const beerData = await fetchUrl("/beers/10")
  rootElement.innerHTML = JSON.stringify(beerData) */
  
  /* if (beerData === "bad request") {
    rootElement.innerHTML = "BAD USER"
  } else {
    rootElement.innerHTML = JSON.stringify(beerData)
  } */
}

init()