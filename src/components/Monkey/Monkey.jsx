import { useState } from "react";
import { BuyCard } from "../BuyCard/BuyCard";
import './Monkey.css'

export const Monkey = (monkey) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="monkey">
      {visible && <BuyCard setVisible={setVisible} monkey={monkey} />}

      <button onClick={() => setVisible(true)} className="monkeyCard">
        <img src={monkey.img} alt="" />
        <div className="monkey_name">{monkey.name}</div>
      </button>
    </div>
  );
};
