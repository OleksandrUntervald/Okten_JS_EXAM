const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('postId');

const postBox = document.getElementById('post__box');
const commentBox = document.getElementById('comment__box');

/* Fetch post details */
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        /* Create post info block */
        const postDiv = document.createElement('div');
        postDiv.style.border = '1px solid gray';
        postDiv.style.marginBottom = '10px';
        postDiv.style.padding = '10px';

        const userIdP = document.createElement('p');
        userIdP.innerText = `User ID: ${post.userId}`;
        postDiv.appendChild(userIdP);

        const postIdP = document.createElement('p');
        postIdP.innerText = `Post ID: ${post.id}`;
        postDiv.appendChild(postIdP);

        const titleH3 = document.createElement('h3');
        titleH3.innerText = post.title;
        postDiv.appendChild(titleH3);

        const bodyP = document.createElement('p');
        bodyP.innerText = post.body;
        postDiv.appendChild(bodyP);

        postBox.appendChild(postDiv);

        /* Create "Turn Back" button as separate block below post */
        const turnBackLink = document.createElement('a');
        turnBackLink.className = 'turn__back';
        turnBackLink.innerText = 'Turn Back';
        turnBackLink.href = './index.html';
        turnBackLink.style.display = 'block';
        turnBackLink.style.width = '200px';
        turnBackLink.style.margin = '10px auto';
        turnBackLink.style.textAlign = 'center';
        turnBackLink.style.padding = '10px';
        turnBackLink.style.borderRadius = '8px';
        turnBackLink.style.backgroundColor = '#ff9999';
        turnBackLink.style.textDecoration = 'none';
        turnBackLink.style.color = 'white';

        postBox.appendChild(turnBackLink);

        /* Now fetch comments for this post */
        return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    })
    .then(response => response.json())
    .then(comments => {
        /* Add Comments title */
        const commentsTitle = document.createElement('h2');
        commentsTitle.innerText = 'Comments';
        postBox.appendChild(commentsTitle);

        /* Loop through each comment and display */
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.classList.add('comment');  /* For CSS styling */

            const commentName = document.createElement('h4');
            commentName.innerText = comment.name;

            const commentEmail = document.createElement('p');
            commentEmail.innerText = `Email: ${comment.email}`;

            const commentBody = document.createElement('p');
            commentBody.innerText = comment.body;

            commentDiv.append(commentName, commentEmail, commentBody);
            commentBox.appendChild(commentDiv);
        });
    })
    .catch(error => console.error('Error:', error));
