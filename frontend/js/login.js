function login(e) {
  e.preventDefault();
  console.log(e.target.name);
  const form = new FormData(e.target);

  const loginDetails = {
      email: form.get("email"),
      password: form.get("password")

  }
 
  console.log(loginDetails)
  axios.post('http://localhost:3000/user/login',loginDetails).then(response => {
      if(response.status === 200){
         console.log(response.data.userId);
          localStorage.setItem('isPremiumUser', response.data.isPremiumUser);
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userEmail', response.data.userEmail);
          localStorage.setItem('userDetails', JSON.stringify(response.data.user))
          window.location.href = "../html/expesneHome.html" 
      } else {
          throw new Error('Failed to login')
      }
  }).catch(err => {
      document.body.innerHTML += `<div style="color:red;">${err} <div>`;
  })
}

function forgotpassword() {
  window.location.href = "../html/forgetPassword.html"
}
function signUpNew() {
    window.location.href = "../html/signup.html"
}
