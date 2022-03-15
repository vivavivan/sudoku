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
                <input class="sudoku_input" size="1" autocomplete="off" :readonly="cell!=0" :id="'input' + rowindex + cellindex" :value="cell==0?'':cell">
            </td>
            </tr>
        </tbody>
    </table>
    </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        mouseEnter: function(element, row, column){
            // console.log("enter:", element.toElement, row, column);
            element.toElement.style.backgroundColor = 'lightgray';
        },
        mouseLeave: function(element, row, column){
            // console.log("leave", element.fromElement, row, column);
            element.fromElement.style.backgroundColor = 'white';
        }
    },
    computed: {
    }
})