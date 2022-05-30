//Variables
let i = 0;
let j = i + 12;
let dataArray;
let clickedOnOption = false;
let searchResultArray;
const allCountries = document.querySelector(".countries");
const moreButton = document.querySelector(".more-button button");
const input = document.querySelector(".search-input input");
const filterByRegionOptions = Array.from(
  document.querySelectorAll(".select-options select option")
);

//Functions
function searchByRegion(query) {
  const matchingCountries = [];
  dataArray.forEach((obj) => {
    if (obj.region === query) {
      matchingCountries.push(obj);
    }
  });
  return matchingCountries;
}

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
        if (!matchingCountries.includes(obj)) {
          matchingCountries.push(obj);
        }
      }
    }
    if (name === query || name.includes(query)) {
      if (!matchingCountries.includes(obj)) {
        matchingCountries.push(obj);
      }
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

function countryMaker(data) {
  console.log(data);
  if (data.length < j) {
    for (; i < data.length; i++) {
      countryMAkingCode(data, i);
    }
  } else {
    for (; i < j; i++) {
      countryMAkingCode(data, i);
    }
  }
  if (i === data.length) {
    moreButton.classList.add("fade");
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
  if (clickedOnOption) {
    countryMaker(searchResultArray);
  } else {
    countryMaker(dataArray);
  }
});

input.addEventListener("keyup", (e) => {
  if ((e.keyCode >= 65 && e.keyCode <= 90) || e.key === "Enter") {
    console.log(e.currentTarget.value);
    moreButton.classList.remove("not-visible");
    moreButton.classList.remove("fade");
    searchResultArray = [];
    searchResultArray = searchCountry(e.currentTarget.value);
    if (searchResultArray.length < 12) {
      moreButton.classList.add("fade");
    } else {
      moreButton.classList.remove("fade");
    }
    if (searchResultArray.length === 0) {
      noResultsFound();
    } else {
      allCountries.innerHTML = ``;
      allCountries.classList.remove("flex");
      i = 0;
      j = 12;
      countryMaker(searchResultArray);
      clickedOnOption = true;
    }
    if (e.currentTarget.value === ``) {
      i = 0;
      j = 12;
      clickedOnOption = false;
      allCountries.innerHTML = ``;
      allCountries.classList.remove("flex");
      countryMaker(dataArray);
      moreButton.classList.remove("not-visible");
      moreButton.classList.remove("fade");
    }
  } else {
    return;
  }
});
filterByRegionOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    i = 0;
    j = 12;
    clickedOnOption = true;
    searchResultArray = searchByRegion(e.currentTarget.value);
    allCountries.innerHTML = ``;
    allCountries.classList.remove("flex");
    countryMaker(searchResultArray);
    moreButton.classList.remove("not-visible");
  });
});
