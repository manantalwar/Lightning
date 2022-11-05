import logo from './logo.jpg'
import './Navbar.css'
 const openInNewTab=url=>{
        window.open(url, '_self', 'noopener,noreferrer');
    }
const Navbar = ({page}) => {
    return (  
        <div className='header'>
            <img src={logo} className="isologo" alt="logo" />
            <div className = 'navbar'>
                {page !== "Home" &&
                    <div className="notHome"> 
                        <p className='title'>{page}</p> 
                        <button className="homeBtn" onClick={() => openInNewTab('./')}>Home</button>
                    </div>
                }
            </div>
        </div>

    );
}
 
export default Navbar;