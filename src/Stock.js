import * as React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Container,
} from "@mui/material";
import Header from "./Header";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { useState } from "react";

const theme = createTheme();
const useStyles = makeStyles((tm) => ({
  container: {
    // background: tm.palette.success.main,
  },
}));

const sections = [
  { title: "ETF검색", url: "/" },
  { title: "Stock", url: "/stock" },
];

function Stock(props) {
  const { description, title } = props;
  const classes = useStyles();
  const columns = [
    { field: "stk_NM_KOR", headerName: "주식명", width: 250 },
    { field: "trd_DT", headerName: "코드", width: 250 },
  ];

  const [valueRadio, setValueRadio] = useState("STK");
  const [rowDataStock, setRowDataStock] = useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleRadioChange = (e, ee) => {
    setValueRadio(ee);
    console.log("e, ee", e, ee);
  };

  const onClick = () => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_API_URL + "/stock", {
        result: null,
        data: valueRadio,
      })
      .then(function (response) {
        // response Action
        console.log("response", response);
        if (response.data) {
          setRowDataStock(response.data.stockList);
        } else {
          console.log("error response", response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title={title} sections={sections} />
      <Container maxWidth="lg">
        {description}
        <Grid container>
          <Grid item md={11}>
            <RadioGroup
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={valueRadio}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="STK" control={<Radio />} label="KOSPI" />
              <FormControlLabel
                value="KSQ"
                control={<Radio />}
                label="KOSDAQ"
              />
            </RadioGroup>
            <Button variant="contained" onClick={onClick}>
              검색
            </Button>
          </Grid>
          <Grid item md={11}>
            <div
              style={{ height: 400, width: "100%" }}
              className={classes.root}
            >
              <DataGrid
                getRowId={(r) => r.trd_DT}
                rows={rowDataStock}
                columns={columns}
                loading={loading}
                // sortModel={sortModel}
                // onSortModelChange={(model) => setSortModel(model)}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

Stock.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Stock;
