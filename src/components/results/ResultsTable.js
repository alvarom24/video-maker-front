import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const ResultsTable = props => {
  const classes = useStyles();

  const renderAswers = answers => {
    const formattedAnswers = JSON.parse(answers);
    if (formattedAnswers.length > 0) {
      return (
        <ul>
          {formattedAnswers.map((aItem, index) => {
            const dateKey = Date.now();
            return <li key={`${dateKey}${index}`}>{aItem.description}</li>;
          })}
        </ul>
      );
    }

    return 'No answer provided';
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='answers table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Course Id</TableCell>
            <TableCell align='center'>User</TableCell>
            <TableCell align='center'>User Answers</TableCell>
            <TableCell align='center'>Correct Answers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.results.map((row, index) => (
            <TableRow key={index}>
              <TableCell align='center'>{row.courseId}</TableCell>
              <TableCell align='center'>{row.user}</TableCell>
              <TableCell align='left'>
                {renderAswers(row.userAnswers)}
              </TableCell>
              <TableCell align='left'>
                {renderAswers(row.correctAnswers)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ResultsTable;
