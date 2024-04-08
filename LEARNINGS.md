# STRUCTURE of CSS-FILES

In a typical React project, you might organize your styles across different CSS files as follows:

## index.css
This file contains global styles that apply to the entire application. It might include styles for setting up basic typography, resetting default browser styles, or defining layout rules. It's usually imported in the index.js or App.js file to ensure that these styles are applied globally.

## app.css
This file contains styles specific to the overall layout and structure of your application. It might include styles for the header, footer, navigation bar, or any other shared components that appear on multiple pages. It's often imported in the App.js component or its parent component.

## Component.module.css
Each component that requires specific styling can have its own CSS module file. These files contain styles that are scoped to the respective components, preventing style conflicts with other components. Each component's CSS module file is typically named after the component itself, suffixed with .module.css. These files contain styles specific to that component, such as its appearance, layout, and behavior.

Here's a summary of what each file might contain:

index.css:

css
Copy code
/* index.css */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  /* Other global styles */
}
app.css:

css
Copy code
/* app.css */
.header {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

.footer {
  background-color: #333;
  color: #fff;
  padding: 10px;
}

/* Other shared styles */
Component.module.css:

css
Copy code
/* Component.module.css */
.container {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
}

.button {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

/* Other component-specific styles */

This organization helps maintain a clear separation of concerns and makes it easier to manage and maintain your project's styles.


https://hobornemann/github.io/JobChaser/
https://hobornemann.github.io/JobChaser/