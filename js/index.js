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

    createCircles(svg, data){

        const g = svg.selectAll('g')
            .data(data)
            .enter()
            .append('g');
        
        return;

        const circles = g.selectAll('circle')
            .append('circle')
            .attr('fill', function(d){return 'black' ;})
            .attr('cx', function(d){return 10;})
            .attr('cy', function(d){return 10;})
            .attr('r', function(d){return 10;})

        return circles;
    }





}

d3.csv('../data.csv', function(err, data){
    const builder = new SVG(data);
    delete data
    const svg = builder.createSVG();

    const circles = builder.createCircles(svg, builder.data);

});

