/*
 * login()
 * Input: none (retrieves information from form values)
 * Output: none (changes the page to "dashboard.html")
*/
const login = async function( e ) {
  e.preventDefault();

  const userData = {
    username: document.getElementById( 'username' ).value,
    password: document.getElementById( 'password' ).value
  };

  try {
    const resp = await fetch( '/login', {
      method:'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    const data = await resp.json();

    if (data.status === true) {
      window.location="/dashboard.html";
    }
  } catch {
    document.getElementById('username-error').style.display = "block";
  }

  return false;
};

window.onload = function() {
  const loginButton = document.getElementById('login-btn');
  loginButton.onclick = login;
};
