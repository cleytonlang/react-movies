import { Grid, Col, Text, Row, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import getData from "../../service/api";

import {
  ABox,
  ImgContainer,
  InnerSkew,
  TextContainer,
  SelectGeneric,
  GenreSelected,
} from "./styles";

type trendingProps = {
  id: number;
  original_title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
};

type genreProps = {
  name: string;
};

export default function Trending({ theme }: any) {
  const [trendings, setTrendings] = useState([]);
  const [load, setLoad] = useState<boolean>(false);
  const [genres, setGenres] = useState([]);
  const [genresSelected, setGenresSelected] = useState("");

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
            <GenreSelected theme={theme}>{genresSelected}</GenreSelected>
            <SelectGeneric
              theme={theme}
              onChange={(e) => setGenresSelected(e.target.value)}
            >
              <option>Genres</option>
              {genres.map((genre: genreProps) => (
                <option value={genre.name}>{genre.name}</option>
              ))}
            </SelectGeneric>
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
                  <ABox>
                    <ImgContainer>
                      <InnerSkew theme={theme}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500/${trend.backdrop_path}`}
                          alt={trend.original_title}
                        />
                      </InnerSkew>
                    </ImgContainer>
                    <TextContainer theme={theme}>
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
                    </TextContainer>
                  </ABox>
                </Grid>
              ))}
          </Grid.Container>
        </Col>
      </Row>
    </div>
  );
}
