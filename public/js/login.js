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

/* ** HAS NOT BEEN TESTED YET **
 * create()
 * Input: none (retrieves information from form values and creates a base, empty user)
 * Output: none (creates a new account, can be used to redirect to login form or to "dashboard.html")
*/
const create = async function( e ) {
  e.preventDefault();

  const userData = {
    name: document.getElementById('name').value,
    email: document.getElementById( 'email' ).value,
    password: document.getElementById( 'password' ).value,
    availability: [{
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: []
    }],
    archive: []
  };

  try {
    const resp = await fetch( '/createAccount', {
      method:'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await resp.json();

    if (data.status === true) {
      // document.getElementById('account-creation-success').style.display = "block";
      // viewLoginForm();
    } else {
      // document.getElementById('duplicate-account-error').style.display = "block";
    }
  } catch {}

  return false;
};

window.onload = function() {
  const loginButton = document.getElementById('login-btn');
  loginButton.onclick = login;
};
