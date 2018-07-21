const rows = document.querySelectorAll(".row")
const labels = document.querySelectorAll(".row1 .col")
const shtml = document.querySelectorAll(".row2 .col")
const refresh = document.querySelector(".refresh")
const newPrice = document.querySelector(".newPrice")

const spots = [0,2,3,4,5,6]

class Bitcoin{
  constructor(spots){
    this.spots = spots
    this.getPrices()
  }
  getPrices(){
    $.ajax({
      url: "https://bitpay.com/api/rates",
      dataType: "json",
      success: data =>{
        this.prices = data
        this.setPrices(this.spots)
      },
      error: error=>{
        console.log("There was an error")
      }
    })
  }
  setPrices(nums){
    // for(let i=0; i<nums.length; i++){
    //   shtml[i+1].textContent = this.prices[nums[i]].rate.toFixed(2)
    // }
    nums.forEach((num, index) =>{
        shtml[index +1].textContent = this.prices[num].rate.toFixed(2)
    })
  }
  refresh(){
    this.getPrices()
  }
}

const bit = new Bitcoin(spots)

refresh.addEventListener("click", e=>{
  console.log("Refresh has been clicked")
  bit.refresh()
})

newPrice.addEventListener("click", e=>{
  const code = window.prompt("What Country are you looking for?")
  bit.prices.forEach((price,index) =>{
    if(price.code === code.toUpperCase()){
      bit.spots.push(index)
      //create the next column of the table and add the label and the price
      rows[0].innerHTML += `<div class="col"> BTC/${code.toUpperCase()} </div>`
      rows[1].innerHTML += `<div class="col"> ${price.rate.toFixed(2)} </div>`
    }
  })
})