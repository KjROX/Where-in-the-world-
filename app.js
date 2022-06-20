//Variables
let currentCountryIndex = 0;
let totalCountryInEachLoad = currentCountryIndex + 12;
let dataArray;
let clickedOnOption = false;
let searchResultArray;
const allCountries = document.querySelector(".countries");
const moreButton = document.querySelector(".more-button button");
const input = document.querySelector(".search-input input");
const filterByRegion = document.querySelector(".select-options select");
const moreDetailedInfoForEachCountry = document.querySelector(".modal-outer");
const themeChanger = document.querySelector(".theme");
let themeStatus = localStorage.getItem("darkMode");

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
  themeStatus = localStorage.getItem("darkMode");
  if (themeStatus === "enabled") {
    document.body.classList.add("dark-theme");
    themeChanger.querySelector("img").src = "./sun-white.svg";
    themeChanger.querySelector("span").textContent = "Light Mode";
  } else {
    document.body.classList.remove("dark-theme");
    themeChanger.querySelector("img").src = "./moon-black.svg";
    themeChanger.querySelector("span").textContent = "Dark Mode";
  }
}

function handleModalThemeChanger() {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    this.querySelector("img").src = "./sun-white.svg";
    this.querySelector("span").textContent = "Light Mode";
    localStorage.setItem("darkMode", "enabled");
  } else {
    this.querySelector("img").src = "./moon-black.svg";
    this.querySelector("span").textContent = "Dark Mode";
    localStorage.setItem("darkMode", "disabled");
  }
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
        <header>
      <div class="head">
        <h1>Where in the world?</h1>
        <div class="theme theme-temp">
          <img src="./moon-black.svg" alt="" />
          <span>Dark Mode</span>
        </div>
      </div>
    </header>
        <div class="escape-div">
          <button class="escape">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
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
    const eventListenerForBackButtonAdded =
      backButton.getAttribute("eventListener");
    if (!eventListenerForBackButtonAdded) {
      backButton.addEventListener("click", closeModal);
      backButton.setAttribute("eventListener", "true");
    }
    const modalthemeChanger =
      moreDetailedInfoForEachCountry.querySelector(".theme-temp");
    themeStatus = localStorage.getItem("darkMode");
    if (themeStatus === "enabled") {
      document.body.classList.add("dark-theme");
      modalthemeChanger.querySelector("img").src = "./sun-white.svg";
      modalthemeChanger.querySelector("span").textContent = "Light Mode";
    }
    const eventListenerForModalThemeChangerAdded =
      modalthemeChanger.getAttribute("eventListener");
    if (!eventListenerForModalThemeChangerAdded) {
      modalthemeChanger.addEventListener("click", handleModalThemeChanger);
      modalthemeChanger.setAttribute("eventListener", "true");
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
  moreButton.classList.remove("not-visible");
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
  if (data.length < totalCountryInEachLoad) {
    for (; currentCountryIndex < data.length; currentCountryIndex++) {
      countryMAkingCode(data, currentCountryIndex);
    }
  } else {
    for (
      ;
      currentCountryIndex < totalCountryInEachLoad;
      currentCountryIndex++
    ) {
      countryMAkingCode(data, currentCountryIndex);
    }
  }
  if (currentCountryIndex === data.length) {
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

function handleFilterByRegion(e) {
  currentCountryIndex = 0;
  totalCountryInEachLoad = 12;
  clickedOnOption = true;
  searchResultArray = searchByRegion(e.currentTarget.value);
  allCountries.innerHTML = ``;
  allCountries.classList.remove("flex");
  countryMaker(searchResultArray);
  moreButton.classList.remove("not-visible");
}

//Event-Listeners

moreButton.addEventListener("click", () => {
  currentCountryIndex = totalCountryInEachLoad;
  totalCountryInEachLoad = currentCountryIndex + 12;
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
      currentCountryIndex = 0;
      totalCountryInEachLoad = 12;
      countryMaker(searchResultArray);
      clickedOnOption = true;
    }
    if (e.currentTarget.value === ``) {
      currentCountryIndex = 0;
      totalCountryInEachLoad = 12;
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

filterByRegion.addEventListener("change", handleFilterByRegion);

if (themeStatus === "enabled") {
  document.body.classList.add("dark-theme");
  themeChanger.querySelector("img").src = "./sun-white.svg";
  themeChanger.querySelector("span").textContent = "Light Mode";
}

themeChanger.addEventListener("click", (e) => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeChanger.querySelector("img").src = "./sun-white.svg";
    themeChanger.querySelector("span").textContent = "Light Mode";
    localStorage.setItem("darkMode", "enabled");
  } else {
    themeChanger.querySelector("img").src = "./moon-black.svg";
    themeChanger.querySelector("span").textContent = "Dark Mode";
    localStorage.setItem("darkMode", "disabled");
  }
});
