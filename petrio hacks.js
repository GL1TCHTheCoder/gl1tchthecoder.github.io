(function(){
    var css = `
        .hack-menu {
            position: fixed;
            left: 2%;
            top: 5%;
            height: 80%;
            width: 25%;
            font-size: 20px;
            border: solid white 4px;
            background-color: black;
            z-index: 9999;
        }
        
        .hack-menu-header {
            background-color: #8B0000;
            color: white;
            padding: 10px;
            cursor: move;
        }
        
        .hack-menu-content {
            padding: 10px;
            overflow-y: auto;
            height: calc(100% - 40px);
        }
        
        .hack-tab {
            display: none;
        }
        
        .hack-tab.active {
            display: block;
        }
    `;
    
    var style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));
    document.head.appendChild(style);
    
    var html = `
        <div class="hack-menu" id="hackMenu">
            <div class="hack-menu-header">HACK MENU</div>
            <div class="hack-menu-content">
                <button class="hack-tab-btn" data-tab="tabEditSave">Edit Save Data</button>
                <button class="hack-tab-btn" data-tab="tabChangeStats">Change Stats</button>
                <button class="hack-tab-btn" data-tab="tabCustomizeTheme">Customize Theme</button>
                
                <div class="hack-tab active" id="tabEditSave">
                    <h2>Edit Save Data</h2>
                    <button onclick="save()">Save Game</button>
                    <button onclick="load()">Load Game</button>
                </div>
                
                <div class="hack-tab" id="tabChangeStats">
                    <h2>Change Stats</h2>
                    <p>Edit stats:</p>
                    <input type="number" id="linesInput" placeholder="Lines">
                    <input type="number" id="scoreInput" placeholder="Score">
                    <button onclick="changeStats()">Apply Changes</button>
                </div>
                
                <div class="hack-tab" id="tabCustomizeTheme">
                    <h2>Customize Theme</h2>
                    <label for="backgroundColor">Background Color:</label>
                    <input type="color" id="backgroundColor">
                    <label for="fontColor">Font Color:</label>
                    <input type="color" id="fontColor">
                    <button onclick="customizeTheme()">Apply Changes</button>
                </div>
            </div>
        </div>
    `;
    
    var menu = document.createElement('div');
    menu.innerHTML = html;
    document.body.appendChild(menu);

    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    document.head.appendChild(script);

    script.onload = function() {
        var script2 = document.createElement('script');
        script2.src = 'https://code.jquery.com/ui/1.12.1/jquery-ui.min.js';
        document.head.appendChild(script2);

        script2.onload = function() {
            var script3 = document.createElement('script');
            script3.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js';
            document.head.appendChild(script3);
        };
    };

    window.save = function() {
        localStorage.setItem('tetrisGameState', JSON.stringify({
            'playfield': playfield,
            'lines': lines,
            'score': score
        }));
        alert('Game saved!');
    };

    window.load = function() {
        const savedState = JSON.parse(localStorage.getItem('tetrisGameState'));
        if (savedState) {
            playfield = savedState.playfield;
            lines = savedState.lines;
            score = savedState.score;
            ba.innerText = "lines: " + lines;
            pa.innerText = "score: " + score;
        }
        alert('Game loaded!');
    };

    window.changeStats = function() {
        var lines = document.getElementById('linesInput').value;
        var score = document.getElementById('scoreInput').value;
        lines = parseInt(lines);
        score = parseInt(score);
        if (!isNaN(lines) && !isNaN(score)) {
            lines = Math.max(0, lines); // Ensure lines is non-negative
            score = Math.max(0, score); // Ensure score is non-negative
            ba.innerText = "lines: " + lines;
            pa.innerText = "score: " + score;
            alert('Stats changed!');
        } else {
            alert('Please enter valid numbers for lines and score!');
        }
    };

    window.customizeTheme = function() {
        var backgroundColor = document.getElementById('backgroundColor').value;
        var fontColor = document.getElementById('fontColor').value;
        document.body.style.backgroundColor = backgroundColor;
        document.body.style.color = fontColor;
        alert('Theme customized!');
    };
})();
