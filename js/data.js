class Option {
    constructor(value, status){
        this.value = value;
        this.status = status;
    }
}

class CountMatrix {

    constructor(data, maxWidth){
        this.data = data.slice();
        this.totalLength = data.length;

        this.maxWidth = maxWidth;
        this.rows = [];
        this.start = true;
        this.currentRow = null;

        this.processed = this.process(data);

        this.currentIdx = 0;
        this.currentRowIdx = 0;
        this.currentRow = this.rows[0]
    }

    process(){

        while (this.data.length > 0){

            if (this.start) {
                this.start = false;
                this.currentRow = new CountRow(this.maxWidth);
                this.rows.push(this.currentRow);
            }

            let number = this.data[this.data.length - 1];
            let result = this.currentRow.push(number);
            if (result.status == "ERROR"){
                this.currentRow = new CountRow(this.maxWidth);
                this.rows.push(this.currentRow);
            } else {
                this.currentRow.push(number);
                this.data.pop();
            }
        }
    }

    reset(){
        this.currentIdx = 0;
        this.currentRowIdx = 0;
        this.currentRow = this.rows[0];
    }

    concat(){
        const allCountRows = [].concat.apply(this, this.rows).slice(1);
        const listOfRows = allCountRows.map(
            function(x){
                return x.row;
            });
        const allTotals = [].concat.apply(this, listOfRows).slice(1);
        return allTotals;
    }


}

class CountRow {

    constructor(maxWidth){
        this.row = [];
        this.totals = [];
        this.index = 0;
        this.total = 0;
        this.max = -1;
        this.maxWidth = maxWidth;
    }

    push(number){

        let total = this.total + number;

        if (total > this.maxWidth){
            return new Option("row is full", "ERROR");
        }  else {

            this.row.push(number);
            this.row.push(total);
            this.max = Math.max(this.max, number);
            this.total += number;
            this.index += 1;

            return new Option(this, "OK");
        }
    }

    length(){
        return this.row.length;
    }
}

class Data {
    constructor(data, n){

        this.width = 1200;
        this.height = 800;

        this.maxNodeRadius = 300;

        this.data = Data.trimData(data,n);

        const extent = Data.getExtent(this.data);
        this.min = extent[0];
        this.max = extent[1];

        this.xScale = Data.xScale(n, this.width);
        this.yScale = Data.yScale(this.min, this.max, this.maxNodeRadius);

        this.count = Data.collectCount(this.data);
        this.words = Data.collectWords(this.data);
        this.scaledCount = this.count.map(this.yScale);


        const x = new CountMatrix(this.scaledCount, this.width)
        x.process()

        this.countMatrix = x.concat();

    }

    static trimData(data, n){
        return data.slice(-n).map(function(d){
            return {
                word:d.word,
                count: +d.count
            }
        });
    }

    static collectWords(data){
        return data.map(function(d){
            return d.word;
        });
    }

    static collectCount(data){
        return data.map(function(d){
            return d.count;
        });

    }

    // i mean scaled counts
    static precalculateCount(counts, heights, maxWidth){
        const countAccumulate = [];

        let n = counts.length;
        for(let i = 0; i < n; i++){

            let current = counts[i];
            if (i != 0){
                current += counts[i-1];
            }
            countAccumulate.push(current);
        }
    }

    static getExtent(data){
        const extent = d3.extent(data, function(d){
            return d.count;
        });

        return extent;
    }

    static xScale(n, width){

        return d3.scaleLinear()
            .domain([0,n])
            .range([0,width]);
    }

    static yScale(min, max, maxNodeRadius){

        return d3.scaleLinear()
            .domain([min, max])
            .range([0, maxNodeRadius]);
    }
}
