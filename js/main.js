class Car {
  constructor(brand, model, color, register, price, fuel) {
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.register = register;
    this.price = price;
    this.fuel = fuel;
  }
}
//
class tableCars {
  static displayCars() {
    const cars = StoreData.getCars();
    cars.forEach((car) => tableCars.addCars(car));
  }
  static addCars(car) {
    const list = document.getElementById("cars_list");
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${car.brand}</td>
            <td>${car.model}</td>
            <td>${car.color}</td>
            <td>${car.register}</td>
            <td>${car.price}</td>
            <td>${car.fuel}</td>
            <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }
  static shoAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector("main");
    const form = document.getElementById("formInfo");
    container.insertBefore(div, form);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }
  static deleteCar(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      tableCars.shoAlert("Car removed !", "success");
    }
  }
  static clearFields() {
    document.querySelector("#fuel").value = "";
    document.querySelector("#price").value = "";
    document.querySelector("#brand").value = "";
    document.querySelector("#model").value = "";
    document.querySelector("#color").value = "";
    document.querySelector("#register").value = "";
  }
}
//
class StoreData {
  static getCars() {
    let cars;
    if (localStorage.getItem("cars") === null) {
      cars = [];
    } else {
      cars = JSON.parse(localStorage.getItem("cars"));
    }
    return cars;
  }
  static addCar(car) {
    const cars = StoreData.getCars();
    cars.push(car);
    localStorage.setItem("cars", JSON.stringify(cars));
  }
  static removeCar(register) {
    const cars = StoreData.getCars();
    cars.forEach((car,i)=>{
        if(car.register === register){
            cars.splice(i,1)
        }
    })
    localStorage.setItem("cars",JSON.stringify(cars))
  }
}
//
document.addEventListener("DOMContentLoaded",tableCars.displayCars);
//
document.querySelector("#formInfo").addEventListener("submit", (e) => {
  e.preventDefault();
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const color = document.querySelector("#color").value;
  const register = document.querySelector("#register").value;
  const price = document.querySelector("#price").value;
  const fuel = document.querySelector("#fuel").value;
  if (
    brand === "" ||
    model === "" ||
    color === "" ||
    register === "" ||
    price === "" ||
    fuel === ""
  ) {
    tableCars.shoAlert("Please fill in all Fields!", "danger");
  }
  else if(isNaN(register) || isNaN(price)){
      tableCars.shoAlert("id and price must be a number !","danger");
  }
  else {
    const car = new Car(brand, model, color, register, price, fuel);
    let cars = StoreData.getCars();
    let found = true;
    cars.forEach(item=>{
        if(item.register === car.register){
            found = false;
        }
    })
    if(!found){
        tableCars.shoAlert("Car is already existe !","danger");
    }
    else{
        tableCars.addCars(car);
        StoreData.addCar(car);
        tableCars.shoAlert("Car added !", "success");
        tableCars.clearFields();
    }
  }
});
//
document.querySelector("#cars_list").addEventListener("click", (e) => {
  tableCars.deleteCar(e.target);
  StoreData.removeCar(
    e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent
  );
});
//
window.onload = () => {
  document.getElementById("brand").focus();
};
