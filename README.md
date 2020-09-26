# Work Day Scheduler
05 Third-Party APIs: Work Day Scheduler



**Repository**

https://github.com/RAMulc/WorkDayScheduler

**Homepage**

https://ramulc.github.io/WorkDayScheduler/



<u>**Overview**</u>

An application utilising a combination of html, JavaScript and css to create a work day scheduler.

The date and time is displayed below the page title and description.

Timeslots are provided hourly from 9AM through to 9PM.  The user may enter their schedule into text fields next to each hour of the working day and save to LocalStorage. 

Timeslots in the past are shown 'grey', the current hour 'red', with future timeslots 'green'.

The current date is stored in LocalStorage, when the window opens, if the current date does not match the stored date, LocalStorage is cleared, ready for the new day.

Below is a screenshot demonstrating the interface.

![WorkDayScheduler](https://github.com/RAMulc/WorkDayScheduler/blob/master/Assets/images/WorkDayScheduler.png)

**<u>Core Files:</u>**

**index.html**

Main content for the web page. Links to script.js and style.css. 

Additional styling from Bootstrap, fontawesome and cloudflare.

Makes use of:

​		jquery (v3.4.1): https://code.jquery.com

​		moment.js (v2.24.0): https://cdnjs.cloudflare.com



**./Assets/script.script.js**

Contains the core logic for the scheduler.



**./Assets/css/style.css**

Styling sheet for various components of the scheduler
