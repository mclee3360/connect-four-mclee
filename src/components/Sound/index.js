import { useEffect } from 'react';
import useSound from 'use-sound';;

export default function Sound({file, volume}) {
  const [play, {stop}] = useSound(file, { volume: volume });

  useEffect(() => {
    play();
    return stop;
  }, [play, stop]);

  return null;
}
