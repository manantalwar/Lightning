import logo from './logo.jpg'
import './Navbar.css'
 const openInNewTab=url=>{
        window.open(url, '_self', 'noopener,noreferrer');
    }
const Navbar = ({page}) => {
    return (  
        <div className='header'>
            <div className = 'navbar'>
                <img src={logo} className="isologo" alt="logo" />
                {page !== "Home" && <p className='title'>{page}</p>} 
                {page !== "Home" && <button className="homeBtn" onClick={() => openInNewTab('./')}>Home</button>}
            </div>
        </div>
    );
}
 
export default Navbar;