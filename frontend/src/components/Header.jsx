import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './Header.css';

const HeaderLink = ({ page }) => {
  const title = page

  const location = useLocation(); // React Hook
  const selected = '/'+page == location.pathname

  return <Link to={`/${page}`} className='headerlink-title'>
  {title}
  <div className={selected ? 'headerlink-dot-active' : 'headerlink-dot'}>•</div>
</Link>
};

export default function Header(input){

    return (
      <div className='header'>
        {input.pages.map((page,i)=>{
          return <HeaderLink key={i} page={page} /> 
        })}
      </div>
    );
  };
  
