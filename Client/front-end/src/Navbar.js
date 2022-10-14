import logo from './logo.jpg'

const Navbar = ({page}) => {
    return (  
        <nav className = 'Navbar'>
            <img src={logo} className="isologo" alt="logo" />
            {page != "Home" &&
                <div className="Nothome"> 
                    <p>{page}</p> 
                    <button onClick={() => console.log("Return Home")}>Home</button>
                </div>
            }
        </nav>
    );
}
 
export default Navbar;