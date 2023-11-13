import auth from "../tools/auth.js";

const container = document.getElementById("container");
const btnCreateRequest = document.getElementById("btnCreateRequest");
const containerRequests = document.getElementById("containerRequests");
let webSocket = new WebSocket("ws://127.0.0.1:8080");

auth();

const displayRequest = (data) => {
  const { id, title, begindate, enddate } = data;

  const cardElem = document.createElement("div");
  const cardBodyElem = document.createElement("div");
  const titleElem = document.createElement("h3");
  const begindateElem = document.createElement("p");
  const enddateElem = document.createElement("p");

  cardElem.classList.add("card");
  cardElem.classList.add("m-2");
  // cardElem.style.boxShadow = "0 0 10px 1px white";
  cardBodyElem.classList.add("card-body");
  titleElem.classList.add("text-center");
  titleElem.classList.add("mt-2");
  titleElem.textContent = title;
  begindateElem.textContent = new Date(begindate).toISOString();
  enddateElem.textContent = new Date(enddate).toISOString();
  cardElem.style.cursor = "pointer";

  cardElem.appendChild(titleElem);
  cardBodyElem.appendChild(begindateElem);
  cardBodyElem.appendChild(enddateElem);
  cardElem.appendChild(cardBodyElem);
  containerRequests.appendChild(cardElem);

  cardElem.addEventListener("click", () => {
    localStorage.setItem("requestId", id);
    window.location.replace("../request/request.html");
  });
};

webSocket.onmessage = (e) => {
  const requests = JSON.parse(e.data);
  console.log(requests);
  requests.forEach((request) => {
    displayRequest(request);
  });
};
