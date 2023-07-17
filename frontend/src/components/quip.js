export default function Quip({quip}) {
  return (
    <div className = "quip">
      <div className = "quip-attribution">
      <span className='user-avatar-slot'>
          {quip.author_avatar
            ? <img src = { quip.author_avatar } />
            : ''
          }
        </span>
        { quip.author_name }
      </div>
      <p className = "quip-body">{ quip.body }</p>
    </div>
  );
}
