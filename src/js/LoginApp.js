import React, {useState} from "react";
import Toast from "./show-toast"

export default function LoginApp(props) {

	const [name, setName] = useState();
	const [pwd, setPwd] = useState();

	function signUp(e) {
		e.preventDefault();

		let body;

		const inputUsername = document.querySelector( '#new-username'),
			inputFirstName = document.querySelector( '#first-name'),
			inputLastName = document.querySelector( '#last-name'),
			inputPassword = document.querySelector('#new-password'),
			json = { username: inputUsername.value, firstName: inputFirstName.value, lastName: inputLastName.value, password: inputPassword.value }

		window.localStorage;
		localStorage.setItem('currUser', inputUsername.value)
		body = JSON.stringify( json );

		fetch('/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		})
			.then(function(res) {
				Toast ({
					str: "Creating Profile",
					time: 2000,
					position: 'bottom'
				});
				console.log( "post response: ", res )
                window.location = "/main.html"
			})
	}

	function login(e) {
		e.preventDefault();

		let body;

		const inputUsername = document.querySelector( '#username'),
			inputPassword = document.querySelector('#password'),
			json = { username: inputUsername.value, password: inputPassword.value }

		window.localStorage;
		localStorage.setItem('currUser', inputUsername.value)
		body = JSON.stringify( json );

		Toast ({
			str: "Authenticating User",
			time: 2000,
			position: 'bottom'
		});

		fetch( '/login', {
			method:  'POST',
			headers: { 'Content-Type': 'application/json' },
			body
		})
		.then( function( response ) {
			console.log(response.status);
			if(response.status === 200) {
				Toast ({
					str: "Successfully Authenticated",
					time: 2000,
					position: 'bottom'
				});
				console.log("post response: ", response)
				window.location = "/main.html"
			} else if(response.status === 401) {
				Toast ({
					str: "Authentication Failed",
					time: 2000,
					position: 'bottom'
				});
				console.log("post response: ", response)
			}  else {
				Toast ({
					str: "Unknown Error",
					time: 2000,
					position: 'bottom'
				});
				console.log("post response: ", response)
			}
		})
	}

	return (
		<div className="w-full">
			<div className="w-full lg:text-center headT"> Get Started </div>
			<div className="w-full padder">
				<div className="w-full glower padder rounded bg-white">
					<div className="flex -mx-4">
						<div className="w-1/2 px-4">
							<div className="w-full lg:text-center signT"> New to soundcloudish? </div>
							<form className="bg-white topMar shadow-md rounded px-8 pt-6 pb-8 mb-4">
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											   htmlFor="first-name">
											First Name
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="first-name" type="text" placeholder="Jane"/>
									</div>
									<div className="w-full md:w-1/2 px-3">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											   htmlFor="last-name">
											Last Name
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="last-name" type="text" placeholder="Doe"/>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											   htmlFor="new-username">
											Username
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="new-username" type="text" placeholder="Username"/>
										<p className="text-gray-600 text-xs italic">Think of a cool name, after all it is how people will find you!</p>
									</div>
								</div>
								<div className="flex flex-wrap -mx-3 mb-6">
									<div className="w-full px-3">
										<label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
											   htmlFor="new-password">
											Password
										</label>
										<input
											className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
											id="new-password" type="password" placeholder="******************"/>
										<p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
									</div>
								</div>
								<div className="flex items-center justify-around">
									<button
										className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
										type="button"
										onClick={signUp}
									>
										Sign Up
									</button>
								</div>
							</form>
						</div>
						<div className="w-1/2 px-4">
							<div className="w-full lg:text-center signT"> Already an awesome user? </div>
							<form className="bg-white topMar shadow-md rounded px-8 pt-6 pb-8 mb-4">
								<div className="mb-4">
									<label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="username">
										Username
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
										id="username" type="text" placeholder="Username"
										onChange={() => setName(event.target.value)}>
									</input>
								</div>
								<div className="mb-6">
									<label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="password">
										Password
									</label>
									<input
										className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
			<div className="w-full lg:text-center headT1"> Wait! I wanna know more about soundcloudish! </div>
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
										Choose your favorite creations and share them with fellow audiophiles!
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
			<div className="lg:text-center bottomBanner"> Designed and developed in Worcester, Massachusetts </div>
		</div>
	)
}