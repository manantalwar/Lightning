import Navbar from './Navbar';
import './home.css';

const home = () => {
    const page = "Home"
    return (  
        <div classname="Home">
            <div>
                <Navbar page={page}/>
            </div>
            <div classname="container">
                <div classname="Box">
                    <button>
                    
                    </button>
                    <button></button>
                </div>
            </div>

        </div>
    );
}
 
export default home;