# Bugs Summary

This document outlines the identified bugs in the codebase and their respective fixes.

---

## Bug 1: Incorrect Property Access in Dropdown Options (line 203)

### **Error Type**
 Logic Error

### **Issue**
In the dropdown options generation, the code was incorrectly accessing the `room` object instead of its `name` property.

### **Discovery**
Identified by console logging the room object:
```javascript
rooms.forEach((room) => {
  console.log(room);

  const option = document.createElement("option");
  option.value = room; 
  option.textContent = room.name;
  roomSelect.appendChild(option);
});

```
### **Fix**
Updated the code to correctly access `room.name`:
```javascript
option.value = room.name; // #fixed bug one (called room.name instead of room)
option.textContent = room.name;
```


## Bug 2: Incorrect Method Invocation for Temperature Increase (line 249)

### **Error Type**
 Runtime Error

### **Issue**
The increaseTemp function using the this keyword which points to the room object in this context. However calling the function without invoking it causes the "this" keywords context to

### **Discovery**
Identified by invoking the increaseRoomTemperature function which caused an error:

```javascript
const increaseRoomTemperature = room.increaseTemp;
increaseRoomTemperature(); // undefined
```

### **Fix**
Directly invoke the increaseTemp function then assign it to the increaseRoomTemperature variable which allows us to keep the context of the 'this' keyword:
```javascript
const increaseRoomTemperature = room.increaseTemp();
```


## Bug 3: Incorrect comparisons in validation (line 324 - 330)

### **Error Type**
 Logic Error

### **Issue**
We are comparing a string to a number which will always be false.By default values from the input fields are strings.

### **Discovery**
Identified by console logging the input values:

```javascript
// Validate the data
    if (coolInput.value < 10 || coolInput.value > 25) {
      console.log(coolInput.value);

      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
      return; // Exit early on error
    }

    if (Number(warmInput.value) < 25 || Number(warmInput.value) > 32) {
      console.log(warmInput.value);

      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
      return; // Exit early on error
    }
```

### **Fix**
Explicitly convert the input values to numbers before comparing them:
```javascript
 // Validate the data
    if (Number(coolInput.value < 10) || Number(coolInput.value > 25)) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
      return; // Exit early on error
    }

    if (Number(warmInput.value) < 25 || Number(warmInput.value) > 32) {
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
      return; // Exit early on error
    }
```
## Bug 4: Generic message despite different rules (line 326 & 332)

### **Error Type**
 Logic Error

### **Issue**
We are returning the same error message for both temperature ranges.

### **Discovery**
Identified by console logging the error message:

```javascript
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
      console.log(errorSpan.innerText);
    
      errorSpan.style.display = "block";
      errorSpan.innerText = "Enter valid temperatures (10° - 32°)";
      console.log(errorSpan.innerText);
```

### **Fix**
Return different error messages for each temperature range:
```javascript
 // Validate the data
   if (coolTemp < 10 || coolTemp > 25) {
  errorMessage += "Cold preset must be between 10° and 25°.\n";
  }

  if (warmTemp < 25 || warmTemp > 32) {
    errorMessage += "Warm preset must be between 25° and 32°.";
  }
```
## Bug 5: Misleading span message logic (line 324 - 330)

### **Error Type**
 Logic Error

### **Issue**
Feedback message is misleading.

### **Discovery**
Identified by reading the feedback message:

### **Fix**
Switch feedback message to correct order:
```javascript
 ${room.currTemp > 25 ? "Cooling down to: " : "Warming up to: "}
${room.targetTemp}°
```