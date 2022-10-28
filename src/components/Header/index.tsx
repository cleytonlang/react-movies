import logo from "../../assets/images/logo.png";
import "./style.css";

export default function Header() {
  return (
    <header>
      <div>
        <img src={logo} className="logo" alt="CMovies" />
      </div>
    </header>
  );
}
