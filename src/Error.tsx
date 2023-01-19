import { Typography } from "@mui/material";
import { useRecoilState } from "recoil";
import * as state from "./state";

const Error = () => {
  const [error, setError] = useRecoilState(state.error);

  // set the error back to undefined after 5 seconds
  if (error !== undefined) {
    new Promise(resolve => setTimeout(resolve, 5000)).then(() => { setError(undefined); });
  }

  if (error === undefined)
    return null;

  return (
    <Typography color="red">
      {`Error: ${error}`}
    </Typography>
  );
};

export default Error;