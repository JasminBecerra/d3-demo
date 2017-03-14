//main js script for d3 lab demo

//execute script when window is loaded
window.onload = function(){
	// get body element from DOM

	//SVG dimension variables
    var w = 900, h = 500;

    var container = d3.select("body") 
    	.append("svg") //put a new svg in <body>
		.attr("width", w) //assign width
        .attr("height", h) //assign height
        .attr("class", "container") //assigning class (same as the block name) for styling & future ref
        .style("background-color", "rgba(0,0,0,0.3)"); // color

//preserve the svg append (you should only have one append or element in each block)
    //innerRect block
    var innerRect = container.append("rect") //put a new rect in <svg>
    	.datum(400)
		.attr("width", function(d){ //rectangle width // d = 400
            return d * 2; //400 * 2 = 800
        }) 
        .attr("height", function(d){ //rectangle height
            return d; //400
        })
        .attr("class", "innerRect") //class name, same as block name!
        .attr("x", 50) //position from left on the x axis
        .attr("y", 50) //position from top on the y axis
        .style("fill", "#f4f1e6"); //fill color, semi colon @ end of bloxk

	// console.log(innerRect)

	    //bdata must ALWAYS be an array in d3
    var cityPop = [
        { 
            city: 'Chicago',
            population: 2720546
        },
        {
            city: 'Montreal',
            population: 1704694
        },
        {
            city: 'Boston',
            population: 667137
        },
        {
            city: 'Philadelphia',
            population: 1567442
        }
    ];


    //find min value of the cityPop array
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find max value of cityPop array
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50]) //was 430, 95
        .domain([//was minPop, maxPop
            0,
            3000000
        ]);

    //below data array, above circles
    var x = d3.scaleLinear() //create linear scale
        .range([90, 810]) //output min, max
        .domain([0, 3]); //input min, max

        // console.log(x)
    		// function scale() is the result

    //above circles block
    //color scale generator 
    var color = d3.scaleLinear()
        .range([
            "#f2f0f7", //used color scheme from color brewer
            "#6a51a3"
        ])
        .domain([
            minPop, 
            maxPop
        ]);

    var circles = container.selectAll(".circles") //empty selec
        .data(cityPop) //feed in cityPop data array (data must always be passed as array!)
        .enter() //join data to slection
        .append("circle") //add circle for each datum
        .attr("class", "circles") //apply class name to circles (same as block name)
        .attr("id", function(d){ //circle radius
            return d.city;
        })
        .attr("r", function(d){
            //calculate radius based on population value as circle area
            var area = d.population * 0.00125; //adjusted because my cities are quite populous
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            //use the linear scale generator to place each circle horizontally
            return x(i);
        })
        //apply scale to population values
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){ //add a fill based on the color scale generator
            return color(d.population);
        })
        .style("stroke", "#000"); //black circle stroke


    //below circles block...create y axis generator
    var yAxis = d3.axisLeft(y);

    //create axis g element and add axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)");
    
    yAxis(axis);
}





