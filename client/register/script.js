const usernameElem = document.getElementById("username");
const emailElem = document.getElementById("email");
const firstnameElem = document.getElementById("firstname");
const lastnameElem = document.getElementById("lastname");
const passwordElem = document.getElementById("password");
const confirmPasswordElem = document.getElementById("confirmPassword");
const registerElem = document.getElementById("register");

const checkRegister = async (dataBody) => {
  const objBody = {
    method: "post",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dataBody),
  };

  try {
    const response = await fetch("http://127.0.0.1:3030/users", objBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

registerElem.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    usernameElem.value !== "" &&
    emailElem.value !== "" &&
    firstnameElem.value !== "" &&
    lastnameElem.value !== "" &&
    passwordElem.value !== "" &&
    confirmPasswordElem.value !== "" &&
    passwordElem.value === confirmPasswordElem.value
  ) {
    const username = usernameElem.value;
    const email = emailElem.value;
    const firstname = firstnameElem.value;
    const lastname = lastnameElem.value;
    const pwd = passwordElem.value;

    const dataBody = { username, email, firstname, lastname, pwd };
    const data = await checkRegister(dataBody);

    if (data.ok) {
      window.location.replace("../index.html");
    } else {
      alert("Try again...");
    }
  } else {
    if (usernameElem.value === "") {
      usernameElem.style.border = "3px solid red";
      usernameElem.style.backgroundColor = "rgb(255,127,127)";
    }
    if (emailElem.value === "") {
      emailElem.style.border = "3px solid red";
      emailElem.style.backgroundColor = "rgb(255,127,127)";
    }
    if (firstnameElem.value === "") {
      firstnameElem.style.border = "3px solid red";
      firstnameElem.style.backgroundColor = "rgb(255,127,127)";
    }
    if (lastnameElem.value === "") {
      lastnameElem.style.border = "3px solid red";
      lastnameElem.style.backgroundColor = "rgb(255,127,127)";
    }
    if (passwordElem.value === "") {
      passwordElem.style.border = "3px solid red";
      passwordElem.style.backgroundColor = "rgb(255,127,127)";
    }
    if (confirmPasswordElem.value === "") {
      confirmPasswordElem.style.border = "3px solid red";
      confirmPasswordElem.style.backgroundColor = "rgb(255,127,127)";
    }
  }
});

usernameElem.addEventListener("click", () => {
  usernameElem.style.border = "none";
  usernameElem.style.backgroundColor = "white";
});

emailElem.addEventListener("click", () => {
  emailElem.style.border = "none";
  emailElem.style.backgroundColor = "white";
});

firstnameElem.addEventListener("click", () => {
  firstnameElem.style.border = "none";
  firstnameElem.style.backgroundColor = "white";
});

lastnameElem.addEventListener("click", () => {
  lastnameElem.style.border = "none";
  lastnameElem.style.backgroundColor = "white";
});

passwordElem.addEventListener("click", () => {
  passwordElem.style.border = "none";
  passwordElem.style.backgroundColor = "white";
});

confirmPasswordElem.addEventListener("click", () => {
  confirmPasswordElem.style.border = "none";
  confirmPasswordElem.style.backgroundColor = "white";
});
