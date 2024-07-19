//get variable
const battery = document.getElementById("battery");
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const time = document.getElementById("time");
const alarm = document.getElementById("alarm");
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
const validateTime = () => {};

const addAlarm = () => {
  const inputTime = alarm.getElementsByTagName("input");
  const alarmTime = Array.from(inputTime).map((input) =>
    getFormatTime(Number(input.value))
  );

  if (alarmList.childElementCount > 3) {
    alert("알람은 최대 3개까지만 설정할 수 있습니다.");
    return;
  }

  const newAlarm = document.createElement("div");
  newAlarm.innerHTML = `${alarmTime[0]}:${alarmTime[1]}:${alarmTime[2]}`;

  const alarmBtn = document.createElement("button");
  alarmBtn.innerHTML = "제거";
  alarmBtn.addEventListener("click", () => {
    newAlarm.remove();
  });

  alarmList.appendChild(newAlarm);
  newAlarm.appendChild(alarmBtn);
};

const checkAlarm = () => {
  const cuurentTime = time.textContent.split(":").join("");
  const alarms = Array.from(alarmList.children).map((alarm) =>
    alarm.firstChild.textContent.split(":").join("")
  );
  if (alarms.includes(cuurentTime)) {
    alert("알람 시간!");
  }
  setTimeout(checkAlarm, 1000);
};

// page load
document.addEventListener("DOMContentLoaded", () => {
  setBattery();
  setClock();
  checkAlarm();
});
