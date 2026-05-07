import { useContext, useState } from "react";
import "./User.css";
import { ItemsPortal } from "../../portal";
import { MonkeysGallery } from "../MonkeysGallery/MonkeysGallery";

export const User = () => {
  const { currentUser } = useContext(ItemsPortal);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);

  return (
    <div className="user">
      <button onClick={() => setUserMenuVisible(true)} className="userLink">
        <p>{currentUser.name}</p>
        <img src={currentUser.img} alt="" />
      </button>
      {userMenuVisible && (
        <div className="userMenu">
          <button>Профиль</button> <br />
          <button onClick={()=>setGalleryVisible(true)}>Бибизяны</button>
        </div>
      )}
    {galleryVisible && <MonkeysGallery setGalleryVisible={setGalleryVisible}/>}
      
    </div>
  );
};
