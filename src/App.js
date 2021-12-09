import React from "react";
import { Radio, RadioGroup, FormControlLabel, Snackbar, Grid, Box, Card, CardContent, CardActionArea, Toolbar, Container, Typography, InputBase, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import Footer from './Footer';
import MainFeaturedPost from './MainFeaturedPost';
import CircularIndeterminate from "./CircularIndeterminate";
import RowRadioButtonsGroup from "./RowRadioButtonsGroup";
// import GAdSense from "./AdSense";
/*
const columns = [
  { field: 'stk_NM_KOR', headerName: '주식명', width: 250 },
  { field: 'stk_NM_CNT', headerName: '편입횟수', width: 250 }
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];*/
/*
const useStyles = makeStyles(theme => ({
  container: {
    background: theme.palette.success.main
  }
}));
const sections = [
  { title: 'ETF검색', url: '#' },
  { title: 'Design', url: '#' }
];
*/
/*
const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];
*/
const mainFeaturedPost = {
  title: '국내 ETF 구성종목을 확인해보세요.',
  description:
    "ETF 명칭을 입력하시면 해당 ETF의 구성종목별 건수를 확인하실 수 있습니다. 투자에 참고하시고 도움이 되셨다면 아래 계좌에 후원해주세요. 서버 유지비용에 도움에 됩니다.",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: '신한 110-190-608814',
};

const theme = createTheme();

require('dotenv').config();
// console.log(process.env.REACT_APP_API_URL);

function App() {/*
  const [sortModel, setSortModel] = React.useState([
    {
      field: 'age',
      sort: 'asc',
    },
  ]);*/
  // const [page, setPage] = React.useState(0);
  const [rowData, setRowData] = React.useState([]);
  const [rowDataStock, setRowDataStock] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [searchText, setSearchText] = React.useState("");

  const onSearchTextChange = (e) => {
    // console.log('onSearchTextChange', e.target.value);
    setSearchText(e.target.value);
  };

  const checkValidate = () => {
    let names = ['KODEX','TIGER','KBSTAR','ARIRANG','KINDEX','HANARO'];
    // console.log('length', searchText.length);
    if(searchText.length < 2) {
      setMessage("펀드명은 2자리 이상 입력해주세요.");
      handleClick();
      return false;
    }
    // console.log('name', names.filter(n => n === searchText));
    if(names.filter(n => n === searchText).length > 0) {
      setMessage("권장하지 않는 검색어입니다. KODEX,TIGER,KBSTAR,ARIRANG,KINDEX,HANARO");
      handleClick();
      return false;
    }
    return true;
  }

  const onClick = () => {
    if(checkValidate()) {
      // console.log('onClick', this);
      setLoading(true);
      axios.post(process.env.REACT_APP_API_URL + '/search', {
        result: valueRadio,
        data: searchText
      }).then(function (response) {
        // response Action
        console.log('response', response);
        if(response.data) {
          setRowData(response.data.etfList);        
          setRowDataStock(response.data.stockList);
        }
        else {
          console.log('error response', response);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  const onKeyPress = (e) => {
    //console.log('onKeyPress', e);
    if(e.key === 'Enter') {
      onClick();
    }
  };
  
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const action = (
    <React.Fragment>{/* <Button color="secondary" size="small" onClick={handleClose}>
    UNDO
  </Button> */}      
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  // const classes = useStyles();

    const [valueRadio, setValueRadio] = React.useState('2');

    const handleRadioChange = (event) => {
      setValueRadio(event.target.value);
    };

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Container maxWidth="lg">
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container>
          <Grid item md={11}>
          <RadioGroup row aria-label="gender" name="row-radio-buttons-group" value={valueRadio} onChange={handleRadioChange}>
        <FormControlLabel value="1" control={<Radio />} label="국내시장지수" />
        <FormControlLabel value="2" control={<Radio />} label="국내업종테마" />
        <FormControlLabel value="3" control={<Radio />} label="국내파생" />
        <FormControlLabel value="4" control={<Radio />} label="해외주식" />
        <FormControlLabel value="5" control={<Radio />} label="원자재" />
        <FormControlLabel value="6" control={<Radio />} label="채권" />
        <FormControlLabel value="7" control={<Radio />} label="기타" />
      </RadioGroup>
          </Grid>
          <Grid item md={4}>
<Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
<InputBase
  sx={{ ml: 1, flex: 1 }}
  placeholder="ETF명칭입력"
  inputProps={{ 'aria-label': 'search google maps' }}
  onChange={onSearchTextChange}
  onKeyPress={onKeyPress}
/>
  <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={onClick}>
    <SearchIcon />
  </IconButton>
</Toolbar><Snackbar
open={open}
autoHideDuration={5000}
onClose={handleClose}
message={message}
action={action}
/>

          </Grid>
        </Grid>
    {loading && (<CircularIndeterminate />)}
        <Grid container spacing={4}>
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              ETF명
            </Typography>            
            {rowData.map((archive) => (
              <Box component="li" sx={{ mt: 1, typography: 'body1' }}>{archive.itemcode} {archive.itemname}</Box>
              ))}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>    
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              종목명
            </Typography>
              {rowDataStock.map((archive) => (
              <Box component="li" sx={{ mt: 1, typography: 'body1' }}>{archive.stk_NM_KOR} {archive.stk_NM_CNT}건</Box>
              ))}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
        </Grid>
      </main>
    </Container>
    <Footer
      title="ourtown2017@gmail.com"
      description="문의 및 건의내용은 메일로 주세요 제목은->[ETF문의]"
    />
  </ThemeProvider>
  /*
    <div>
    <AppBar position="static">
        <Toolbar>
          <Typography component="h2" variant="h2">
            Material UI Containers & Grids
          </Typography>
        </Toolbar>
      </AppBar>
      <Typography componet="h2" variant="h5" gutterBottom>
    <TextField id="outlined-basic" label="ETF명" variant="outlined" inputProps={{ maxLength: 50 }} />
    <Button variant="contained">검색</Button>
    <div style={{ height: 400, width: '100%' }} className={classes.root}>
      <DataGrid
      getRowId={(r) => r.stk_NM_KOR}
        rows={rowData}
        columns={columns}
        loading={loading}
        // sortModel={sortModel}
        // onSortModelChange={(model) => setSortModel(model)}
      />
      </div>
      </Typography>
      <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit">
                © 2019 Gistia
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </div>*//*
    <Grid container spacing={1}>
    <Grid item xs={12} md={12} xl={12}>
      <Box bgcolor="info.main" color="info.contrastText">
        상단광고영역
      </Box>
    </Grid>
    <Grid item xs={12}>
    </Grid>
    <Grid item xs={12}>
      <Box bgcolor="info.main" color="info.contrastText">
        하단정보영역
      </Box>
    </Grid>
  </Grid>*/
  );
}

export default App;
