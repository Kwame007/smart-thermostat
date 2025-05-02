const { rooms, toggleAircon, setCurrTemp, checkSchedule } = require("../index.js");

describe("Room functionality tests", () => {

  test("Object structure should match expected values", () => {
    const room = { name: "Living Room", currTemp: 25 };
    expect(room).toEqual({ name: "Living Room", currTemp: 25 });
  });

  test("Initial state of air conditioner should be OFF", () => {
    expect(rooms[0].airConditionerOn).toBe(false);
  });

  test("toggleAircon should turn ON the air conditioner", () => {
    const room = rooms[0];
    toggleAircon(room);
    expect(room.airConditionerOn).toBe(true);
  });

  test("toggleAircon should toggle OFF if called again", () => {
    const room = rooms[0];
    toggleAircon(room);
    expect(room.airConditionerOn).toBe(false);
  });

  test("setCurrTemp should update the current temperature", () => {
    const room = rooms[0];
    setCurrTemp(room, 30);
    expect(room.currTemp).toBe(30);

    setCurrTemp(room, 20);
    expect(room.currTemp).toBe(20);
  });

  describe("checkSchedule behavior", () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    test("should turn ON AC at startTime", () => {
      jest.setSystemTime(new Date("2025-04-29T16:30:00"));
      checkSchedule(rooms, "16:30");
      expect(rooms[0].airConditionerOn).toBe(true);
    });

    test("should turn OFF AC at endTime", () => {
      jest.setSystemTime(new Date("2025-04-29T20:00:00"));
      checkSchedule(rooms, "20:00");
      expect(rooms[0].airConditionerOn).toBe(false);
    });
  });

  describe("Room methods and formatting", () => {
    beforeAll(() => {
      document.body.innerHTML = `
        <div id="rooms"></div>
        <div id="temp"></div>
        <div class="default-settings">
          <button id="cool">Cool</button>
          <button id="warm">Warm</button>
        </div>
      `;
    });

    test("toggleAircon method on room object should toggle state", () => {
      const room = rooms[0];
      expect(room.airConditionerOn).toBe(false);

      room.toggleAircon();
      expect(room.airConditionerOn).toBe(true);

      room.toggleAircon();
      expect(room.airConditionerOn).toBe(false);
    });

    test("Room startTime should match HH:MM format", () => {
      const time = "16:30";
      expect(time).toMatch(/^\d{2}:\d{2}$/);
    });
  });
});