import auth from "../tools/auth.js";

const titleElem = document.getElementById("title");
const descriptionElem = document.getElementById("description");
const begindateElem = document.getElementById("begindate");
const enddateElem = document.getElementById("enddate");
const createRequestBtnElem = document.getElementById("createRequestBtn");

auth()

let webSocket = new WebSocket("ws://127.0.0.1:8080");


const addRequest = async (dataBody) => {
  const objBody = {
    method: "post",
    mode: "cors",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(dataBody),
  };

  try {
    const response = await fetch("http://127.0.0.1:3030/requests", objBody);
    return response;
  } catch (err) {
    console.log(err);
  }
};

createRequestBtnElem.addEventListener("click", async (e) => {
  e.preventDefault();

  if (
    titleElem.value !== "" &&
    descriptionElem.value !== "" &&
    begindateElem.value !== ""
  ) {
    const title = titleElem.value;
    const description = descriptionElem.value;
    const begindate = begindateElem.value;
    const enddateElem = enddate.value;
    const username = localStorage.getItem("username");

    const dataBody = { title, description, begindate, enddateElem, username };
    const data = await addRequest(dataBody);

    if (data.ok) {
      webSocket.send("createRequest")
      window.location.replace("../homepage/home.html");
    } else {
      alert("Try again...");
    }
  } else {
    if (titleElem.value === "") {
      titleElem.style.border = "3px solid red";
      titleElem.style.backgroundColor = "rgb(255,127,127)";
    }
    console.log(descriptionElem);
    if (descriptionElem.value === "") {
      descriptionElem.style.border = "3px solid red";
      descriptionElem.style.backgroundColor = "rgb(255,127,127)";
    }
    if (begindateElem.value === "") {
      begindateElem.style.border = "3px solid red";
      begindateElem.style.backgroundColor = "rgb(255,127,127)";
    }
  }
});

titleElem.addEventListener("click", () => {
  titleElem.style.border = "none";
  titleElem.style.backgroundColor = "white";
});

descriptionElem.addEventListener("click", () => {
  descriptionElem.style.border = "none";
  descriptionElem.style.backgroundColor = "white";
});

begindateElem.addEventListener("click", () => {
  begindateElem.style.border = "none";
  begindateElem.style.backgroundColor = "white";
});
