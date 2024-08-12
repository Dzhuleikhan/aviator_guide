import { getLocation } from "./geoLocation";
import { getCountryCurrencyABBR } from "./setCurrency";

const allModals = document.querySelectorAll(".modal-content");
const methodTabs = document.querySelectorAll(".modal-tabs button");
const methodFormContents = document.querySelectorAll(".form-content");

function showCurrentModal(modalName) {
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

// Function to remove a parameter from the URL
function removeUrlParameter(parameter) {
  const url = new URL(window.location.href);
  url.searchParams.delete(parameter);
  window.history.pushState({ path: url.href }, "", url.href);
}

// Ensure 'modal' parameter is set to 'auth' by default
let modal = getUrlParameter("modal") || "auth";
setUrlParameter("modal", modal);

async function settingParamCurrency() {
  try {
    let locationData = await getLocation();
    const countryInput = locationData.country;

    const currencyAbbr = getCountryCurrencyABBR(countryInput);

    setUrlParameter("currency", currencyAbbr);
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

  // Show the correct method tab and content
  showMethod(method);
} else if (modal === "social") {
  showCurrentModal("social");
  setUrlParameter("method", "social");
}
if (sound === "on") {
  // Handling 'sound' parameter
  console.log("Sound is ON");
} else if (sound === "off") {
  console.log("Sound is OFF");
}
