export default (): string => {
  const now = new Date();

  const secNumber = now.getSeconds();
  const minNumber = now.getMinutes();
  const hrsNumber = now.getHours();

  let sec = secNumber.toString();
  if (secNumber < 10) {
    sec = `0${secNumber}`;
  }

  let min = minNumber.toString();
  if (minNumber < 10) {
    min = `0${minNumber}`;
  }

  let hrs = hrsNumber.toString();
  if (hrsNumber < 10) {
    hrs = `0${hrsNumber}`;
  }

  return `${hrs}:${min}:${sec}`;
};
