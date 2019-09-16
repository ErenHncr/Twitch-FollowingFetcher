import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import { UserConsumer } from './context'

const useStyles = makeStyles({
  root: {
    width: 500,
    marginLeft:"20px"
  },
  input: {
    width: 42,

  },
  textField:{
    marginLeft:"520px",
    marginTop:"-50px"

  }
});

export default function InputSlider() {
  
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (dispatch,event, newValue) => {
    setValue(newValue);
    dispatch({type: "RANGE_UPDATE",payload:newValue});
    
  };

  const handleInputChange = (dispatch,event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
    dispatch({type: "RANGE_UPDATE",payload:Number(event.target.value)});

  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 90) {
      setValue(90);
    }
  };

    return (
        <UserConsumer>
         {state => {
           const {dispatch}=state;
           return(
          <div className={classes.root+" range"}>
            <Typography id="input-slider" gutterBottom>
              How Many Days Do You Want To Search?
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange.bind(this,dispatch)}
                  aria-labelledby="input-slider"
                /> 
                
              </Grid>
              <Grid item xs={8} className={classes.textField}>
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={handleInputChange.bind(this,dispatch)}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 9,
                    min: 0,
                    max: 90,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </div>)}}
    </UserConsumer>
    )
}