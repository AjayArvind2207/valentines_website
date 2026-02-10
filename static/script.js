const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const hint   = document.getElementById("hint");
const catImg = document.getElementById("catImg");

let yesGrow = 1;
let noGrow  = 1;

const step = 0.6;
const maxYesGrow = 12;

/* Cat sadness progression */
const cats = [
  "/static/cats/smiling_cat.png",
  "/static/cats/neutral_cat.png",
  "/static/cats/sad_cat.png",
  "/static/cats/heartbroken_cat.png",
];

let sadnessLevel = 0;

function applySizes() {
  yesBtn.style.flexGrow = String(yesGrow);
  noBtn.style.flexGrow  = String(Math.max(0.05, noGrow));
}

applySizes();

noBtn.addEventListener("click", () => {
  yesGrow += step;
  noGrow  -= step * 0.55;

  applySizes();

  // increase cat sadness
  if (sadnessLevel < cats.length - 1) {
    sadnessLevel++;
    catImg.src = cats[sadnessLevel];
  }

  // add visual sadness effects
  catImg.classList.toggle("sadder", sadnessLevel >= 2);
  catImg.classList.toggle("very-sad", sadnessLevel >= 4);

  if (sadnessLevel >= cats.length - 1) {
    hint.textContent = "he is emotionally destroyed 😭";
  } else {
    hint.textContent = "look what you're doing to him…";
  }

  if (yesGrow >= maxYesGrow) {
    document.body.classList.add("fullscreen-yes");
    hint.textContent = "PLEASE SAVE THE CAT 😿";
  }
});
