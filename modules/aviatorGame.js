import gsap from "gsap";
import horizontalLoop from "./marquee";
import { getUrlParameter, setUrlParameter } from "./params";

export const bgAudio = new Audio("./sounds/bg_music.mp3");
export const flewAway = new Audio("./sounds/flew_away.mp3");
export const startSound = new Audio("./sounds/start_sound.mp3");

const soundBtn = document.querySelector(".sound-btn");
const soundIcon = document.querySelector(".sound-icon");
let soundParameter = getUrlParameter("sound");

if (soundBtn) {
  soundBtn.addEventListener("click", () => {
    if (soundParameter === "off") {
      setUrlParameter("sound", "on");
      soundParameter = "on";
      soundIcon.src = "./img/sound-on.svg";
    } else if (soundParameter === "on") {
      setUrlParameter("sound", "off");
      soundParameter = "off";
      bgAudio.pause();
      flewAway.pause();
      startSound.pause();
      soundIcon.src = "./img/sound-off.svg";
    }
  });
}

const gameInner = document.querySelector(".game-inner");
const gameGraph = document.querySelector(".graph");
const winCountWrapper = document.querySelector(".win-count-wrapper");
const winCountNumber = document.querySelector(".win-count-text");
const winCountTitle = document.querySelector(".win-count-title");
const gamePlaneImage = document.querySelector(".game-plane");
const gameStartLoader = document.querySelector(".game-start-loader");
const winLoaderLine = document.querySelector(".winning-loader-line");

document.addEventListener("click", () => {
  if (soundParameter != "off") {
    bgAudio.play();
    bgAudio.volume = 0.3;
  }
});

horizontalLoop(".game-dots", {
  repeat: -1,
  paused: false,
  speed: 0.3,
});

gsap.to(".game-start-loader-icon", {
  rotate: 360,
  duration: 1,
  ease: "none",
  repeat: -1,
  transformOrigin: "center center",
});

const raysTl = gsap.timeline();

raysTl.to(".game-rays", {
  rotate: 360,
  duration: 15,
  ease: "none",
  repeat: -1,
});

gsap.set(gamePlaneImage, { opacity: 1 });
gsap.set(gameGraph, { width: "5%" });

export const gameTl = gsap.timeline({
  onStart: () => {
    gsap.set(gameGraph, { width: "10%", y: 0, opacity: 1 }); // Reset the width and opacity of gameGraph
    gsap.set(gamePlaneImage, { opacity: 1 });
    gameInner.classList.remove("colored");
    raysTl.pause();
  },
  paused: true,
});

gameTl
  .to(winLoaderLine, {
    xPercent: -100,
    duration: 5,
    ease: "none",
    onStart: () => {
      gameInner.classList.remove("colored");
      raysTl.pause();
    },
    onComplete: () => {
      gameStartLoader.classList.add("hidden");
      winCountWrapper.classList.remove("hidden");
      gameInner.classList.add("colored");
      raysTl.play();
      if (soundParameter != "off") {
        startSound.play();
        startSound.volume = 0.3;
      }
    },
  })
  .to(gameGraph, {
    width: "100%",
    duration: 4,
    ease: "none",
    delay: 1,
    onComplete: () => {
      setTimeout(() => {
        gameInner.classList.remove("colored");
        gameInner.classList.add("colored-green");
        // raysTl.pause();
        winCountNumber.classList.add("lost");
        winCountTitle.classList.remove("hidden");
      }, 500);
      if (soundParameter != "off") {
        flewAway.play();
        flewAway.volume = 0.3;
      }
      gsap.to(".game-plane", {
        x: 200,
        delay: 0.5,
        y: -200,
        opacity: 0,
        duration: 0.6,
        ease: "none",
        onComplete: () => {
          gsap.to(gameGraph, { opacity: 0, duration: 0.2 });
        },
      });
    },
  })
  .to(
    ".win-count",
    {
      textContent: 500,
      duration: 4,
      ease: "none",
      onUpdate: function () {
        this.targets()[0].textContent = parseFloat(
          this.targets()[0].textContent,
        ).toFixed(2);
        document.querySelectorAll(".btn-button-number").forEach((el) => {
          el.textContent = parseFloat(this.targets()[0].textContent).toFixed(2);
        });
      },
      onComplete: () => {
        document.querySelectorAll(".bet-button").forEach((btn) => {
          btn.classList.remove("yellow-btn");
          btn.classList.remove("pointer-events-none");
          btn.classList.add("green-btn");
        });
      },
      snap: { textContent: 0.01 },
    },
    "<",
  );
