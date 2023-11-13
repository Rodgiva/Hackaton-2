import auth from "../tools/auth.js";

const containerElem = document.getElementById("container");
const titleElem = document.createElement("h1");
const descriptionElem = document.createElement("p");
const begindateElem = document.createElement("p");
const enddateElem = document.createElement("p");
// const ownerElem = document.createElement("p");
const divTextCenterElem = document.createElement("div");
const btnElem = document.createElement("a");

auth();

const getRequest = async (id) => {
  try {
    const res = await fetch(`http://127.0.0.1:3030/requests/${id}`);
    return res.json();
  } catch (err) {
    console.log(err);
  }
};

const register = async (dataBody) => {
  const objBody = {
    method: "post",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dataBody),
  };

  try {
    const res = await fetch("http://127.0.0.1:3030/request/register", objBody);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getUser = async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:3030/users/${localStorage.getItem("username")}`
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

// cant get the username with the id yet
// const getusername = async (id) => {
//   try {
//     const res = await fetch("http://127.0.0.1:3030/requests/")
//   } catch (err) {
//     console.log(err);
//   }
// }

const displayBtn = () => {
  btnElem.classList.add("btn");
  btnElem.classList.add("btn-primary");
  btnElem.textContent = "Register the request";

  divTextCenterElem.classList.add("text-center");
  divTextCenterElem.appendChild(btnElem);
  containerElem.appendChild(divTextCenterElem);
};

const displayRequest = async (request_id) => {
  const data = await getRequest(request_id);
  const { id, title, description, begindate, enddate } = data[0];

  titleElem.textContent = title;
  descriptionElem.textContent = description;
  begindateElem.textContent = begindate;

  containerElem.appendChild(titleElem);
  containerElem.appendChild(descriptionElem);
  containerElem.appendChild(begindateElem);

  if (enddate !== "") {
    enddateElem.textContent = enddate;
    containerElem.appendChild(enddateElem);
  }
  displayBtn();

  const userData = await getUser();
  const user = await userData.json();
  const user_id = user[0].id;

  const databody = {user_id, id}

  btnElem.addEventListener("click", async () => {
    const data = await register(databody)
    const res = await data.json()
    console.log(res);
  });
};

const requestId = localStorage.getItem("requestId");
displayRequest(requestId);
