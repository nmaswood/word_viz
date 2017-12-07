class SVG {

    constructor(data){
        const newData = new Data(data, 500);
        this.__proto__ = Object.assign(this.__proto__, newData);
    }

    createSVG(){
        const svg = d3.select("#entry")
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
        
        return svg;
    }

    createCircles(svg, data, counts, countMatrix, words){
        debugger;

        //const circles = svg.selectAll('circle')
            //.data(data)
            //.enter();
            //.append('circle')
            //.attr('fill', function(d,i){
                //return 'red';
            //})
            //.attr('cx', function(d,i){



                //return 10;
            //})
            //.attr('cy', function(d,i){
                //return 10;
            //})
            //.attr('r', function(d,i){
                //return counts[i];
            //})

        return circles;
    }





}

d3.csv('../data.csv', function(err, data){
    const builder = new SVG(data);
    delete data
    const svg = builder.createSVG();

    const circles = builder.createCircles(svg, builder.data,builder.count, builder.countMatrix, builder.words);

});

