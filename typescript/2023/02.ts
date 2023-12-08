import { parseInput, splitData } from '../helpers';

const data = parseInput(__dirname, 'data/02-input.txt');
const games = splitData(data, 1);

const separateGameFromId = (game: string): [number, string] => {
  const splitGame = game.split(':');
  const id = parseInt(splitGame[0].replace(/[^0-9]/g, ''), 10);
  return [id, splitGame[1]];
};

const getCubeMaxLimit = (color: string) => {
  if (color === 'red') return 12;
  if (color === 'green') return 13;
  if (color === 'blue') return 14;
  return 0;
};

const checkGameValidity = (game: string) => {
  const splitGame = game.trim().split(' ');
  let isValidGame = true;
  let i = 0;
  while (isValidGame && i < splitGame.length) {
    const color = splitGame[i + 1].replace(/\W/g, '');
    const limit = getCubeMaxLimit(color);
    if (parseInt(splitGame[i], 10) > limit) {
      isValidGame = false;
    }
    i += 2;
  }
  return isValidGame;
};

const getAnswer = () => {
  let answer = 0;
  for (let i = 0; i < games.length; i++) {
    const [id, game] = separateGameFromId(games[i]);
    if (checkGameValidity(game)) {
      answer += id;
    }
  }
  return answer;
};
console.log(getAnswer());
