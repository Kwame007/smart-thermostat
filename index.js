class Room {
  constructor(name, currTemp, coldPreset, warmPreset, image, airConditionerOn, startTime, endTime) {
    this.name = name;
    this.currTemp = currTemp;
    this.coldPreset = coldPreset;
    this.warmPreset = warmPreset;
    this.image = image;
    this.airConditionerOn = airConditionerOn;
    this.startTime = startTime;
    this.endTime = endTime;
  }

  setCurrTemp(temp) {
    this.currTemp = temp;
  }

  setColdPreset(newCold) {
    this.coldPreset = newCold;
  }

  setWarmPreset(newWarm) {
    this.warmPreset = newWarm;
  }

  decreaseTemp() {
    this.currTemp--;
  }

  increaseTemp() {
    this.currTemp++;
  }

  toggleAircon() {
    this.airConditionerOn = !this.airConditionerOn;
  }
}

const rooms = [
  new Room("Living Room", 32, 20, 32, "./assets/living-room.jpg", false, "16:30", "20:00"),
  new Room("Kitchen", 29, 20, 32, "./assets/kitchen.jpg", false, "16:30", "20:00"),
  new Room("Bathroom", 30, 20, 32, "./assets/bathroom.jpg", false, "16:30", "20:00"),
  new Room("Bedroom", 31, 20, 32, "./assets/bedroom.jpg", false, "16:30", "20:00"),
];

const toggleAircon = (room) => {
    room.toggleAircon();
  };
  
  const setCurrTemp = (room, temp) => {
    room.setCurrTemp(temp);
  };
  
  const checkSchedule = (rooms, currentTime) => {
    rooms.forEach((room) => {
      if (room.startTime === currentTime && !room.airConditionerOn) {
        room.toggleAircon();
      }
      if (room.endTime === currentTime && room.airConditionerOn) {
        room.toggleAircon();
      }
    });
  };
  
  module.exports = { rooms, toggleAircon, setCurrTemp, checkSchedule };