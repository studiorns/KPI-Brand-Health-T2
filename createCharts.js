/**
 * Chart creation functionality for the Brand Health KPI Dashboard - T2 Markets
 * Creates and manages all chart visualizations
 */

// Chart.js global configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.color = '#e0e0e0';
Chart.defaults.scale.grid.color = 'rgba(255, 255, 255, 0.05)';
Chart.defaults.scale.ticks.color = '#a0a0a0';

// Register Chart.js plugins
if (typeof Chart !== 'undefined') {
  // Register the datalabels plugin if available
  if (typeof ChartDataLabels !== 'undefined') {
    Chart.register(ChartDataLabels);
    console.log('Registered Chart.js datalabels plugin');
  }
  
  // Register the annotation plugin if available
  if (typeof ChartAnnotation !== 'undefined' && !Chart.registry.getPlugin('annotation')) {
    Chart.register(ChartAnnotation);
    console.log('Registered Chart.js annotation plugin');
  }
}

// Color schemes for different metrics
const colorSchemes = {
  awareness: {
    primary: '#4285f4',
    secondary: 'rgba(66, 133, 244, 0.7)',
    background: 'rgba(66, 133, 244, 0.1)'
  },
  familiarity: {
    primary: '#34a853',
    secondary: 'rgba(52, 168, 83, 0.7)',
    background: 'rgba(52, 168, 83, 0.1)'
  },
  consideration: {
    primary: '#fbbc04',
    secondary: 'rgba(251, 188, 4, 0.7)',
    background: 'rgba(251, 188, 4, 0.1)'
  },
  intent: {
    primary: '#ea4335',
    secondary: 'rgba(234, 67, 53, 0.7)',
    background: 'rgba(234, 67, 53, 0.1)'
  }
};

// Market colors for consistent representation
const marketColors = {
  'Armenia': '#4285f4',
  'Belgium': '#34a853',
  'Bahrain': '#fbbc04',
  'Canada': '#ea4335',
  'Netherlands': '#9c27b0',
  'Spain': '#00bcd4',
  'South Korea': '#ff9800',
  'Egypt': '#795548',
  'Kazakhstan': '#607d8b',
  'Oman': '#8bc34a',
  'Japan': '#3f51b5',
  'Poland': '#009688',
  'Qatar': '#ff5722',
  'Romania': '#673ab7',
  'Uzbekistan': '#e91e63'
};

/**
 * Initialize a chart based on its ID
 * @param {string} chartId - The ID of the canvas element
 */
function initializeChart(chartId) {
  console.log(`Initializing chart: ${chartId}`);
  
  try {
    // Get the canvas element
    const canvas = document.getElementById(chartId);
    
    if (!canvas) {
      console.error(`Canvas element not found: ${chartId}`);
      return;
    }
    
    // Mark the canvas as initialized to prevent duplicate initialization
    canvas.setAttribute('data-initialized', 'true');
    
    // Get the data
    const data = window.brandHealthData || parseCSVData('dummy_data');
    
    if (!data) {
      console.error(`No data available for chart: ${chartId}`);
      displayChartError(canvas, 'No data available');
      return;
    }
    
    console.log(`Creating chart with ID: ${chartId}`);
    
    // Create the appropriate chart based on the ID
    switch (chartId) {
      case 'market-comparison-chart':
        createMarketComparisonChart(chartId, data);
        break;
      case 'market-quadrant-chart':
        createMarketQuadrantChart(chartId, data);
        break;
      case 'awareness-trend-chart':
        createTrendChart(chartId, data, 'awareness');
        break;
      case 'familiarity-trend-chart':
        createTrendChart(chartId, data, 'familiarity');
        break;
      case 'consideration-trend-chart':
        createTrendChart(chartId, data, 'consideration');
        break;
      case 'intent-trend-chart':
        createTrendChart(chartId, data, 'intent');
        break;
      case 'awareness-market-chart':
        createMarketBarChart(chartId, data, 'awareness');
        break;
      case 'familiarity-market-chart':
        createMarketBarChart(chartId, data, 'familiarity');
        break;
      case 'consideration-market-chart':
        createMarketBarChart(chartId, data, 'consideration');
        break;
      case 'intent-market-chart':
        createMarketBarChart(chartId, data, 'intent');
        break;
      case 'awareness-comparison-chart':
        createComparisonChart(chartId, data, 'awareness');
        break;
      case 'familiarity-comparison-chart':
        createComparisonChart(chartId, data, 'familiarity');
        break;
      case 'consideration-comparison-chart':
        createComparisonChart(chartId, data, 'consideration');
        break;
      case 'intent-comparison-chart':
        createComparisonChart(chartId, data, 'intent');
        break;
      case 'projections-chart':
        createProjectionsChart(chartId, data);
        break;
      default:
        console.warn(`No chart initialization defined for chart ID: ${chartId}`);
    }
  
    console.log(`Chart initialized: ${chartId}`);
  } catch (error) {
    console.error(`Error initializing chart ${chartId}:`, error);
    
    // Try to get the canvas element again in case it wasn't found in the try block
    const canvas = document.getElementById(chartId);
    if (canvas) {
      displayChartError(canvas, `Error: ${error.message}`);
    }
  }
}

/**
 * Display an error message on a chart canvas
 * @param {HTMLElement} canvas - The canvas element
 * @param {string} message - The error message to display
 */
function displayChartError(canvas, message) {
  // Clear any existing chart
  if (canvas.chart) {
    canvas.chart.destroy();
  }
  
  // Create a container for the error message
  const container = canvas.parentElement;
  if (container) {
    // Add error styling to the container
    container.style.position = 'relative';
    
    // Create error overlay if it doesn't exist
    let errorOverlay = container.querySelector('.chart-error-overlay');
    if (!errorOverlay) {
      errorOverlay = document.createElement('div');
      errorOverlay.className = 'chart-error-overlay';
      errorOverlay.style.position = 'absolute';
      errorOverlay.style.top = '0';
      errorOverlay.style.left = '0';
      errorOverlay.style.width = '100%';
      errorOverlay.style.height = '100%';
      errorOverlay.style.display = 'flex';
      errorOverlay.style.flexDirection = 'column';
      errorOverlay.style.alignItems = 'center';
      errorOverlay.style.justifyContent = 'center';
      errorOverlay.style.backgroundColor = 'rgba(30, 30, 30, 0.9)';
      errorOverlay.style.color = '#ea4335';
      errorOverlay.style.padding = '20px';
      errorOverlay.style.boxSizing = 'border-box';
      errorOverlay.style.zIndex = '10';
      errorOverlay.style.borderRadius = 'var(--radius)';
      container.appendChild(errorOverlay);
    }
    
    // Update error message
    errorOverlay.innerHTML = `
      <div style="font-size: 24px; margin-bottom: 10px;">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div style="font-weight: bold; margin-bottom: 5px;">Chart Error</div>
      <div>${message}</div>
      <button id="retry-${canvas.id}" style="margin-top: 15px; padding: 8px 16px; background-color: var(--primary); color: white; border: none; border-radius: var(--radius-sm); cursor: pointer;">
        Retry
      </button>
    `;
    
    // Add retry button functionality
    const retryButton = document.getElementById(`retry-${canvas.id}`);
    if (retryButton) {
      retryButton.addEventListener('click', function() {
        errorOverlay.style.display = 'none';
        initializeChart(canvas.id);
      });
    }
  }
}

/**
 * Create a radar chart comparing all markets across all metrics
 * @param {string} chartId - The ID of the canvas element
 * @param {Object} data - The data object containing chart data
 */
function createMarketComparisonChart(chartId, data) {
  // First, clear any existing chart to prevent plugin inheritance
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const ctx = document.getElementById(chartId).getContext('2d');
  
  // Extract the latest data for each market and metric
  const markets = Object.keys(data.latestData || {});
  const metrics = ['Awareness', 'Familiarity', 'Consideration', 'Intent'];
  
  // Create datasets for each market
  const datasets = markets.map(market => {
    const marketData = [
      parseFloat(data.latestData?.[market]?.awareness || 0),
      parseFloat(data.latestData?.[market]?.familiarity || 0),
      parseFloat(data.latestData?.[market]?.consideration || 0),
      parseFloat(data.latestData?.[market]?.intent || 0)
    ];
    
    return {
      label: market,
      data: marketData,
      backgroundColor: `${marketColors[market]}33`,
      borderColor: marketColors[market],
      borderWidth: 2,
      pointBackgroundColor: marketColors[market],
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: marketColors[market],
      pointRadius: 4,
      pointHoverRadius: 6
    };
  });
  
  // Create the chart
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: metrics,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          pointLabels: {
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20,
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        quadrantLines: false, // Explicitly disable quadrant lines
        title: {
          display: true,
          text: 'Market Performance Comparison',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
        legend: {
          position: 'right',
          labels: {
            padding: 20,
            boxWidth: 12,
            boxHeight: 12
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Create a line chart showing the trend for a specific metric
 * @param {string} chartId - The ID of the canvas element
 * @param {Object} data - The data object containing chart data
 * @param {string} metric - The metric to display (awareness, familiarity, consideration, intent)
 */
function createTrendChart(chartId, data, metric) {
  // First, clear any existing chart to prevent plugin inheritance
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const ctx = document.getElementById(chartId).getContext('2d');
  const colorScheme = colorSchemes[metric];
  
  // Extract quarterly data for the metric
  const quarters = data.quarterlyData?.map(q => q.quarter) || [];
  const values = data.quarterlyData?.map(q => parseFloat(q[metric]) || 0) || [];
  
  // Create the chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: quarters,
      datasets: [
        {
          label: metric.charAt(0).toUpperCase() + metric.slice(1),
          data: values,
          backgroundColor: colorScheme.background,
          borderColor: colorScheme.primary,
          borderWidth: 3,
          pointBackgroundColor: colorScheme.primary,
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 7,
          fill: true,
          tension: 0.2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false
          }
        },
        y: {
          beginAtZero: false,
          suggestedMin: Math.max(0, Math.min(...values) - 10),
          suggestedMax: Math.min(100, Math.max(...values) + 10),
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        quadrantLines: false, // Explicitly disable quadrant lines
        title: {
          display: true,
          text: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Trend Over Time`,
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Create a bar chart showing the metric values for each market
 * @param {string} chartId - The ID of the canvas element
 * @param {Object} data - The data object containing chart data
 * @param {string} metric - The metric to display (awareness, familiarity, consideration, intent)
 */
function createMarketBarChart(chartId, data, metric) {
  // First, clear any existing chart to prevent plugin inheritance
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const ctx = document.getElementById(chartId).getContext('2d');
  const colorScheme = colorSchemes[metric];
  
  // Extract market data for the metric
  const markets = Object.keys(data.latestData || {});
  const values = markets.map(market => parseFloat(data.latestData?.[market]?.[metric] || 0));
  
  // Sort markets by value in descending order
  const sortedIndices = values.map((value, index) => index)
    .sort((a, b) => values[b] - values[a]);
  
  const sortedMarkets = sortedIndices.map(index => markets[index]);
  const sortedValues = sortedIndices.map(index => values[index]);
  const sortedColors = sortedMarkets.map(market => marketColors[market]);
  
  // Create the chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedMarkets,
      datasets: [
        {
          label: metric.charAt(0).toUpperCase() + metric.slice(1),
          data: sortedValues,
          backgroundColor: sortedColors,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      scales: {
        x: {
          beginAtZero: true,
          suggestedMax: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        y: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        quadrantLines: false, // Explicitly disable quadrant lines
        title: {
          display: true,
          text: `${metric.charAt(0).toUpperCase() + metric.slice(1)} by Market`,
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Create a bar chart comparing the metric against target, previous quarter, and previous year
 * @param {string} chartId - The ID of the canvas element
 * @param {Object} data - The data object containing chart data
 * @param {string} metric - The metric to display (awareness, familiarity, consideration, intent)
 */
function createComparisonChart(chartId, data, metric) {
  // First, clear any existing chart to prevent plugin inheritance
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const ctx = document.getElementById(chartId).getContext('2d');
  const colorScheme = colorSchemes[metric];
  
  // Extract comparison data
  const vsTarget = parseFloat(data.comparisons?.[metric]?.vsTarget || 0);
  const vsQ4 = parseFloat(data.comparisons?.[metric]?.vsQ4 || 0);
  const vsQ1LastYear = parseFloat(data.comparisons?.[metric]?.vsQ1LastYear || 0);
  
  // Determine colors based on positive/negative values
  const getColor = (value) => {
    return value >= 0 ? colorSchemes.familiarity.primary : colorSchemes.intent.primary;
  };
  
  // Create the chart
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['vs Q1 2025 Target', 'vs Q4 2024', 'vs Q1 2024'],
      datasets: [
        {
          label: 'Difference',
          data: [vsTarget, vsQ4, vsQ1LastYear],
          backgroundColor: [getColor(vsTarget), getColor(vsQ4), getColor(vsQ1LastYear)],
          borderColor: 'rgba(255, 255, 255, 0.2)',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        quadrantLines: false, // Explicitly disable quadrant lines
        title: {
          display: true,
          text: `${metric.charAt(0).toUpperCase() + metric.slice(1)} Comparisons`,
          font: {
            size: 16,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 20
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const value = context.raw;
              const sign = value >= 0 ? '+' : '';
              return `${sign}${value}%`;
            }
          }
        }
      }
    }
  });
}

/**
 * Create a line chart showing historical trends and targets for all metrics
 * @param {string} chartId - The ID of the canvas element
 * @param {Object} data - The data object containing chart data
 */
function createProjectionsChart(chartId, data) {
  // First, clear any existing chart to prevent plugin inheritance
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const ctx = document.getElementById(chartId).getContext('2d');
  
  // Extract historical data from quarterlyData
  const historicalQuarters = data.quarterlyData?.map(q => q.quarter) || [];
  const historicalAwareness = data.quarterlyData?.map(q => parseFloat(q.awareness) || 0) || [];
  const historicalFamiliarity = data.quarterlyData?.map(q => parseFloat(q.familiarity) || 0) || [];
  const historicalConsideration = data.quarterlyData?.map(q => parseFloat(q.consideration) || 0) || [];
  const historicalIntent = data.quarterlyData?.map(q => parseFloat(q.intent) || 0) || [];
  
  // Extract target data
  const targetYears = data.projections?.years || [];
  const targetAwareness = data.projections?.awareness || [];
  const targetFamiliarity = data.projections?.familiarity || [];
  const targetConsideration = data.projections?.consideration || [];
  const targetIntent = data.projections?.intent || [];
  
  // Combine labels for x-axis (historical quarters + target years)
  const combinedLabels = [...historicalQuarters, ...targetYears];
  
  // Create the chart
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: combinedLabels,
      datasets: [
        // Historical Awareness (solid line)
        {
          label: 'Awareness (Historical)',
          data: [...historicalAwareness, ...Array(targetYears.length).fill(null)],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.awareness.primary,
          borderWidth: 3,
          pointBackgroundColor: colorSchemes.awareness.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Target Awareness (dotted line)
        {
          label: 'Awareness (Target)',
          data: [...Array(historicalQuarters.length).fill(null), ...targetAwareness],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.awareness.primary,
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: colorSchemes.awareness.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Historical Familiarity (solid line)
        {
          label: 'Familiarity (Historical)',
          data: [...historicalFamiliarity, ...Array(targetYears.length).fill(null)],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.familiarity.primary,
          borderWidth: 3,
          pointBackgroundColor: colorSchemes.familiarity.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Target Familiarity (dotted line)
        {
          label: 'Familiarity (Target)',
          data: [...Array(historicalQuarters.length).fill(null), ...targetFamiliarity],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.familiarity.primary,
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: colorSchemes.familiarity.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Historical Consideration (solid line)
        {
          label: 'Consideration (Historical)',
          data: [...historicalConsideration, ...Array(targetYears.length).fill(null)],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.consideration.primary,
          borderWidth: 3,
          pointBackgroundColor: colorSchemes.consideration.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Target Consideration (dotted line)
        {
          label: 'Consideration (Target)',
          data: [...Array(historicalQuarters.length).fill(null), ...targetConsideration],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.consideration.primary,
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: colorSchemes.consideration.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Historical Intent (solid line)
        {
          label: 'Intent (Historical)',
          data: [...historicalIntent, ...Array(targetYears.length).fill(null)],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.intent.primary,
          borderWidth: 3,
          pointBackgroundColor: colorSchemes.intent.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        },
        // Target Intent (dotted line)
        {
          label: 'Intent (Target)',
          data: [...Array(historicalQuarters.length).fill(null), ...targetIntent],
          backgroundColor: 'transparent',
          borderColor: colorSchemes.intent.primary,
          borderWidth: 2,
          borderDash: [5, 5],
          pointBackgroundColor: colorSchemes.intent.primary,
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
          tension: 0.1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      plugins: {
        quadrantLines: false, // Explicitly disable quadrant lines
        title: {
          display: true,
          text: 'Brand Health Metrics: Historical Trends & Targets',
          font: {
            size: 18,
            weight: 'bold'
          },
          padding: {
            top: 10,
            bottom: 30
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.dataset.label}: ${context.raw}%`;
            }
          }
        },
        legend: {
          labels: {
            usePointStyle: true,
            generateLabels: function(chart) {
              const originalLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
              
              // Customize legend to show only 4 items (one for each metric)
              const customLabels = [];
              const metrics = ['Awareness', 'Familiarity', 'Consideration', 'Intent'];
              
              metrics.forEach((metric, index) => {
                // Use the first dataset for each metric
                const datasetIndex = index * 2;
                if (originalLabels[datasetIndex]) {
                  const label = originalLabels[datasetIndex];
                  label.text = metric; // Remove the "(Historical)" suffix
                  
                  // Add a custom fillStyle to indicate both historical and projected
                  label.lineDash = [0, 0]; // Solid line for historical
                  
                  customLabels.push(label);
                }
              });
              
              return customLabels;
            }
          }
        }
      }
    }
  });
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
    if (canvas.id && typeof initializeChart === 'function') {
      initializeChart(canvas.id);
    }
  });
}

/**
 * Initialize lazy-loaded charts
 */
function initializeLazyCharts() {
  console.log('Initializing lazy-loaded charts...');
  
  // Get all lazy-loaded chart canvases
  const lazyCharts = document.querySelectorAll('canvas[data-lazy="true"]');
  
  // Initialize each lazy-loaded chart
  lazyCharts.forEach(canvas => {
    if (canvas.id && !canvas.getAttribute('data-initialized') && typeof initializeChart === 'function') {
      console.log(`Initializing lazy chart: ${canvas.id}`);
      canvas.setAttribute('data-initialized', 'true');
      initializeChart(canvas.id);
    }
  });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing charts...');
  initializeVisibleCharts();
  
  // Initialize lazy-loaded charts when they become visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.target.tagName === 'CANVAS' && entry.target.getAttribute('data-lazy') === 'true') {
        const canvas = entry.target;
        if (!canvas.getAttribute('data-initialized') && typeof initializeChart === 'function') {
          console.log(`Lazy chart visible, initializing: ${canvas.id}`);
          canvas.setAttribute('data-initialized', 'true');
          initializeChart(canvas.id);
        }
        observer.unobserve(canvas);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe all lazy-loaded charts
  document.querySelectorAll('canvas[data-lazy="true"]').forEach(canvas => {
    observer.observe(canvas);
  });
  
  // Add a fallback for charts that might not be observed
  setTimeout(initializeLazyCharts, 2000);
});

// Make the initializeChart function globally available
window.initializeChart = initializeChart;
