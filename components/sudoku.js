app.component('sudoku', {
    props: {
        board: {
            type: Array,
            required: true
        }
    },
    template:
    /*html*/
    `
    <div id="sudoku" align="center">
    <table id="sudoku_grid" cellspacing="0" cellpadding="0">
        <tbody>
            <tr v-for="(row, rowindex) in board" :id="'row' + rowindex" :class="'sudoku_row sr' + rowindex%3">
            <td v-for="(cell, cellindex) in row" :id="'cell' + rowindex + cellindex" :class="'sudoku_column sc' + cellindex%3" @mouseenter="mouseEnter($event, rowindex, cellindex)" @mouseleave="mouseLeave($event, rowindex, cellindex)">
                <input class="sudoku_input" size="1" autocomplete="off" :readonly="cell!=0" :id="'input' + rowindex + cellindex" :value="cell==0?'':cell" v-on:click="rowncolumn">
            </td>
            </tr>
        </tbody>
    </table>
    </div>
    `,
    methods: {
        mouseEnter: function(element, row, column){
            this.crosshair(row, column, 'lightgray');
            element.toElement.style.backgroundColor = 'gray';
        },
        mouseLeave: function(element, row, column){
            this.crosshair(row, column, '#f2f2f2');
        },
        crosshair(row, column, color) {
            for (let columnindex = 0; columnindex < 9; columnindex++) {
                document.getElementById('cell' + row + columnindex).style.backgroundColor = color;       
            }

            for (let rowindex = 0; rowindex < 9; rowindex++) {
                document.getElementById('cell' + rowindex + column).style.backgroundColor = color;
            }
        },
        rowncolumn() {
            console.log(elementBoard);

        },
    },
    computed: {
    } 
})