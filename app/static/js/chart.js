(function($){
"use strict";
	// barchart

	var chart1 = new CanvasJS.Chart("barchart", {
    animationEnabled: true,
    theme: "light2",
    title: {
        padding: { top: 10, bottom: 10 } // Add extra padding around the title
    },
    axisX: {
        margin: 20, // Creates extra space on the X-axis
        // labelFontSize: 14, // Adjust font size as needed
        titleFontSize: 14,
        interval: 3,
				title: "MMbbl= One Million Barrels",
    },
    axisY: {
        margin: 20, // Creates extra space on the Y-axis
        title: "Reserves (MMbbl)",
        titleFontSize: 14,
        minimum: 0 // Space at the bottom
    },
    data: [{
        type: "column",
        dataPoints: [
            { y: 300878, label: "Venezuela" },
            { y: 266455, label: "Saudi" },
            { y: 169709, label: "Canada" },
            { y: 158400, label: "Iran" },
            { y: 142503, label: "Iraq" },
            { y: 101500, label: "Kuwait" },
            { y: 97800, label: "UAE" },
            { y: 80000, label: "Russia" }
        ]
    }]
});
chart1.render();

	// Line chart
	var chart2 = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	axisX: {
			margin: 20,
		},
	axisY: {
			margin: 20,
			includeZero: false
		},
		data: [{        
			type: "line",       
			dataPoints: [
				{ y: 450 },
				{ y: 414},
				{ y: 520, indexLabel: "highest",markerColor: "red", markerType: "triangle" },
				{ y: 460 },
				{ y: 450 },
				{ y: 500 },
				{ y: 480 },
				{ y: 480 },
				{ y: 410 , indexLabel: "lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
				{ y: 500 },
				{ y: 480 },
				{ y: 510 }
			]
		}]
	});
	chart2.render();



})(this.jQuery);