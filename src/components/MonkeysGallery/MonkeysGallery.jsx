import { useContext } from "react";
import { ItemsPortal } from "../../portal";
import "./MonkeysGallery.css";

export const MonkeysGallery = ({ setGalleryVisible }) => {
  const { monkeys, setMonkeys, setCurrentUser, currentUser } = useContext(ItemsPortal);

  const equip = (monkey) => {
    const idToUpgrade = monkey.ids[0]; // берём первую

    setMonkeys((prev) =>
      prev.map((mon) =>
        mon.id === idToUpgrade ? { ...mon, level: mon.level + 1 } : mon,
      ),
    );
    if (monkey.level === 0) {
      setCurrentUser((user) => ({
        ...user,
        money: user.money - 5,
      }));
    } else if (monkey.level === 1) {
      setCurrentUser((user) => ({
        ...user,
        money: user.money - 10,
      }));
    } else {
      setCurrentUser((user) => ({
        ...user,
        money: user.money - 10 * monkey.level,
      }));
    }
  };

  const groupedMap = new Map();

  monkeys
    .filter((mon) => mon.sold)
    .forEach((mon) => {
      const key = `${mon.name}_${mon.level}`;

      if (!groupedMap.has(key)) {
        groupedMap.set(key, {
          name: mon.name,
          level: mon.level,
          img: mon.img,
          descr: mon.descr,
          attack: mon.attack,
          ids: [],
        });
      }

      groupedMap.get(key).ids.push(mon.id);
    });

  const grouped = Array.from(groupedMap.values());

  return (
    <div className="monkeyGallery">
      <button className="close" onClick={() => setGalleryVisible(false)}>
        X
      </button>
      {grouped.map((mon, index) => (
        <div className="monkeyCard" key={index}>
          <div className="cover">
            <p>{mon.level} level</p>{" "}
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {mon.level == 0 && <div className="red">-5</div>}
              {mon.level == 1 && <div className="red">-10</div>}
              {mon.level > 1 && <div className="red">-{10 * mon.level}</div>}
              <button disabled={currentUser.money < mon.level*10} className="ecip" onClick={() => equip(mon)}>
                +1
              </button>
            </div>
          </div>
          <div className="descr">
            <p className="count">x{mon.ids.length}</p>

            <h1>{mon.name}</h1>

            <img src={mon.img} alt="" width="40" />
            <h2>{mon.descr}</h2>

            <p>
              <b>Атака:</b> {mon.attack}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
