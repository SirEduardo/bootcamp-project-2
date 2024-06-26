import "./style.css"
import products from "./products.js"

const SELLERS = []
let SELLER = ""

const createSelect = () =>{
  const filtros = document.querySelector(".filter")
  const selectModel = document.createElement("select")

  const defaultOption = document.createElement("option")
  defaultOption.textContent = "Vendedores"
  defaultOption.selected = true
  selectModel.appendChild(defaultOption)

  for( const seller of SELLERS){
    const option = document.createElement("option")

    option.value = seller
    option.textContent = seller

    selectModel.appendChild(option)
  }
  filtros.appendChild(selectModel)

  selectModel.addEventListener("change", (e) =>{
    SELLER = e.target.value
    filtrar()
    errorMessage.textContent = ""
  })
  
}

const filtrar = () =>{
  let filtrado = products
  const price = parseFloat(inputPrice.value)

  if(SELLER){
    filtrado = filtrado.filter(product => product.seller === SELLER)
  }

  if(!isNaN(price)){
    filtrado = filtrado.filter(product => product.price < price)
  }
    printProducts(filtrado)
    
  if (filtrado.length > 0) {
      errorMessage.textContent = ""
  }else{
    container.classList.add("container-error")
    nav.classList.remove("nav")
    nav.classList.add("nav-error")
    errorMessage.textContent = "No hay productos inferiores al precio seleccionado"
  }

}

const fillSellers = (products) =>{
  SELLERS.splice(0)
  for(const product of products){
    if(!SELLERS.includes(product.seller)){
      SELLERS.push(product.seller)
    }
  }
}
fillSellers(products)



const printProducts = (products) =>{
  const divProducts = document.querySelector(".productos")
  divProducts.innerHTML = ""
  
for(const product of products){
  const divProduct = document.createElement("div")
  const divImg = document.createElement("div")
  const img = document.createElement("img")
  const name = document.createElement("h4")
  const price = document.createElement("strong")
  const seller = document.createElement("p")
  const divStars = document.createElement("div")

  for (let i = 1; i <= 5; i++){
    const stars = document.createElement("div")
    stars.className = "stars"
    if(product.stars >=i){
      stars.classList.add("rellena")
    }
    divStars.appendChild(stars)
  }
  img.src = product.image
  name.textContent = product.name
  price.textContent = `${product.price}€`
  seller.textContent = `Vendido y enviado por ${product.seller}`
  
  

  divProduct.classList.add("product-container")
  divImg.classList.add("img-container")
  divStars.classList.add("stars-container")


  divProduct.appendChild(divImg)
  divImg.appendChild(img)
  divProduct.appendChild(name)
  divProduct.appendChild(price)
  divProduct.appendChild(divStars)
  divProduct.appendChild(seller)
  divProducts.appendChild(divProduct)

}

}
const container = document.querySelector(".container")
const nav = document.querySelector(".nav")
const inputPrice = document.querySelector("#input")
const searchBtn = document.querySelector(".search")
const resetBtn = document.querySelector(".reset")
const errorMessage = document.createElement("p")
errorMessage.classList.add("error-message")
container.appendChild(errorMessage)

searchBtn.addEventListener("click", () =>{
  filtrar()
})
inputPrice.addEventListener("input", () =>{
  filtrar()
})


resetBtn.addEventListener("click", () =>{
  printProducts(products)
  inputPrice.value = ""
  SELLER = ""
  document.querySelector("select").selectedIndex = 0
  errorMessage.textContent = ""
})

printProducts(products)
createSelect()