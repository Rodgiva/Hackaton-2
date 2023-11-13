// Never used
const popup = (msg) => {
  const divFilter = document.createElement("div");
  const divPopup = document.createElement("div");
  const msgElem = document.createElement("p");

  divFilter.classList.add("filterBg");
  divPopup.classList.add("popup");
  msgElem.classList.add("msgPopup");

  document.body.style.overflow = "hidden";
  msgElem.textContent = msg;
  inputElem.blur();

  document.body.prepend(divFilter);
  divFilter.appendChild(divPopup);
  divPopup.appendChild(msgElem);

  divFilter.addEventListener("click", () => {
    inputElem.focus();
    document.body.style.overflow = "scroll";
    inputElem.value = "";
    robotsDisplay(robotFilter(inputElem.value));
    divFilter.remove();
  });
};
