//main js script for d3 lab demo

//execute script when window is loaded
window.onload = function(){
	// get body element from DOM

	//SVG dimension variables
    var w = 900, h = 500;

    var container = d3.select("body") 
    	.append("svg") //put a new svg in <body>
		.attr("width", w) //assign w
        .attr("height", h) //assign h
        .attr("class", "container") //assigning class (same as the block name) for styling & future ref
        .style("background-color", "rgba(0,0,0,0.3)"); // color, semicolon @ end of block

//preserve the svg append (you should only have one append or element in each block)
    //innerRect block
    var innerRect = container.append("rect") //put a new rect in <svg>
    	.datum(400)
		.attr("width", function(d){ //rectangle w // d = 400
            return d * 2; //400 * 2 = 800
        }) 
        .attr("height", function(d){ //rectangle h
            return d; //400
        })
        .attr("class", "innerRect") //class name, same as block name!
        .attr("x", 50) //position from left on the x axis
        .attr("y", 50) //position from top on the y axis
        .style("fill", "#f4f1e6"); //fill color, semicolon @ end of bloxk

	// console.log(innerRect)

	    //data must ALWAYS be an array in d3
    var cityPop = [
        { 
            city: 'Chicago',
            population: 2720546
        },
        {
            city: 'Philadelphia',
            population: 1567442
        },
        {
            city: 'Montreal',
            population: 1704694
        },
        {
            city: 'Boston',
            population: 667137
        }
    ];


    //find min value of the cityPop array
    //using d3 min method
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find max value of cityPop array
    //using d3 max method
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
        .range([95, 760]) //output min, max //adjusted the range so that Boston labels actually in innerRect
        .domain([0, 3]); //input min, max

        // console.log(x)
    		// function scale() is the result

    //above circles block
    //color scale generator (for color scale)
    var color = d3.scaleLinear()
        .range([
            "#f2f0f7", //used color scheme from color brewer
            "#6a51a3"
        ])
        .domain([ //unclassed
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


    //below circles block...create y axis generator (scale/ruler on side)
    var yAxis = d3.axisLeft(y);

    //create axis g element and add axis
    //g element is just a group <g>
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50, 0)");

    //below "axis" block...create text element and add title
    var title = container.append("text") //apending to container
        .attr("class", "title") //class same as block name
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");

    //below title block...create circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("y", function(d){
            //vertical position centered on each circle
            return y(d.population) + 1;
        });
    

    //first line of cityPop label
    var nameLine = labels.append("tspan") //changed fontsize in style.css
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.00125 / Math.PI) + 5; //used .00125 as i did for "r" above in circles
        })
        .text(function(d){
            return d.city;
        });

      //create format generator-- use this to add commas accordinlgy to popLine (second label line)
    var format = d3.format(",");
    

    //second line of cityPop label
    var popLine = labels.append("tspan") //changed fontsize in style.css (smaller than first label)
        .attr("class", "popLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.00125 / Math.PI) + 5;
        })
        .attr("dy", "15") //vertical offset (so that labels aren't on top of ea other)
        .text(function(d){ //insert commas every 3 digits/decimal places
            return "Pop. " + format(d.population);
        });
		

    yAxis(axis); //same as call(yAxis)
}





