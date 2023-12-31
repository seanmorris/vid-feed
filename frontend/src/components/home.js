import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className = "home page centered">
      <h1>Welcome!</h1>
      <p>Browsers now require the user to interact with the DOM before autoplay will work.</p>
      <Link to = {"/videos"} className = "button button-padded">okay.</Link>
      <div className = "spacer spacer-50"></div>
    </div>
  );
}

export default Home;
