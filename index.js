const dateElement = document.getElementById("date")
const messageElement = document.getElementById("message")
const listElement = document.getElementById("reminder-list")
const reminderInput = document.getElementById("reminder-input")
const reminderBtn = document.getElementById("reminder-btn")
const newMessageBtn = document.getElementById("new-messageBtn")

const current = new Date();
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let currentMonth = month[current.getMonth()];
  const formattedDate = `${currentMonth} ${current.getDate()}, ${current.getFullYear()}`;
  
  dateElement.innerHTML = formattedDate;
  const Messages = [
    "Rise and shine, dear friend! May today greet you with endless possibilities and joy. Have an amazing day!",

    "Good morning, sunshine! Wishing you a day filled with laughter, love, and unexpected blessings. Make today extraordinary!",

    "Sending you a burst of morning cheer! May your day be as bright and beautiful as a field of sunflowers. Enjoy every moment",

    "Hello, world-changer! May your day be productive and fulfilling, paving the way for success and happiness. Have a wonderful day!"
]
  const generateRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * Messages.length);
    return Messages[randomIndex];
  };
  
  messageElement.innerHTML = generateRandomMessage();
       
    
    const data = [
        {
          key: '1',
          description: 'Complete 30 minute workout',
        },
        {
          key: '2',
          description: 'Complete assignment',
        },
        {
          key: '3',
          description: 'Attend zoom meeting',
        },
      ];
      data.forEach(item => {
        const reminderLi = document.createElement('li');
        const textnode = document.createTextNode(item.description); // Use item.description to get the description for each item
        reminderLi.appendChild(textnode);
        listElement.appendChild(reminderLi);
        const buttonEl = document.createElement('button');
        const buttonText = document.createTextNode('Complete')
        buttonEl.appendChild(buttonText)
        reminderLi.appendChild(buttonEl)

        buttonEl.addEventListener("click", function(){
            listElement.removeChild(reminderLi);

      });
    })
    reminderBtn.addEventListener("click", addReminder);

function addReminder() {
  const reminderDescription = reminderInput.value;

  const newKey = String(data.length + 1);

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

  buttonEl.addEventListener("click", function(){
    listElement.removeChild(reminderLi);
  });

  // Append the new reminder to the list
  listElement.appendChild(reminderLi);

  clearInput();

  data.push(newReminder);

  console.log("New Reminder added:", newReminder);
}

newMessageBtn.addEventListener("click", function(){
  messageElement.innerHTML = generateRandomMessage();
})

function clearInput(){
reminderInput.value=""
}