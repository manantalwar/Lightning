import logo from './logo.jpg'
import './Navbar.css'

const Navbar = ({page}) => {
    return (  
        <div className='header'>
            <img src={logo} className="isologo" alt="logo" />
            <div className = 'navbar'>
                {page !== "Home" &&
                    <div className="notHome"> 
                        <p className='title'>{page}</p> 
                        <button className="homeBtn" onClick={() => console.log("Return Home")}>Home</button>
                    </div>
                }
            </div>
        </div>

    );
}
 
export default Navbar;