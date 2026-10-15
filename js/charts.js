/* ==========================================================================
   CHARTS.JS - Academic Performance Graph Setup (Chart.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('academicChart');
    if (!ctx) return;

    // --- Chart Data Definition ---
    const semData = {
        labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'],
        sgpa: [6.9, 7.1, 7.5, 7.9]
    };

    let activeChartType = 'line'; // Default type
    let academicChart = null;

    // --- Chart Configuration Options Generator ---
    const getChartConfig = (type) => {
        const isLine = type === 'line';
        
        // Define Gradient Fill for Line Chart
        let gradientFill = null;
        const canvasCtx = ctx.getContext('2d');
        if (canvasCtx) {
            gradientFill = canvasCtx.createLinearGradient(0, 0, 0, 300);
            gradientFill.addColorStop(0, 'rgba(0, 229, 255, 0.35)');
            gradientFill.addColorStop(1, 'rgba(0, 229, 255, 0.0)');
        }

        const data = {
            labels: semData.labels,
            datasets: [{
                label: 'SGPA',
                data: semData.sgpa,
                backgroundColor: isLine ? (gradientFill || 'rgba(0, 229, 255, 0.15)') : 'rgba(0, 229, 255, 0.65)',
                borderColor: '#051415',
                borderWidth: isLine ? 3 : 1,
                fill: isLine,
                tension: 0.45, // Curve smoothness for line
                pointBackgroundColor: '#051e1e',
                pointBorderColor: '#050B13',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointHoverBackgroundColor: '#00E5FF',
                pointHoverBorderColor: '#FFFFFF',
                pointHoverBorderWidth: 2,
                borderRadius: isLine ? 0 : 6, // Rounded bars
                borderSkipped: false
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },
            plugins: {
                legend: {
                    display: false // Clean look, no labels legend
                },
                tooltip: {
                    backgroundColor: '#101A27',
                    titleColor: '#00E5FF',
                    titleFont: {
                        family: 'Outfit',
                        weight: 'bold',
                        size: 13
                    },
                    bodyColor: '#FFFFFF',
                    bodyFont: {
                        family: 'Outfit',
                        size: 14
                    },
                    borderColor: 'rgba(0, 229, 255, 0.25)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `SGPA: ${context.parsed.y}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 229, 255, 0.05)',
                        borderColor: 'rgba(0, 229, 255, 0.1)'
                    },
                    ticks: {
                        color: '#A8B2C1',
                        font: {
                            family: 'Outfit',
                            size: 12,
                            weight: '500'
                        }
                    }
                },
                y: {
                    min: 5.5,
                    max: 8.5,
                    grid: {
                        color: 'rgba(0, 229, 255, 0.05)',
                        borderColor: 'rgba(0, 229, 255, 0.1)'
                    },
                    ticks: {
                        stepSize: 0.5,
                        color: '#A8B2C1',
                        font: {
                            family: 'Outfit',
                            size: 12,
                            weight: '500'
                        }
                    }
                }
            }
        };

        return {
            type: type,
            data: data,
            options: options
        };
    };

    // --- Init Chart ---
    const initChart = (type) => {
        if (academicChart) {
            academicChart.destroy();
        }
        const config = getChartConfig(type);
        academicChart = new Chart(ctx, config);
    };

    initChart(activeChartType);

    // --- Toggle Chart Type Action ---
    const toggleLine = document.getElementById('toggle-line');
    const toggleBar = document.getElementById('toggle-bar');

    if (toggleLine && toggleBar) {
        toggleLine.addEventListener('click', () => {
            if (activeChartType === 'line') return;
            activeChartType = 'line';
            toggleLine.classList.add('active');
            toggleBar.classList.remove('active');
            initChart(activeChartType);
        });

        toggleBar.addEventListener('click', () => {
            if (activeChartType === 'bar') return;
            activeChartType = 'bar';
            toggleBar.classList.add('active');
            toggleLine.classList.remove('active');
            initChart(activeChartType);
        });
    }
});
