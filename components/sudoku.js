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
    Possible Values: {{ possible }}<br/>
    <div id="sudoku" align="center">
    <table id="sudoku_grid" cellspacing="0" cellpadding="0">
        <tbody>
            <tr v-for="(row, rowindex) in board" 
            :id="'row' + rowindex" 
            :class="'sudoku_row sr' + rowindex%3">
            <td v-for="(cell, columnindex) in row" 
            :id="'cell' + rowindex + columnindex" 
            :class="'sudoku_column sc' + columnindex%3" 
            @mouseenter="mouseEnter($event, rowindex, columnindex)" 
            @mouseleave="mouseLeave($event, rowindex, columnindex)">
                <input class="sudoku_input" 
                size="1" autocomplete="off" 
                :readonly="cell!=0" 
                :id="'input' + rowindex + columnindex" 
                :value="cell==0?'':board[rowindex][columnindex]">
            </td>
            </tr>
        </tbody>
    </table>
    </div>
    `,
    data() {
        return {
            possible: '',
        }
    },
    methods: {
        mouseEnter: function(element, row, column){
            this.crosshair(row, column, 'lightgray');
            this.box(row, column, 'lightgray');
            this.possibilities(row, column);
            element.toElement.style.backgroundColor = 'gray';
        },
        mouseLeave: function(element, row, column){
            this.crosshair(row, column, '#f2f2f2');
            this.box(row, column, '#f2f2f2');
        },
        crosshair(row, column, color) {
            for (let columnindex = 0; columnindex < 9; columnindex++) {
                document.getElementById('cell' + row + columnindex).style.backgroundColor = color;       
            }

            for (let rowindex = 0; rowindex < 9; rowindex++) {
                document.getElementById('cell' + rowindex + column).style.backgroundColor = color;
            }

        },
        box(row, column, color) {
            const startrow = Math.floor(row/3) * 3;
            const startcolumn = Math.floor(column/3) * 3;

            for (let rowindex = startrow; rowindex < startrow + 3; rowindex++) {
                for (let columnindex = startcolumn; columnindex < startcolumn + 3; columnindex++) {
                    document.getElementById('cell' + rowindex + columnindex).style.backgroundColor = color;    
                }   
            }    
        },
        possibilities(row, column) {
            let p = new Set([1,2,3,4,5,6,7,8,9]);

            for (let columnindex = 0; columnindex < 9; columnindex++) {
                p.delete(this.board[row][columnindex]);
            }

            for (let rowindex = 0; rowindex < 9; rowindex++) {
                p.delete(this.board[rowindex][column]);
            }

            const startrow = Math.floor(row/3) * 3;
            const startcolumn = Math.floor(column/3) * 3;

            for (let rowindex = startrow; rowindex < startrow + 3; rowindex++) {
                for (let columnindex = startcolumn; columnindex < startcolumn + 3; columnindex++) {
                    p.delete(this.board[rowindex][columnindex]);     
                }   
            }    

            this.possible = '';
            p.forEach(nr => {
            this.possible += nr + ' ';
            });
        }
    },
    computed: {
    } 
})