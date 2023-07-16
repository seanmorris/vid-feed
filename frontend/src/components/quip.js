export default function Quip({quip}) {
	return (
		<div className = "quip">
			<div className = "quip-attribution">
			<span className='user-avatar-slot'>
					{quip.avatar_url
						? <img src = { quip.avatar_url } />
						: ''
					}
				</span>
				{ quip.author_name }
			</div>
			<p className = "quip-body">{ quip.body }</p>
		</div>
	);
}
