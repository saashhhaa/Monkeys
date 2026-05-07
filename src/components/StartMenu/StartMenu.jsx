import './StartMenu.css'
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

export const StartMenu = ({setVisible, setCurrentUser}) => {
  return (
    <div className="startMenu">
      <h1>Бибизянки</h1>
      <button onClick={()=>setVisible(false)}>Начать</button>
       <GoogleLogin
        onSuccess={(res) => {
          const user = jwtDecode(res.credential);

          const data = {
            name: user.name,
            img: user.picture,
            bought: 0,
          };

          setCurrentUser(data);
          localStorage.setItem("user", JSON.stringify(data));

          setVisible(false);
        }}
        onError={() => console.log("login error")}
      />
    </div>
  );
};
