import { useContext, useState } from "react";
import { ItemsPortal } from "../../portal";
import "./Fight.css";

export const Fight = ({ setFightVisible }) => {
  const { monsters, monkeys } = useContext(ItemsPortal);

  const [monListVisible, setMonListVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [fight, setFight] = useState(false);

  const [selectedMonster, setSelectedMonster] = useState(null);
  const [selectedMonkeys, setSelectedMonkeys] = useState([]);

  const startFightSettings = (monster) => {
    setSelectedMonster(monster);
    setMonListVisible(true);
    setSelectedMonkeys([]);
  };

  const toggleMonkeySelection = (monkey) => {
    setSelectedMonkeys((prev) => {
      const isAlreadySelected = prev.find((m) => m.id === monkey.id);

      if (isAlreadySelected) {
        return prev.filter((m) => m.id !== monkey.id);
      }

      if (prev.length < 3) {
        return [...prev, monkey];
      }
    });
  };

  const currentMonster = monsters[selectedMonster];

  return (
    <div className="fightMenu">
      <button className="close" onClick={() => setFightVisible(false)}>
        X
      </button>
      <div className="monsterList">
        {monsters.map((monster, index) => (
          <button
            className="monsterCard"
            key={index}
            onClick={() => startFightSettings(index)}
          >
            <div className="monsterName">{monster.name}</div>
            <img src={monster.img} alt="" />
              <div className="monsterHp">{monster.hp} hp</div>
              <div>{monster.price} деняг</div>
          </button>
        ))}
      </div>
      {monListVisible && (
        <div className="monkeysList">
          <h2>
            {" "}
            <h1>{currentMonster.name}</h1> <br /> Выбери до 3 обезъянок
          </h2>{" "}
          <br />
          <div className="monListList">
            {monkeys
              .filter((m) => m.sold)
              .map((mon) => {
                const isSelected = selectedMonkeys.find((m) => m.id === mon.id);
                return (
                  <button
                    key={mon.id}
                    className={`monCard ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleMonkeySelection(mon)}
                  >
                    <img src={mon.img} alt="" />
                    <div>{mon.level} lvl</div>
                    {/* {isSelected && <div className="check">✓</div>} */}
                  </button>
                );
              })}
          </div>
          {selectedMonkeys.length > 0 && (
            <button
              className="fightButton"
              onClick={() => setModalVisible(true)}
            >
              В БОЙ
            </button>
          )}
        </div>
      )}

      <div className="fightModal">
        <div className="modal">
          <h1>К БОЮ!</h1>
          <div className="cover">
            <button>Отмена</button>
            <button>Понгали</button>
          </div>
        </div>
      </div>
      <div className="fight"></div>
    </div>
  );
};
