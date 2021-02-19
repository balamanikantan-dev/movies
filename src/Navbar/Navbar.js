import React, { useState, useEffect } from "react";
import "./Navbar.css"
import {
    HashRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import EventEmitter from "../utils/eventEmitter";


const Navbar = () => {
    const history = useHistory();

    const [car, setCar] = useState([])
    const onKeyPress = (event) => {
        if (event.charCode === 13) {
            if (!event.target.value)
                alert("enter something")
            else {
                history.push(`/search?query=${car}`);
                EventEmitter.dispatch('search', event.target.value)
            }
        }



    }
    const onChange = (event) => {
        console.log(event)
        setCar(event.target.value)
    }

    return (
        <div>
            <nav className="nav" >
                <ul className="nav">
                    <li className="l"><Link to="/">Home</Link></li>
                    <li className="l"><Link to="/toprated">Toprated</Link></li>
                    <li className="l"><Link to="/upcoming">Upcoming</Link></li>

                </ul>
                <input className="i" onKeyPress={onKeyPress} onChange={onChange} type="text" placeholder="Search.." name="search"></input>
                <button className="b" type="submit"><i class="fa fa-search"></i></button>
            </nav>


        </div>

    )
}
export default Navbar