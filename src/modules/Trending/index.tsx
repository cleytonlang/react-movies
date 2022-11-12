import { Grid, Col, Text, Row, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import getData from "../../service/api";

import {
  TrendingContainer,
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
  id: number;
  name: string;
};

export default function Trending({ theme }: any) {
  const [trendings, setTrendings] = useState([]);
  const [load, setLoad] = useState<boolean>(false);
  const [genres, setGenres] = useState<genreProps[]>([]);
  const [genresSelected, setGenresSelected] = useState<number>(0);
  const [genresSelectedTitle, setGenresSelectedTitle] = useState("");

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

  async function listTrendings(url: string) {
    setLoad(true);
    getData(url)
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
    listTrendings("/trending/movie/week");
  }, []);

  useEffect(() => {
    if (genresSelected !== 0) {
      const genreSelect = genres.filter(
        (item: any) => item.id === genresSelected
      );
      if (genreSelect && genreSelect.length) {
        setGenresSelectedTitle(genreSelect[0].name);
      }
      listTrendings(`/discover/movie?with_genres=${genresSelected}`);
    }
  }, [genresSelected]);

  return (
    <TrendingContainer>
      <Row gap={1}>
        <Col span={12}>
          <Grid.Container justify="center">
            <GenreSelected theme={theme}>{genresSelectedTitle}</GenreSelected>
            <SelectGeneric
              theme={theme}
              onChange={(e) => setGenresSelected(Number(e.target.value))}
            >
              <option value={0}>Genres</option>
              {genres.map((genre: genreProps) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </SelectGeneric>
          </Grid.Container>

          {load && (
            <Grid.Container justify="center" css={{ padding: "30px" }}>
              <Loading type="points-opacity" size="lg" />
            </Grid.Container>
          )}

          <Grid.Container gap={3} justify="center">
            {trendings.length &&
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
    </TrendingContainer>
  );
}
