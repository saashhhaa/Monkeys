import { useContext, useState } from "react";
import "./User.css";
import { ItemsPortal } from "../../portal";
import { MonkeysGallery } from "../MonkeysGallery/MonkeysGallery";

export const User = () => {
  const { currentUser } = useContext(ItemsPortal);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);

  return (
    <div className="user">
      <button onClick={() => setVisible(true)} className="userLink">
        <p>{currentUser.name}</p>
        <img src={currentUser.img} alt="" />
      </button>
      {visible && (
        <div className="userMenu">
          <button>Профиль</button> <br />
          <button onClick={()=>setVisible1(true)}>Бибизяны</button>
        </div>
      )}
    {visible1 && <MonkeysGallery setVisible1={setVisible1}/>}
      
    </div>
  );
};
