import React from 'react';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

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
