const dateElement = document.getElementById("date");
const messageElement = document.getElementById("message");
const listElement = document.getElementById("reminder-list");
const reminderInput = document.getElementById("reminder-input");
const reminderBtn = document.getElementById("reminder-btn");
const newMessageBtn = document.getElementById("new-messageBtn");
const timeElement = document.getElementById("currentTime")
const breakElement = document.getElementById("break-message")

let myReminders = []

const currentHour = new Date().getHours();

    // Select the greeting based on the current hour
    let greetingMessage;

    if (currentHour < 13) {
      greetingMessage = 'Good morning!';
    } else if (currentHour < 17) {
      greetingMessage = 'Good afternoon!';
    } else {
      greetingMessage = 'Good evening!';
    }

    // Display the greeting message
    const greetingElement = document.getElementById('greetingMessage');
    greetingElement.textContent = greetingMessage;

//Gets Current Date
const current = new Date();
const month = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
let currentMonth = month[current.getMonth()];
const formattedDate = `${currentMonth} ${current.getDate()}, ${current.getFullYear()}`;

dateElement.innerHTML = formattedDate;

const currentTime = new Date();
let hours = currentTime.getHours();
const minutes = currentTime.getMinutes().toString().padStart(2, '0');
const meridiem = hours >= 12 ? 'PM' : 'AM';

// Convert to 12-hour format
hours = hours % 12 || 12;

const formattedTime = `${hours}:${minutes} ${meridiem}`;

timeElement.innerHTML=formattedTime

function createBreakReminder() {
  const breakReminder = document.createElement('p');
  breakReminder.innerText = 'It\'s time to take a break! Stretch and relax for a while.';
  breakElement.appendChild(breakReminder);
  const buttonEl = document.createElement('button');
    const buttonText = document.createTextNode('X');
    buttonEl.appendChild(buttonText);
    breakReminder.appendChild(buttonEl);

    buttonEl.addEventListener("click", function(){
      breakElement.innerHTML=""
    })

}

const intervalInMilliseconds = 30 * 60 * 1000; // 30 minutes * 60 seconds * 1000 milliseconds

// Set an initial timer
setInterval(createBreakReminder, intervalInMilliseconds);

const Messages = [
  "Rise and shine, dear friend! May today greet you with endless possibilities and joy. Have an amazing day!",
  "Good morning, sunshine! Wishing you a day filled with laughter, love, and unexpected blessings. Make today extraordinary!",
  "Sending you a burst of morning cheer! May your day be as bright and beautiful as a field of sunflowers. Enjoy every moment",
  "Hello, world-changer! May your day be productive and fulfilling, paving the way for success and happiness. Have a wonderful day!"
];

//Generates random message
const generateRandomMessage = () => {
  const randomIndex = Math.floor(Math.random() * Messages.length);
  return Messages[randomIndex];
};

messageElement.innerHTML = generateRandomMessage();

// Retrieve data from local storage
const remindersFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));
if (remindersFromLocalStorage && Array.isArray(remindersFromLocalStorage)) {
  myReminders = remindersFromLocalStorage;
  render(myReminders);
} else {
  console.log('No reminders found in local storage or data is invalid.');
}

function render(reminders) {
  listElement.innerHTML = ''; // Clear the existing list

  //Lopps through each item and creates a li element with a button to remove it
  reminders.forEach(item => {
    const reminderLi = document.createElement('li');
    const textnode = document.createTextNode(item.description);
    reminderLi.appendChild(textnode);
    listElement.appendChild(reminderLi);

    const buttonEl = document.createElement('button');
    const buttonText = document.createTextNode('Complete');
    buttonEl.appendChild(buttonText);
    reminderLi.appendChild(buttonEl);

    buttonEl.addEventListener("click", function () {
      // Remove the reminder from the myReminders array
      myReminders = myReminders.filter(reminder => reminder.key !== item.key);
      // Update local storage with the updated myReminders array
      localStorage.setItem('myLeads', JSON.stringify(myReminders));
      // Render the updated reminders
      render(myReminders);
    });
  });
}

reminderBtn.addEventListener("click", function() {
  if (!reminderInput.value) {
    alert("Please enter a reminder before submitting.");
  } else {
    addReminder();
  }
});

//Adds reminder to array
function addReminder() {
  const reminderDescription = reminderInput.value;

  const newKey = String(myReminders.length + 1);

  const newReminder = {
    key: newKey,
    description: reminderDescription,
  };

  const reminderLi = document.createElement('li');
  const textnode = document.createTextNode(newReminder.description);
  reminderLi.appendChild(textnode);

  const buttonEl = document.createElement('button');
  const buttonText = document.createTextNode('Complete');
  buttonEl.appendChild(buttonText);
  reminderLi.appendChild(buttonEl);

  buttonEl.addEventListener("click", function () {
    // Remove the reminder from the myReminders array
    myReminders = myReminders.filter(reminder => reminder.key !== newReminder.key);
    // Update local storage with the updated myReminders array
    localStorage.setItem('myLeads', JSON.stringify(myReminders));
    // Render the updated reminders
    render(myReminders);
  });

  listElement.appendChild(reminderLi);
  myReminders.push(newReminder);

  // Save updated myReminders to local storage
  localStorage.setItem('myLeads', JSON.stringify(myReminders));

  clearInput();

  console.log("New Reminder added:", newReminder);
}

newMessageBtn.addEventListener("click", function () {
  messageElement.innerHTML = generateRandomMessage();
});

function clearInput() {
  reminderInput.value = "";
}
