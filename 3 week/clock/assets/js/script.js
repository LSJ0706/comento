//variable list
const battery = document.getElementById("battery");
const clock = document.getElementById("clock");
const date = document.getElementById("date");
const time = document.getElementById("time");
const alarm = document.getElementById("alarm");
const alarmList = [document.getElementById("alarmList")];

let batteryPercentage = 2;
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
    setTimeout(setClock, 1000);
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
const addAlarm = () => {
  let hh = alarm.getElementsByTagName("input")[0];
  let mm = alarm.getElementsByTagName("input")[1];
  let ss = alarm.getElementsByTagName("input")[2];
};

// page load
document.addEventListener("DOMContentLoaded", () => {
  setBattery();
  setClock();
  addAlarm();
});
