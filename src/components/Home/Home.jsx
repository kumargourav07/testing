import React from 'react'

const Home = () => {
  window.botpress.on('click', (event) => {
    console.log(event);
    // Your custom logic
  });
  return (
    <div>
        <h2>Home</h2>
        <img style={{width:"100%"}} src='https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
    </div>
  )
}

export default Home