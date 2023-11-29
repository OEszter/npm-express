console.log('loaded')
const rootElement = document.querySelector("#root")

const fetchUrl = async (url) => {
  const data = await fetch(url)
  return data.json()

  // if (data.ok) {
  //   /* ha a kapott válasz OK status kóddal rendelkezik */
  //   return data.json()
  // } else if (data.status === 400 || data.status === 404) {
  //   return data.json()
  // } else {
  //   /* ha a kapott válasz nem OK status kóddal rendelkezik */
  //   return "bad request"
  // }
}

async function init() {
  const beerData = await fetchUrl("/beers/10")
  rootElement.innerHTML = JSON.stringify(beerData)
  
  /* if (beerData === "bad request") {
    rootElement.innerHTML = "BAD USER"
  } else {
    rootElement.innerHTML = JSON.stringify(beerData)
  } */
}

init()