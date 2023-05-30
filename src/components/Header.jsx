

import { Link } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
    return (
        <div className='header'>
            <div className='Title'>
                <Link to="/"> <h1 >Quiz Up
                    <div className="Title__highlight"></div>
                </h1> </Link>
                <div className="Title__underline"></div>
                <div aria-hidden className="Title__filled">Quiz Up</div>
            </div>
        </div>
    )
}
