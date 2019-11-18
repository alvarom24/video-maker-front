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

const AnswersTable = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label='answers table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>#</TableCell>
            <TableCell align='center'>Answer</TableCell>
            <TableCell align='center'>Redirect To</TableCell>
            <TableCell align='center'>Correct</TableCell>
            <TableCell align='center'>Options</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.answers.map((row, index) => (
            <TableRow key={index}>
              <TableCell align='center'>{index + 1}</TableCell>
              <TableCell align='center'>{row.description}</TableCell>
              <TableCell align='center'>
                {row.urlAfterAnser ? row.urlAfterAnser : ''}
              </TableCell>
              <TableCell align='center'>
                {row.isCorrect ? (
                  <CheckCircleIcon key={`${index}circle`} />
                ) : (
                  <CancelIcon key={`${index}cance`} />
                )}
              </TableCell>
              <TableCell align='center'>
                <DeleteForeverIcon
                  className='delete-answer-icon'
                  onClick={() => props.handleDeteleAnswer(index)}
                  key={`${index}delete`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AnswersTable;
