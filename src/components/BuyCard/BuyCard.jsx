import { useContext, useState, useEffect } from "react";
import { ItemsPortal } from "../../portal";
import "./BuyCard.css";

export const BuyCard = ({ setVisible, monkey }) => {
  const { monkeys, setMonkeys, currentUser, setCurrentUser } =
    useContext(ItemsPortal);
  const [status, setStatus] = useState("sell"); // sell, error, sold

  useEffect(() => {
    console.log(monkeys);
  }, [monkeys]);

  const onBuy = () => {
    if (currentUser.money < monkey.cost) {
      setStatus("error");
    } else {
      setCurrentUser((prev) => ({ ...prev, money: prev.money - monkey.cost }));
      setStatus("sold");
      setTimeout(() => {
        setVisible(false);
        setMonkeys((prev) =>
          prev.map((mon) =>
            mon.id === monkey.id ? { ...mon, sold: true } : mon,
          ),
        );
        setCurrentUser((prev) => ({ ...prev, bought: ++prev.bought }));
      }, 1000);
    }
  };

  return (
    <div className="buyCard">
      {status === "sold" && (
        <div className="sold_cover">
          <h1 className="sold">КУПЛЕНО! </h1>
          <p>-{monkey.cost}</p>
        </div>
      )}
      <div className="buyCard_modal">
        <>
          <h1>{monkey.name}</h1>
          <img src={monkey.img} alt="" width="40" />
          <h2>{monkey.descr}</h2>
          <p>
            <b>Атака:</b>
            {monkey.attack}
          </p>
          <p className="question">Купить эту бибизяну?</p>
          <div className="cover">
            <button onClick={() => setVisible(false)}>Отмена</button>
            <button disabled={currentUser.money < monkey.cost} onClick={onBuy}>
              {monkey.cost} денег
            </button>
          </div>
          {currentUser.money < monkey.cost && (
            <p className="error">Недостаточно деняг!</p>
          )}
        </>
      </div>
    </div>
  );
};
