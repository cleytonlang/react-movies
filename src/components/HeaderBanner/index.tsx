import { Container, Grid, Row,  Text } from "@nextui-org/react";
import movie from "../../assets/images/netflix_001.svg";
import "./style.css";

export default function HeaderBanner() {
  return (
    <Row align="center" css={{ marginTop: "40px" }}>
      <Grid.Container justify="space-between" wrap="wrap">
        <Grid
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={5}
          alignItems="center"
          justify="flex-start"
        >
          <Container fluid>
            <Text
              h1
              size={50}
              css={{
                textGradient: "75deg, $blue700 30%, $blue500 50%",
                lineHeight: 1,
              }}
              weight="bold"
            >
              A place where you can find your favorite movies
            </Text>

            <Text
              span
              size={25}
              css={{
                textGradient: "75deg, $gray800 30%, $gray800 50%",
              }}
            >
              Where recommendations surprise you
            </Text>
          </Container>
        </Grid>
        <Grid
          xs={0}
          sm={6}
          md={4}
          lg={4}
          xl={4}
          alignItems="center"
          justify="center"
        >
          <img src={movie} alt="CMovies" style={{ maxHeight: "250px" }} />
        </Grid>
      </Grid.Container>
    </Row>
  );
}
