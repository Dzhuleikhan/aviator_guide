import gsap from "gsap";
import horizontalLoop from "./marquee";

export const bgAudio = new Audio("./sounds/bg_music.mp3");
const flewAway = new Audio("./sounds/flew_away.mp3");
const startSound = new Audio("./sounds/start_sound.mp3");

const gameInner = document.querySelector(".game-inner");
const gameGraph = document.querySelector(".graph");
const winCountWrapper = document.querySelector(".win-count-wrapper");
const winCountNumber = document.querySelector(".win-count-text");
const winCountTitle = document.querySelector(".win-count-title");
const gamePlaneImage = document.querySelector(".game-plane");
const gameStartLoader = document.querySelector(".game-start-loader");
const winLoaderLine = document.querySelector(".winning-loader-line");

document.addEventListener("click", () => {
  bgAudio.play();
  bgAudio.volume = 0.1;
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
  repeat: -1,
  repeatDelay: 3,
  onStart: () => {
    gsap.set(gameGraph, { width: "15%", y: 0, opacity: 1 }); // Reset the width and opacity of gameGraph
    gsap.set(gamePlaneImage, { opacity: 1 });
    gameInner.classList.remove("colored");
    raysTl.pause();
  },
  onRepeat: () => {
    // Reset the elements to their initial state
    gsap.set(gameGraph, { width: "5%", y: 0, opacity: 1 }); // Reset the width and opacity of gameGraph
    gsap.set(gamePlaneImage, { opacity: 1 });
    gameInner.classList.add("colored"); // Re-add the "colored" class
    raysTl.play(); // Resume the rays timeline
    winCountNumber.classList.remove("lost"); // Remove the "lost" class
    winCountTitle.classList.add("hidden"); // Hide the win count title
    gsap.set(".game-plane", { x: 0, y: 0 }); // Reset the position of the plane
    gameStartLoader.classList.remove("hidden");
    winCountWrapper.classList.add("hidden");
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
      startSound.play();
      startSound.volume = 0.1;
    },
  })
  .to(gameGraph, {
    width: "100%",
    duration: 2.5,
    ease: "none",
    delay: 1,
    onComplete: () => {
      setTimeout(() => {
        gameInner.classList.remove("colored");
        raysTl.pause();
        winCountNumber.classList.add("lost");
        winCountTitle.classList.remove("hidden");
      }, 500);
      flewAway.play();
      flewAway.volume = 0.1;
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
      textContent: Math.random() * 10,
      duration: 2.5,
      ease: "none",
      onUpdate: function () {
        this.targets()[0].textContent = parseFloat(
          this.targets()[0].textContent,
        ).toFixed(2);
      },
      snap: { textContent: 0.01 },
    },
    "<",
  );
