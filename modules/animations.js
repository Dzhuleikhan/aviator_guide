import gsap from "gsap";
import horizontalLoop from "./marquee";
/**
 * Hero planes
 */

let mm = gsap.matchMedia();

mm.add("(min-width: 992px)", () => {
  gsap.set(".plane-left", {
    right: "102%",
    top: 0,
  });
  gsap.set(".plane-right", {
    left: "487px",
    top: "150px",
  });

  let planesTl = gsap.timeline();

  planesTl
    .fromTo(
      ".plane-left",
      { y: -30 },
      {
        y: 30,
        duration: 3,
        ease: "none",
        yoyo: true,
        repeat: -1,
      },
    )
    .to(
      ".plane-left",
      {
        rotate: -20,
        duration: 5,
        ease: "none",
        transformOrigin: "center center",
        yoyo: true,
        repeat: -1,
      },
      "<",
    )
    .fromTo(
      ".plane-right",
      { y: 10 },
      {
        y: -10,
        duration: 3,
        ease: "none",
        yoyo: true,
        repeat: -1,
      },
      "<",
    )
    .to(
      ".plane-right",
      {
        rotate: -10,
        duration: 5,
        ease: "none",
        transformOrigin: "center center",
        yoyo: true,
        repeat: -1,
      },
      "<",
    );
});

horizontalLoop(".crypto-list", {
  repeat: -1,
  paused: false,
  speed: 0.3,
});
horizontalLoop(".game-dots", {
  repeat: -1,
  paused: false,
  speed: 0.3,
});

gsap.to(".guide-logo", { rotate: 360, duration: 2, ease: "none", repeat: -1 });

gsap.to(".game-rays", { rotate: 360, duration: 15, ease: "none", repeat: -1 });
