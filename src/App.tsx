import { Container, Paper, Typography } from '@mui/material';
import { useRecoilState } from 'recoil';
import './App.css';
import Error from './Error';
import Listing from './Listing';
import PWInput from './PWInput';
import * as state from './state';

function App() {
  const [mode, _setMode] = useRecoilState(state.mode);

  return (
    <Container maxWidth="lg">
      <Paper elevation={5} style={{ margin: "20px", padding: "50px" }}>
        <Typography variant="h1">PWNY Express</Typography>
        <Typography variant="h3">Your favorite simple password manager!</Typography>
        <br /><br />
        {mode == 'initial' ? <PWInput /> : <Listing />}
        <Error />
      </Paper>
    </Container>
  );
}

export default App;
