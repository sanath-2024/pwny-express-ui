import { Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useRecoilState } from "recoil";
import * as api from "./api";
import * as state from "./state";

const Listing = () => {
  const [new_name, set_new_name] = useState('');
  const [new_value, set_new_value] = useState('');
  const [show_new_value, set_show_new_value] = useState(false);

  const [master_pw, _set_master_pw] = useRecoilState(state.master_pw);
  const [names, set_names] = useRecoilState(state.names);
  const [_error, setError] = useRecoilState(state.error);

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Get</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              names.map(name =>
                <TableRow key={name}>
                  <TableCell>
                    {name}
                  </TableCell>
                  <TableCell>
                    <Button onClick={async () => {
                      try {
                        const resp = await api.post<api.GetReq, api.GetResp>("/get", { master_pw, name });
                        navigator.clipboard.writeText(resp.value);
                        alert(`Password "${name}" is copied to the clipboard!`);
                      }
                      catch (e) {
                        setError(e as string);
                      }
                    }}>Get!</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={async () => {
                      try {
                        await api.post<api.DeleteReq, api.DeleteResp>("/delete", { master_pw, name });
                        const resp = await api.post<api.ListReq, api.ListResp>("/list", { master_pw });
                        set_names(resp.names);
                        alert(`Password "${name}" has been deleted`);
                      }
                      catch (e) {
                        setError(e as string);
                      }
                    }}>Delete!</Button>
                  </TableCell>
                </TableRow>)
            }
          </TableBody>
        </Table>
      </TableContainer>
      <br /><br />
      <Typography>Add new password:</Typography>
      <br />
      <TextField label="Name" onChange={evt => set_new_name(evt.target.value)}></TextField>
      <TextField type={show_new_value ? "text" : "password"} label="Value" onChange={evt => set_new_value(evt.target.value)}></TextField>
      <Typography>Show password?</Typography>
      <Checkbox checked={show_new_value} onChange={evt => set_show_new_value(evt.target.checked)} />
      <br />
      <Button onClick={async () => {
        try {
          await api.post<api.CreateReq, api.CreateResp>("/create", { master_pw, name: new_name, value: new_value });
          const resp = await api.post<api.ListReq, api.ListResp>("/list", { master_pw });
          set_names(resp.names);
          alert(`Created new password "${new_name}"!`);
        }
        catch (e) {
          setError(e as string);
        }
      }}>Add new password!</Button>
    </>
  );
};

export default Listing;