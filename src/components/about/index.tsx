import React from 'react';

export default function() {
  return (
    <div className='m-20'>
      <h1>About Page</h1>
      <p>
        This is a front-end React-based platform where users can create, edit, and collaborate on books. 
        The primary focus is on the user interface and functionality.
      </p>
      <h2>Core Features</h2>
      <ol>
        <li>
          <strong>Unlimited Sections and Subsections:</strong> 
          Create a React-based user interface allowing users to create an unlimited number of sections within their books. 
          Each section can contain multiple subsections, and these subsections can further contain their own child subsections. 
          This nesting can go to infinite levels. 
          For instance, a section titled "Introduction" might have subsections like "Intro to Platform" and "Intro to Book Writing." 
          The "Intro to Platform" subsection might further contain its own subsection titled "Intro to Platform (Menu Bar)."
        </li>
        <li>
          <strong>User Authentication:</strong> 
          Implement user authentication in React, allowing users to sign up, log in, and manage their accounts. 
          Ensure secure authentication practices. 
          You have the option to use the json-server-auth package to simulate authentication and authorization for this challenge.
        </li>
        <li>
          <strong>Permissions & Roles:</strong> 
          Implement roles such as Author and Collaborator in the React application. 
          Only the Author should have the ability to create new sections/subsections within the user interface. 
          Both Author and Collaborator can edit them. 
          The Author should be able to grant or revoke access to specific collaborators through the React app. 
          You have the option to use the json-server-auth package to simulate authentication and authorization for this challenge.
        </li>
      </ol>
    </div>
  );
}
