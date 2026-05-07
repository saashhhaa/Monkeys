import { useContext, useState } from "react";
import { ItemsPortal } from "../../portal";
import "./MonkeysGallery.css";

export const MonkeysGallery = ({ setVisible1 }) => {
  const { monkeys } = useContext(ItemsPortal);

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
          count: 0,
        });
      }

      groupedMap.get(key).count++;
    });

  const grouped = Array.from(groupedMap.values());

  return (
    <div className="monkeyGallery">
      <button className="close" onClick={() => setVisible1(false)}>
        X
      </button>
      {grouped.map((mon, index) => (
        <div className="monkeyCard" key={index}>
          <p>{mon.level} level </p>
          <div className="descr">
            <p className="count">x{mon.count}</p>

            <h1>{mon.name}</h1>

            <img src={mon.img} alt="" width="40" />
            <h2>{mon.descr}</h2>

            <p>
              <b>Атака:</b> {mon.attack}
            </p>
          </div>
        </div>
      ))}
      <button className="ecip">Экипировать</button>
    </div>
  );
};
