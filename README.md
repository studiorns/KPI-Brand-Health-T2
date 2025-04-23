# Brand Health KPI Dashboard - T2 Markets

## Debugging and Troubleshooting Guide

This guide provides information about the fixes implemented to address rendering issues in the Brand Health KPI Dashboard for T2 Markets.

## Issues Addressed

The following issues have been addressed in the latest updates:

1. **Missing or Incorrect Data**
   - Added detailed logging for data flow in `Brand Health.js`
   - Added checks for `window.brandHealthData` and its required properties
   - Improved error handling for data parsing

2. **Lazy Loading of Charts**
   - Enhanced the initialization of lazy-loaded charts in `createCharts.js`
   - Added fallback mechanisms to initialize charts that might have been missed
   - Improved event listeners for tab changes to initialize charts in newly visible tabs

3. **CSS Visibility Issues**
   - Updated `styles.css` to change fixed heights to auto heights with minimum heights
   - Changed overflow from hidden to visible for sections and chart containers
   - Added specific fixes for problematic elements like the market quadrant chart
   - Improved responsive styles for better mobile display

4. **JavaScript Errors**
   - Added comprehensive error handling with try-catch blocks
   - Added fallbacks for when functions or elements are not found
   - Improved logging to help identify issues

5. **Incorrect Section Heights**
   - Updated CSS to use auto heights with minimum heights
   - Added specific styles for print mode to ensure content is visible

6. **Missing or Incorrect IDs**
   - Added checks for critical elements
   - Added fallbacks for when elements are not found

7. **Tab Switching Issues**
   - Improved tab switching functionality in `collapsible.js`
   - Added fallbacks for when tab content elements are not found
   - Added more robust checks for tab content visibility

8. **Chart.js Plugin Issues**
   - Added checks for Chart.js plugins
   - Added fallbacks for registering plugins if they're available but not registered

## Files Modified

1. **Brand Health.js**
   - Added more detailed logging
   - Improved error handling
   - Added fallback mechanisms for chart initialization
   - Added function to check for hidden sections

2. **createCharts.js**
   - Added error handling
   - Added function to display error messages on chart canvases
   - Improved chart initialization
   - Added checks for Chart.js plugins

3. **collapsible.js**
   - Improved tab switching functionality
   - Added fallbacks for tab content elements
   - Added checks for tab content visibility

4. **styles.css**
   - Changed fixed heights to auto heights with minimum heights
   - Changed overflow from hidden to visible
   - Added specific fixes for problematic elements
   - Improved responsive styles
   - Added print-specific styles

5. **index.html**
   - Added debugging utility script
   - Added checks for missing elements, charts, and tab content

## New Files

1. **dashboard-test.js**
   - A comprehensive test script that can be used to verify that all sections of the dashboard are rendering properly
   - Includes tests for data, Chart.js plugins, critical elements, charts, tab content, section content, and more
   - Provides suggestions for fixing any issues that are found

## How to Use the Test Script

1. Open the Brand Health KPI Dashboard in a web browser
2. Open the browser's developer console (F12 or Ctrl+Shift+I)
3. Run the following command in the console:

```javascript
// Load the test script
const script = document.createElement('script');
script.src = 'dashboard-test.js';
document.head.appendChild(script);
```

4. The test script will run automatically and display the results in the console
5. If any tests fail, the script will provide suggestions for fixing the issues
6. If all tests pass, the dashboard should be rendering properly

## Manual Testing

In addition to the automated tests, it's recommended to manually test the following:

1. **Tab Switching**: Click on different tabs and check if the content changes correctly
2. **Section Collapsing**: Click on section toggle buttons and check if the sections collapse and expand correctly
3. **Chart Rendering**: Check if all charts are rendered correctly
4. **Responsive Design**: Resize the browser window to check if the dashboard is responsive
5. **Print Mode**: Try printing the dashboard to check if all content is visible

## Troubleshooting

If you encounter any issues with the dashboard, try the following:

1. **Check the Console**: Open the browser's developer console (F12 or Ctrl+Shift+I) and check for any errors
2. **Run the Test Script**: Run the dashboard-test.js script to identify any issues
3. **Clear Browser Cache**: Clear your browser's cache and reload the page
4. **Try a Different Browser**: Try opening the dashboard in a different browser
5. **Check Network Requests**: Check if all resources (CSS, JavaScript, etc.) are loaded correctly

If the issues persist, please contact the development team for further assistance.
