import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

export default function Navbar(props) {
   
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Movie Library</a>
            <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favorites</Link>
          </li>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
        </nav>
    )
}
