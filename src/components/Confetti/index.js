import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Confetti() {
  useEffect(() => {
    const launcher = launchConfetti();

    return () => {
      clearInterval(launcher);
      confetti.reset();
    };
  });
  return null;
}

const launchConfetti = () => {
  const initConfetti = () => {
    confetti({
      particleCount: 150,
      startVelocity: 70,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 150,
      startVelocity: 70,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  };
  const animateConfetti = () => {
    if (!document.hidden) {
      requestAnimationFrame(initConfetti);
    }
  };

  animateConfetti();
  return setInterval(animateConfetti, 1500);
};
