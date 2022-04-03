import React from 'react';
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div style={{margin: "1rem"}}>
        <h1>Main Page</h1>
        <Link to="/game">GAME</Link>
    </div>
  )
}

export default MainPage
