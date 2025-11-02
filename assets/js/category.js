gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray(".banner-texts h1");

let current = 0;
ScrollTrigger.create({
  trigger: ".video-banner",
  start: "top top",
  end: () => "+=" + (texts.length * window.innerHeight),
  pin: true,
  scrub: true,
  onUpdate: (self) => {
    let index = Math.round(self.progress * (texts.length - 1));
    if (index !== current) {
      texts[current].classList.remove("active");
      texts[index].classList.add("active");
      current = index;
    }
  },
});
