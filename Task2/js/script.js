/* -------------  JS for index.html --------------   */
const urlParams = new URLSearchParams(window.location.search); /* Get userId from URL */
const userId = urlParams.get('userId');

const userBox = document.getElementById('users__container');

fetch('https://jsonplaceholder.typicode.com/users')  /* Index.html - fetching and displaying all users */
    .then(response => response.json())
    .then(userArray => {
        for (let i = 0; i < userArray.length; i++) {

            let user = document.createElement('div');  /* Create user block */
            user.className = 'user';
            userBox.appendChild(user);

                /* User ID */
            let userId = document.createElement('p');
            userId.innerText = `ID: ${userArray[i].id}`;

                /* User Name */
            let userName = document.createElement('p');
            userName.innerText = `Name: ${userArray[i].name}`;

                /* Button for user details */
            let userBtn = document.createElement('a');
            userBtn.className = 'user__btn';
            userBtn.innerText = 'more about user';
            userBtn.href = `user-details.html?userId=${userArray[i].id}`;

                /* Append elements to user block */
            user.append(userId, userName, userBtn);
        }
    });

/* -------------  JS for index.html --------------   */




