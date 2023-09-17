//Grabs html elements
const dateElement = document.getElementById("date");
const messageElement = document.getElementById("message");
const listElement = document.getElementById("reminder-list");
const reminderInput = document.getElementById("reminder-input");
const reminderBtn = document.getElementById("reminder-btn");
const newMessageBtn = document.getElementById("new-messageBtn");
const timeElement = document.getElementById("currentTime")
const breakElement = document.getElementById("break-message")

const addMessageBtn = document.getElementById("submit-btn");
const messageInput = document.getElementById("message-input");
const congratsMessage = document.getElementById("congrats-message");
const deleteImg= document.getElementById("deleteImg-btn")
const messageField= document.getElementById("message-field")



let myReminders = []


// Greeting Message
const currentHour = new Date().getHours();

    let greetingMessage;

    if (currentHour < 13) {
      greetingMessage = 'Good Morning!';
    } else if (currentHour < 17) {
      greetingMessage = 'Good Afternoon!';
    } else {
      greetingMessage = 'Good Evening!';
    }

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

hours = hours % 12 || 12;

const formattedTime = `${hours}:${minutes} ${meridiem}`;

timeElement.innerHTML=formattedTime

//Break Reminder
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
      setInterval(createBreakReminder, intervalInMilliseconds);
    })

}

const intervalInMilliseconds = 30 * 60 * 1000; 

setInterval(createBreakReminder, intervalInMilliseconds);

//Generates random message
const Messages = [
  "Rise and shine, dear friend! May today greet you with endless possibilities and joy. Have an amazing day!",

  "Good morning, sunshine! Wishing you a day filled with laughter, love, and unexpected blessings. Make today extraordinary!",

  "Sending you a burst of morning cheer! May your day be as bright and beautiful as a field of sunflowers. Enjoy every moment",

  "Hello, world-changer! May your day be productive and fulfilling, paving the way for success and happiness. Have a wonderful day!"
];

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
  updateCongratsMessage()
}


// Congrats message updates whenever a user adds or removes a reminder
function updateCongratsMessage() {
  if (myReminders.length === 0) {
    congratsMessage.innerText = 'Congratulations, you have no more reminders! Enjoy the rest of your day!';
  } else {
    congratsMessage.innerText = '';
  }
}
function render(reminders) {
  listElement.innerHTML = '';

  //Lopps through each item and creates a li element with a button to remove it
  reminders.forEach(item => {
    const reminderLi = document.createElement('li');
    const textnode = document.createTextNode(item.description);
    reminderLi.appendChild(textnode);
    listElement.appendChild(reminderLi);

    const buttonEl = document.createElement('button');
    const buttonText = document.createTextNode('Complete');
    buttonEl.id = "completeBtn";
    buttonEl.appendChild(buttonText);
    reminderLi.appendChild(buttonEl);

    buttonEl.addEventListener("click", function () {
      myReminders = myReminders.filter(reminder => reminder.key !== item.key);
      localStorage.setItem('myLeads', JSON.stringify(myReminders));
      render(myReminders);
      updateCongratsMessage();

    });

  });

}

//Adds reminder to array
reminderBtn.addEventListener("click", function() {
  if (!reminderInput.value) {
    alert("Please enter a reminder before submitting.");
  } else {
    addReminder();
  }
});

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
  buttonEl.id = "completeBtn";
  const buttonText = document.createTextNode('Complete');
  buttonEl.appendChild(buttonText);
  reminderLi.appendChild(buttonEl);

  buttonEl.addEventListener("click", function () {
    myReminders = myReminders.filter(reminder => reminder.key !== newReminder.key);
    localStorage.setItem('myLeads', JSON.stringify(myReminders));
    render(myReminders);
    updateCongratsMessage()
  });

  listElement.appendChild(reminderLi);
  myReminders.push(newReminder);
  updateCongratsMessage()


  localStorage.setItem('myLeads', JSON.stringify(myReminders));
  clearReminderInput();

  console.log("New Reminder added:", newReminder);
}


//Message

newMessageBtn.addEventListener("click", function () {
  messageElement.innerHTML = generateRandomMessage();
});


addMessageBtn.addEventListener("click", addMessage);

function addMessage() {
  const messageDescription = messageInput.value;

  if (!messageDescription) {
    alert("Please enter a message before submitting");
    return;
  }

  Messages.push(messageDescription);
  const sentMessage=document.createElement("p")
  const textNode=document.createTextNode("Message Sent!")
  sentMessage.appendChild(textNode);
  messageField.appendChild(sentMessage)

  localStorage.setItem('myMessages', JSON.stringify(Messages));

  clearMessageInput();
  
  console.log("New Message added:", messageDescription);
}


function clearMessageInput() {
  messageInput.value = "";
}
function clearReminderInput() {
  reminderInput.value = "";
}

console.log(document)
