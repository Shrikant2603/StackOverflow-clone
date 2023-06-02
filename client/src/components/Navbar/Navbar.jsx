import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import decode from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useMediaQuery } from 'react-responsive';
import logo from '../../assets/logo.png'
import icon from '../../assets/icon.png'
import search from '../../assets/search-solid.svg'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import LeftSidebar from '../LeftSidebar/LeftSidebar'
import { setMenuOpen } from '../../actions/navbar';

const Navbar = () => {

    const isMobile = useMediaQuery({ maxWidth: 768 });
    const dispatch = useDispatch()
    var User = useSelector((state) => (state.currentUserReducer))
    const navigate = useNavigate();
    const isMenuOpen = useSelector((state) => state.navbarReducer.isMenuOpen);
    

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/')
        dispatch(setCurrentUser(null))
    }

    useEffect(() => {
        const token = User?.token 
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser( JSON.parse(localStorage.getItem('Profile'))))
        // eslint-disable-next-line
    },[User?.token, dispatch])

    const handleSidebarToggle = () => {
        dispatch(setMenuOpen(!isMenuOpen));
        // console.log(isMenuOpen)
      };

    return (
        <>
        <nav className='main-nav'>
            <div className='navbar'>
                {isMobile && <div className='nav-item nav-btn' onClick={handleSidebarToggle}>
                    <FontAwesomeIcon icon={isMenuOpen?faXmark:faBars} />
                </div>}
                <Link to='/' className='nav-item nav-logo'>
                    <img src={isMobile?icon:logo} alt='logo' />
                </Link>
                {!isMobile && <Link to='/' className='nav-item nav-btn'>About</Link>}
                <Link to='/' className='nav-item nav-btn'>Products</Link>
                {!isMobile && <Link to='/' className='nav-item nav-btn'>For Teams</Link>}
                {isMobile?<img src={search} alt="search" width="18" className='search-icon'/>:
                <form>
                    <input type="text" placeholder='Search...'/>
                    <img src={search} alt="search" width="18" className='search-icon'/>
                </form>}
                { User === null ? 
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link> : 
                    <>
                        <Avatar backgroundColor='#009dff' px="10px" py="7px" borderRadius="50%" color='white'><Link to={`/Users/${User?.result?._id}`} style={{color:"white", textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                }
            </div>
        </nav>
        {isMobile && <div className={isMenuOpen?"menu visible":"menu hidden"}>
                <LeftSidebar />
        </div>}
        </>
    )
}

export default Navbar