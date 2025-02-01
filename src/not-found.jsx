import { useState } from "react"
import { Link } from "react-router-dom"
export function NotFound()
{
    const [style] = useState({
        notFoundPage :{
          textAlign: 'center',
          marginTop: '50px',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f9f9f9',
        }})
    return(
        <div style={style.notFoundPage} >
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/home">Go back to Home</Link>
    </div>
    )
}