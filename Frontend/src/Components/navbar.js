import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
const Navbar= ()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () =>{
        localStorage.clear();
        navigate('/signup');
    } 
    return(
        <div className='header'>
            <img alt="logo" src="https://www.shutterstock.com/image-vector/shopping-logo-ecommerce-logotype-shooping-260nw-1978607771.jpg"/>
            {auth ? 
                <ul className='nav-ul'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add-product">Add Products</Link></li>
                    <li><Link to="/update/id">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name}) </Link></li>
                </ul> :
                <ul className='nav-ul'>
                    <li><Link to="/signup">SignUp</Link></li>
                </ul>
            }
        </div>
    )
}

export default Navbar;