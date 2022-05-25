import React from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };

    fetch("http://manhour-plottype-dev.ml:4000/posts")
      .then(response => response.json())
      .then(posts => (this.setState({ posts })));
  }

  render() {
    return (
      <GenericTemplate title="工数集計一覧">
      <TableContainer component={Paper}>
        <Table className={useStyles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>西暦／月</TableCell>
              <TableCell align="left">社員名</TableCell>
              <TableCell align="left">プロジェクト</TableCell>
              <TableCell align="left">工程詳細</TableCell>
              <TableCell align="right">時間／月</TableCell>
              <TableCell align="left">工程</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.posts.map(post => 
              <TableRow key={post.yyyymm}>
                <TableCell component="th" scope="row">
                  {post.yyyymm}
                </TableCell>
                <TableCell align="left">{post.user_name}</TableCell>
                <TableCell align="left">{post.project_code}:{post.product_name}）{post.project_name}</TableCell>
                <TableCell align="left">{post.process_detail}</TableCell>
                <TableCell align="right">{post.hh}</TableCell>
                <TableCell align="left">{post.process_name}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </GenericTemplate>
  );
  }
}



