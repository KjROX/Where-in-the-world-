//Variables
let i = 0;
let j = 12;
const allCountries = document.querySelector(".countries");

//Functions
function countryMaker(data) {
  for (; i < j; i++) {
    console.log(data[i]);
    const eachCountry = document.createElement("div");
    eachCountry.classList.add("each-country");
    const capital = data.capital ? data.capital[0] : "undefined";
    eachCountry.innerHTML = `          
        <div class="flag">
            <img src=${data[i].flags.svg} alt="" />
        </div>
        <div class="name-description">
            <h3 class="name">${data[i].name.common}</h3>
            <div class="description">
              <p class="population">Population:<span>${data[i].population}</span></p>
              <p class="region">Region:<span>${data[i].region}</span></p>
              <p class="capital">Capital:<span>${capital}</span></p>
            </div>
        </div>`;
    allCountries.appendChild(eachCountry);
  }
}

async function fetchAllCountriesData() {
  const url = "https://restcountries.com/v3.1/all";
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const data = await response.json();
  countryMaker(data);
}
fetchAllCountriesData();

//Event-Listeners
