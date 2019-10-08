import React, {useState} from "react";

export default function LoginApp(props) {

	const [name, setName] = useState();
	const [pwd, setPwd] = useState();

	function login() {

		//TODO: fetch calls subject to change depending on server, auth

		const json = {
			username: name,
			password: pwd
		}
		const body = JSON.stringify(json);

		fetch('/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		})
		.then(function(res) {
			if (res.status === 200) {
				fetch('/main', {
					method: 'GET',
					credentials: 'include'
				})
				.then(function(resp) {
					window.location.href = resp.url;
				})
			} else {
				let pwd = document.querySelector('#password')
				pwd.classList.add("border-red-500");
				document.querySelector('#bad-pwd').hidden = false;
			}
		})
	}

	return (
		<div className="w-full">
			<div className="w-full padder">
				<div className="w-full lg:max-w-full lg:flex glower">
					<div
						className="w-1/4 h-64 lg:h-auto flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" id="introLogo" title="Logo">
					</div>
					<div className="w-3/4 h-64">
						<div
							className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
							<div className="mb-8">
								<p className="text-sm text-gray-600 flex items-center">
								</p>
								<div className="text-gray-900 font-bold text-xl mb-2">What in the world is <a className="offClr">soundcloudish</a> ?
								</div>
								<p className="text-gray-700 text-base">
									It's just as the name suggests. It's a soundcloud-ish social media platform. Amazing artists (yes, you're amazing to us :D ) can
									upload their songs and choose and configure a visualizer for it. Discover cool artists and their awesome songs right on your main feed.
								</p>
							</div>
							<div className="w-full">
							<span
								className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#music</span>
							<span
								className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#visuals</span>
							<span
								className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#socialmedia</span>
							</div>
							<div className="flex items-center">
								<img className="w-10 h-10 rounded-full mr-4" src={require("../media/Manas.jpg")}
									 alt="Avatar of Manas Mehta"/>
								<div className="text-sm">
									<p className="text-gray-900 leading-none">Manas Mehta</p>
									<p className="text-gray-600">Oct 8</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full">
				<div className="w-full padder">
					<div className="w-full lg:max-w-full lg:flex glower">
						<div className="w-3/4 h-64">
							<div
								className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
								<div className="mb-8">
									<p className="text-sm text-gray-600 flex items-center">
									</p>
									<div className="text-gray-900 font-bold text-xl mb-2">Share your sound!
									</div>
									<p className="text-gray-700 text-base">
										Upload your awesome creations and share them with fellow audiophiles!
									</p>
								</div>
								<div className="w-full">
									<span
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#artist</span>
									<span
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#upload</span>
									<span
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#sound</span>
									<span
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#share</span>
								</div>
								<div className="flex items-center">
									<img className="w-10 h-10 rounded-full mr-4" src={require("../media/Manas.jpg")}
										 alt="Avatar of Manas Mehta"/>
									<div className="text-sm">
										<p className="text-gray-900 leading-none">Manas Mehta</p>
										<p className="text-gray-600">Oct 8</p>
									</div>
								</div>
							</div>
						</div>
						<div
							className="w-1/4 h-64 lg:h-auto flex-none bg-cover rounded-b lg:rounded-b-none lg:rounded-r text-center overflow-hidden" id="musicPic" title="Logo">
						</div>
					</div>
				</div>
			</div>
			<div className="w-full padder">
				<div className="w-full glower">
					<div className="w-full bg-white rounded overflow-hidden shadow-lg">
						<img className="w-full" src={require("../media/appVisual.png")} alt="Vis"/>
						<div
							className="w-full h-64 border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-t lg:rounded-t-none lg:rounded-l p-4 flex flex-col justify-between leading-normal">
							<div className="mb-8">
								<p className="text-sm text-gray-600 flex items-center">
								</p>
								<div className="text-gray-900 font-bold text-xl mb-2">We have awesome audio visualizers!</div>
								<p className="text-gray-700 text-base">
									Visualize the awesome tracks that you upload! We have a wide range of customizable visualizers.
								</p>
							</div>
							<div className="w-full">
									<span
										className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#visualize</span>
								<span
									className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#graphics</span>
								<span
									className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#colors</span>
							</div>
							<div className="flex items-center">
								<img className="w-10 h-10 rounded-full mr-4" src={require("../media/Manas.jpg")}
									 alt="Avatar of Manas Mehta"/>
								<div className="text-sm">
									<p className="text-gray-900 leading-none">Manas Mehta</p>
									<p className="text-gray-600">Oct 8</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>








			<div className="px-2">
				<div className="flex -mx-2">
					<div className="w-1/2 px-2">








						<form className="w-full max-w-lg">
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										   htmlFor="grid-first-name">
										First Name
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
										id="grid-first-name" type="text" placeholder="Jane"/>
									<p className="text-red-500 text-xs italic">Please fill out this field.</p>
								</div>
								<div className="w-full md:w-1/2 px-3">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										   htmlFor="grid-last-name">
										Last Name
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-last-name" type="text" placeholder="Doe"/>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-6">
								<div className="w-full px-3">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										   htmlFor="grid-password">
										Password
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-password" type="password" placeholder="******************"/>
									<p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
								</div>
							</div>
							<div className="flex flex-wrap -mx-3 mb-2">
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										   htmlFor="grid-city">
										City
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-city" type="text" placeholder="Albuquerque"/>
								</div>
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										   htmlFor="grid-state">
										State
									</label>
									<div className="relative">
										<select
											className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="grid-state">
											<option>New Mexico</option>
											<option>Missouri</option>
											<option>Texas</option>
										</select>
										<div
											className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
											<svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
												 viewBox="0 0 20 20">
												<path
													d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
											</svg>
										</div>
									</div>
								</div>
								<div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
									<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
										   htmlFor="grid-zip">
										Zip
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="grid-zip" type="text" placeholder="90210"/>
								</div>
							</div>
						</form>









					</div>
					<div className="w-1/2 px-2">




						<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
							<div className="mb-4">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
									Username
								</label>
								<input
									className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="username" type="text" placeholder="Username"
									onChange={() => setName(event.target.value)}>
								</input>
							</div>
							<div className="mb-6">
								<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
									Password
								</label>
								<input
									className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="password" type="password" placeholder="******************"
									onChange={() => setPwd(event.target.value)}>
								</input>
								<p id='bad-pwd' className='text-red-500 text-xs italic' hidden>Incorrect password</p>
							</div>
							<div className="flex items-center justify-around">
								<button
									className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="button"
									onClick={login}
								>
									Sign In
								</button>
							</div>
						</form>







					</div>
				</div>
			</div>












		</div>
	)
}