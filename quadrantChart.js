/**
 * Create a quadrant chart showing markets by performance and growth
 * @param {string} chartId - The ID of the canvas element
 * @param {Object} data - The data object containing chart data
 */
function createMarketQuadrantChart(chartId, data) {
  console.log('Creating market quadrant chart with enhanced debugging...');
  
  // Validate input data
  if (!data || !data.latestData || Object.keys(data.latestData).length === 0) {
    console.error('Invalid or empty data provided for quadrant chart');
    return;
  }
  
  // Validate canvas element
  const canvas = document.getElementById(chartId);
  if (!canvas) {
    console.error(`Canvas element with ID "${chartId}" not found`);
    return;
  }
  
  // Check visibility
  const section = canvas.closest('.section-content');
  if (section && section.classList.contains('collapsed')) {
    console.warn('Quadrant chart section is collapsed, chart may not render properly');
  }
  
  // Clear existing chart
  const existingChart = Chart.getChart(chartId);
  if (existingChart) {
    console.log('Destroying existing chart instance');
    existingChart.destroy();
  }
  
  const ctx = canvas.getContext('2d');
  
  // Extract and validate market data with detailed logging
  const markets = Object.keys(data.latestData || {});
  console.log(`Found ${markets.length} markets for quadrant chart:`, markets);
  
  // Log the raw data for debugging
  console.log('Raw data for quadrant chart:', data);
  
  // Calculate performance and growth with validation
  const quadrantData = markets.map(market => {
    // Get metrics with validation
    const awareness = parseFloat(data.latestData?.[market]?.awareness || 0);
    const consideration = parseFloat(data.latestData?.[market]?.consideration || 0);
    const intent = parseFloat(data.latestData?.[market]?.intent || 0);
    
    if (isNaN(awareness) || isNaN(consideration) || isNaN(intent)) {
      console.warn(`Invalid metrics for market ${market}:`, 
        { awareness, consideration, intent });
    }
    
    const performance = (awareness + consideration + intent) / 3;
    
    const awarenessGrowth = parseFloat(data.markets?.[market]?.awarenessGrowth || 1.5);
    const considerationGrowth = parseFloat(data.markets?.[market]?.considerationGrowth || 1.0);
    const intentGrowth = parseFloat(data.markets?.[market]?.intentGrowth || 1.2);
    
    if (isNaN(awarenessGrowth) || isNaN(considerationGrowth) || isNaN(intentGrowth)) {
      console.warn(`Invalid growth metrics for market ${market}:`, 
        { awarenessGrowth, considerationGrowth, intentGrowth });
    }
    
    const growth = (awarenessGrowth + considerationGrowth + intentGrowth) / 3;
    
    console.log(`Market: ${market}, Performance: ${performance.toFixed(2)}%, Growth: ${growth.toFixed(2)}%`);
    
    // Special detailed logging for key markets
    if (market === 'Bahrain' || market === 'Qatar' || market === 'Oman') {
      console.log(`${market.toUpperCase()} DETAILS:`);
      console.log(`  Awareness: ${awareness}, Consideration: ${consideration}, Intent: ${intent}`);
      console.log(`  Performance: ${performance.toFixed(2)}%`);
      console.log(`  Awareness Growth: ${awarenessGrowth}, Consideration Growth: ${considerationGrowth}, Intent Growth: ${intentGrowth}`);
      console.log(`  Growth: ${growth.toFixed(2)}%`);
    }
    
    return {
      market,
      x: performance, // Performance on x-axis
      y: growth,      // Growth on y-axis
      color: marketColors[market],
      // Store raw values for debugging
      raw: {
        awareness, consideration, intent,
        awarenessGrowth, considerationGrowth, intentGrowth
      }
    };
  });
  
  // Log the entire dataset for inspection
  console.log('Complete quadrant data:', quadrantData);
  
  // Extract performance and growth values for calculations
  let performanceValues = quadrantData.map(item => item.x);
  let growthValues = quadrantData.map(item => item.y);
  
  // Calculate dynamic midpoints based on the means of the dataset
  // This ensures the quadrants reflect the actual central tendencies of the data
  const performanceMidpoint = performanceValues.reduce((sum, value) => sum + value, 0) / performanceValues.length;
  const growthMidpoint = growthValues.reduce((sum, value) => sum + value, 0) / growthValues.length;
  
  console.log('Using dynamic midpoints based on dataset means:', { 
    performanceMidpoint: performanceMidpoint.toFixed(2), 
    growthMidpoint: growthMidpoint.toFixed(2) 
  });
  
  // Log the calculated midpoints that will determine market positions
  console.log('CALCULATED MIDPOINTS FOR MARKET CLASSIFICATION:');
  console.log(`Performance Midpoint: ${performanceMidpoint.toFixed(2)}% (Mean of all markets)`);
  console.log(`Growth Midpoint: ${growthMidpoint.toFixed(2)}% (Mean of all markets)`);
  
  console.log('FINAL MIDPOINTS:', { 
    performanceMidpoint, 
    growthMidpoint, 
    performanceMidpointDescription: `Performance midpoint: ${performanceMidpoint.toFixed(2)}%`,
    growthMidpointDescription: `Growth midpoint: ${growthMidpoint.toFixed(2)}%`
  });
  
  // Update the midpoint values in the external info box
  const performanceMidpointElement = document.getElementById('performance-midpoint');
  const growthMidpointElement = document.getElementById('growth-midpoint');
  
  if (performanceMidpointElement) {
    performanceMidpointElement.textContent = `Mean Performance: ${performanceMidpoint.toFixed(1)}%`;
  }
  
  if (growthMidpointElement) {
    growthMidpointElement.textContent = `Mean Growth: ${growthMidpoint.toFixed(1)}%`;
  }
  
  // Classify markets with validation
  try {
    const stars = quadrantData.filter(item => item.y >= growthMidpoint && item.x >= performanceMidpoint)
      .map(item => item.market);
    const questionMarks = quadrantData.filter(item => item.y >= growthMidpoint && item.x < performanceMidpoint)
      .map(item => item.market);
    const cashCows = quadrantData.filter(item => item.y < growthMidpoint && item.x >= performanceMidpoint)
      .map(item => item.market);
    const dogs = quadrantData.filter(item => item.y < growthMidpoint && item.x < performanceMidpoint)
      .map(item => item.market);
    
    console.log('QUADRANT CLASSIFICATION:');
    console.log(`Stars (Leading Markets): ${stars.join(', ') || 'None'}`);
    console.log(`Question Marks (Growth Opportunities): ${questionMarks.join(', ') || 'None'}`);
    console.log(`Cash Cows (Stable Performers): ${cashCows.join(', ') || 'None'}`);
    console.log(`Dogs (Underperforming Markets): ${dogs.join(', ') || 'None'}`);
    
    // Verify all markets are classified
    const classifiedMarkets = [...stars, ...questionMarks, ...cashCows, ...dogs];
    const missingMarkets = markets.filter(m => !classifiedMarkets.includes(m));
    if (missingMarkets.length > 0) {
      console.error('Some markets were not classified:', missingMarkets);
    }
    
    // Detailed check for all markets
    console.log('DETAILED MARKET CLASSIFICATIONS:');
    markets.forEach(market => {
      const marketData = quadrantData.find(item => item.market === market);
      if (marketData) {
        const quadrantName = marketData.x >= performanceMidpoint ? 
          (marketData.y >= growthMidpoint ? 'Leading Market' : 'Stable Performer') : 
          (marketData.y >= growthMidpoint ? 'Growth Opportunity' : 'Underperforming Market');
        
        console.log(`${market}:`);
        console.log(`  Performance: ${marketData.x.toFixed(2)}% ${marketData.x >= performanceMidpoint ? '≥' : '<'} ${performanceMidpoint.toFixed(2)}% (Midpoint)`);
        console.log(`  Growth: ${marketData.y.toFixed(2)}% ${marketData.y >= growthMidpoint ? '≥' : '<'} ${growthMidpoint.toFixed(2)}% (Midpoint)`);
        console.log(`  Classification: ${quadrantName}`);
      }
    });
    
    // Update the market lists in the HTML
    setTimeout(() => {
      try {
        // Update the market lists in the HTML
        const starMarketsElement = document.getElementById('star-markets');
        const questionMarketsElement = document.getElementById('question-markets');
        const cashCowMarketsElement = document.getElementById('cashcow-markets');
        const dogMarketsElement = document.getElementById('dog-markets');
        
        if (starMarketsElement) starMarketsElement.textContent = stars.join(', ') || 'None';
        if (questionMarketsElement) questionMarketsElement.textContent = questionMarks.join(', ') || 'None';
        if (cashCowMarketsElement) cashCowMarketsElement.textContent = cashCows.join(', ') || 'None';
        if (dogMarketsElement) dogMarketsElement.textContent = dogs.join(', ') || 'None';
        
        console.log('Updated market lists in HTML');
      } catch (error) {
        console.error('Error updating market lists:', error);
      }
    }, 500); // Delay to ensure the DOM is ready
  } catch (error) {
    console.error('Error classifying markets:', error);
  }
  
  // Define the quadrant background and lines plugins locally for this chart only
  const quadrantBackgroundPlugin = {
    id: 'quadrantBackground',
    beforeDraw: function(chart) {
      // Only apply to this specific chart
      if (chart.canvas.id !== chartId) return;
      
      const ctx = chart.ctx;
      const xAxis = chart.scales.x;
      const yAxis = chart.scales.y;
      const chartArea = chart.chartArea;
      
      // Check if scales are defined
      if (!xAxis || !yAxis || !xAxis.max || !yAxis.max) {
        console.log('Scales not fully initialized yet, skipping quadrant background');
        return;
      }
      
      // Get the pixel positions for the midpoints
      const xMid = xAxis.getPixelForValue(performanceMidpoint);
      const yMid = yAxis.getPixelForValue(growthMidpoint);
      
      // Draw the quadrant backgrounds
      ctx.save();
      
      // Top-right quadrant (Leading Markets) - Green
      ctx.fillStyle = 'rgba(76, 175, 80, 0.1)';
      ctx.fillRect(xMid, chartArea.top, chartArea.right - xMid, yMid - chartArea.top);
      
      // Top-left quadrant (Growth Opportunities) - Blue
      ctx.fillStyle = 'rgba(33, 150, 243, 0.1)';
      ctx.fillRect(chartArea.left, chartArea.top, xMid - chartArea.left, yMid - chartArea.top);
      
      // Bottom-right quadrant (Stable Performers) - Yellow
      ctx.fillStyle = 'rgba(255, 193, 7, 0.1)';
      ctx.fillRect(xMid, yMid, chartArea.right - xMid, chartArea.bottom - yMid);
      
      // Bottom-left quadrant (Underperforming Markets) - Red
      ctx.fillStyle = 'rgba(244, 67, 54, 0.1)';
      ctx.fillRect(chartArea.left, yMid, xMid - chartArea.left, chartArea.bottom - yMid);
      
      ctx.restore();
    }
  };
  
  const quadrantLinesPlugin = {
    id: 'quadrantLines',
    beforeDraw: function(chart) {
      // Only apply to this specific chart
      if (chart.canvas.id !== chartId) return;
      
      const ctx = chart.ctx;
      const xAxis = chart.scales.x;
      const yAxis = chart.scales.y;
      const chartArea = chart.chartArea;
      
      // Check if scales are defined
      if (!xAxis || !yAxis || !xAxis.max || !yAxis.max) {
        console.log('Scales not fully initialized yet, skipping quadrant lines');
        return;
      }
      
      // Draw the quadrant lines with more prominence
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // More visible lines
      ctx.lineWidth = 2; // Thicker lines
      ctx.setLineDash([5, 5]);
      
      // Vertical line at Performance midpoint
      ctx.beginPath();
      ctx.moveTo(xAxis.getPixelForValue(performanceMidpoint), chartArea.top);
      ctx.lineTo(xAxis.getPixelForValue(performanceMidpoint), chartArea.bottom);
      ctx.stroke();
      
      // Horizontal line at Growth midpoint
      ctx.beginPath();
      ctx.moveTo(chartArea.left, yAxis.getPixelForValue(growthMidpoint));
      ctx.lineTo(chartArea.right, yAxis.getPixelForValue(growthMidpoint));
      ctx.stroke();
      
      // Quadrant labels removed to prevent overlap with market data points
      // The quadrant explanations are available in the HTML below the chart
      // Midpoint values are now displayed in an external element outside the chart
      
      // Add market labels directly on the chart points
      ctx.textAlign = 'center';
      ctx.font = 'bold 12px Inter';
      
      // Get the dataset from the chart
      const dataset = chart.data.datasets[0];
      
      // Group markets by quadrant for better label positioning
      // Create arrays for each quadrant
      const topRight = []; // High growth, high performance
      const topLeft = [];  // High growth, low performance
      const bottomRight = []; // Low growth, high performance
      const bottomLeft = []; // Low growth, low performance
      
      dataset.data.forEach((point, index) => {
        const market = quadrantData[index].market;
        const x = xAxis.getPixelForValue(point.x);
        const y = yAxis.getPixelForValue(point.y);
        
        // Group by quadrant
        if (point.y >= growthMidpoint && point.x >= performanceMidpoint) {
          topRight.push({ market, x, y, index });
        } else if (point.y >= growthMidpoint && point.x < performanceMidpoint) {
          topLeft.push({ market, x, y, index });
        } else if (point.y < growthMidpoint && point.x >= performanceMidpoint) {
          bottomRight.push({ market, x, y, index });
        } else {
          bottomLeft.push({ market, x, y, index });
        }
      });
      
      // Define problematic markets that need special handling
      const problematicMarkets = ['South Korea', 'Romania', 'Belgium', 'Japan', 'Egypt', 'Oman'];
      
      // Enhanced function to draw labels with improved positioning and connecting lines
      const drawLabels = (points, baseOffsetX, baseOffsetY) => {
        points.forEach((point, i) => {
          const market = point.market;
          const marketNameLength = market.length;
          
          // Calculate offsets based on market name length and position
          let offsetX = baseOffsetX;
          let offsetY = baseOffsetY;
          
          // Special handling for problematic markets
          if (problematicMarkets.includes(market)) {
            // Adjust offsets for specific markets
            if (market === 'South Korea') {
              offsetX = 0;
              offsetY = 25; // Position below the point
            } else if (market === 'Romania') {
              offsetX = -25;
              offsetY = 15; // Position to the left and below
            } else if (market === 'Belgium') {
              offsetX = 25;
              offsetY = 15; // Position to the right and below
            } else if (market === 'Japan') {
              offsetX = -25;
              offsetY = -15; // Position to the left and above
            } else if (market === 'Egypt') {
              offsetX = 25;
              offsetY = -15; // Position to the right and above
            } else if (market === 'Oman') {
              offsetX = 0;
              offsetY = -25; // Position above the point
            }
          } else {
            // For other markets, add more variation based on index and name length
            const variationX = ((i % 5) - 2) * 10;
            const variationY = ((Math.floor(i / 5) % 5) - 2) * 10;
            
            // Adjust offset based on name length
            if (marketNameLength > 10) {
              // Longer names need more space
              offsetX = offsetX * 1.5;
              offsetY = offsetY * 1.5;
            }
            
            offsetX += variationX;
            offsetY += variationY;
          }
          
          // Ensure labels stay within chart area with more padding
          const x = Math.max(chartArea.left + 20, 
                    Math.min(chartArea.right - 20, 
                    point.x + offsetX));
          const y = Math.max(chartArea.top + 20, 
                    Math.min(chartArea.bottom - 20, 
                    point.y + offsetY));
          
          // Draw connecting line between point and label
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 2]);
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(x, y);
          ctx.stroke();
          
          // Draw text background for better readability
          const textWidth = ctx.measureText(market).width;
          ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
          ctx.fillRect(x - textWidth/2 - 4, y - 8, textWidth + 8, 16);
          
          // Draw text
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.lineWidth = 3;
          ctx.textAlign = 'center';
          ctx.setLineDash([]);
          ctx.strokeText(market, x, y);
          
          ctx.fillStyle = 'white';
          ctx.fillText(market, x, y);
        });
      };
      
      // Draw labels with different base offsets for each quadrant
      ctx.font = 'bold 12px Inter';
      drawLabels(topRight, 30, -30);     // Top-right: offset to the right and up
      drawLabels(topLeft, -30, -30);     // Top-left: offset to the left and up
      drawLabels(bottomRight, 30, 30);   // Bottom-right: offset to the right and down
      drawLabels(bottomLeft, -30, 30);   // Bottom-left: offset to the left and down
      
      ctx.restore();
    }
  };
  
  // Calculate dynamic scale ranges based on data (reusing the values arrays)
  
  // Calculate min and max with padding, rounded to 1 decimal place
  const xMin = Math.round(Math.max(0, Math.min(...performanceValues) - 5) * 10) / 10;
  const xMax = Math.round(Math.min(100, Math.max(...performanceValues) + 5) * 10) / 10;
  const yMin = Math.round(Math.max(-2, Math.min(...growthValues) - 0.5) * 10) / 10;
  const yMax = Math.round(Math.min(10, Math.max(...growthValues) + 0.5) * 10) / 10;
  
  console.log('Dynamic scale ranges:', {
    performance: { min: xMin, max: xMax },
    growth: { min: yMin, max: yMax }
  });
  
  // Log any potential outliers
  quadrantData.forEach(item => {
    if (item.x < xMin || item.x > xMax || item.y < yMin || item.y > yMax) {
      console.warn(`Potential outlier detected for market ${item.market}:`, item);
    }
  });
  
  // Create the scatter chart with the local plugin
  const chart = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Markets',
        data: quadrantData.map(item => ({
          x: item.x,
          y: item.y,
          // Add market name as a property to use in plugins
          market: item.market
        })),
        backgroundColor: quadrantData.map(item => item.color),
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        pointRadius: 8,
        pointHoverRadius: 10
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 40,
          bottom: 40,
          left: 40,
          right: 40
        }
      },
      scales: {
        x: {
          min: xMin,  // Dynamically calculated minimum
          max: xMax,  // Dynamically calculated maximum
          title: {
            display: true,
            text: 'Performance %',
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            zeroLineColor: 'rgba(255, 255, 255, 0.3)'
          },
          ticks: {
            callback: function(value) {
              return value.toFixed(1) + '%';
            }
          }
        },
        y: {
          min: yMin,  // Dynamically calculated minimum
          max: yMax,  // Dynamically calculated maximum
          title: {
            display: true,
            text: 'YoY Growth %',
            color: 'rgba(255, 255, 255, 0.7)',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
            zeroLineColor: 'rgba(255, 255, 255, 0.3)'
          },
          ticks: {
            callback: function(value) {
              return value.toFixed(1) + '%';
            }
          }
        }
      },
      plugins: {
        quadrantLines: true, // Enable only for this chart
        title: {
          display: true,
          text: 'Market Performance & Growth Analysis (Mean-Based Quadrants)',
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
          display: false // Hide the legend as it's not necessary with the quadrant backgrounds
        },
        tooltip: {
          callbacks: {
            title: function(context) {
              return context[0].raw.market;
            },
            label: function(context) {
              const performance = context.parsed.x.toFixed(1);
              const growth = context.parsed.y.toFixed(1);
              
              // Determine quadrant
              const quadrantName = context.parsed.x >= performanceMidpoint ? 
                (context.parsed.y >= growthMidpoint ? 'Leading Market' : 'Stable Performer') : 
                (context.parsed.y >= growthMidpoint ? 'Growth Opportunity' : 'Underperforming Market');
              
              // Format comparison to midpoints
              const perfComparison = context.parsed.x >= performanceMidpoint ? 
                `${(context.parsed.x - performanceMidpoint).toFixed(1)}% above mean` : 
                `${(performanceMidpoint - context.parsed.x).toFixed(1)}% below mean`;
                
              const growthComparison = context.parsed.y >= growthMidpoint ? 
                `${(context.parsed.y - growthMidpoint).toFixed(1)}% above mean` : 
                `${(growthMidpoint - context.parsed.y).toFixed(1)}% below mean`;
              
              return [
                `Performance: ${performance}% (${perfComparison})`,
                `Growth: ${growth}% (${growthComparison})`,
                `Classification: ${quadrantName}`,
                `Mean Performance: ${performanceMidpoint.toFixed(1)}%`,
                `Mean Growth: ${growthMidpoint.toFixed(1)}%`
              ];
            }
          },
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          padding: 12,
          titleFont: {
            weight: 'bold',
            size: 14
          },
          bodyFont: {
            size: 12
          },
          cornerRadius: 6,
          displayColors: false
        },
        // Remove datalabels plugin reference as it might not be properly registered
        datalabels: {
          display: false
        }
      }
    },
    plugins: [quadrantBackgroundPlugin, quadrantLinesPlugin] // Apply plugins locally to this chart only
  });
}
