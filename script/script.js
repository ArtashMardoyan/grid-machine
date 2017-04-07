"use strict";

(function IIFE() {

    var board = {
        tableForm: null,
        coordinateOfTable: null,
        title: null
    };

    function init() {
        board.tableForm = document.getElementById("tableForm");
        board.coordinateOfTable = document.getElementById("coordinate");
        board.title = document.getElementById("title");
        bindEvents();
    }

    function bindEvents() {
        if (board.tableForm.addEventListener) {
            board.tableForm.addEventListener("submit", drawGrid)
        } else if (board.tableForm.attachEvent) {
            board.tableForm.attachEvent('onsubmit', drawGrid);
        }
    }

    function clearTable() {
        board.coordinateOfTable.innerHTML = "";
        var inInput = document.getElementById("inputNum");
        inInput.value = "";
    }

    function drawGrid(event) {
        event.preventDefault();
        var parsedNum = parseInt(document.getElementById("inputNum").value);
        if (isNaN(parsedNum)) {
            alert("Please enter only number");
            return;
        }
        if (parsedNum != "" || board.coordinateOfTable.innerHTML != "") {
            clearTable();
        }
        for (var i = 0; i < parsedNum; i++) {
            for (var j = 0; j < parsedNum; j++) {
                var lineDiv = document.createElement("div");
                board.coordinateOfTable.appendChild(lineDiv);
                if ((i + j) % 2 == 0) lineDiv.className = "divWhite";
                else lineDiv.className = "divBlack";
            }
            var br = document.createElement("br");
            board.coordinateOfTable.appendChild(br)
        }
    }

    init();
})();