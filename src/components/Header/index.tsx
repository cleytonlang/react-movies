import logo from "../../assets/images/logo.png";
import "./style.css";

export default function Header() {
  return (
    <div className="header">
      <div>
        <img src={logo} className="logo" alt="CMovies" />
      </div>
    </div>
  );
}
