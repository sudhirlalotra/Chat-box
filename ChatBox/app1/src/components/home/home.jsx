import React from 'react'
import { Link,Outlet} from 'react-router-dom'
import './home.css'


function Home() {
  return (
    <div className='home'>  
    <h1>CHAT WITH STRANGERS</h1>
    <h2>"Connect Instantly, Anywhere, Anytime!"</h2>
<Link to="/join" className='link'>
    <button>CHAT NOW</button>
</Link>
<Outlet/>
    </div>
  )
}

export default Home