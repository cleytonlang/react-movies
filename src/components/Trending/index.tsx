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
        <Col span={2}>
          {genres.length &&
            genres.map((genre: genreProps) => (
              <Text
                h1
                size={30}
                css={{
                  textGradient: "45deg, $blue700 25%, $blue500 40%",
                }}
                weight="medium"
                key={genre.name}
              >
                {genre.name}
              </Text>
            ))}
        </Col>

        <Col span={8}>
          <Grid.Container gap={1} justify="center">
            {!load && mainMovie && mainMovie.original_title && (
              <Grid xs={12} sm={12}>
                <Card isHoverable>
                  <Card.Header
                    css={{
                      position: "absolute",
                      zIndex: 1,
                      top: 5,
                    }}
                  >
                    <Col>
                      <Text h2 color="#777777">
                        {mainMovie.original_title}
                      </Text>
                    </Col>
                  </Card.Header>
                  <Card.Body css={{ p: 0 }}>
                    <Card.Image
                      src={`https://image.tmdb.org/t/p/w500/${mainMovie.backdrop_path}`}
                      width="100%"
                      height={440}
                      objectFit="cover"
                      alt="Card image background"
                    />
                  </Card.Body>
                  <Card.Footer
                    isBlurred
                    css={{
                      position: "absolute",
                      bgBlur: "#0f111499",
                      bottom: 0,
                      zIndex: 1,
                    }}
                  >
                    <Row>
                      <Col span={3}>
                        <Row>
                          <Col>
                            <Text h5 color="#999999" size={18}>
                              Vote average: {mainMovie.vote_average.toFixed(1)}
                            </Text>
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Row justify="flex-end">
                          <Text h4 color="#999999">
                            {mainMovie.overview}
                          </Text>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Footer>
                </Card>
              </Grid>
            )}

            {!load &&
              trendings.length &&
              trendings
                .filter((i, index) => index < 8)
                .map((trend: trendingProps) => (
                  <Grid xs={3} sm={3} key={trend.original_title}>
                    <Card isHoverable>
                      <Card.Header
                        css={{ position: "absolute", zIndex: 1, top: 5 }}
                      >
                        <Col>
                          <Text h4 color="white">
                            {trend.original_title}
                          </Text>
                        </Col>
                      </Card.Header>
                      <Card.Body css={{ p: 0 }}>
                        <Card.Image
                          src={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`}
                          width="100%"
                          height={340}
                          objectFit="cover"
                          alt="Card image background"
                        />
                      </Card.Body>
                      <Card.Footer
                        isBlurred
                        css={{
                          position: "absolute",
                          bgBlur: "#0f111499",
                          bottom: 0,
                          zIndex: 1,
                        }}
                      >
                        <Row>
                          <Col>
                            <Row>
                              <Col>
                                <Text h5 color="#d1d1d1" size={18}>
                                  Vote average: {trend.vote_average.toFixed(1)}
                                </Text>
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Row justify="flex-end">
                              <Tooltip
                                content={trend.overview}
                                rounded
                                color="primary"
                                css={{
                                  maxWidth: "350px",
                                  backgroundColor: "#111111",
                                }}
                                offset={40}
                              >
                                <Button
                                  flat
                                  auto
                                  rounded
                                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                                >
                                  <Text
                                    css={{ color: "inherit" }}
                                    size={12}
                                    weight="bold"
                                    transform="uppercase"
                                  >
                                    See overview
                                  </Text>
                                </Button>
                              </Tooltip>
                            </Row>
                          </Col>
                        </Row>
                      </Card.Footer>
                    </Card>
                  </Grid>
                ))}
          </Grid.Container>
        </Col>

        <Col span={2} className="colListTrends">
          <Grid.Container>
            {!load &&
              trendings.length &&
              trendings.map((trend: trendingProps) => (
                <Grid
                  xs={12}
                  key={trend.original_title}
                  onClick={() => {
                    setMainMovie({
                      original_title: trend.original_title,
                      vote_average: trend.vote_average,
                      overview: trend.overview,
                      backdrop_path: trend.backdrop_path,
                    });
                  }}
                >
                  <Card isHoverable>
                    <Card.Header
                      css={{ position: "absolute", zIndex: 1, top: 5 }}
                    >
                      <Col>
                        <Text h4 color="white">
                          {trend.original_title}
                        </Text>
                      </Col>
                    </Card.Header>
                    <Card.Body css={{ p: 0 }}>
                      <Card.Image
                        src={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`}
                        width="100%"
                        height={140}
                        objectFit="cover"
                        alt="Card image background"
                      />
                    </Card.Body>
                  </Card>
                </Grid>
              ))}
          </Grid.Container>
        </Col>
      </Row>
    </div>
  );
}
