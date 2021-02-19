import React from "react";
import Search from "./Search/Search";
import './App.css';
import envData from './env.json'
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Trending from "./Trending/Trending";
import MovieDetails from "./MovieDetails/MovieDetails";
import Toprated from "./Toprated/Toprated";
import Upcoming from "./Upcoming/Upcoming";
function App() {
  const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${envData.API_KEY}`
  console.log(envData)
  return (
    <div style={{ margin: "auto" }}>

      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact>
              <Trending />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/movie/:id">
              <MovieDetails />
            </Route>
            <Route path="/toprated">
              <Toprated />
            </Route>
            <Route path="/upcoming">
              <Upcoming />
            </Route>
          </Switch>
        </div>


      </Router>

    </div>
  )
}

export default App;
