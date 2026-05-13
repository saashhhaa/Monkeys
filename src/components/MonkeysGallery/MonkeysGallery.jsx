import { useContext, useState } from "react";
import { ItemsPortal } from "../../portal";
import "./MonkeysGallery.css";

// сделать сортировку обезъян в галерее по возрастанию. (левел (0,4 , 5))
// добавить максимальный левел (нпр 15)

export const MonkeysGallery = ({ setGalleryVisible }) => {
  const [upgradingKey, setUpgradingKey] = useState(null);
  const { monkeys, setMonkeys, setCurrentUser, currentUser, sprites } =
    useContext(ItemsPortal);

  const equip = (monkey) => {
    const idToUpgrade = monkey.ids[0];
    const nextLevel = monkey.level + 1;
    const nextKey = `${monkey.name}_${nextLevel}`;

    const upgradeCost = monkey.level === 0 ? 5 : 10 * monkey.level;
    if (currentUser.money < upgradeCost || monkey.level >= 15) return;

    // Анимация срабатывает только на определенных уровнях
    if (nextLevel === 6 || nextLevel === 11 || nextLevel === 14) {
      setUpgradingKey(nextKey); // Сохраняем "Мартыш_6", например
      setTimeout(() => setUpgradingKey(null), 1000);
    }

    // Обновляем юзера
    setCurrentUser((user) => ({ ...user, money: user.money - upgradeCost }));

    // Обновляем обезьян
    setMonkeys((prev) =>
      prev.map((mon) =>
        mon.id === idToUpgrade
          ? {
              ...mon,
              level: nextLevel,
              attack: Math.floor((mon.attack + nextLevel) * 1.1),
              img: getSprite(nextLevel, sprites),
            }
          : mon,
      ),
    );
  };

  const getSprite = (level, sprites) => {
    if (level <= 5) return sprites[1];
    if (level <= 10) return sprites[2];
    if (level <= 13) return sprites[3];
    return sprites[4];
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
      <div className="title">Мои бибизяны</div>
      <div className="monkeys_cards">
        {!grouped.length == 0 ? (
          grouped.map((mon, index) => {
            const currentCardKey = `${mon.name}_${mon.level}`;

            const isUpdatingThisOne = upgradingKey === currentCardKey;
            return (
              <div className="monkeyCard" key={index}>
                {isUpdatingThisOne && (
                  <div className="upgradeAnim">upgrade!</div>
                )}
                <div className="cover">
                  <b>{mon.level} level </b>{" "}
                  {mon.level < 15 ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      {mon.level == 0 && <div className="red">-5</div>}
                      {mon.level == 1 && <div className="red">-10</div>}
                      {mon.level > 1 && (
                        <div className="red">-{10 * mon.level}</div>
                      )}
                      <button
                        disabled={
                          currentUser.money < 5 ||
                          currentUser.money < mon.level * 10
                        }
                        className="ecip"
                        onClick={() => equip(mon)}
                      >
                        +1
                      </button>
                    </div>
                  ) : (
                    <div className="red">max</div>
                  )}
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
            );
          })
        ) : (
          <p>У тебя нет бибизян :(</p>
        )}
      </div>
    </div>
  );
};
