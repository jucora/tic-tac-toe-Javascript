import whoopieSound from '../sound/whoopie.mp3';
import hereWeGoSound from '../sound/here_we_go.mp3';
import monkeySound from '../sound/monkey.mp3';
import laughSound from '../sound/laugh.mp3';

const audio = (() => {
  const whoopie = new Audio(whoopieSound);
  const hereWeGo = new Audio(hereWeGoSound);
  const monkey = new Audio(monkeySound);
  monkey.loop = true;
  const laugh = new Audio(laughSound);
  return {
    whoopie,
    hereWeGo,
    monkey,
    laugh,
  };
})();

export default audio;
