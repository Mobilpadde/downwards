import clock from "./clock";

const c = document.getElementById("console");

export default (text, time = clock()) => {
  const line = document.createElement("li");
  line.innerHTML = `<span>[ ${time} ]</span> ${text}`;

  c.appendChild(line);
  c.scrollTop = c.scrollHeight + 16;
  console.log(
    "%c%s%c %s",
    "color:white; background:black;",
    `[ ${time} ]`,
    "color:inherit; background:inherit;",
    text
  );
};
