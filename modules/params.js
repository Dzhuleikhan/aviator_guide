import { getLocation } from "./geoLocation";
import { getCountryCurrencyABBR } from "./setCurrency";

const allModals = document.querySelectorAll(".modal-content");
const methodTabs = document.querySelectorAll(".modal-tabs button");
const methodFormContents = document.querySelectorAll(".form-content");

export function showCurrentModal(modalName) {
  allModals.forEach((modal) => {
    modal.classList.remove("active");
  });
  document.querySelector(`.modal-content-${modalName}`).classList.add("active");
}

function showMethod(method) {
  methodTabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  methodFormContents.forEach((content) => {
    content.classList.remove("active");
  });
  document
    .querySelector(`.modal-tabs button[data-tab='${method}']`)
    .classList.add("active");
  document.querySelector(`.form-content-${method}`).classList.add("active");
}

// Function to get a URL parameter by name
export function getUrlParameter(name) {
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(window.location.href);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Function to add or update a URL parameter
export function setUrlParameter(key, value) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  window.history.pushState({ path: url.href }, "", url.href);
}

// Ensure 'modal' parameter is set to 'auth' by default
let modal = getUrlParameter("modal") || "auth";
setUrlParameter("modal", modal);

async function settingParamCurrency() {
  try {
    // Retrieve the currency data from localStorage
    let currencyData = localStorage.getItem("currencyData");

    if (currencyData) {
      // Parse the JSON data to get the currency abbreviation
      const parsedData = JSON.parse(currencyData);
      const currencyAbbr = parsedData.abbr;

      // Set the currency parameter in the URL
      setUrlParameter("currency", currencyAbbr);
    } else {
      // Fallback: handle the case where no data is in localStorage
      console.warn("Currency data not found in localStorage.");
      setUrlParameter("currency", "EUR");

      let locationData = await getLocation();
      const countryInput = locationData.country;

      const currencyAbbr = getCountryCurrencyABBR(countryInput);
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
}
settingParamCurrency();

// Ensure 'method' parameter is set
let method = getUrlParameter("method") || "email";
setUrlParameter("method", method);

// Ensure 'sound' parameter is set
let sound = getUrlParameter("sound") || "off";
setUrlParameter("sound", sound);

if (modal === "auth") {
  // Handling 'modal' parameter
  showCurrentModal("main");

  if (method === "email") {
    showMethod("email");
  } else if (method === "phone") {
    showMethod("phone");
  } else if (method === "social") {
    showMethod("social");
  } else if (method === "oneclick") {
    showMethod("oneclick");
    document.querySelector("button[data-tab='social']").classList.add("hidden");
    document
      .querySelector("button[data-tab='oneclick']")
      .classList.remove("hidden");
  }
} else if (modal === "social") {
  showCurrentModal("social");
  setUrlParameter("method", "social");
}
if (sound === "on") {
} else if (sound === "off") {
}

// Function to update the URL with a new parameter and value
export function updateUrl(key, value) {
  if (history.pushState) {
    var newUrl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      "?" +
      key +
      "=" +
      value;
    window.history.pushState({ path: newUrl }, "", newUrl);
  }
}
