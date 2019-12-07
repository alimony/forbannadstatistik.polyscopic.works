/* global FORBANNAD */
(function () {
	'use strict';

	// Set to true to replace the static HTML with live data from the SCB
	// database through their API. For more information, see:
	// http://www.scb.se/Pages/List____354082.aspx
	var FETCH_LIVE_RESULTS = false;

	var YEARS = [
		'1991', '1995', '1996', '1997', '1998', '1999',
		'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
		'2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'
	];

	var HEADERS = ['År', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Medelvärde', 'Median'];

	var dataArray = [
		//         Decile 1, Decile 2, Decile 3, Decile 4, Decile 5, Decile 6, Decile 7, Decile 8, Decile 9, Decile 10, Average, Median
		/* 1991 */ [75300, 108300, 122600, 135700, 148100, 162000, 178400, 199100, 227800, 339500, 169700, 155100],
		/* 1995 */ [60900, 99200, 112600, 123500, 134600, 146900, 161200, 180000, 207100, 300600, 152700, 140800],
		/* 1996 */ [63600, 97400, 111500, 122900, 135000, 148400, 163100, 183100, 211700, 319600, 155600, 141700],
		/* 1997 */ [67600, 99800, 113600, 125400, 137700, 151600, 168100, 188500, 218300, 363500, 163400, 144700],
		/* 1998 */ [61900, 102600, 116800, 128700, 141600, 155200, 171900, 192600, 223400, 344300, 163900, 148400],
		/* 1999 */ [67000, 106900, 121000, 133700, 147400, 162000, 179400, 203100, 237500, 397600, 175600, 154700],
		/* 2000 */ [71700, 110300, 125800, 140100, 154900, 171200, 190900, 215800, 254700, 500400, 193600, 163100],
		/* 2001 */ [67700, 112400, 128900, 144200, 159700, 175500, 194200, 218600, 255600, 428200, 188500, 167600],
		/* 2002 */ [74800, 114400, 131500, 147500, 163700, 180600, 200900, 226300, 263100, 422900, 192600, 172200],
		/* 2003 */ [76400, 116800, 133600, 148900, 164600, 181500, 201700, 228100, 263800, 418000, 193300, 173100],
		/* 2004 */ [78800, 120100, 137600, 153400, 169200, 186400, 206000, 231800, 270500, 447700, 200200, 177800],
		/* 2005 */ [81400, 121200, 139500, 156400, 173600, 191400, 212200, 238800, 277700, 492800, 208500, 182500],
		/* 2006 */ [84900, 124700, 144100, 162500, 180500, 199700, 222000, 251000, 295900, 556600, 222200, 190100],
		/* 2007 */ [86100, 128500, 150500, 171700, 192900, 214200, 239500, 273400, 324200, 637800, 241900, 203600],
		/* 2008 */ [77900, 126900, 150100, 173000, 193800, 215400, 240200, 272300, 318000, 562200, 233000, 204600],
		/* 2009 */ [79100, 128500, 152000, 175200, 197000, 220100, 246800, 280600, 332200, 570700, 238200, 208600],
		/* 2010 */ [80300, 128400, 152400, 177000, 199900, 223100, 249300, 283900, 332500, 596800, 242400, 211500],
		/* 2011 */ [81300, 131500, 156900, 181900, 205300, 229300, 256300, 291500, 343500, 614700, 249200, 217300],
		/* 2012 */ [84900, 133600, 158500, 183400, 207500, 231200, 259800, 295400, 347600, 600400, 250200, 219400],
		/* 2013 */ [85900, 135800, 160700, 185700, 210600, 235700, 264000, 300300, 355100, 643600, 257700, 223200],
		/* 2014 */ [90200, 142900, 170600, 197200, 223100, 249900, 280500, 319300, 377000, 694100, 274500, 236500],
		/* 2015 */ [94400, 146700, 175700, 203500, 230500, 258600, 290800, 331600, 392900, 769800, 289500, 244600],
		/* 2016 */ [96700, 149300, 178600, 206300, 233100, 261200, 293200, 333700, 393900, 799400, 294500, 247200],
		/* 2017 */ [96100, 149000, 179100, 207300, 234600, 263100, 295700, 336700, 397800, 807700, 296700, 248900]
	];

	if (FETCH_LIVE_RESULTS) {
		var API_URL = '//api.scb.se/OV0104/v1/doris/sv/ssd/HE/HE0103/HE0103A/DispInkKe2';
		var POST_DATA = {
			'query': [
				{
					'code': 'Kapitalvinst',
					'selection': {
						'filter': 'item',
						'values': ['10']
					}
				},
				{
					'code': 'Inkomstsum',
					'selection': {
						'filter': 'item',
						'values': ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'MED', 'M']
					}
				},
				{
					'code': 'ContentsCode',
					'selection': {
						'filter': 'item',
						'values': ['HE0103B9']
					}
				},
				{
					'code': 'Tid',
					'selection': {
						'filter': 'item',
						'values': YEARS
					}
				}
			],
			'response': { 'format': 'json' }
		};

		FORBANNAD.setChartMessage(FORBANNAD.texts.fetchingData);

		$.when(
			$.post(API_URL, JSON.stringify(POST_DATA), function (data) {
				var rowCount = dataArray.length;
				var yearCount = YEARS.length;
				var rowIndex;
				var getIntValue = function (element) {
					return parseInt(element.values[0].replace('.', ''), 10);
				};
				var setDataValue = function (index, value) {
					dataArray[index][rowIndex] = value;
				};
				for (rowIndex = 0; rowIndex < rowCount; rowIndex++) {
					var startIndex = rowIndex * yearCount;
					var endIndex = startIndex + yearCount;
					var valueObjects = data.data.slice(startIndex, endIndex);
					var values = $.map(valueObjects, getIntValue);
					$.each(values, setDataValue);
				}
			})
		)
		.done(function () {
			FORBANNAD.loadChart(drawChart);
		})
		.fail(function () {
			FORBANNAD.setChartMessage(FORBANNAD.texts.couldNotFetchData);
		});
	}
	else {
		FORBANNAD.loadChart(drawChart);
	}

	// This will draw the chart based on either the static JavaScript object on
	// top of this file, or an updated copy of the same object, if live data was
	// fetched from SCB.
	function drawChart() {
		// Add year header to each row.
		$.each(dataArray, function (index, element) {
			element.unshift(YEARS[index]);
		});

		// Add header row to data table.
		dataArray.unshift(HEADERS);

		var chartData = google.visualization.arrayToDataTable(dataArray);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.sek);

		FORBANNAD.formatChartDataInColumnRange(formatter, chartData, 1, HEADERS.length - 1);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			legend: {
				position: 'in',
				textStyle: {
					color: 'black',
					fontSize: 13
				}
			},
			lineWidth: FORBANNAD.lineWidths.medium,
			vAxis: { format: FORBANNAD.vAxisFormats.sek },
			series: {
				10: { // Medelvärde
					lineWidth: FORBANNAD.lineWidths.thick
				},
				11: { // Median
					lineWidth: FORBANNAD.lineWidths.thick
				}
			}
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}

	$('#first-year').html(YEARS[0]);
	$('#info').show();
}());
