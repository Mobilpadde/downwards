const yearStart = ~~(Math.random() * 5000);

let time = 0;

const c = setInterval(() => time++, 5);
const stop = () => clearInterval(c);

export default () => {
  let s = time % 60;
  let m = ~~(time / 60) % 60;
  let h = ~~(time / 60 / 60) % 24;

  let day = ~~(time / 60 / 60 / 24) + 1;
  let month = ~~(time / 60 / 60 / 24 / 30) + 1;
  let year = ~~(time / 60 / 60 / 24 / 30 / 365) + yearStart + 1;

  if (s < 10) {
    s = `0${s}`;
  }

  if (m < 10) {
    m = `0${m}`;
  }

  if (h < 10) {
    h = `0${h}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  if (month < 10) {
    month = `0${month}`;
  }

  return `${year}/${month}/${day} ${h}:${m}:${s}`;
};
export { stop };
