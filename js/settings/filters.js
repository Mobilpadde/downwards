const death = {
  tag: "death",
  text: "Death",
  toggled: localStorage.getItem("downwards:death") == "true" || true,
};

const attackZombie = {
  tag: "attackZombie",
  text: "Attack: Zombie",
  toggled: localStorage.getItem("downwards:attackZombie") == "true" || true,
};

const attackFist = {
  tag: "attackFist",
  text: "Attack: Fist",
  toggled: localStorage.getItem("downwards:attackFist") == "true" || true,
};

const attackPistol = {
  tag: "attackPistol",
  text: "Attack: Pistol",
  toggled: localStorage.getItem("downwards:attackPistol") == "true" || true,
};

const levelChange = {
  tag: "levelChange",
  text: "Level change",
  toggled: localStorage.getItem("downwards:levelChange") == "true" || true,
};

const levelChangeRegen = {
  tag: "levelChangeRegen",
  text: "Regen",
  toggled: localStorage.getItem("downwards:levelChangeRegen") == "true" || true,
};

const playerInvisible = {
  tag: "playerInvisible",
  text: "Invisibility",
  toggled: localStorage.getItem("downwards:playerInvisible") == "true" || true,
};

const weaponAdd = {
  tag: "weaponAdd",
  text: "Weapon: Add",
  toggled: localStorage.getItem("downwards:weaponAdd") == "true" || true,
};

const weaponRemove = {
  tag: "weaponRemove",
  text: "Weapon: Remove",
  toggled: localStorage.getItem("downwards:weaponRemove") == "true" || true,
};

export default () => {
  const holder = document.getElementById("filters");

  [
    death,

    attackZombie,
    attackFist,
    attackPistol,

    levelChange,
    levelChangeRegen,

    playerInvisible,

    weaponAdd,
    weaponRemove,
  ].forEach((t) => {
    if (!localStorage.getItem("downwards:" + t.tag)) {
      localStorage.setItem("downwards:" + t.tag, true);
    }

    const item = document.createElement("div");
    const label = document.createElement("label");
    const box = document.createElement("input");

    item.classList.add("filter");

    label.innerText = t.text;
    label.htmlFor = `filter-${t.tag}`;

    box.type = "checkbox";
    box.checked = localStorage.getItem("downwards:" + t.tag) == "true";

    box.addEventListener("change", ({ target: { checked } }) => {
      t.toggled = checked;
      localStorage.setItem("downwards:" + t.tag, checked);
    });

    item.appendChild(label);
    item.appendChild(box);
    holder.appendChild(item);

    return item;
  });
};

export {
  death,
  attackZombie,
  attackFist,
  attackPistol,
  levelChange,
  levelChangeRegen,
  playerInvisible,
  weaponAdd,
  weaponRemove,
};
