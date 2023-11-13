const usernameElem = document.getElementById("username");
const passwordElem = document.getElementById("password");
const submit = document.getElementById("submit");

const checkLogin = async (dataBody) => {
  const objBody = {
    method: "post",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dataBody),
  };

  try {
    const response = await fetch("http://127.0.0.1:3030/users/login", objBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  if (usernameElem.value !== "" && passwordElem.value !== "") {
    const username = usernameElem.value;
    const password = passwordElem.value;
    const dataBody = { username, password };

    const data = await checkLogin(dataBody);

    if (data.ok) {
      localStorage.setItem("username", username);
      window.location.replace("./homepage/home.html");
    } else {
      alert("Wrong username or password...");
    }
  } else {
    if (usernameElem.value === "") {
      usernameElem.style.border = "3px solid red";
      usernameElem.style.backgroundColor = "rgb(255,127,127)";
    }

    if (passwordElem.value === "") {
      passwordElem.style.border = "3px solid red";
      passwordElem.style.backgroundColor = "rgb(255,127,127)";
    }
  }
});

usernameElem.addEventListener("click", () => {
  usernameElem.style.border = "none";
  usernameElem.style.backgroundColor = "white";
});

passwordElem.addEventListener("click", () => {
  passwordElem.style.border = "none";
  passwordElem.style.backgroundColor = "white";
});
