const getAuth = async (data) => {
  try {
    const response = await fetch(`http://127.0.0.1:3030/users/auth/${data}`);
    return response;
  } catch (err) {
    console.log(err);
  }
};

const auth = async () => {
  const username = localStorage.getItem("username");
  const data = await getAuth(username);
  if (!data.ok) {
    window.location.replace("../index.html");
  }
};

export default auth;
