import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CasinoIcon from '@mui/icons-material/Casino';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WidgetsIcon from '@mui/icons-material/Widgets';
import './Header.css';
import { GetActiveCharacter } from '../storage/Register';

const MAX_HP = 3



const iconMap = {
  create_game: CreateNewFolderIcon,
  join_game: PersonAddIcon,
  home: HomeIcon,
  players: PeopleIcon,
  gambling: CasinoIcon,
  store: LocalGroceryStoreIcon,
  inventory: WidgetsIcon
}

const textMap = {
  create_game: "New Game",
  join_game: "Join Game",
  home: "Home",
  players: "Players",
  gambling: "Gambling",
  inventory: "Inventory",
  store: "Store"
}

const HeaderLink = ({ page }) => {
  const title = textMap[page]
  const Icon = iconMap[page]

  const location = useLocation();
  const selected = '/'+page == location.pathname
  let className = selected ? 'headerlink-no-link ' : '';
  className += 'headerlink-title';

  return<div className={className}>
      
<Link to={`/${page}`} className={className} >
  <div className='header'>
    <Icon/>
  </div> 
    {title}
    </Link>
  </div>  
};

export default function Header(input){

    const character = GetActiveCharacter()
    const hp = character.hp

    return (
      <div className='sticky'>
        <div className = "header">
        <div>
        {[...Array(MAX_HP).keys()].map(i=>{
         return i+1<=hp? <FavoriteIcon key={i}/>: <FavoriteBorderIcon key={i}/>
        })}
        
        <div>
        {"$"+character.money}
        </div>
        </div>
        </div>
        
        
        {input.pages.map((page,i)=>{
          return <HeaderLink key={i} page={page} /> 
        })}
      </div>
    );
  };
  
