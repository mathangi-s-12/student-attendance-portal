# staff-portal-engineering-test

This is an engineering test from Orah.

This is the React app for staff users.

The staff can create rolls and view them using this application.

Code added for following tasks:

## Tasks

### 1. Implement search and sort of students

First implement an efficient way to sort and search the list of students. Please update "First Name" section of the toolbar with a sort toggle (switch between ascending or descending order) as well as a way to switch between sort by first name or last name. Then replace the "Search" with an input to allow users to search by name.

![App tool bar](../screenshots/02_toolbar.png)

### 2. Displaying a roll summary

Clicking on "Start Roll" will enter the roll mode which would display a roll state icon for each student in the list. You can click on the icon to switch between "Present", "Late", "Absent" state. In this mode, you will also see a dark blue overlay shown at the bottom of the page which displays the summary of different roll states and the number of students. They all show `0` at the moment as it hasn't been implemented. Please update it to show the correct number.

![Roll mode](../screenshots/03_roll_mode.png)

### 3. Filter students based on roll state

When clicking on each roll state icon, it should filter the list of students to only the ones with the matching roll state. Please implement a way to filter students based on roll state. You may update how we store the list of students if you haven't done so in previous steps (you can continue with using states in React, or use [Context](https://reactjs.org/docs/context.html), or use whichever state management library you are most familiar with).

### 4. (BONUS) Save the current roll and display it in activity page

Finally once we are done with this roll, we can click on the "Complete" button to save a snapshot of the roll (which student is in what roll state). Please call the `save-roll` route with necessary params in order to save this roll.

Once the roll has been saved, you can call the `get-activities` route to get list of rolls we have completed. Please implement the UI to display a list of completed rolls in the activity page.

Most of the successful candidates have shown strong styling skills and a good sense of UX. Therefore it is recommended that you spend an extra effort to make it looks pretty ✨.
