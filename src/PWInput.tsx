import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import * as api from "./api";
import * as state from "./state";

const PWInput = () => {
  const [pwInput, setPwInput] = useState('');

  const [_master_pw, set_master_pw] = useRecoilState(state.master_pw);
  const [_names, set_names] = useRecoilState(state.names);
  const [_mode, set_mode] = useRecoilState(state.mode);
  const [_error, setError] = useRecoilState(state.error);

  return (
    <>
      <TextField
        type="password"
        label="Master Password"
        autoComplete="current-password"
        onChange={evt => setPwInput(evt.target.value)}
      />
      <Button onClick={async () => {
        try {
          const resp = await api.post<api.ListReq, api.ListResp>("/list", { master_pw: pwInput });
          set_names(resp.names.sort());
          set_master_pw(pwInput);
          set_mode('listing');
        }
        catch (e) {
          setError(e as string);
        }
      }}>Submit</Button>
    </>
  );
};

export default PWInput;