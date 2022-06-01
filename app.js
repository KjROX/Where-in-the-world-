//Variables
let currentCountry = 0;
let totalCountry = currentCountry + 12;
let dataArray;
let clickedOnOption = false;
let searchResultArray;
const allCountries = document.querySelector(".countries");
const moreButton = document.querySelector(".more-button button");
const input = document.querySelector(".search-input input");
const filterByRegionOptions = Array.from(
  document.querySelectorAll(".select-options select option")
);
const moreDetailedInfoForEachCountry = document.querySelector(".modal-outer");

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
function openModal() {
  moreDetailedInfoForEachCountry.classList.add("open");
  document.body.classList.add("disable-scroll");
}

function closeModal() {
  moreDetailedInfoForEachCountry.classList.remove("open");
  document.body.classList.remove("disable-scroll");
}

function handleClickForEachCountry(eachCountry, info) {
  eachCountry.addEventListener("click", () => {
    const capital = info.capital ? info.capital[0] : "undefined";
    const ifCurrencyExists = info.currencies
      ? Object.keys(info.currencies)
      : null;
    const specificCurrency = ifCurrencyExists
      ? info.currencies[ifCurrencyExists[0]].name
      : "undefined";
    const topLevelDomain = info.tld ? info.tld[0] : "undefined";
    const nativeNameObjProperty = info.name["nativeName"]
      ? Object.keys(info.name["nativeName"])
      : null;
    const commonName = info.name["nativeName"][nativeNameObjProperty]
      ? info.name["nativeName"][nativeNameObjProperty].common
      : "undefined";
    const languages = Object.values(info.languages).join(", ");
    moreDetailedInfoForEachCountry.innerHTML = `
        <div class="escape-div">
          <button class="escape">
            <img src="./arrow-left-black.svg" alt="" />
            <h3>Back</h3>
          </button>
        </div>
        <div class="modal-inner">
          <div class="image-div"><img src=${info.flags.svg} alt="" /></div>
          <div class="description">
            <h1>${info.name.common}</h1>
            <div class="name-details-parent">
              <div class="name">
                <p>Native Name : <span>${commonName}</span></p>
                <p>Population: <span>${info.population}</span></p>
                <p>Region : <span>${info.region}</span></p>
                <p>Sub Region : <span>${info.subregion}</span></p>
                <p>Capital : <span>${capital}</span></p>
              </div>
              <div class="details">
                <p>Top Level Domain : <span>${topLevelDomain}</span></p>
                <p>Currencies : <span>${specificCurrency}</span></p>
                <p>Languages : <span>${languages}</span></p>
              </div>
            </div>
          </div>
        </div>
      `;
    openModal();
    const backButton = moreDetailedInfoForEachCountry.querySelector(".escape");
    const eventListenerAdded = backButton.getAttribute("eventListener");
    if (!eventListenerAdded) {
      backButton.addEventListener("click", closeModal);
      backButton.setAttribute("eventListener", "true");
    }
  });
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
  handleClickForEachCountry(eachCountry, data[i]);
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
  if (data.length < totalCountry) {
    for (; currentCountry < data.length; currentCountry++) {
      countryMAkingCode(data, currentCountry);
    }
  } else {
    for (; currentCountry < totalCountry; currentCountry++) {
      countryMAkingCode(data, currentCountry);
    }
  }
  if (currentCountry === data.length) {
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
  currentCountry = totalCountry;
  totalCountry = currentCountry + 12;
  if (clickedOnOption) {
    countryMaker(searchResultArray);
  } else {
    countryMaker(dataArray);
  }
});

input.addEventListener("keyup", (e) => {
  if (
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    e.key === "Enter" ||
    e.key === "Backspace"
  ) {
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
      currentCountry = 0;
      totalCountry = 12;
      countryMaker(searchResultArray);
      clickedOnOption = true;
    }
    if (e.currentTarget.value === ``) {
      currentCountry = 0;
      totalCountry = 12;
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
    currentCountry = 0;
    totalCountry = 12;
    clickedOnOption = true;
    searchResultArray = searchByRegion(e.currentTarget.value);
    allCountries.innerHTML = ``;
    allCountries.classList.remove("flex");
    countryMaker(searchResultArray);
    moreButton.classList.remove("not-visible");
  });
});
