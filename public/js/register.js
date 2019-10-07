/* create()
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
            window.location="/login.html";
    } else {
    }
  } catch {}

  return false;
};

window.onload = function() {
  const registerButton= document.getElementById('register-btn');
  registerButton.onclick=create;
};
