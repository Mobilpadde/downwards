import "select-pure";

export default () => {
  const holder = document.getElementById("filters");

  const select = document.createElement("select-pure");
  select.setAttribute("name", "filters");
  select.toggleAttribute("multiple");

  const filters = [
    death,

    attackZombie,

    attackFist,
    attackSword,

    attackPistol,
    attackSmg,

    levelChange,
    levelChangeRegen,

    playerInvisible,

    weaponAdd,
    weaponRemove,
  ];

  filters.forEach((t) => {
    const tag = "downwards:" + t.tag;

    if (!localStorage.getItem(tag)) {
      localStorage.setItem(tag, true);
    }

    const option = document.createElement("option-pure");

    option.innerText = t.text;
    option.value = tag;
    option.setAttribute("value", tag);
    option.toggleAttribute("selected", localStorage.getItem(tag) == "true");

    select.appendChild(option);
  });

  select.addEventListener("change", ({ target: { values } }) => {
    filters.forEach((f) => localStorage.setItem("downwards:" + f.tag, false));
    values.forEach((tag) => localStorage.setItem(tag, true));
  });

  holder.appendChild(select);
};

export {
  death,
  attackZombie,
  attackFist,
  attackPistol,
  attackSword,
  attackSmg,
  levelChange,
  levelChangeRegen,
  playerInvisible,
  weaponAdd,
  weaponRemove,
};

const death = {
  tag: "death",
  text: "Death",
  toggled: () => localStorage.getItem("downwards:death") == "true",
};

const attackZombie = {
  tag: "attackZombie",
  text: "Attack: Zombie",
  toggled: () => localStorage.getItem("downwards:attackZombie") == "true",
};

const attackFist = {
  tag: "attackFist",
  text: "Attack: Fist",
  toggled: () => localStorage.getItem("downwards:attackFist") == "true",
};

const attackSword = {
  tag: "attackSword",
  text: "Attack: Sword",
  toggled: () => localStorage.getItem("downwards:attackSword") == "true",
};

const attackPistol = {
  tag: "attackPistol",
  text: "Attack: Pistol",
  toggled: () => localStorage.getItem("downwards:attackPistol") == "true",
};

const attackSmg = {
  tag: "attackSmg",
  text: "Attack: Smg",
  toggled: () => localStorage.getItem("downwards:attackSmg") == "true",
};

const levelChange = {
  tag: "levelChange",
  text: "Level change",
  toggled: () => localStorage.getItem("downwards:levelChange") == "true",
};

const levelChangeRegen = {
  tag: "levelChangeRegen",
  text: "Regen",
  toggled: () => localStorage.getItem("downwards:levelChangeRegen") == "true",
};

const playerInvisible = {
  tag: "playerInvisible",
  text: "Invisibility",
  toggled: () => localStorage.getItem("downwards:playerInvisible") == "true",
};

const weaponAdd = {
  tag: "weaponAdd",
  text: "Weapon: Add",
  toggled: () => localStorage.getItem("downwards:weaponAdd") == "true",
};

const weaponRemove = {
  tag: "weaponRemove",
  text: "Weapon: Remove",
  toggled: () => localStorage.getItem("downwards:weaponRemove") == "true",
};
