import * as React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import {
  Radio,
  Button,
  RadioGroup,
  FormControlLabel,
  Grid,
  Toolbar,
  Container,
  InputBase,
  IconButton,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider, makeStyles } from "@mui/styles";
import { useState } from "react";

const theme = createTheme();
const useStyles = makeStyles({
  root: {
    backgroundColor: "#BBDEFB",
  },
});

const sections = [
  { title: "ETF검색", url: "/etf" },
  { title: "Stock", url: "/" },
  { title: "Stock종목비교", url: "/compare" },
];

const mainFeaturedPost = {
  title: "국내 주식 배당종목을 확인해보세요.",
  description:
    "투자에 참고하시고 도움이 되셨다면 아래 계좌에 후원해주세요. 서버 유지비용에 도움이 됩니다.",
  image: "https://source.unsplash.com/random",
  imageText: "main image description",
  linkText: "신한 110-190-608814",
};

function StockCompare(props) {
  // console.log("makestyles", makeStyles);
  const { title } = props;

  const [valueRadio, setValueRadio] = useState("STK");
  const [rowDataStock, setRowDataStock] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [searchRate, setSearchRate] = React.useState(0);

  const classes = useStyles();
  console.log("classes", classes);
  const columns = [
    {
      field: "stockNm",
      headerName: "종목명",
      width: 200,
    },
    {
      field: "stockCd",
      headerName: "코드",
      width: 200,
      renderCell: (params: GridRowParams) => {
        const naverUrl =
          "https://finance.naver.com/item/main.naver?code=" + params.value;
        return (
          <a
            key={params.value}
            target="_blank"
            rel="noreferrer"
            href={naverUrl}
          >
            {params.value}
          </a>
        );
      },
    },
    {
      field: "price20200108",
      headerName: "20/01/08(종)",
      width: 100,
      description: "코로나 폭락이전 비교일의 종가",
      renderCell: (params: GridRowParams) => {
        return Intl.NumberFormat("ko-KR", {
          maximumSignificantDigits: 3,
        }).format(params.value);
      },
    },
    {
      field: "price20200319",
      headerName: "20/03/19(종)",
      width: 100,
      description: "코로나 폭락일의 종가",
      renderCell: (params: GridRowParams) => {
        return Intl.NumberFormat("ko-KR", {
          maximumSignificantDigits: 3,
        }).format(params.value);
      },
    },
    {
      field: "price20220713",
      headerName: "22/07/13(종)",
      width: 100,
      description: "최근 최저 종가",
      renderCell: (params: GridRowParams) => {
        return Intl.NumberFormat("ko-KR", {
          maximumSignificantDigits: 3,
        }).format(params.value);
      },
    },
    {
      field: "price20220930",
      headerName: "22/09/30(종)",
      width: 100,
      description: "최근 최저 종가",
      renderCell: (params: GridRowParams) => {
        return Intl.NumberFormat("ko-KR", {
          maximumSignificantDigits: 3,
        }).format(params.value);
      },
    },
    {
      field: "priceOneDayBefore",
      headerName: "23/02/10(종)",
      width: 150,
      renderCell: (params: GridRowParams) => {
        return Intl.NumberFormat("ko-KR", {
          maximumSignificantDigits: 3,
        }).format(params.value);
      },
    },
    {
      field: "price",
      headerName: "현재가조회",
      width: 150,
      renderCell: (params: GridRowParams) => {
        const onClickButton = () => {
          console.log("onClickButton", params);
          let searchValue = {
            result: params.row.stockCd,
            data: valueRadio,
          };
          axios
            .post(process.env.REACT_APP_API_URL + "/stock/toDay", searchValue)
            .then(function (response) {
              // response Action
              console.log("response", response);
              if (response.data) {
                // params.value = response.data.result;
                const newItems = rowDataStock.map((item) => {
                  if (item.stockCd === params.row.stockCd) {
                    return { ...item, price: response.data.result };
                  }
                  return item;
                });
                setRowDataStock(newItems);
              } else {
                console.log("error response", response);
              }
            })
            .finally(() => {});
        };

        return (
          <strong>
            {params.value &&
              Intl.NumberFormat("ko-KR", {
                // style: "currency",
                // currency: "KRW",
                maximumSignificantDigits: 3,
              }).format(params.value)}
            <Button
              variant="contained"
              size="small"
              style={{ marginRight: 16 }}
              onClick={onClickButton}
              tabIndex={params.hasFocus ? 0 : -1}
            >
              조회
            </Button>
          </strong>
        );
      },
    },
  ];

  const onSearchTextChange = (e) => {
    // console.log('onSearchTextChange', e.target.value);
    setSearchText(e.target.value);
  };

  const onSearchRateChange = (e) => {
    console.log("onSearchRateChange", e.target.value);
    setSearchRate(e.target.value);
  };

  const onKeyPress = (e) => {
    //console.log('onKeyPress', e);
    if (e.key === "Enter") {
      onClick();
    }
  };

  const handleRadioChange = (e, ee) => {
    setValueRadio(ee);
    // console.log("e, ee", e, ee);
  };

  const onClick = () => {
    console.log("process.env.REACT_APP_API_URL", process.env.REACT_APP_API_URL);
    setLoading(true);
    axios
      .get(
        process.env.REACT_APP_API_URL +
          "/getCompareStockData?mktId=" +
          valueRadio,
        {}
      )
      .then(function (response) {
        // response Action
        console.log("response", response);
        if (response.data.compareStockList) {
          setRowDataStock(response.data.compareStockList);
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
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container>
            <Grid item md={11}>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                value={valueRadio}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="STK"
                  control={<Radio />}
                  label="KOSPI"
                />
                <FormControlLabel
                  value="KSQ"
                  control={<Radio />}
                  label="KOSDAQ"
                />
              </RadioGroup>
            </Grid>
            <Grid item md={4}>
              <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  aria-label="search"
                  onClick={onClick}
                >
                  <SearchIcon />
                </IconButton>
              </Toolbar>
            </Grid>
            <Grid item md={12}>
              <div style={{ height: 580, width: "100%" }}>
                <DataGrid
                  getRowId={(r) => r.stockCd}
                  rows={rowDataStock}
                  columns={columns}
                  loading={loading}
                  // sortModel={sortModel}
                  // onSortModelChange={(model) => setSortModel(model)}
                />
              </div>
            </Grid>
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
}

StockCompare.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default StockCompare;
