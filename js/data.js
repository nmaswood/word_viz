class Data {
    constructor(data, n){

        this.width = 1200;
        this.height = 800;

        this.data = Data.prepareData(data,n);

        const extent = Data.getExtent(this.data);
        this.min = extent[0];
        this.max = extent[1];

        this.xScale = Data.xScale(n, this.width);
        this.yScale = Data.xScale(this.min, this.max);
    }

    static prepareData(data, n){
        return data.slice(-n).map(function(d){
            return {
                word:d.word,
                count: +d.count
            }
        });
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

    static yScale(min, max){

        return d3.scaleLinear()
            .domain([min,max])
            .range([0,height]);
    }
}
