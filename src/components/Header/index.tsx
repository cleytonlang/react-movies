import logo from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import "./style.css";

export default function Header({ setIsDark, isDark }: any) {
  return (
    <div className="header">
      <div>
        <img src={isDark ? logo : logoLight} className="logo" alt="CMovies" />

        <div className="checkbox-wrapper-54">
          <label className="switch">
            <input type="checkbox" onChange={() => setIsDark(!isDark)} />
            <span className="slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
