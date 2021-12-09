import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup() {

  const [valueRadio, setValueRadio] = React.useState('2');

  const handleRadioChange = (event) => {
    setValueRadio(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">ETF구분</FormLabel>

<RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={valueRadio} onChange={handleRadioChange}>
<FormControlLabel value="1" control={<Radio />} label="국내시장지수" />
<FormControlLabel value="2" control={<Radio />} label="국내업종테마" />
<FormControlLabel value="3" control={<Radio />} label="국내파생" />
<FormControlLabel value="4" control={<Radio />} label="해외주식" />
<FormControlLabel value="5" control={<Radio />} label="원자재" />
<FormControlLabel value="6" control={<Radio />} label="채권" />
<FormControlLabel value="7" control={<Radio />} label="기타" />
</RadioGroup>
    </FormControl>
  );
}