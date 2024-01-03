const slides = document.getElementsByClassName("form-section")
const nextButton = document.getElementsByClassName("nextButton")
const previousButton = document.getElementsByClassName("previousButton")

slides[1].style.display = "none"
slides[2].style.display = "none"

for(let i = 0; i < nextButton.length; i++){
    nextButton[i].addEventListener("click", ()=>{
        slides[i].style.display = "none"
        slides[i + 1].style.display = "flex"
    })
}
for(let j = 0; j < previousButton.length; j++){
    previousButton[j].addEventListener("click", ()=>{
        slides[j].style.display = "flex"
        slides[j + 1].style.display = "none"
    })
}
const variations = document.querySelector(".variations")
const newVariationButton = document.querySelector("#newVariationButton")
newVariationButton.addEventListener("click", ()=>{
    const newVariation = document.createElement("div")
    const newVariationColor = document.createElement("input")
    const newVariationStock = document.createElement("input")
    newVariationStock.type = "number"
    newVariationStock.name = "stock"
    newVariationStock.placeholder = "QTD"
    newVariationColor.type = "color"
    newVariationColor.name = "color"
    newVariation.appendChild(newVariationColor)
    newVariation.appendChild(newVariationStock)
    variations.appendChild(newVariation)
   
})
   
const cleanColorsButton = document.querySelector("#cleanColorsButton")
cleanColorsButton.addEventListener("click", ()=>{
    variations.innerHTML = ""
})