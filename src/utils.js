import confetti from "canvas-confetti";

export const formatLocalDate = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export const fireSmallConfetti = () => {
  confetti({
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.7 },
    colors: ["#f59e0b", "#fbbf24", "#fef3c7", "#ffffff"],
  });
};
export const fireBigConfetti = () => {
  const duration = 1000; // duration: 1 second
  const animationEnd = Date.now() + duration;
  const colors = ["#f59e0b", "#fbbf24", "#fef3c7", "#ffffff"];

  (function frame() {
    const timeLeft = animationEnd - Date.now();

    // left side
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });
    // right side
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });

    if (timeLeft > 0) {
      requestAnimationFrame(frame);
    }
  })();
};
