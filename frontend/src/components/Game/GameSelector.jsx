import {React} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export function GameSelector(props) {
    return <Box sx={{ minWidth: 120, padding: '15px' }}>
    <FormControl fullWidth>
      <NativeSelect
        value={props.gameId.game_id}
        onChange={(e)=>props.setGameId({game_id:e.target.value})}>
          {props.gameIds.map((x, i)=>{
              return <option key={i} value={x.game_id}>{x.game_id}</option>
          })}
      </NativeSelect>
    </FormControl>
  </Box>
}