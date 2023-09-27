const resetPasswordBtn = document.getElementById("resetPasswordBtn");
async function updatePassword() {
  try {
    const newPassword = document.getElementById("Password1").value;
    console.log(newPassword);
    const res = await axios.post( 
      "http://localhost:3000/password/resetPassword",          // resetPassword
      {   
        password: newPassword,
      }
    );
    alert(res.data.message);
    window.location.href = "/../html/login.html"
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
    window.location.reload();
  }
}
resetPasswordBtn.addEventListener("click", updatePassword);


/*
async function updatePassword(e) {
  e.preventDefault();
 try {
  const newPassword = document.getElementById("bda").value;
  console.log(newPassword);
  const res = await axios.post( 
    "http://16.170.241.231:3000/password/updatePassword", 
    {   
      password: newPassword,
    }
  );
  alert(res.data.message);
  window.location.href = "/";
} catch (error) {
  console.log(error);
  alert(error.response.data.message);
  window.location.reload();
}
  
}


*/