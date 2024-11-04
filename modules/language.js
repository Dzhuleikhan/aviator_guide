import { changeModalLanguage } from "./modalLanguage";
import { translations } from "/public/translations";
import { getLocation } from "./geoLocation";
import { settingBonusValueAndAmount } from "./setBonusValue";
import { setPaymentMethods } from "./footerPayments";
import { paymentCountries } from "../public/payments";

const headerLangBtn = document.querySelector(".header-lang-btn");
const headerLangList = document.querySelector(".header-lang-list");
const languageLinks = document.querySelectorAll(".language-link");

if (headerLangBtn) {
  headerLangBtn.addEventListener("click", () => {
    headerLangList.classList.toggle("is-open");
  });
}

languageLinks.forEach((link) => {
  if (link) {
    link.addEventListener("click", () => {
      headerLangList.classList.remove("is-open");
    });
  }
});

function updateContent(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((element) => {
    const key = element.getAttribute("data-translate");
    element.innerHTML = translations[lang][key];
  });
}

function changeLanguage(lang) {
  updateContent(lang);
  saveUserLanguage(lang);
  updateButtonText(lang);
  setActiveLanguageBtn(lang);
  settingBonusValueAndAmount(lang);
  changeModalLanguage(lang);
  setPaymentMethods(paymentCountries, lang);
}

function getLanguageFromPath() {
  const pathSegments = window.location.pathname.split("/");
  const lang = pathSegments[1];
  // Assuming the language code is the first segment in the path
  return translations[lang] ? lang : null;
}

function getUserLanguage() {
  const userLang = navigator.language || navigator.userLanguage;
  const supportedLangs = [
    "en",
    "es",
    "fr",
    "az",
    "uz",
    "ua",
    "ru",
    "bd",
    "tr",
    "id",
    "pt",
    "de",
    "cn",
    "kz",
    "kg",
  ];
  const langPrefix = userLang.split("-")[0]; // Get the language code without region

  return supportedLangs.includes(langPrefix) ? langPrefix : "en"; // Default to 'en' if the language is not supported
}

function saveUserLanguage(lang) {
  localStorage.setItem("preferredLanguage", lang);
}

function loadUserLanguage() {
  return localStorage.getItem("preferredLanguage");
}

function setActiveLanguageBtn(currentLang) {
  document.querySelectorAll(".language-link").forEach((el) => {
    if (el.getAttribute("data-lang") === currentLang) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

function updateButtonText(lang) {
  const headerLangBtn = document.querySelector(".header-lang-btn img");
  const headerLangName = document.querySelector(".header-lang-btn span");

  const languageNames = {
    en: "English",
    es: "Español",
    fr: "Français",
    az: "Azərbaycan dili",
    uz: "Oʻzbekcha",
    ua: "Українська",
    ru: "Русский",
    bd: "বাংলা",
    tr: "Türkçe",
    id: "Bahasa Indonesia",
    pt: "Português",
    de: "Deutsch",
    cn: "中文",
    kz: "Қазақ",
    kg: "Кыргыз тили",
  };
  headerLangBtn.setAttribute(
    "src",
    `./img/flags/${lang}.svg` || `./img/flags/en.svg`,
  );
  headerLangName.innerHTML = languageNames[lang];
  document.querySelector("html").setAttribute("lang", lang);
}

async function determineLanguage() {
  let lang = getLanguageFromPath();
  if (!lang) {
    lang = loadUserLanguage();
  }
  if (!lang) {
    try {
      const locationData = await getLocation();
      const countryLangMap = {
        EN: "en",
        ES: "es",
        FR: "fr",
        AZ: "az",
        UZ: "uz",
        UA: "ua",
        RU: "ru",
        BD: "bd",
        TR: "tr",
        ID: "id",
        PT: "pt",
        DE: "de",
        CN: "cn",
        KZ: "kz",
        KG: "kg",
        // Add more country codes and their corresponding languages as needed
      };
      lang = countryLangMap[locationData.country] || getUserLanguage();
    } catch (error) {
      console.error("Failed to fetch location data:", error);
      lang = getUserLanguage();
    }
  }
  return lang;
}

window.onload = async () => {
  const lang = await determineLanguage();
  changeLanguage(lang);
  changeModalLanguage(lang);
  settingBonusValueAndAmount(lang);
  setPaymentMethods(paymentCountries, lang);
};

document.querySelectorAll(".language-link").forEach((langBtn) => {
  langBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const targetLang = e.target.getAttribute("data-lang");
    changeLanguage(targetLang);
    changeModalLanguage(targetLang);
    settingBonusValueAndAmount(targetLang);
    setPaymentMethods(paymentCountries, targetLang);
  });
});
