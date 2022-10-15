import logo from './logo.jpg'

const Navbar = ({page}) => {
    return (  
        <div className='header'>
            <img src={logo} className="isologo" alt="logo" />
            <nav className = 'navbar'>
                {page != "Home" &&
                    <div className="Nothome"> 
                        <p>{page}</p> 
                        <button onClick={() => console.log("Return Home")}>Home</button>
                    </div>
                }
            </nav>
        </div>

    );
}
 
export default Navbar;