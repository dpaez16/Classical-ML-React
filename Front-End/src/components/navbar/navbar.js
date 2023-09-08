import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
    const navigate = useNavigate();

    const clickHomePageHandler = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <header className='navbar'>
            <div className='navbar__icon'>
                <h1 onClick={clickHomePageHandler}>Classical ML Viz</h1>
            </div>
            <nav className='navbar__items'>
                <ul>
                    <li>
                        <NavLink to='/linear-regression'>Linear Regression</NavLink>
                    </li>
                    <li>
                        <NavLink to='/svm'>SVM</NavLink>
                    </li>
                    <li>
                        <NavLink to='/k-means'>K-Means</NavLink>
                    </li>
                    <li>
                        <NavLink to='/k-medoids'>K-Medoids</NavLink>
                    </li>
                    <li>
                        <NavLink to='/lda'>LDA</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};