import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ButtonAppBar from "./ButtonAppBar";
import StickyHeadTable from "./StickyHeadTable";

const useStyles = makeStyles(theme => ({
  container: {
    // background: 'grey'
  },
  root: {
    width: "360px",
    // position form in the middle
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
    // background: 'grey'
  },
  table: {
    // position form in the middle
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
    // background: 'grey'
  }
}));

export default function UserQuestionnaires() {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <ButtonAppBar />
      {/* <QuestionnairesMenu /> */}
      <Container className={classes.table} maxWidth="md">
        <StickyHeadTable />
      </Container>
    </Container>
  );
}