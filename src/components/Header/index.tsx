import logo from "../../assets/images/logo.png";
import "./style.css";
import { Text, Loading, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import getData from "../../service/api";

type genreProps = {
  id: number;
  name: string;
};

export default function Header() {
  const [genres, setGenres] = useState([]);
  const [load, setLoad] = useState<boolean>(false);

  async function listGenres() {
    setLoad(true);
    getData("/genre/movie/list")
      .then((response) => response.json())
      .then(({ genres }) => {
        setLoad(false);
        setGenres(genres);
      })
      .catch((error) => {
        setLoad(false);
        console.log(
          "Problem with the free API we use to find genres, please try again later!"
        );
      });
  }

  useEffect(() => {
    listGenres();
  }, []);

  return (
    <header>
      <div>
        <img src={logo} className="logo" alt="CMovies" />
      </div>
      <div>
        {load && <Loading type="points-opacity" />}
        {!load &&
          genres.length &&
          genres.map((genre: genreProps) => (
            <Button flat color="primary" auto>
              {/* <Text
                h1
                size={20}
                css={{
                  textGradient: "45deg, $purple500 20%, $purple400 70%",
                }}
                weight="medium"
                key={genre.name}
              > */}
              {genre.name}
              {/* </Text> */}
            </Button>
          ))}
      </div>
    </header>
  );
}
