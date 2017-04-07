'use strict';

(function IIFE() {

    var board = {
        form: null,
        container: null,
        title: null,
        colorizeBtn: null,
        countInline: 0,
        countContain: 1
    };

    function init() {
        board.form = document.getElementById('tableForm');
        board.container = document.getElementById('coordinate');
        board.title = document.getElementById('title');
        board.colorizeBtn = document.createElement('input');
        bindEvents();
    }

    function bindEvents() {
        if (board.form) {
            if (board.form.addEventListener)
                board.form.addEventListener('submit', drawGrid);
            else if (board.form.attachEvent)
                board.form.attachEvent('onsubmit', drawGrid);
        }
        if (board.colorizeBtn) {
            if (board.colorizeBtn.addEventListener)
                board.colorizeBtn.addEventListener('click', colorize)
        }
    }

    function clearGrid() {
        board.container.innerHTML = '';
    }

    function clearInput(input) {
        input.value = '';
    }

    function drawGrid(event) {
        event.preventDefault();
        var inputElem = document.getElementById('inputNum');
        var parsedNum = parseInt(inputElem.value);
        if (isNaN(parsedNum)) {
            alert('Please enter only number');
            return;
        }
        clearGrid();
        for (var i = 0; i < parsedNum; i++) {
            var lineDiv = document.createElement('div');
            board.container.appendChild(lineDiv);
            lineDiv.className = 'containerDiv';
            for (var j = 0; j < parsedNum; j++) {
                lineDiv.innerHTML += '<div class="divInLine"></div>';
            }
        }
        board.form.appendChild(board.colorizeBtn);
        board.colorizeBtn.type = 'button';
        board.colorizeBtn.value = 'Colorize';
        clearInput(inputElem);

    }

    function colorize() {
        var inlineDiv = document.getElementsByClassName('divInLine');
        var containDiv = document.getElementsByClassName('containerDiv');
        board.colorizeBtn.disabled = true;
        document.getElementById('draw').disabled = true;
        if (board.countContain > containDiv.length) {
            board.colorizeBtn.disabled = false;
            document.getElementById('draw').disabled = false;
            board.countInline = 0;
            board.countContain = 1;
            return;
        }
        if (board.countInline < inlineDiv.length) {
            inlineDiv[board.countInline].style.backgroundColor = randomColor();
            board.countInline += containDiv.length;
            setTimeout(colorize, 500);
            if (board.countInline >= inlineDiv.length) {
                board.countInline = board.countContain;
                board.countContain++;
            }
        }
    }

    function randomColor() {
        var red = Math.floor(Math.random() * 256);
        var green = Math.floor(Math.random() * 256);
        var blue = Math.floor(Math.random() * 256);
        var colorful = 'rgb(' + red + ',' + green + ',' + blue + ')';
        return colorful;
    }

    init();
})();

