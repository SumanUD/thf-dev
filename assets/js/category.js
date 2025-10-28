
gsap.registerPlugin(ScrollTrigger);

const texts = gsap.utils.toArray(".banner-texts h1");

texts.forEach((text, i) => {
  gsap.to(text, {
    scrollTrigger: {
      trigger: ".video-banner",
      start: () => `top+=${i * window.innerHeight} top`,
      end: () => `+=${window.innerHeight}`,
      scrub: true,
      pin: true,
      pinSpacing: false,
      onEnter: () => showText(i),
      onEnterBack: () => showText(i),
    }
  });
});

function showText(index) {
  texts.forEach((t, i) => {
    if (i === index) {
      t.style.opacity = "1";
      t.style.transform = "translateY(0)";
    } else {
      t.style.opacity = "0";
      t.style.transform = "translateY(50px)";
    }
  });
}

