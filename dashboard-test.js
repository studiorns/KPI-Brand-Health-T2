/**
 * Dashboard Test Script for Brand Health KPI Dashboard - T2 Markets
 * This script can be run in the browser console to test if all sections are rendering properly
 */

function testDashboard() {
  console.log('=== DASHBOARD TEST SCRIPT ===');
  console.log('Testing if all sections are rendering properly...');
  
  // Test 1: Check if window.brandHealthData is defined
  console.log('\nTest 1: Check if window.brandHealthData is defined');
  if (window.brandHealthData) {
    console.log('✅ PASS: window.brandHealthData is defined');
    
    // Check for required data properties
    const requiredProperties = ['overall', 'markets', 'quarterlyData', 'comparisons', 'projections', 'latestData'];
    const missingProperties = requiredProperties.filter(prop => !window.brandHealthData[prop]);
    
    if (missingProperties.length === 0) {
      console.log('✅ PASS: All required data properties are present');
    } else {
      console.error('❌ FAIL: Missing required data properties:', missingProperties.join(', '));
    }
  } else {
    console.error('❌ FAIL: window.brandHealthData is not defined');
  }
  
  // Test 2: Check if Chart.js and its plugins are loaded
  console.log('\nTest 2: Check if Chart.js and its plugins are loaded');
  if (typeof Chart !== 'undefined') {
    console.log('✅ PASS: Chart.js is loaded');
    
    // Check for required plugins
    const hasAnnotation = typeof Chart.registry.getPlugin('annotation') !== 'undefined';
    const hasDataLabels = typeof Chart.registry.getPlugin('datalabels') !== 'undefined';
    
    if (hasAnnotation) {
      console.log('✅ PASS: Chart.js annotation plugin is loaded');
    } else {
      console.error('❌ FAIL: Chart.js annotation plugin is not loaded');
    }
    
    if (hasDataLabels) {
      console.log('✅ PASS: Chart.js datalabels plugin is loaded');
    } else {
      console.warn('⚠️ WARNING: Chart.js datalabels plugin is not loaded');
    }
  } else {
    console.error('❌ FAIL: Chart.js is not loaded');
  }
  
  // Test 3: Check if all critical elements exist
  console.log('\nTest 3: Check if all critical elements exist');
  const criticalElements = [
    { id: 'market-quadrant-chart', description: 'Market Quadrant Chart' },
    { id: 'market-comparison-tab', description: 'Market Comparison Tab' },
    { id: 'market-heatmap-tab', description: 'Market Heatmap Tab' },
    { id: 'comparison-table-body', description: 'Comparison Table Body' },
    { id: 'market-heatmap', description: 'Market Heatmap Container' },
    { id: 'awareness-tab', description: 'Awareness Tab' },
    { id: 'familiarity-tab', description: 'Familiarity Tab' },
    { id: 'consideration-tab', description: 'Consideration Tab' },
    { id: 'intent-tab', description: 'Intent Tab' }
  ];
  
  const missingElements = criticalElements.filter(el => !document.getElementById(el.id));
  
  if (missingElements.length === 0) {
    console.log('✅ PASS: All critical elements exist');
  } else {
    console.error('❌ FAIL: Missing critical elements:', missingElements.map(el => el.description).join(', '));
  }
  
  // Test 4: Check if all charts are initialized
  console.log('\nTest 4: Check if all charts are initialized');
  const canvases = document.querySelectorAll('canvas');
  console.log(`Found ${canvases.length} canvas elements`);
  
  const uninitializedCharts = Array.from(canvases).filter(canvas => 
    canvas.id && canvas.getAttribute('data-initialized') !== 'true'
  );
  
  if (uninitializedCharts.length === 0) {
    console.log('✅ PASS: All charts are initialized');
  } else {
    console.error('❌ FAIL: Some charts are not initialized:', uninitializedCharts.map(c => c.id).join(', '));
    
    // Try to initialize them
    uninitializedCharts.forEach(canvas => {
      if (typeof window.initializeChart === 'function') {
        console.log(`Attempting to initialize chart: ${canvas.id}`);
        canvas.setAttribute('data-initialized', 'true');
        try {
          window.initializeChart(canvas.id);
          console.log(`Successfully initialized chart: ${canvas.id}`);
        } catch (error) {
          console.error(`Failed to initialize chart ${canvas.id}:`, error);
        }
      }
    });
  }
  
  // Test 5: Check if all tab content is visible when active
  console.log('\nTest 5: Check if all tab content is visible when active');
  const tabContents = document.querySelectorAll('.tab-content');
  console.log(`Found ${tabContents.length} tab content elements`);
  
  const activeTabContents = Array.from(tabContents).filter(tab => 
    tab.classList.contains('active') || tab.classList.contains('tab-content--active')
  );
  
  console.log(`Found ${activeTabContents.length} active tab content elements`);
  
  const hiddenActiveTabContents = activeTabContents.filter(tab => {
    const computedStyle = window.getComputedStyle(tab);
    return computedStyle.display === 'none' || 
           computedStyle.visibility === 'hidden' || 
           computedStyle.opacity === '0';
  });
  
  if (hiddenActiveTabContents.length === 0) {
    console.log('✅ PASS: All active tab content is visible');
  } else {
    console.error('❌ FAIL: Some active tab content is hidden:', hiddenActiveTabContents.map(t => t.id).join(', '));
    
    // Force visibility
    hiddenActiveTabContents.forEach(tab => {
      tab.style.display = 'block';
      tab.style.visibility = 'visible';
      tab.style.opacity = '1';
      console.log(`Forced visibility for tab content: ${tab.id}`);
    });
  }
  
  // Test 6: Check if all section content is visible
  console.log('\nTest 6: Check if all section content is visible');
  const sectionContents = document.querySelectorAll('.section-content');
  console.log(`Found ${sectionContents.length} section content elements`);
  
  const collapsedSectionContents = Array.from(sectionContents).filter(section => 
    section.classList.contains('collapsed') || section.classList.contains('section-content--collapsed')
  );
  
  console.log(`Found ${collapsedSectionContents.length} collapsed section content elements`);
  
  const nonCollapsedSectionContents = Array.from(sectionContents).filter(section => 
    !section.classList.contains('collapsed') && !section.classList.contains('section-content--collapsed')
  );
  
  const hiddenNonCollapsedSectionContents = nonCollapsedSectionContents.filter(section => {
    const computedStyle = window.getComputedStyle(section);
    return computedStyle.display === 'none' || 
           computedStyle.visibility === 'hidden' || 
           computedStyle.opacity === '0' ||
           computedStyle.maxHeight === '0px';
  });
  
  if (hiddenNonCollapsedSectionContents.length === 0) {
    console.log('✅ PASS: All non-collapsed section content is visible');
  } else {
    console.error('❌ FAIL: Some non-collapsed section content is hidden:', hiddenNonCollapsedSectionContents.length);
    
    // Force visibility
    hiddenNonCollapsedSectionContents.forEach((section, index) => {
      section.style.display = 'block';
      section.style.visibility = 'visible';
      section.style.opacity = '1';
      section.style.maxHeight = '5000px';
      section.style.overflow = 'visible';
      console.log(`Forced visibility for section content #${index + 1}`);
    });
  }
  
  // Test 7: Check if all chart containers are visible
  console.log('\nTest 7: Check if all chart containers are visible');
  const chartContainers = document.querySelectorAll('.chart-container');
  console.log(`Found ${chartContainers.length} chart containers`);
  
  const hiddenChartContainers = Array.from(chartContainers).filter(container => {
    const computedStyle = window.getComputedStyle(container);
    return computedStyle.display === 'none' || 
           computedStyle.visibility === 'hidden' || 
           computedStyle.opacity === '0' ||
           computedStyle.height === '0px';
  });
  
  if (hiddenChartContainers.length === 0) {
    console.log('✅ PASS: All chart containers are visible');
  } else {
    console.error('❌ FAIL: Some chart containers are hidden:', hiddenChartContainers.length);
    
    // Force visibility
    hiddenChartContainers.forEach((container, index) => {
      container.style.display = 'flex';
      container.style.visibility = 'visible';
      container.style.opacity = '1';
      container.style.height = 'auto';
      container.style.minHeight = '300px';
      console.log(`Forced visibility for chart container #${index + 1}`);
    });
  }
  
  // Test 8: Check if market quadrant chart is visible
  console.log('\nTest 8: Check if market quadrant chart is visible');
  const marketQuadrantChart = document.getElementById('market-quadrant-chart');
  
  if (marketQuadrantChart) {
    const computedStyle = window.getComputedStyle(marketQuadrantChart);
    const isVisible = computedStyle.display !== 'none' && 
                     computedStyle.visibility !== 'hidden' && 
                     computedStyle.opacity !== '0';
    
    if (isVisible) {
      console.log('✅ PASS: Market quadrant chart is visible');
    } else {
      console.error('❌ FAIL: Market quadrant chart is hidden');
      
      // Force visibility
      marketQuadrantChart.style.display = 'block';
      marketQuadrantChart.style.visibility = 'visible';
      marketQuadrantChart.style.opacity = '1';
      console.log('Forced visibility for market quadrant chart');
    }
  } else {
    console.error('❌ FAIL: Market quadrant chart not found');
  }
  
  // Test 9: Check if tab switching works
  console.log('\nTest 9: Check if tab switching works');
  const tabButtons = document.querySelectorAll('.tab-btn');
  console.log(`Found ${tabButtons.length} tab buttons`);
  
  if (tabButtons.length > 0) {
    console.log('✅ PASS: Tab buttons found');
    
    // Add a note about manual testing
    console.log('Note: To fully test tab switching, click on different tabs and check if the content changes');
  } else {
    console.error('❌ FAIL: No tab buttons found');
  }
  
  // Test 10: Check if market comparison table is populated
  console.log('\nTest 10: Check if market comparison table is populated');
  const comparisonTableBody = document.getElementById('comparison-table-body');
  
  if (comparisonTableBody) {
    const rows = comparisonTableBody.querySelectorAll('tr');
    
    if (rows.length > 0) {
      console.log(`✅ PASS: Market comparison table is populated with ${rows.length} rows`);
    } else {
      console.error('❌ FAIL: Market comparison table is empty');
      
      // Try to update the table
      if (window.updateComparisonTable && typeof window.updateComparisonTable === 'function') {
        console.log('Attempting to update market comparison table');
        window.updateComparisonTable();
      }
    }
  } else {
    console.error('❌ FAIL: Market comparison table body not found');
  }
  
  // Test 11: Check if market heatmap is populated
  console.log('\nTest 11: Check if market heatmap is populated');
  const marketHeatmap = document.getElementById('market-heatmap');
  
  if (marketHeatmap) {
    const cells = marketHeatmap.querySelectorAll('.heatmap-cell, .heatmap-header, .heatmap-market');
    
    if (cells.length > 0) {
      console.log(`✅ PASS: Market heatmap is populated with ${cells.length} cells`);
    } else {
      console.error('❌ FAIL: Market heatmap is empty');
      
      // Try to initialize the heatmap
      if (window.initializeMarketHeatmap && typeof window.initializeMarketHeatmap === 'function') {
        console.log('Attempting to initialize market heatmap');
        window.initializeMarketHeatmap();
      }
    }
  } else {
    console.error('❌ FAIL: Market heatmap not found');
  }
  
  // Test 12: Check if market quadrant chart is populated
  console.log('\nTest 12: Check if market quadrant chart is populated');
  const marketQuadrantChartCanvas = document.getElementById('market-quadrant-chart');
  
  if (marketQuadrantChartCanvas) {
    const isInitialized = marketQuadrantChartCanvas.getAttribute('data-initialized') === 'true';
    
    if (isInitialized) {
      console.log('✅ PASS: Market quadrant chart is initialized');
      
      // Check if quadrant market lists are populated
      const quadrantMarketLists = [
        { id: 'question-markets', description: 'Growth Opportunities' },
        { id: 'star-markets', description: 'Leading Markets' },
        { id: 'dog-markets', description: 'Underperforming Markets' },
        { id: 'cashcow-markets', description: 'Stable Performers' }
      ];
      
      const emptyQuadrantMarketLists = quadrantMarketLists.filter(list => {
        const element = document.getElementById(list.id);
        return element && (element.textContent === 'Loading...' || element.textContent === 'None');
      });
      
      if (emptyQuadrantMarketLists.length === 0) {
        console.log('✅ PASS: All quadrant market lists are populated');
      } else {
        console.warn(`⚠️ WARNING: Some quadrant market lists are not populated: ${emptyQuadrantMarketLists.map(l => l.description).join(', ')}`);
        
        // Try to initialize the market quadrant chart
        if (typeof window.initializeChart === 'function') {
          console.log('Attempting to initialize market quadrant chart');
          window.initializeChart('market-quadrant-chart');
        }
      }
    } else {
      console.error('❌ FAIL: Market quadrant chart is not initialized');
      
      // Try to initialize it
      if (typeof window.initializeChart === 'function') {
        console.log('Attempting to initialize market quadrant chart');
        marketQuadrantChartCanvas.setAttribute('data-initialized', 'true');
        window.initializeChart('market-quadrant-chart');
      }
    }
  } else {
    console.error('❌ FAIL: Market quadrant chart not found');
  }
  
  console.log('\n=== DASHBOARD TEST COMPLETE ===');
  console.log('If any tests failed, check the console for details and try the suggested fixes.');
  console.log('If all tests passed, the dashboard should be rendering properly.');
}

// Run the test
testDashboard();
