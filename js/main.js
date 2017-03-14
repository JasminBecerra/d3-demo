var container = d3.select("body")
	.append("svg")
	.datum(500)
	.attr("width", function(d){
		return d+"px";
		//SUPER USEFULL IF YOU HAVE DYNAMIC DATA/DATUM
		console.log(d);
	})
	.attr("height", "500px")
	.attr("class", "container");
	//name class as element variable for clarity
	// .style("background-color", "gray");
	////^that would go in style.css

// var textElement = container.append("text");
// var textElement2 = container.append("text");
// var textElement3 = container.append("text");


//can be outside of chain
var x = d3.scaleLinear() //create the scale
    .domain([0, 3]) //input min and max
    .range([90, 810]); //output min and max
//creates a linear scale, and stores it to variable x

console.log(x);

//geneartor function, a function that generates another function


//look at d2scale in github documentation


d3.json("data/MegaCities.geojson", function(data){
			// console.log(data);
			// //you should get the geojson

		//to reference container use container.selectAll
		var textElements = container.selectAll(".textElement");
			// all the matching textElements
			//** can also create an empty seect
		// only create one operand per block (append)
		//if you need to append, make a separate element

		//you can put anything there, and if it doesn't exist,
		//to create an empty selection
			// .data([20, "robust", 60, "Veep", 80])
			//.data cannot handle a single number or string value other than ARRY
			//MUST pass ARRAY to .data

			.data(data.features)

			.enter()
			//magically applies data to the selection!
			//data in groups (object) Under Console Properties tab

			.append("text")
			.attr("class", "textElement")
			.attr("x", 0)
			.attr("y", function(d, i){
				console.log(x(d.properties.Pop_2015));
				return x(d.properties.Pop_2015);
				//will return corresponding range value per domain
			})

			.text(function(d){
				console.log(d);
				return d;
			
			});

//useful not exactly for text, but that's just this example/demo


		//select all sets up a loop




		console.log(textElements);
})

//the body/select is the operand


//you can chain methods
//don't put semi-colon until very end of block
//datumcoordinate system revolved around ellipsoid





console.log(container)