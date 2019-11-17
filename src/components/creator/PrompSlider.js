import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { StyleSheet, css } from 'aphrodite';
import clsx from 'clsx';

const PrompSlider = props => {
  const ValueLabelComponent = props => {
    const { children, open, value } = props;

    const popperRef = React.useRef(null);
    React.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.update();
      }
    });

    return (
      <Tooltip
        PopperProps={{
          popperRef,
        }}
        open={open}
        enterTouchDelay={0}
        placement='top'
        title={value}
      >
        {children}
      </Tooltip>
    );
  };

  return (
    <div className='promp-container'>
      <div>
        <Typography gutterBottom>Promp question at minute:</Typography>
        <Slider
          ValueLabelComponent={ValueLabelComponent}
          aria-label='custom thumb label'
          defaultValue={1}
          max={6}
          onChange={(object, value) => props.onChange(value)}
        />
      </div>
    </div>
  );
};

export default PrompSlider;
