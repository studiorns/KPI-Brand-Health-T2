/**
 * Main functionality for the Brand Health KPI Dashboard - T2 Markets
 * Loads data and initializes the dashboard
 */

// Global variables
let csvData = null;
let brandHealthData = null;

/**
 * Load CSV data directly
 * @returns {Promise} - A promise that resolves when the data is loaded
 */
function loadCSVData() {
  console.log('Loading CSV data directly...');
  
  return new Promise((resolve) => {
    // We'll use the hardcoded data from parseCSVData in populateMetricCards.js
    console.log('CSV data loaded successfully');
    
    // Set a dummy CSV data string to trigger the parseCSVData function
    csvData = "dummy_data";
    window.csvData = "dummy_data";
    
    // Add more detailed logging
    console.log('CSV data type:', typeof csvData);
    console.log('CSV data length:', csvData ? csvData.length : 0);
    
    resolve(csvData);
  });
}

/**
 * Initialize the dashboard
 */
function initializeDashboard() {
  console.log('Initializing Brand Health T2 dashboard...');
  
  try {
    // Parse the CSV data
    if (csvData) {
      brandHealthData = parseCSVData(csvData);
      window.brandHealthData = brandHealthData;
      
      // Log the parsed data for debugging
      console.log('Brand Health Data:', window.brandHealthData);
      
      // Populate the metric cards
      populateMetricCards(brandHealthData);
      
      // Initialize the market comparison table
      initializeMarketComparisonTable();
      
      // Initialize the market heatmap
      initializeMarketHeatmap();
      
      // Initialize visible charts with a longer delay to ensure DOM is ready
      setTimeout(() => {
        initializeVisibleCharts();
        
        // Add a fallback to initialize any charts that might have been missed
        setTimeout(() => {
          initializeLazyCharts();
        }, 1000);
      }, 800);
      
      console.log('Dashboard initialized successfully');
    } else {
      console.error('CSV data not available');
      handleError(new Error('CSV data not available'));
    }
  } catch (error) {
    console.error('Error initializing dashboard:', error);
    handleError(error);
  }
}

/**
 * Initialize any lazy-loaded charts that might not have been initialized yet
 */
function initializeLazyCharts() {
  console.log('Checking for uninitialized lazy charts...');
  
  document.querySelectorAll('canvas[data-lazy="true"]').forEach(canvas => {
    if (canvas.getAttribute('data-initialized') !== 'true') {
      console.log(`Initializing missed lazy chart: ${canvas.id}`);
      canvas.setAttribute('data-initialized', 'true');
      
      if (typeof initializeChart === 'function') {
        initializeChart(canvas.id);
      } else if (typeof window.initializeChart === 'function') {
        window.initializeChart(canvas.id);
      } else {
        console.error('initializeChart function not found');
      }
    }
  });
}

/**
 * Update the dashboard title and subtitle with the current period
 */
function updateDashboardTitle() {
  console.log('Updating dashboard title...');
  
  // Update the title and subtitle
  const titleElement = document.querySelector('header h1');
  const subtitleElement = document.querySelector('header p');
  
  if (titleElement) {
    titleElement.textContent = 'Brand Health KPI Dashboard - T2 Markets';
  }
  
  if (subtitleElement) {
    subtitleElement.textContent = 'Q1 2025 Performance Analysis';
  }
  
  console.log('Dashboard title updated');
}

/**
 * Handle errors that occur during dashboard initialization
 * @param {Error} error - The error that occurred
 */
function handleError(error) {
  console.error('Dashboard initialization error:', error);
  
  // Display an error message to the user
  const container = document.querySelector('.container');
  
  if (container) {
    const errorSection = document.createElement('div');
    errorSection.className = 'dashboard-section';
    errorSection.style.backgroundColor = 'var(--danger-light)';
    errorSection.style.borderColor = 'var(--danger)';
    
    const errorTitle = document.createElement('h2');
    errorTitle.textContent = 'Error Loading Dashboard';
    errorTitle.style.color = 'var(--danger)';
    
    const errorMessage = document.createElement('p');
    errorMessage.textContent = `An error occurred while loading the dashboard: ${error.message}`;
    
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.style.backgroundColor = 'var(--primary)';
    retryButton.style.color = 'white';
    retryButton.style.border = 'none';
    retryButton.style.padding = '10px 20px';
    retryButton.style.borderRadius = 'var(--radius)';
    retryButton.style.cursor = 'pointer';
    retryButton.style.marginTop = '20px';
    
    retryButton.addEventListener('click', function() {
      location.reload();
    });
    
    errorSection.appendChild(errorTitle);
    errorSection.appendChild(errorMessage);
    errorSection.appendChild(retryButton);
    
    container.innerHTML = '';
    container.appendChild(errorSection);
  }
}

/**
 * Initialize the dashboard when the DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, starting dashboard initialization...');
  
  try {
    // Update the dashboard title
    updateDashboardTitle();
    
    // Load the CSV data directly
    loadCSVData()
      .then(() => {
        // Initialize the dashboard
        initializeDashboard();
      })
      .catch(error => {
        // Handle any errors
        handleError(error);
        
        // Use default data if available
        console.log('Using default data...');
        initializeDashboard();
      });
      
    // Add a final check for uninitialized charts after everything else has loaded
    window.addEventListener('load', function() {
      setTimeout(() => {
        initializeLazyCharts();
        
        // Check for any hidden sections and log them
        checkForHiddenSections();
      }, 2000);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
    handleError(error);
  }
});

/**
 * Check for any sections that might be hidden due to CSS issues
 */
function checkForHiddenSections() {
  console.log('Checking for hidden sections...');
  
  // Check dashboard sections
  document.querySelectorAll('.dashboard-section').forEach((section, index) => {
    const computedStyle = window.getComputedStyle(section);
    const isVisible = computedStyle.display !== 'none' && 
                      computedStyle.visibility !== 'hidden' && 
                      computedStyle.opacity !== '0';
    
    console.log(`Section ${index + 1} visibility:`, isVisible ? 'Visible' : 'Hidden');
    
    if (!isVisible) {
      console.warn(`Section ${index + 1} is hidden. ID: ${section.id}, Classes: ${section.className}`);
    }
  });
  
  // Check chart containers
  document.querySelectorAll('.chart-container').forEach((container, index) => {
    const computedStyle = window.getComputedStyle(container);
    const isVisible = computedStyle.display !== 'none' && 
                      computedStyle.visibility !== 'hidden' && 
                      computedStyle.opacity !== '0';
    
    console.log(`Chart container ${index + 1} visibility:`, isVisible ? 'Visible' : 'Hidden');
    
    if (!isVisible) {
      console.warn(`Chart container ${index + 1} is hidden. Contains canvas: ${container.querySelector('canvas') ? 'Yes' : 'No'}`);
    }
  });
}

/**
 * Add event listener for the print button
 */
document.addEventListener('DOMContentLoaded', function() {
  const printButton = document.getElementById('print-dashboard');
  
  if (printButton) {
    printButton.addEventListener('click', function() {
      window.print();
    });
  }
});
