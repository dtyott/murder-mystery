import {React} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function CharacterCard(props) {

    
    return <Card 
            style={{marginBottom: "20px", marginLeft: "250px", marginRight: "250px",  backgroundColor: props.selected?"LightCyan":"Ivory"}} >
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.fullNameText}
              </Typography>
              <Typography variant="body2">
                {props.text}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick = {(_)=>props.selected? props.handleCreate():props.setSelectedCharacter(props.index)} size="small">{props.selected?"Create Character":"Choose Backstory"}</Button>
            </CardActions>
            
          </Card>
}