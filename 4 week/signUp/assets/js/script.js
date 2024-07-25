const userData = JSON.parse(sessionStorage.getItem("userData")) || [];
const userIDRegex = /^[a-zA-Z0-9]{8,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
document.getElementById("btn__signup").disabled = true;

function checkUserID() {
  const userID = document.getElementById("userID").value;
  const userIDError = document.getElementById("userID-error");
  if (userData.find((user) => user.userID === userID) || userID.length < 8) {
    userIDError.textContent = "사용하실 수 없는 아이디입니다!";
  } else {
    userIDError.textContent = "사용가능한 아이디입니다!";
  }
}

function validateForm() {
  const name = document.getElementById("name").value;
  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const checkBtn = document.getElementById("btn-checkUserID");
  let isValid = true;

  if (!name) {
    document.getElementById("name-error").textContent = "이름을 입력해주세요!";
    isValid = false;
  } else {
    document.getElementById("name-error").textContent = "";
  }

  if (!userIDRegex.test(userID)) {
    checkBtn.disabled = true;
    isValid = false;
    document.getElementById("userID-error").textContent =
      "아이디는 최소 8자 이상, 영문자와 숫자로만 구성되어야 합니다.";
  } else {
    checkBtn.disabled = false;
    document.getElementById("userID-error").textContent = "";
  }

  if (!passwordRegex.test(password)) {
    isValid = false;
    document.getElementById("password-error").textContent =
      "비밀번호는 최소 8자 이상, 영문자와 숫자를 포함해야 합니다.";
  } else {
    document.getElementById("password-error").textContent = "";
  }

  if (password !== confirmPassword) {
    isValid = false;
    document.getElementById("confirm-password-error").textContent =
      "비밀번호가 일치하지 않습니다.";
  } else {
    document.getElementById("confirm-password-error").textContent = "";
  }

  document.getElementById("btn__signup").disabled = !isValid;
}

function signup() {
  const name = document.getElementById("name").value;
  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;

  userData.push({ name, userID, password });
  sessionStorage.setItem("userData", JSON.stringify(userData));
  alert("회원가입 성공!");
  window.location.href = "login.html";
}

function login() {
  const userID = document.getElementById("userID").value;
  const password = document.getElementById("password").value;

  const user = userData.find(
    (user) => user.userID === userID && user.password === password
  );

  if (user) {
    alert("로그인 성공!");
  } else {
    alert("로그인 실패. 아이디 또는 비밀번호를 확인하세요.");
  }
}
