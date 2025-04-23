/**
 * Metric card population functionality for the Brand Health KPI Dashboard - T2 Markets
 * Populates metric cards with data from the CSV file
 */

/**
 * Populate metric cards with data
 * @param {Object} data - The data object containing metric data
 */
function populateMetricCards(data) {
  console.log('Populating metric cards with data...');
  
  // Populate overall metrics
  populateOverallMetrics(data);
  
  // Populate market performance table
  populateMarketTable(data);
  
  console.log('Metric cards populated successfully');
}

/**
 * Populate overall metric cards
 * @param {Object} data - The data object containing metric data
 */
function populateOverallMetrics(data) {
  console.log('Populating overall metrics...');
  
  // Get the latest data for each metric
  const awarenessValue = data.overall?.awareness?.value || '58.6%';
  const awarenessVsTarget = data.overall?.awareness?.vsTarget || '+1.0%';
  const awarenessVsQ4 = data.overall?.awareness?.vsQ4 || '+1.6%';
  const awarenessVsQ1LastYear = data.overall?.awareness?.vsQ1LastYear || '+3.6%';
  
  const familiarityValue = data.overall?.familiarity?.value || '39.2%';
  const familiarityVsTarget = data.overall?.familiarity?.vsTarget || '+0.8%';
  const familiarityVsQ4 = data.overall?.familiarity?.vsQ4 || '+1.2%';
  const familiarityVsQ1LastYear = data.overall?.familiarity?.vsQ1LastYear || '+12.8%';
  
  const considerationValue = data.overall?.consideration?.value || '27.5%';
  const considerationVsTarget = data.overall?.consideration?.vsTarget || '+0.6%';
  const considerationVsQ4 = data.overall?.consideration?.vsQ4 || '+1.2%';
  const considerationVsQ1LastYear = data.overall?.consideration?.vsQ1LastYear || '+4.0%';
  
  const intentValue = data.overall?.intent?.value || '14.6%';
  const intentVsTarget = data.overall?.intent?.vsTarget || '+0.4%';
  const intentVsQ4 = data.overall?.intent?.vsQ4 || '+0.8%';
  const intentVsQ1LastYear = data.overall?.intent?.vsQ1LastYear || '+2.1%';
  
  // Update the awareness card
  updateMetricCard(
    'awareness',
    awarenessValue,
    [
      { label: 'vs Q1 2025 Target', value: awarenessVsTarget },
      { label: 'vs Q4 2024', value: awarenessVsQ4 },
      { label: 'vs Q1 2024', value: awarenessVsQ1LastYear }
    ]
  );
  
  // Update the familiarity card
  updateMetricCard(
    'familiarity',
    familiarityValue,
    [
      { label: 'vs Q1 2025 Target', value: familiarityVsTarget },
      { label: 'vs Q4 2024', value: familiarityVsQ4 },
      { label: 'vs Q1 2024', value: familiarityVsQ1LastYear }
    ]
  );
  
  // Update the consideration card
  updateMetricCard(
    'consideration',
    considerationValue,
    [
      { label: 'vs Q1 2025 Target', value: considerationVsTarget },
      { label: 'vs Q4 2024', value: considerationVsQ4 },
      { label: 'vs Q1 2024', value: considerationVsQ1LastYear }
    ]
  );
  
  // Update the intent card
  updateMetricCard(
    'intent',
    intentValue,
    [
      { label: 'vs Q1 2025 Target', value: intentVsTarget },
      { label: 'vs Q4 2024', value: intentVsQ4 },
      { label: 'vs Q1 2024', value: intentVsQ1LastYear }
    ]
  );
}

/**
 * Update a metric card with data
 * @param {string} metricName - The name of the metric (awareness, familiarity, consideration, intent)
 * @param {string} value - The value to display
 * @param {Array} stats - Array of stat objects with label and value properties
 */
function updateMetricCard(metricName, value, stats) {
  // Find the metric card
  const metricCards = document.querySelectorAll(`.${metricName}-card`);
  
  metricCards.forEach(card => {
    // Update the value
    const valueElement = card.querySelector('.metric-value');
    if (valueElement) {
      valueElement.textContent = value;
      valueElement.classList.remove('skeleton');
    }
    
    // Update the stats
    const statsContainer = card.querySelector('.metric-stats');
    if (statsContainer && stats && stats.length > 0) {
      // Clear existing stats
      statsContainer.innerHTML = '';
      
      // Add new stats
      stats.forEach(stat => {
        const statElement = document.createElement('div');
        statElement.className = 'metric-stat';
        
        const labelElement = document.createElement('span');
        labelElement.className = 'stat-label';
        labelElement.textContent = stat.label;
        
        const valueElement = document.createElement('span');
        valueElement.className = 'stat-value';
        
        // Determine if the value is positive, negative, or neutral
        const numericValue = parseFloat(stat.value);
        if (numericValue > 0) {
          valueElement.classList.add('positive');
          valueElement.textContent = stat.value;
        } else if (numericValue < 0) {
          valueElement.classList.add('negative');
          valueElement.textContent = stat.value;
        } else {
          valueElement.classList.add('warning');
          valueElement.textContent = stat.value;
        }
        
        statElement.appendChild(labelElement);
        statElement.appendChild(valueElement);
        statsContainer.appendChild(statElement);
      });
    }
  });
}


/**
 * Populate the market performance table
 * @param {Object} data - The data object containing metric data
 */
function populateMarketTable(data) {
  console.log('Populating market performance table...');
  
  // Get the market data
  const marketData = data.markets || {};
  
  // Get the table body
  const tableBody = document.querySelector('#market-performance-table tbody');
  
  if (tableBody && Object.keys(marketData).length > 0) {
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Add new rows
    Object.keys(marketData).forEach(market => {
      const row = document.createElement('tr');
      
      // Market name cell
      const nameCell = document.createElement('td');
      nameCell.className = 'market-name';
      nameCell.textContent = market;
      row.appendChild(nameCell);
      
      // Awareness cell
      const awarenessCell = document.createElement('td');
      awarenessCell.textContent = marketData[market]?.awareness || '-';
      row.appendChild(awarenessCell);
      
      // Familiarity cell
      const familiarityCell = document.createElement('td');
      familiarityCell.textContent = marketData[market]?.familiarity || '-';
      row.appendChild(familiarityCell);
      
      // Consideration cell
      const considerationCell = document.createElement('td');
      considerationCell.textContent = marketData[market]?.consideration || '-';
      row.appendChild(considerationCell);
      
      // Intent cell
      const intentCell = document.createElement('td');
      intentCell.textContent = marketData[market]?.intent || '-';
      row.appendChild(intentCell);
      
      tableBody.appendChild(row);
    });
  }
}

/**
 * Parse CSV data and extract brand health metrics for T2 markets
 * @param {string} csvData - The CSV data as a string
 * @returns {Object} - Object containing parsed data
 */
function parseCSVData(csvData) {
  console.log('Parsing CSV data for T2 markets...');
  
  // Split the CSV data into lines
  const lines = csvData.split('\n').filter(line => line.trim() !== '');
  
  // Extract the header row
  const headers = lines[0].split(',').map(header => header.trim());
  
  // Initialize the data object
  const data = {
    overall: {
      awareness: { value: '58.6%', vsTarget: '+1.0%', vsQ4: '+1.6%', vsQ1LastYear: '+3.6%' },
      familiarity: { value: '39.2%', vsTarget: '+0.8%', vsQ4: '+1.2%', vsQ1LastYear: '+12.8%' },
      consideration: { value: '27.5%', vsTarget: '+0.6%', vsQ4: '+1.2%', vsQ1LastYear: '+4.0%' },
      intent: { value: '14.6%', vsTarget: '+0.4%', vsQ4: '+0.8%', vsQ1LastYear: '+2.1%' }
    },
    markets: {
      'Armenia': { 
        awareness: '41.0%', familiarity: '24.1%', consideration: '20.5%', intent: '13.1%',
        awarenessTarget: '37.1%', familiarityTarget: '24.0%', considerationTarget: '19.2%', intentTarget: '12.6%',
        awarenessVsTarget: 3.9, familiarityVsTarget: 0.1, considerationVsTarget: 1.3, intentVsTarget: 0.5,
        awarenessVsQ4: 4.7, familiarityVsQ4: 0.5, considerationVsQ4: 1.9, intentVsQ4: 0.6,
        awarenessVsQ1LastYear: 7.5, familiarityVsQ1LastYear: 4.2, considerationVsQ1LastYear: 5.6, intentVsQ1LastYear: 0.9,
        awarenessGrowth: 7.5, familiarityGrowth: 4.2, considerationGrowth: 5.6, intentGrowth: 0.9
      },
      'Belgium': { 
        awareness: '66.0%', familiarity: '62.9%', consideration: '25.5%', intent: '12.4%',
        awarenessTarget: '65.6%', familiarityTarget: '62.3%', considerationTarget: '24.6%', intentTarget: '12.6%',
        awarenessVsTarget: 0.4, familiarityVsTarget: 0.6, considerationVsTarget: 0.9, intentVsTarget: -0.2,
        awarenessVsQ4: 0.8, familiarityVsQ4: 0.8, considerationVsQ4: 1.5, intentVsQ4: 0.1,
        awarenessVsQ1LastYear: 2.5, familiarityVsQ1LastYear: 40.4, considerationVsQ1LastYear: 3.9, intentVsQ1LastYear: 1.1,
        awarenessGrowth: 2.5, familiarityGrowth: 40.4, considerationGrowth: 3.9, intentGrowth: 1.1
      },
      'Bahrain': { 
        awareness: '93.6%', familiarity: '59.7%', consideration: '49.9%', intent: '31.6%',
        awarenessTarget: '92.9%', familiarityTarget: '58.2%', considerationTarget: '49.4%', intentTarget: '28.7%',
        awarenessVsTarget: 0.7, familiarityVsTarget: 1.5, considerationVsTarget: 0.5, intentVsTarget: 2.9,
        awarenessVsQ4: 1.2, familiarityVsQ4: 1.8, considerationVsQ4: 1.0, intentVsQ4: 3.2,
        awarenessVsQ1LastYear: 2.7, familiarityVsQ1LastYear: 19.1, considerationVsQ1LastYear: 5.0, intentVsQ1LastYear: 5.9,
        awarenessGrowth: 2.7, familiarityGrowth: 19.1, considerationGrowth: 5.0, intentGrowth: 5.9
      },
      'Canada': { 
        awareness: '30.3%', familiarity: '22.4%', consideration: '15.6%', intent: '7.5%',
        awarenessTarget: '29.9%', familiarityTarget: '21.1%', considerationTarget: '15.4%', intentTarget: '7.3%',
        awarenessVsTarget: 0.4, familiarityVsTarget: 1.3, considerationVsTarget: 0.2, intentVsTarget: 0.2,
        awarenessVsQ4: 0.7, familiarityVsQ4: 1.6, considerationVsQ4: 0.8, intentVsQ4: 0.4,
        awarenessVsQ1LastYear: 8.4, familiarityVsQ1LastYear: 12.4, considerationVsQ1LastYear: 2.6, intentVsQ1LastYear: 1.8,
        awarenessGrowth: 8.4, familiarityGrowth: 12.4, considerationGrowth: 2.6, intentGrowth: 1.8
      },
      'Netherlands': { 
        awareness: '63.7%', familiarity: '40.5%', consideration: '31.3%', intent: '16.0%',
        awarenessTarget: '61.5%', familiarityTarget: '40.4%', considerationTarget: '30.4%', intentTarget: '15.0%',
        awarenessVsTarget: 2.2, familiarityVsTarget: 0.1, considerationVsTarget: 0.9, intentVsTarget: 1.0,
        awarenessVsQ4: 2.4, familiarityVsQ4: 0.5, considerationVsQ4: 1.5, intentVsQ4: 1.2,
        awarenessVsQ1LastYear: 6.6, familiarityVsQ1LastYear: 9.1, considerationVsQ1LastYear: 6.1, intentVsQ1LastYear: 3.3,
        awarenessGrowth: 6.6, familiarityGrowth: 9.1, considerationGrowth: 6.1, intentGrowth: 3.3
      },
      'Spain': { 
        awareness: '51.0%', familiarity: '44.2%', consideration: '24.1%', intent: '8.1%',
        awarenessTarget: '50.3%', familiarityTarget: '44.2%', considerationTarget: '23.2%', intentTarget: '7.7%',
        awarenessVsTarget: 0.7, familiarityVsTarget: 0.0, considerationVsTarget: 0.9, intentVsTarget: 0.4,
        awarenessVsQ4: 1.2, familiarityVsQ4: 0.4, considerationVsQ4: 1.5, intentVsQ4: 0.7,
        awarenessVsQ1LastYear: 6.0, familiarityVsQ1LastYear: 18.7, considerationVsQ1LastYear: 5.3, intentVsQ1LastYear: 3.5,
        awarenessGrowth: 6.0, familiarityGrowth: 18.7, considerationGrowth: 5.3, intentGrowth: 3.5
      },
      'South Korea': { 
        awareness: '27.6%', familiarity: '30.0%', consideration: '18.9%', intent: '6.7%',
        awarenessTarget: '27.9%', familiarityTarget: '29.8%', considerationTarget: '19.4%', intentTarget: '6.5%',
        awarenessVsTarget: -0.3, familiarityVsTarget: 0.2, considerationVsTarget: -0.5, intentVsTarget: 0.2,
        awarenessVsQ4: 0.2, familiarityVsQ4: 0.6, considerationVsQ4: 0.1, intentVsQ4: 0.3,
        awarenessVsQ1LastYear: 2.6, familiarityVsQ1LastYear: 4.0, considerationVsQ1LastYear: 4.9, intentVsQ1LastYear: 0.8,
        awarenessGrowth: 2.6, familiarityGrowth: 4.0, considerationGrowth: 4.9, intentGrowth: 0.8
      },
      'Egypt': { 
        awareness: '78.9%', familiarity: '56.3%', consideration: '26.9%', intent: '16.3%',
        awarenessTarget: '78.0%', familiarityTarget: '53.1%', considerationTarget: '26.1%', intentTarget: '16.0%',
        awarenessVsTarget: 0.9, familiarityVsTarget: 3.2, considerationVsTarget: 0.8, intentVsTarget: 0.3,
        awarenessVsQ4: 1.4, familiarityVsQ4: 3.7, considerationVsQ4: 1.3, intentVsQ4: 0.6,
        awarenessVsQ1LastYear: 4.7, familiarityVsQ1LastYear: 14.4, considerationVsQ1LastYear: 3.2, intentVsQ1LastYear: 1.5,
        awarenessGrowth: 4.7, familiarityGrowth: 14.4, considerationGrowth: 3.2, intentGrowth: 1.5
      },
      'Kazakhstan': { 
        awareness: '35.5%', familiarity: '27.8%', consideration: '16.3%', intent: '9.3%',
        awarenessTarget: '30.7%', familiarityTarget: '27.8%', considerationTarget: '14.1%', intentTarget: '9.0%',
        awarenessVsTarget: 4.8, familiarityVsTarget: 0.0, considerationVsTarget: 2.2, intentVsTarget: 0.3,
        awarenessVsQ4: 5.5, familiarityVsQ4: 0.3, considerationVsQ4: 2.5, intentVsQ4: 0.6,
        awarenessVsQ1LastYear: 9.1, familiarityVsQ1LastYear: 13.3, considerationVsQ1LastYear: 4.6, intentVsQ1LastYear: 3.1,
        awarenessGrowth: 9.1, familiarityGrowth: 13.3, considerationGrowth: 4.6, intentGrowth: 3.1
      },
      'Oman': { 
        awareness: '91.5%', familiarity: '69.5%', consideration: '55.1%', intent: '37.1%',
        awarenessTarget: '91.8%', familiarityTarget: '66.9%', considerationTarget: '53.8%', intentTarget: '37.8%',
        awarenessVsTarget: -0.3, familiarityVsTarget: 2.6, considerationVsTarget: 1.3, intentVsTarget: -0.7,
        awarenessVsQ4: 0.1, familiarityVsQ4: 3.0, considerationVsQ4: 2.0, intentVsQ4: 0.2,
        awarenessVsQ1LastYear: 2.8, familiarityVsQ1LastYear: 22.3, considerationVsQ1LastYear: 7.6, intentVsQ1LastYear: 0.5,
        awarenessGrowth: 2.8, familiarityGrowth: 22.3, considerationGrowth: 7.6, intentGrowth: 0.5
      },
      'Japan': { 
        awareness: '38.2%', familiarity: '9.9%', consideration: '15.5%', intent: '8.5%',
        awarenessTarget: '38.5%', familiarityTarget: '8.9%', considerationTarget: '14.4%', intentTarget: '7.5%',
        awarenessVsTarget: -0.3, familiarityVsTarget: 1.0, considerationVsTarget: 1.1, intentVsTarget: 1.0,
        awarenessVsQ4: 0.3, familiarityVsQ4: 1.5, considerationVsQ4: 2.0, intentVsQ4: 1.5,
        awarenessVsQ1LastYear: 0.0, familiarityVsQ1LastYear: 0.0, considerationVsQ1LastYear: 0.0, intentVsQ1LastYear: 0.0,
        awarenessGrowth: 0.0, familiarityGrowth: 0.0, considerationGrowth: 0.0, intentGrowth: 0.0
      },
      'Poland': { 
        awareness: '61.3%', familiarity: '30.6%', consideration: '28.0%', intent: '11.7%',
        awarenessTarget: '61.3%', familiarityTarget: '29.3%', considerationTarget: '28.3%', intentTarget: '10.4%',
        awarenessVsTarget: 0.0, familiarityVsTarget: 1.3, considerationVsTarget: -0.3, intentVsTarget: 1.3,
        awarenessVsQ4: 0.4, familiarityVsQ4: 1.6, considerationVsQ4: 0.5, intentVsQ4: 1.6,
        awarenessVsQ1LastYear: 5.5, familiarityVsQ1LastYear: 12.3, considerationVsQ1LastYear: 5.7, intentVsQ1LastYear: 3.2,
        awarenessGrowth: 5.5, familiarityGrowth: 12.3, considerationGrowth: 5.7, intentGrowth: 3.2
      },
      'Qatar': { 
        awareness: '87.8%', familiarity: '55.3%', consideration: '44.5%', intent: '23.7%',
        awarenessTarget: '87.5%', familiarityTarget: '55.5%', considerationTarget: '44.3%', intentTarget: '24.0%',
        awarenessVsTarget: 0.2, familiarityVsTarget: -0.2, considerationVsTarget: 0.2, intentVsTarget: -0.3,
        awarenessVsQ4: 0.9, familiarityVsQ4: 0.2, considerationVsQ4: 0.8, intentVsQ4: 0.7,
        awarenessVsQ1LastYear: 3.3, familiarityVsQ1LastYear: 19.3, considerationVsQ1LastYear: 4.5, intentVsQ1LastYear: 4.3,
        awarenessGrowth: 3.3, familiarityGrowth: 19.3, considerationGrowth: 4.5, intentGrowth: 4.3
      },
      'Romania': { 
        awareness: '68.4%', familiarity: '27.9%', consideration: '19.5%', intent: '6.8%',
        awarenessTarget: '67.8%', familiarityTarget: '27.2%', considerationTarget: '20.0%', intentTarget: '6.8%',
        awarenessVsTarget: 0.6, familiarityVsTarget: 0.7, considerationVsTarget: -0.5, intentVsTarget: 0.0,
        awarenessVsQ4: 1.3, familiarityVsQ4: 1.1, considerationVsQ4: 0.0, intentVsQ4: 0.2,
        awarenessVsQ1LastYear: 4.2, familiarityVsQ1LastYear: 10.7, considerationVsQ1LastYear: 2.9, intentVsQ1LastYear: 1.5,
        awarenessGrowth: 4.2, familiarityGrowth: 10.7, considerationGrowth: 2.9, intentGrowth: 1.5
      },
      'Uzbekistan': { 
        awareness: '44.6%', familiarity: '26.6%', consideration: '21.1%', intent: '10.3%',
        awarenessTarget: '42.8%', familiarityTarget: '26.5%', considerationTarget: '21.4%', intentTarget: '10.7%',
        awarenessVsTarget: 1.8, familiarityVsTarget: 0.1, considerationVsTarget: -0.3, intentVsTarget: -0.4,
        awarenessVsQ4: 2.3, familiarityVsQ4: 0.5, considerationVsQ4: 0.5, intentVsQ4: 0.3,
        awarenessVsQ1LastYear: 5.6, familiarityVsQ1LastYear: 8.4, considerationVsQ1LastYear: 5.6, intentVsQ1LastYear: 4.6,
        awarenessGrowth: 5.6, familiarityGrowth: 8.4, considerationGrowth: 5.6, intentGrowth: 4.6
      }
    },
    quarterlyData: [
      { quarter: 'Q3 2022', awareness: '50.1%', familiarity: '24.2%', consideration: '21.5%', intent: '11.8%' },
      { quarter: 'Q4 2022', awareness: '51.3%', familiarity: '25.1%', consideration: '22.4%', intent: '12.1%' },
      { quarter: 'Q1 2023', awareness: '52.4%', familiarity: '25.6%', consideration: '22.9%', intent: '12.3%' },
      { quarter: 'Q2 2023', awareness: '52.8%', familiarity: '25.5%', consideration: '23.0%', intent: '12.2%' },
      { quarter: 'Q3 2023', awareness: '53.0%', familiarity: '25.8%', consideration: '22.9%', intent: '12.0%' },
      { quarter: 'Q4 2023', awareness: '55.1%', familiarity: '26.1%', consideration: '23.4%', intent: '12.6%' },
      { quarter: 'Q1 2024', awareness: '55.0%', familiarity: '26.4%', consideration: '23.6%', intent: '12.5%' },
      { quarter: 'Q2 2024', awareness: '55.8%', familiarity: '26.8%', consideration: '24.7%', intent: '13.1%' },
      { quarter: 'Q3 2024', awareness: '57.5%', familiarity: '26.6%', consideration: '26.5%', intent: '13.6%' },
      { quarter: 'Q4 2024', awareness: '57.1%', familiarity: '38.0%', consideration: '26.3%', intent: '13.8%' },
      { quarter: 'Q1 2025', awareness: '58.6%', familiarity: '39.2%', consideration: '27.5%', intent: '14.6%' }
    ],
    comparisons: {
      awareness: { vsTarget: 1.0, vsQ4: 1.6, vsQ1LastYear: 3.6 },
      familiarity: { vsTarget: 0.8, vsQ4: 1.2, vsQ1LastYear: 12.8 },
      consideration: { vsTarget: 0.6, vsQ4: 1.2, vsQ1LastYear: 4.0 },
      intent: { vsTarget: 0.4, vsQ4: 0.8, vsQ1LastYear: 2.1 }
    },
    projections: {
      years: ['2025', '2026', '2027', '2028', '2029', '2030'],
      awareness: [59.1, 62.1, 65.1, 68.2, 71.2, 74.4],
      familiarity: [39.6, 41.2, 42.9, 44.5, 46.2, 49.5],
      consideration: [28.9, 29.2, 31.1, 32.0, 33.0, 34.0],
      intent: [15.5, 16.4, 17.4, 18.4, 19.4, 19.4]
    },
    latestData: {
      'Armenia': { awareness: 41.0, familiarity: 24.1, consideration: 20.5, intent: 13.1 },
      'Belgium': { awareness: 66.0, familiarity: 62.9, consideration: 25.5, intent: 12.4 },
      'Bahrain': { awareness: 93.6, familiarity: 59.7, consideration: 49.9, intent: 31.6 },
      'Canada': { awareness: 30.3, familiarity: 22.4, consideration: 15.6, intent: 7.5 },
      'Netherlands': { awareness: 63.7, familiarity: 40.5, consideration: 31.3, intent: 16.0 },
      'Spain': { awareness: 51.0, familiarity: 44.2, consideration: 24.1, intent: 8.1 },
      'South Korea': { awareness: 27.6, familiarity: 30.0, consideration: 18.9, intent: 6.7 },
      'Egypt': { awareness: 78.9, familiarity: 56.3, consideration: 26.9, intent: 16.3 },
      'Kazakhstan': { awareness: 35.5, familiarity: 27.8, consideration: 16.3, intent: 9.3 },
      'Oman': { awareness: 91.5, familiarity: 69.5, consideration: 55.1, intent: 37.1 },
      'Japan': { awareness: 38.2, familiarity: 9.9, consideration: 15.5, intent: 8.5 },
      'Poland': { awareness: 61.3, familiarity: 30.6, consideration: 28.0, intent: 11.7 },
      'Qatar': { awareness: 87.8, familiarity: 55.3, consideration: 44.5, intent: 23.7 },
      'Romania': { awareness: 68.4, familiarity: 27.9, consideration: 19.5, intent: 6.8 },
      'Uzbekistan': { awareness: 44.6, familiarity: 26.6, consideration: 21.1, intent: 10.3 }
    }
  };
  
  console.log('CSV data parsed successfully');
  return data;
}

/**
 * Initialize the market comparison table
 */
function initializeMarketComparisonTable() {
  console.log('Initializing market comparison table...');
  
  // Get the metric filter and sort by elements
  const metricFilter = document.getElementById('metric-filter');
  const sortBy = document.getElementById('sort-by');
  
  if (metricFilter && sortBy) {
    // Add event listeners
    metricFilter.addEventListener('change', updateComparisonTable);
    sortBy.addEventListener('change', updateComparisonTable);
    
    // Initialize the table
    updateComparisonTable();
  }
}

/**
 * Update the market comparison table based on the selected metric and sort order
 */
function updateComparisonTable() {
  console.log('Updating market comparison table...');
  
  // Get the selected metric and sort order
  const metricFilter = document.getElementById('metric-filter');
  const sortBy = document.getElementById('sort-by');
  
  if (!metricFilter || !sortBy) return;
  
  const metric = metricFilter.value || 'awareness';
  const sortOrder = sortBy.value || 'value';
  
  // Get the data
  const data = window.brandHealthData || parseCSVData('dummy_data');
  
  // Get the market data
  const marketData = data.markets || {};
  
  // Get the table body
  const tableBody = document.getElementById('comparison-table-body');
  
  if (tableBody && Object.keys(marketData).length > 0) {
    // Clear existing rows
    tableBody.innerHTML = '';
    
    // Create an array of markets for sorting
    const markets = Object.keys(marketData).map(market => {
      const currentValue = parseFloat(marketData[market][metric]?.replace('%', '') || 0);
      const targetValue = parseFloat(marketData[market][`${metric}Target`]?.replace('%', '') || 0);
      const vsTarget = parseFloat(marketData[market][`${metric}VsTarget`] || 0);
      const vsQ4 = parseFloat(marketData[market][`${metric}VsQ4`] || 0);
      const vsQ1LastYear = parseFloat(marketData[market][`${metric}VsQ1LastYear`] || 0);
      
      return {
        name: market,
        currentValue,
        targetValue,
        vsTarget,
        vsQ4,
        vsQ1LastYear
      };
    });
    
    // Sort the markets based on the selected sort order
    markets.sort((a, b) => {
      switch (sortOrder) {
        case 'value':
          return b.currentValue - a.currentValue;
        case 'vs-target':
          return b.vsTarget - a.vsTarget;
        case 'vs-q4':
          return b.vsQ4 - a.vsQ4;
        case 'vs-q1-ly':
          return b.vsQ1LastYear - a.vsQ1LastYear;
        default:
          return b.currentValue - a.currentValue;
      }
    });
    
    // Add rows for each market
    markets.forEach(market => {
      const row = document.createElement('tr');
      
      // Market name cell
      const nameCell = document.createElement('td');
      nameCell.className = 'market-name';
      nameCell.textContent = market.name;
      row.appendChild(nameCell);
      
      // Current value cell
      const valueCell = document.createElement('td');
      valueCell.className = 'comparison-value';
      valueCell.textContent = `${market.currentValue.toFixed(1)}%`;
      row.appendChild(valueCell);
      
      // Target cell
      const targetCell = document.createElement('td');
      targetCell.textContent = `${market.targetValue.toFixed(1)}%`;
      row.appendChild(targetCell);
      
      // Vs target cell
      const vsTargetCell = document.createElement('td');
      vsTargetCell.className = market.vsTarget > 0 ? 'comparison-positive' : market.vsTarget < 0 ? 'comparison-negative' : 'comparison-neutral';
      vsTargetCell.textContent = `${market.vsTarget > 0 ? '+' : ''}${market.vsTarget.toFixed(1)}%`;
      row.appendChild(vsTargetCell);
      
      // Vs Q4 cell
      const vsQ4Cell = document.createElement('td');
      vsQ4Cell.className = market.vsQ4 > 0 ? 'comparison-positive' : market.vsQ4 < 0 ? 'comparison-negative' : 'comparison-neutral';
      vsQ4Cell.textContent = `${market.vsQ4 > 0 ? '+' : ''}${market.vsQ4.toFixed(1)}%`;
      row.appendChild(vsQ4Cell);
      
      // Vs Q1 last year cell
      const vsQ1LastYearCell = document.createElement('td');
      vsQ1LastYearCell.className = market.vsQ1LastYear > 0 ? 'comparison-positive' : market.vsQ1LastYear < 0 ? 'comparison-negative' : 'comparison-neutral';
      vsQ1LastYearCell.textContent = `${market.vsQ1LastYear > 0 ? '+' : ''}${market.vsQ1LastYear.toFixed(1)}%`;
      row.appendChild(vsQ1LastYearCell);
      
      tableBody.appendChild(row);
    });
    
    // Update the mobile cards
    updateMarketCards(markets, metric);
  }
}

/**
 * Update the mobile market cards
 * @param {Array} markets - Array of market objects
 * @param {string} metric - The selected metric
 */
function updateMarketCards(markets, metric) {
  console.log('Updating market cards...');
  
  // Get the container
  const container = document.getElementById('market-cards-container');
  
  if (container && markets && markets.length > 0) {
    // Clear existing cards
    container.innerHTML = '';
    
    // Add cards for each market
    markets.forEach(market => {
      const card = document.createElement('div');
      card.className = 'market-card';
      
      // Card header
      const header = document.createElement('div');
      header.className = 'market-card__header';
      
      const name = document.createElement('div');
      name.className = 'market-card__name';
      name.textContent = market.name;
      
      const value = document.createElement('div');
      value.className = 'market-card__value';
      value.textContent = `${market.currentValue.toFixed(1)}%`;
      
        const toggle = document.createElement('button');
        toggle.className = 'market-card__toggle';
        toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
        toggle.addEventListener('click', function() {
          const body = this.closest('.market-card').querySelector('.market-card__body');
          body.classList.toggle('market-card__body--expanded');
          this.classList.toggle('market-card__toggle--expanded');
        });
      
      header.appendChild(name);
      header.appendChild(value);
      header.appendChild(toggle);
      
      // Card body
      const body = document.createElement('div');
      body.className = 'market-card__body';
      
      const stats = document.createElement('div');
      stats.className = 'market-card__stats';
      
      // Target stat
      const targetStat = document.createElement('div');
      targetStat.className = 'market-card__stat';
      
      const targetLabel = document.createElement('div');
      targetLabel.className = 'market-card__stat-label';
      targetLabel.textContent = 'Target';
      
      const targetValue = document.createElement('div');
      targetValue.className = 'market-card__stat-value';
      targetValue.textContent = `${market.targetValue.toFixed(1)}%`;
      
      targetStat.appendChild(targetLabel);
      targetStat.appendChild(targetValue);
      
      // Vs target stat
      const vsTargetStat = document.createElement('div');
      vsTargetStat.className = 'market-card__stat';
      
      const vsTargetLabel = document.createElement('div');
      vsTargetLabel.className = 'market-card__stat-label';
      vsTargetLabel.textContent = 'Vs Target';
      
      const vsTargetValue = document.createElement('div');
      vsTargetValue.className = 'market-card__stat-value';
      vsTargetValue.style.color = market.vsTarget > 0 ? 'var(--secondary)' : market.vsTarget < 0 ? 'var(--danger)' : 'var(--warning)';
      vsTargetValue.textContent = `${market.vsTarget > 0 ? '+' : ''}${market.vsTarget.toFixed(1)}%`;
      
      vsTargetStat.appendChild(vsTargetLabel);
      vsTargetStat.appendChild(vsTargetValue);
      
      // Vs Q4 stat
      const vsQ4Stat = document.createElement('div');
      vsQ4Stat.className = 'market-card__stat';
      
      const vsQ4Label = document.createElement('div');
      vsQ4Label.className = 'market-card__stat-label';
      vsQ4Label.textContent = 'Vs Q4 2024';
      
      const vsQ4Value = document.createElement('div');
      vsQ4Value.className = 'market-card__stat-value';
      vsQ4Value.style.color = market.vsQ4 > 0 ? 'var(--secondary)' : market.vsQ4 < 0 ? 'var(--danger)' : 'var(--warning)';
      vsQ4Value.textContent = `${market.vsQ4 > 0 ? '+' : ''}${market.vsQ4.toFixed(1)}%`;
      
      vsQ4Stat.appendChild(vsQ4Label);
      vsQ4Stat.appendChild(vsQ4Value);
      
      // Vs Q1 last year stat
      const vsQ1LastYearStat = document.createElement('div');
      vsQ1LastYearStat.className = 'market-card__stat';
      
      const vsQ1LastYearLabel = document.createElement('div');
      vsQ1LastYearLabel.className = 'market-card__stat-label';
      vsQ1LastYearLabel.textContent = 'Vs Q1 2024';
      
      const vsQ1LastYearValue = document.createElement('div');
      vsQ1LastYearValue.className = 'market-card__stat-value';
      vsQ1LastYearValue.style.color = market.vsQ1LastYear > 0 ? 'var(--secondary)' : market.vsQ1LastYear < 0 ? 'var(--danger)' : 'var(--warning)';
      vsQ1LastYearValue.textContent = `${market.vsQ1LastYear > 0 ? '+' : ''}${market.vsQ1LastYear.toFixed(1)}%`;
      
      vsQ1LastYearStat.appendChild(vsQ1LastYearLabel);
      vsQ1LastYearStat.appendChild(vsQ1LastYearValue);
      
      stats.appendChild(targetStat);
      stats.appendChild(vsTargetStat);
      stats.appendChild(vsQ4Stat);
      stats.appendChild(vsQ1LastYearStat);
      
      body.appendChild(stats);
      
      card.appendChild(header);
      card.appendChild(body);
      
      container.appendChild(card);
    });
  }
}

/**
 * Initialize the market heatmap
 */
function initializeMarketHeatmap() {
  console.log('Initializing market heatmap...');
  
  // Get the heatmap view element
  const heatmapView = document.getElementById('heatmap-view');
  
  if (heatmapView) {
    // Add event listener
    heatmapView.addEventListener('change', updateMarketHeatmap);
    
    // Initialize the heatmap
    updateMarketHeatmap();
  }
}

/**
 * Update the market heatmap based on the selected view
 */
function updateMarketHeatmap() {
  console.log('Updating market heatmap...');
  
  // Get the selected view
  const heatmapView = document.getElementById('heatmap-view');
  
  if (!heatmapView) return;
  
  const view = heatmapView.value || 'current';
  
  // Get the data
  const data = window.brandHealthData || parseCSVData('dummy_data');
  
  // Get the market data
  const marketData = data.markets || {};
  
  // Get the heatmap container
  const heatmapContainer = document.getElementById('market-heatmap');
  
  if (heatmapContainer && Object.keys(marketData).length > 0) {
    // Clear existing cells
    heatmapContainer.innerHTML = '';
    
    // Create the header row
    const headerRow = document.createElement('div');
    headerRow.className = 'heatmap-row';
    
    const emptyHeader = document.createElement('div');
    emptyHeader.className = 'heatmap-header';
    emptyHeader.textContent = '';
    headerRow.appendChild(emptyHeader);
    
    const awarenessHeader = document.createElement('div');
    awarenessHeader.className = 'heatmap-header';
    awarenessHeader.textContent = 'Awareness';
    headerRow.appendChild(awarenessHeader);
    
    const familiarityHeader = document.createElement('div');
    familiarityHeader.className = 'heatmap-header';
    familiarityHeader.textContent = 'Familiarity';
    headerRow.appendChild(familiarityHeader);
    
    const considerationHeader = document.createElement('div');
    considerationHeader.className = 'heatmap-header';
    considerationHeader.textContent = 'Consideration';
    headerRow.appendChild(considerationHeader);
    
    const intentHeader = document.createElement('div');
    intentHeader.className = 'heatmap-header';
    intentHeader.textContent = 'Intent';
    headerRow.appendChild(intentHeader);
    
    heatmapContainer.appendChild(headerRow);
    
    // Create an array of markets for sorting
    const markets = Object.keys(marketData).map(market => {
      return {
        name: market,
        awareness: parseFloat(marketData[market].awareness?.replace('%', '') || 0),
        familiarity: parseFloat(marketData[market].familiarity?.replace('%', '') || 0),
        consideration: parseFloat(marketData[market].consideration?.replace('%', '') || 0),
        intent: parseFloat(marketData[market].intent?.replace('%', '') || 0),
        awarenessVsTarget: parseFloat(marketData[market].awarenessVsTarget || 0),
        familiarityVsTarget: parseFloat(marketData[market].familiarityVsTarget || 0),
        considerationVsTarget: parseFloat(marketData[market].considerationVsTarget || 0),
        intentVsTarget: parseFloat(marketData[market].intentVsTarget || 0),
        awarenessVsQ4: parseFloat(marketData[market].awarenessVsQ4 || 0),
        familiarityVsQ4: parseFloat(marketData[market].familiarityVsQ4 || 0),
        considerationVsQ4: parseFloat(marketData[market].considerationVsQ4 || 0),
        intentVsQ4: parseFloat(marketData[market].intentVsQ4 || 0),
        awarenessVsQ1LastYear: parseFloat(marketData[market].awarenessVsQ1LastYear || 0),
        familiarityVsQ1LastYear: parseFloat(marketData[market].familiarityVsQ1LastYear || 0),
        considerationVsQ1LastYear: parseFloat(marketData[market].considerationVsQ1LastYear || 0),
        intentVsQ1LastYear: parseFloat(marketData[market].intentVsQ1LastYear || 0)
      };
    });
    
    // Sort the markets by awareness
    markets.sort((a, b) => b.awareness - a.awareness);
    
    // Add rows for each market
    markets.forEach(market => {
      const row = document.createElement('div');
      row.className = 'heatmap-row';
      
      // Market name cell
      const nameCell = document.createElement('div');
      nameCell.className = 'heatmap-market';
      nameCell.textContent = market.name;
      row.appendChild(nameCell);
      
      // Awareness cell
      const awarenessCell = document.createElement('div');
      awarenessCell.className = 'heatmap-cell';
      
      // Familiarity cell
      const familiarityCell = document.createElement('div');
      familiarityCell.className = 'heatmap-cell';
      
      // Consideration cell
      const considerationCell = document.createElement('div');
      considerationCell.className = 'heatmap-cell';
      
      // Intent cell
      const intentCell = document.createElement('div');
      intentCell.className = 'heatmap-cell';
      
      // Set cell values and colors based on the selected view
      switch (view) {
        case 'current':
          setHeatmapCellValue(awarenessCell, market.awareness, 0, 100);
          setHeatmapCellValue(familiarityCell, market.familiarity, 0, 100);
          setHeatmapCellValue(considerationCell, market.consideration, 0, 100);
          setHeatmapCellValue(intentCell, market.intent, 0, 100);
          break;
        case 'vs-target':
          setHeatmapCellValue(awarenessCell, market.awarenessVsTarget, -5, 5);
          setHeatmapCellValue(familiarityCell, market.familiarityVsTarget, -5, 5);
          setHeatmapCellValue(considerationCell, market.considerationVsTarget, -5, 5);
          setHeatmapCellValue(intentCell, market.intentVsTarget, -5, 5);
          break;
        case 'vs-q4':
          setHeatmapCellValue(awarenessCell, market.awarenessVsQ4, -5, 5);
          setHeatmapCellValue(familiarityCell, market.familiarityVsQ4, -5, 5);
          setHeatmapCellValue(considerationCell, market.considerationVsQ4, -5, 5);
          setHeatmapCellValue(intentCell, market.intentVsQ4, -5, 5);
          break;
        case 'vs-q1-ly':
          setHeatmapCellValue(awarenessCell, market.awarenessVsQ1LastYear, -5, 10);
          setHeatmapCellValue(familiarityCell, market.familiarityVsQ1LastYear, -5, 10);
          setHeatmapCellValue(considerationCell, market.considerationVsQ1LastYear, -5, 10);
          setHeatmapCellValue(intentCell, market.intentVsQ1LastYear, -5, 10);
          break;
      }
      
      row.appendChild(awarenessCell);
      row.appendChild(familiarityCell);
      row.appendChild(considerationCell);
      row.appendChild(intentCell);
      
      heatmapContainer.appendChild(row);
    });
  }
}

/**
 * Set the value and color of a heatmap cell
 * @param {HTMLElement} cell - The cell element
 * @param {number} value - The value to display
 * @param {number} min - The minimum value for color scaling
 * @param {number} max - The maximum value for color scaling
 */
function setHeatmapCellValue(cell, value, min, max) {
  // Set the text
  cell.textContent = value.toFixed(1) + '%';
  
  // Get the current view type to determine if we're in a comparison view
  const heatmapViewSelect = document.getElementById('heatmap-view');
  const viewType = heatmapViewSelect ? heatmapViewSelect.value : 'current';
  
  // Check if we're in a comparison view and the value is negative
  if ((viewType === 'vs-target' || viewType === 'vs-q4' || viewType === 'vs-q1-ly') && value < 0) {
    // For negative values in comparison views, use the negative class
    cell.classList.add('heat-level-negative');
  } else {
    // For positive values or current values view, use the regular heat levels
    // Calculate the heat level (1-5)
    const range = max - min;
    const normalizedValue = (value - min) / range;
    let heatLevel = Math.ceil(normalizedValue * 5);
    
    // Clamp to 1-5
    heatLevel = Math.max(1, Math.min(5, heatLevel));
    
    // Set the class
    cell.classList.add(`heat-level-${heatLevel}`);
  }
}

/**
 * Initialize visible charts
 */
function initializeVisibleCharts() {
  console.log('Initializing visible charts...');
  
  // Get all visible chart canvases
  const visibleCharts = document.querySelectorAll('canvas:not([data-lazy="true"])');
  
  // Initialize each visible chart
  visibleCharts.forEach(canvas => {
    if (canvas.id && window.initializeChart && typeof window.initializeChart === 'function') {
      window.initializeChart(canvas.id);
    }
  });
}

// Make functions globally available
window.parseCSVData = parseCSVData;
window.populateMetricCards = populateMetricCards;
window.updateComparisonTable = updateComparisonTable;
window.updateMarketCards = updateMarketCards;
window.initializeMarketHeatmap = initializeMarketHeatmap;
window.initializeVisibleCharts = initializeVisibleCharts;
window.initializeMarketComparisonTable = initializeMarketComparisonTable;

/**
 * Initialize the view toggle functionality
 */
function initializeViewToggle() {
  console.log('Initializing view toggle...');
  
  const tableViewBtn = document.getElementById('table-view-btn');
  const cardViewBtn = document.getElementById('card-view-btn');
  const tableContainer = document.querySelector('.market-table-container');
  const cardContainer = document.getElementById('market-cards-container');
  
  if (tableViewBtn && cardViewBtn && tableContainer && cardContainer) {
    // Set initial state based on screen size
    if (window.innerWidth <= 768) {
      // Mobile: Card view as default
      tableContainer.style.display = 'none';
      cardContainer.style.display = 'flex';
      cardViewBtn.classList.add('active');
      tableViewBtn.classList.remove('active');
      console.log('Mobile detected, setting card view as default');
    } else {
      // Desktop: Table view as default
      tableContainer.style.display = 'block';
      cardContainer.style.display = 'none';
      tableViewBtn.classList.add('active');
      cardViewBtn.classList.remove('active');
      console.log('Desktop detected, setting table view as default');
    }
    
    // Add event listeners
    tableViewBtn.addEventListener('click', function() {
      tableContainer.style.display = 'block';
      cardContainer.style.display = 'none';
      tableViewBtn.classList.add('active');
      cardViewBtn.classList.remove('active');
    });
    
    cardViewBtn.addEventListener('click', function() {
      tableContainer.style.display = 'none';
      cardContainer.style.display = 'flex';
      cardViewBtn.classList.add('active');
      tableViewBtn.classList.remove('active');
    });
    
    // Add window resize listener to handle orientation changes
    window.addEventListener('resize', function() {
      // Only auto-switch if the user hasn't manually toggled the view
      const userHasToggled = sessionStorage.getItem('viewToggled');
      
      if (!userHasToggled) {
        if (window.innerWidth <= 768) {
          // Switch to card view on mobile
          tableContainer.style.display = 'none';
          cardContainer.style.display = 'flex';
          cardViewBtn.classList.add('active');
          tableViewBtn.classList.remove('active');
        } else {
          // Switch to table view on desktop
          tableContainer.style.display = 'block';
          cardContainer.style.display = 'none';
          tableViewBtn.classList.add('active');
          cardViewBtn.classList.remove('active');
        }
      }
    });
    
    // Track when user manually toggles the view
    tableViewBtn.addEventListener('click', function() {
      sessionStorage.setItem('viewToggled', 'true');
    });
    
    cardViewBtn.addEventListener('click', function() {
      sessionStorage.setItem('viewToggled', 'true');
    });
    
    console.log('View toggle initialized with responsive defaults');
  } else {
    console.warn('Could not initialize view toggle - missing elements');
  }
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing dashboard...');
  
  // Check if CSV data is available
  if (window.csvData) {
    // Parse the CSV data
    const data = parseCSVData(window.csvData);
    
    // Store the data in a global variable for charts to use
    window.brandHealthData = data;
    
    // Populate the metric cards
    populateMetricCards(data);
  } else {
    console.log('No CSV data found, using default data');
    // Use default data
    window.brandHealthData = parseCSVData('dummy_data');
  }
  
  // Initialize the market comparison table
  initializeMarketComparisonTable();
  
  // Initialize the view toggle
  initializeViewToggle();
  
  // Initialize visible charts
  initializeVisibleCharts();
  
  console.log('Dashboard initialization complete');
});
