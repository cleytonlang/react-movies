import "./style.css";
import { Grid, Card, Col, Text, Row, Button, Loading } from "@nextui-org/react";
import { useEffect, useState } from "react";
import getData from "../../service/api";

type trendingProps = {
  id: number;
  original_title: string;
  backdrop_path: string;
};

export default function Trending() {
  const [trendings, setTrendings] = useState([]);
  const [load, setLoad] = useState<boolean>(false);

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
    listTrendings();
  }, []);

  return (
    <div className="trending">
      <Grid.Container gap={1} justify="center">
        {load && <Loading type="points-opacity" />}
        {!load &&
          trendings.length &&
          trendings.map((trend: trendingProps) => (
            <Grid xs={12} sm={3} key={trend.original_title}>
              <Card isHoverable>
                <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
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
                    bgBlur: "#0f111466",
                    borderTop: "$borderWeights$light solid $gray800",
                    bottom: 0,
                    zIndex: 1,
                  }}
                >
                  <Row>
                    <Col>
                      <Row>
                        <Col>
                          <Text color="#d1d1d1" size={12}>
                            Breathing App
                          </Text>
                          <Text color="#d1d1d1" size={12}>
                            Get a good night's sleep.
                          </Text>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row justify="flex-end">
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
                            Get App
                          </Text>
                        </Button>
                      </Row>
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
      </Grid.Container>
    </div>
  );
}
