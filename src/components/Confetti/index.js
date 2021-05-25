import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Sound from '../../components/Sound/index.js';
import popSound from '../../assets/pop.mp3';

export default function Confetti({loop}) {
  useEffect(() => {
    const launcher = launchConfetti(loop);

    return () => {
      if (launcher) {
        clearInterval(launcher);
      }
      confetti.reset();
    };
  });

  return <Sound file={popSound} volume={0.4} />;
}

const launchConfetti = (loop) => {
  const initConfetti = () => {
    const commonOptions = {
      particleCount: loop ? 150 : 400,
      startVelocity: 90,
      spread: 55,
      ticks: loop ? 200 : 300,
    };
    confetti({
      ...commonOptions,
      angle: 60,
      origin: { x: 0 }
    });
    confetti({
      ...commonOptions,
      angle: 120,
      origin: { x: 1 }
    });
  };
  const animateConfetti = () => {
    if (!document.hidden) {
      requestAnimationFrame(initConfetti);
    }
  };

  animateConfetti();
  return loop ? setInterval(animateConfetti, 1500) : null;
};
