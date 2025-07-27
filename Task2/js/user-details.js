
/* -------------  JS for USER-DETAILS.html --------------   */

// Getting the user ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

// DOM-elements
const userWrapp = document.getElementById('user__wrapp');
const userFull = document.getElementById('user__full');

// Loading user data
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        const userFields = {
            'ID': user.id,
            'Name': user.name,
            'Username': user.username,
            'Email': user.email,
            'Phone': user.phone,
            'Website': user.website,
            'Company': user.company.name,
            'Address': `${user.address.city}, ${user.address.street}, ${user.address.suite} (${user.address.zipcode})`
        };

        const userInfoBox = document.createElement('div');
        userInfoBox.classList.add('user__info-box');

        for (const [key, value] of Object.entries(userFields)) {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${key}:</strong> ${value}`;
            userInfoBox.appendChild(p);
        }

        userFull.appendChild(userInfoBox);

        // Post view button
        const postsBtn = document.createElement('a');
        postsBtn.textContent = 'Posts of current user';
        postsBtn.classList.add('user__posts-link');
        postsBtn.href = '#'; // we don't move yet, because we're always on the same page
        userFull.appendChild(postsBtn);

        postsBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Delete the previous list, if any
            const oldList = document.querySelector('.post__list');
            if (oldList) oldList.remove();

            // Отримуємо пости користувача
            fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
                .then(response => response.json())
                .then(posts => {
                    const postList = document.createElement('div');
                    postList.className = 'post__list';

                    posts.forEach(post => {
                        const postCard = document.createElement('div');
                        postCard.className = 'post__card';
                        postCard.innerHTML = `<h4>${post.title}</h4>`;

                        const showBtn = document.createElement('a');
                        showBtn.textContent = 'Show post';
                        showBtn.className = 'user__posts-link';
                        showBtn.href = `post-details.html?postId=${post.id}`;

                        postCard.appendChild(showBtn);
                        postList.appendChild(postCard);
                    });

                    userWrapp.appendChild(postList);
                });
        });
    });

/* -------------  JS для сторінки USER-DETAILS.html --------------   */