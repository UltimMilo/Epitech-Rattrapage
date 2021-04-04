import { useEffect, useState } from "react";
import { TextField, MenuItem, InputAdornment, makeStyles } from '@material-ui/core';

import EuroIcon from '@material-ui/icons/Euro';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  div: {
    marginTop: theme.spacing(1),
    display: 'flex',
  },
  convert: {
    marginLeft: theme.spacing(1),
    width: '30%',
  }
}))

function MoneyConverter() {
  const currencies = ['USD', 'AUD', 'SGD', 'PHP'];

  const [convertTo, setConvertTo] = useState('USD');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

  const [rates, setRates] = useState(0);

  const classes = useStyles();

  useEffect(() => {
    const apiKey = process.env.REACT_APP_CONVERTER_API_KEY;
    const symbols = ['USD', 'AUD', 'SGD', 'PHP'];
    const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${apiKey}&symbols=${symbols.join(',')}`;

    axios.get(url)
      .then(response => {
        setRates(response.data.rates);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const onAmountChange = (event) => {
    setAmount(event.target.value);

    setResult((rates[convertTo] * event.target.value).toFixed(2));
  }

  const onConvertToChange = (event) => {
    setConvertTo(event.target.value)

    setResult((rates[event.target.value] * amount).toFixed(2));
  }

  return (
    <div>
      <TextField
        type='number'
        variant='outlined'
        value={amount}
        onChange={onAmountChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EuroIcon color='primary'/>
            </InputAdornment>
          ),
        }}
        fullWidth
      />
      <div className={classes.div}>
        <TextField
          type='number'
          variant='outlined'
          value={result}
          disabled
          fullWidth
        />
        <TextField
        id='convert-select'
        variant='outlined'
        value={convertTo}
        onChange={onConvertToChange}
        className={classes.convert}
        select
        >
          {currencies.map((c, index) => (
            <MenuItem key={index} value={c}>{c}</MenuItem>
          ))}
        </TextField>
      </div>
    </div>
  );
}

export default MoneyConverter;