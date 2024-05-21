import { Grid } from "@mui/material";
import Text from "components/typography/Text";
import Title from "components/typography/Title";

const Typography = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Text variant={"h1"}>Headline1</Text>
      </Grid>
      <Grid item xs={12}>
        <Text variant={"h2"}>Headline2</Text>
      </Grid>
      <Grid item xs={12}>
        <Text variant={"h3"}>Headline3</Text>
      </Grid>
      <Grid item xs={12}>
        <Text variant={"h4"}>Headline4</Text>
      </Grid>
      <Grid item xs={12}>
        <Text bold>Normal  Bold Text</Text>
      </Grid>
      <Grid item xs={12}>
        <Text pointer>Cursor pointer</Text>
      </Grid>
      <Grid item xs={12}>
        <Text>SmallText</Text>
      </Grid>
      <Grid item xs={12}>
        <Title>Title</Title>
      </Grid>
    </Grid>
  );
};

export default Typography;
