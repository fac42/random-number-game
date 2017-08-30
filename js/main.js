// Only load JS after everything else (HTML/CSS) has loaded
window.onload = function() {
    // Variables for random number generator game
    var myGame = document.getElementById('myGame');
    var ctx1 = myGame.getContext('2d');
    var ctx2 = document.getElementById('myChart').getContext('2d');
    var randomNumber1, randomNumber2;
    var correctCount = 0;
    var incorrectCount = 0;
    
    function chartUpdate () {
    // Chart Options
    Chart.defaults.global.defaultFontFamily = 'Roboto';
    Chart.defaults.global.defaultColor = '#F5F5F5'
     // Variables for Chart
        // Dataset variable
        var data = {
            datasets: [{
                data: [correctCount, incorrectCount],
                backgroundColor: [
                '#66bb6a', '#ef5350'
            ]
            }],
            labels: [
                'Correct: ' + correctCount,
                'Incorrect: ' + incorrectCount
            ],
        };
        // Chart options variable
        var options = {
            title: {
                display: true,
                text: 'Number of Correct vs. Incorrect Responses',
                fontColor: '#F5F5F5'
            },
            legend: {
                display: true,
                labels: {
                    fontColor: '#F5F5F5'
                },
                position: 'bottom'
            }
        };
        // Main chart variable
        var pieChart = new Chart(ctx2, {
            type: 'doughnut',
            data: data,
            options: options
        });  
        // Update the chart data
        pieChart.update();
    }
    
    // Function that generates the two random numbers, and draws them on the canvas
    // at the pre-assigned coordinates
    function createNumber () {
        randomNumber1 = Math.floor((Math.random())*100);
        randomNumber2 = Math.floor((Math.random())*100);
        // Generate a new number in case random number 1 and 2 are equal in value
        if (randomNumber1 == randomNumber2) {
            randomNumber1 = Math.floor((Math.random())*100);
            randomNumber2 = Math.floor((Math.random())*100);
        }
        ctx1.fillStyle = "#F5F5F5";
        ctx1.font = '20px Roboto';
        ctx1.fillText('Which number is larger?',190,50);
        ctx1.font = '50px Roboto';
        ctx1.fillText(randomNumber1,175,250);
        ctx1.fillText(randomNumber2,375,250);
    }
    
    // Function to clear canvas rectangles
    function clearRect () {
        ctx1.clearRect(0,0,myGame.width,myGame.height);
    }
    
    // Run functions to display the intitial content on both canvases
    createNumber();
    chartUpdate();
    
    // Function to detect and evaluate keystrokes
    // chartUpdate() fuction is run after every correct or incorrect keystroke (but not for invalid ones)
    document.onkeydown = function (e) {
    if (e.keyCode == 37 && randomNumber1 > randomNumber2) {
        clearRect();
        correctCount++;
        createNumber();
        console.log(e);
        }
        else if (e.keyCode == 37 && randomNumber1 < randomNumber2) {
        clearRect();
        incorrectCount++;
        createNumber();
        console.log(e);
        }
        else if (e.keyCode == 39 && randomNumber2 > randomNumber1) {
        clearRect();
        correctCount++;
        createNumber();
        console.log(e);
        }
        else if (e.keyCode == 39 && randomNumber2 < randomNumber1) {
        clearRect();
        incorrectCount++;
        createNumber();
        console.log(e);
        }
        chartUpdate();
    }
}