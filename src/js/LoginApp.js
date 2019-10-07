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
		<div className="w-full max-w-xs">
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
	)
}