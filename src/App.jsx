import { useEffect, useState } from "react";
import "./App.css";
import { Monkey } from "./components/Monkey/Monkey";
import { ItemsPortal } from "./portal";
import { User } from "./components/User/User";
import { StartMenu } from "./components/StartMenu/StartMenu";

function App() {
  const [monkeys, setMonkeys] = useState([
    {
      id: 0,
      name: "Мартыш",
      cost: 10,
      img: "./sprites/basicMonkey.jpg",
      descr: "Обычная мартышка",
      attack: 90,
      level: 0,
      sold: false
    },
     {
      id: 1,
      name: "Мартыш",
      cost: 10,
      img: "./sprites/basicMonkey.jpg",
      descr: "Обычная мартышка",
      attack: 90,
      level: 0,
      sold: false
    },
    {
      id: 2,
      name: "Горилл",
      cost: 100,
      img: "./sprites/gorilla.png",
      descr: "Тяжеловесны бибизян",
      attack: 1000,
      level: 0,
      sold: false
    },
    {
      id: 3,
      name: "Мартыш",
      cost: 10,
      img: "./sprites/basicMonkey.jpg",
      descr: "Обычная мартышка",
      attack: 90,
      level: 0,
      sold: true
    },
  ]);
  const [visible, setVisible] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "Гость",
    img: "./profileIcon.jpg",
    bought: 0,
    money: 100,
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setTimeout(() => {
        setCurrentUser(JSON.parse(saved));
      }, 1000);
    }
  }, []);

  return (
    <ItemsPortal.Provider
      value={{ monkeys, setMonkeys, currentUser, setCurrentUser }}
    >
      {visible ? (
        <StartMenu setVisible={setVisible} setCurrentUser={setCurrentUser} />
      ) : (
        <div>
          <div className="indicators">
            <div>
              <div>{currentUser.money} деняг</div>
              <p>{currentUser.bought} бибизян</p>
            </div>

            <User />
          </div>
          <div className="scene">
            {monkeys.map((monkey) => !monkey.sold && (
              <Monkey key={monkey.id} {...monkey} />
            ))}
          </div>
        </div>
      )}
    </ItemsPortal.Provider>
  );
}

export default App;
