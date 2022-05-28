//Variables
let i = 0;
let j = i + 12;
let dataArray;
const allCountries = document.querySelector(".countries");
const moreButton = document.querySelector(".more-button button");
const input = document.querySelector(".search-input input");

//Functions
function searchCountry(query) {
  const matchingCountries = [];
  dataArray.forEach((obj) => {
    let name = obj.name.common;
    let capital = obj.capital ? obj.capital[0] : null;
    name = name.toLowerCase().trim();
    query = query.toLowerCase().trim();
    if (capital) {
      capital = capital.toLowerCase().trim();
      if (capital === query || capital.includes(query)) {
        matchingCountries.push(obj);
      }
    }
    if (name === query || name.includes(query)) {
      matchingCountries.push(obj);
    }
  });
  return matchingCountries;
}

function countryMAkingCode(data, i) {
  const eachCountry = document.createElement("div");
  eachCountry.classList.add("each-country");
  const capital = data[i].capital ? data[i].capital[0] : "undefined";
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

function countryMaker(data) {
  console.log(data);
  if (data.length < 12) {
    for (let i = 0; i < data.length; i++) {
      countryMAkingCode(data, i);
    }
  } else {
    for (; i < j; i++) {
      countryMAkingCode(data, i);
    }
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
  dataArray = data;
  countryMaker(data);
}
fetchAllCountriesData();

//Event-Listeners
moreButton.addEventListener("click", () => {
  i = j;
  j = i + 12;
  countryMaker(dataArray);
});

function noResultsFound() {
  allCountries.innerHTML = `
  <div>
  <p>Sorry!</p>
  <p>No Results Found</p>
  </div>
  `;
  allCountries.classList.add("flex");
  moreButton.classList.add("not-visible");
}

input.addEventListener("keydown", (e) => {
  moreButton.classList.add("not-visible");
  const matchingCountries = searchCountry(e.currentTarget.value);
  if (matchingCountries.length === 0) {
    noResultsFound();
  } else {
    allCountries.innerHTML = ``;
    allCountries.classList.remove("flex");
    countryMaker(matchingCountries);
  }

  if (e.currentTarget.value === ``) {
    i = 0;
    j = 12;
    allCountries.innerHTML = ``;
    allCountries.classList.remove("flex");
    countryMaker(dataArray);
    moreButton.classList.remove("not-visible");
  }
});
