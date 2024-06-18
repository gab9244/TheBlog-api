  <h1>MyBlog Project</h1>

<p>This project was my first MERN (Mongoose, Express, React, Node) project, and by far the hardest part was the deployment.</p>
<a href ="https://gab9244.github.io/MemoryGame/">![alt text](/screenshot/myblog-print-2.png)</a>

<h2>Project Overview</h2>

<p>The project has two parts: the frontend and the backend. The frontend handles requests and displays data received from the backend. The backend/API responds to requests by either sending a JSON error if something is wrong or retrieving data from the database and sending it as JSON if everything is fine.</p>

<h2>Functionality Breakdown</h2>

<h3>Routes</h3>
<p>The entire project is built around routes.</p>

<h3>Registration</h3>
<p>Creates a new account where the username and password are saved into the database.</p>

<h3>Login</h3>
<p>Searches the database using the username to verify if the user/account exists. If the password is correct, the user is logged in.</p>

<h3>User Interface</h3>
<p>If the user is logged in, their name will be displayed in the top right corner along with links to create a new post and to log out. Clicking the "Create a New Post" link redirects the user to a page where they can create their own post. All posts are displayed in a section. Clicking on a post redirects to the post page where the full content is displayed. If the logged-in user is the author of the post, they will see buttons to edit and delete the post.</p>

<h3>User Verification</h3>
<p>Cookies/tokens are used to verify if the logged-in user is the same as the post creator. Every user that creates an account has their own token.</p>

<h3>Database</h3>
<p>The database is hosted on MongoDB. User passwords are encrypted for security, ensuring that even the developer cannot see them. The same encryption is applied to images selected for posts.</p>

<h2>Post Deletion</h2>

<h3>Functionality</h3>
<p>The post deletion functionality works as follows:</p>
<ol>
    <li>The user clicks the delete button.</li>
    <li>A delete request is sent to the backend.</li>
</ol>

<h3>Explanation</h3>
<p>To find and delete the post, the method <code>Post.findByIdAndDelete(req.params.id)</code> is used. <code>Post</code> is the model in MongoDB. The ID in the URL of the post is used as the value for <code>findByIdAndDelete</code>.</p>





 


 

                                   