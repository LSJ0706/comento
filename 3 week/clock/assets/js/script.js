//get variable
const battery = document.getElementById("battery");
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const time = document.getElementById("time");
const timer = document.getElementById("timer");
const alarmList = document.getElementById("alarmList");

//constant variable
let batteryPercentage = 100;

// clock function
const setClock = () => {
  const currentDate = new Date();

  let year = currentDate.getFullYear();
  let month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  let day = ("0" + currentDate.getDay()).slice(-2);

  let hour = getFormatTime(currentDate.getHours());
  let minute = getFormatTime(currentDate.getMinutes());
  let second = getFormatTime(currentDate.getSeconds());

  date.textContent = year + "-" + month + "-" + day;
  time.textContent = hour + ":" + minute + ":" + second;
  setTimeout(setClock, 1000);
};
// time format function
const getFormatTime = (time) => {
  return time >= 10 ? time : "0" + time;
};

// battery function
const setBattery = () => {
  battery.textContent = `${batteryPercentage}%`;
  if (batteryPercentage > 0) {
    batteryPercentage--;
    setTimeout(setBattery, 1000);
  } else {
    outBattery(clock, date, time);
  }
};

const outBattery = (clock, date, time) => {
  clock.style.color = "white";
  clock.style.justifyContent = "center";
  clock.textContent = "배터리를 충전해주세요!";
  clock.style.backgroundColor = "black";
  date.remove();
  time.remove();
};

//alarm function
const validateInput = (input, idx) => {
  const value = Number(input.value);
  if (isNaN(value)) {
    input.setCustomValidity("숫자만 입력할 수 있습니다.");
  } else if (
    (idx === 0 && (value < 0 || value > 23)) ||
    (idx > 0 && (value < 0 || value > 59))
  ) {
    input.setCustomValidity(
      "시간 범위를 입력하세요. HH는 0~23, MM과 SS는 0~59입니다."
    );
  } else {
    input.setCustomValidity("");
  }
  input.reportValidity();
};

const initAlarmInputs = () => {
  const inputFields = timer.getElementsByTagName("input");
  Array.from(inputFields).forEach((input, idx) => {
    input.addEventListener("input", () => validateInput(input, idx));
  });
};

const addAlarm = () => {
  const inputFields = timer.getElementsByTagName("input");
  const alarmTime = Array.from(inputFields).map((input) =>
    getFormatTime(Number(input.value))
  );

  if (Array.from(inputFields).some((input) => !input.checkValidity())) {
    alert("유효하지 않은 입력입니다. 입력 값을 확인하세요.");
    return;
  }

  if (alarmList.childElementCount >= 3) {
    alert("알람은 최대 3개까지만 설정할 수 있습니다.");
    return;
  }

  const newAlarm = document.createElement("div");
  newAlarm.innerHTML = `
  <div class="alarm-time">${alarmTime[0]}:${alarmTime[1]}:${alarmTime[2]}</div>
  <button class="btn-alarm-delete">제거</button>
  `;
  const alarmBtn = newAlarm.querySelector(".btn-alarm-delete");
  alarmBtn.addEventListener("click", () => {
    newAlarm.remove();
  });

  alarmList.appendChild(newAlarm);

  Array.from(inputFields).forEach((input) => (input.value = ""));
};

const checkAlarm = () => {
  const currentTime = time.textContent.split(":").join("");

  const alarms = Array.from(alarmList.children).map((alarm) =>
    alarm.querySelector(".alarm-time").textContent.split(":").join("")
  );

  if (alarms.includes(currentTime)) {
    alert("알람 시간!");
    // 알람이 울리면 해당 알람을 삭제합니다.
    const alarmIndex = alarms.indexOf(currentTime);
    if (alarmIndex !== -1) {
      alarmList.children[alarmIndex].remove();
    }
  }

  setTimeout(checkAlarm, 1000);
};

// page load
document.addEventListener("DOMContentLoaded", () => {
  setBattery();
  setClock();
  checkAlarm();
  initAlarmInputs();
});
