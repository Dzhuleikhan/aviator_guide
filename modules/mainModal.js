import { showCurrentModal, updateUrl } from "./params";

/**
 * Showing main modal window
 */
const modalOpenBtns = document.querySelectorAll(".modal-open-btn");
const mainOverlay = document.querySelector(".form-overlay");
const betButtonMain = document.querySelectorAll(".bet-button");

modalOpenBtns.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", () => {
      mainOverlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      localStorage.setItem("mainModal", "open");
    });
  }
});

if (localStorage.mainModal) {
  mainOverlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
} else {
  mainOverlay.classList.remove("is-open");
  document.body.style.overflow = "visible";
}

/**
 * Tabs changing
 */
const modalTabs = document.querySelector(".modal-tabs");
const modalTabContents = document.querySelectorAll(".form-content");

function showActualModal(tabName) {
  modalTabContents.forEach((c) => {
    c.classList.remove("active");
  });
  document.querySelector(`.form-content-${tabName}`).classList.add("active");
}

modalTabs.addEventListener("click", (e) => {
  modalTabs.querySelectorAll("button").forEach((el) => {
    el.classList.remove("active");
  });
  const btn = e.target.closest("button");
  btn.classList.add("active");
  let tab = btn.getAttribute("data-tab");
  showActualModal(tab);
});

const regWithEmailBtns = document.querySelectorAll(".reg-with-email-btn");

regWithEmailBtns.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showCurrentModal("main");
      updateUrl("modal", "auth");
    });
  }
});
