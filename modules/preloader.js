import gsap from "gsap";
import { gameTl } from "./aviatorGame";

const preloader = document.querySelector(".preloader");
const preloaderIcon = document.querySelector(".loader-icon");
const loaderWrapper = document.querySelector(".loader-wrapper");
const loaderLine = document.querySelector(".loader-line");
const loaderConnect = document.querySelector(".loader-connection");

gsap.set(loaderLine, { xPercent: -100 });

gsap.to(preloaderIcon, { rotate: 360, duration: 1, ease: "none", repeat: -1 });

gsap.to(loaderLine, {
  xPercent: 0,
  duration: 1.5,
  ease: "none",
  onComplete: () => {
    loaderWrapper.classList.add("hidden");
    loaderConnect.classList.remove("hidden");
    gsap.to(loaderConnect, {
      opacity: 1,
      duration: 2,
      ease: "none",
      onComplete: () => {
        preloader.classList.add("is-hidden");
        document.body.classList.remove("scroll-lock");
        gameTl.play();
      },
    });
  },
});
