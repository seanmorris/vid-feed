import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className = "home page centered">
      <h1>Not Found</h1>
      <p>The page you requested was not found.</p>
      <Link to = {"/videos"} className = "button button-padded">okay.</Link>
      <div className = "spacer spacer-50"></div>
    </div>
  );
}

