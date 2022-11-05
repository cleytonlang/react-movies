import "./style.css";
import {
  Grid,
  Card,
  Col,
  Text,
  Row,
  Button,
  Loading,
  Tooltip,
  Dropdown,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import getData from "../../service/api";

type genreProps = {
  id: number;
  name: string;
};

type mainMovieProps = {
  original_title: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
};

type trendingProps = {
  id: number;
  original_title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
};

export default function Trending() {
  const [trendings, setTrendings] = useState([]);
  const [load, setLoad] = useState<boolean>(false);
  const [genres, setGenres] = useState([]);
  const [mainMovie, setMainMovie] = useState<mainMovieProps>({
    original_title: "",
    vote_average: 0,
    overview: "",
    backdrop_path: "",
  });

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

  async function listTrendings() {
    setLoad(true);
    getData("/trending/movie/week")
      .then((response) => response.json())
      .then(({ results }) => {
        setLoad(false);
        setMainMovie(results[0]);
        setTrendings(results);
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
    listTrendings();
  }, []);

  return (
    <div className="trending">
      {load && <Loading type="points-opacity" />}

      <Row gap={1}>
        <Col span={12}>
          <Grid.Container justify="center">
            <Dropdown>
              <Dropdown.Button flat>Genres</Dropdown.Button>
              <Dropdown.Menu aria-label="Dynamic Actions" items={genres}>
                {(item: any) => (
                  <Dropdown.Item key={item.name} color={"primary"}>
                    {item.name}
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Container>

          <Grid.Container gap={3} justify="center">
            {!load &&
              trendings.length &&
              trendings.map((trend: trendingProps) => (
                <Grid
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  xl={4}
                  key={trend.original_title}
                >
                  <div className="a-box">
                    <div className="img-container">
                      <div className="img-inner">
                        <div className="inner-skew">
                          <img
                            src={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`}
                            alt={trend.original_title}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-container">
                      <Text
                        h1
                        size={25}
                        css={{
                          textGradient: "75deg, $gray900 30%, $gray900 50%",
                          lineHeight: 1,
                        }}
                        weight="bold"
                      >
                        {trend.original_title}
                      </Text>
                      <div>
                        <Text
                          span
                          size={15}
                          css={{
                            textGradient: "75deg, $gray900 30%, $gray900 50%",
                            lineHeight: 1,
                          }}
                        >
                          {trend.overview}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid.Container>
        </Col>
      </Row>
    </div>
  );
}
