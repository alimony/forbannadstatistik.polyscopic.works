(function () {
	'use strict';

	// Set to true to replace the static HTML with live data from the SCB
	// database through their API. For more information, see:
	// http://www.scb.se/Pages/List____354082.aspx
	var FETCH_LIVE_RESULTS = false;

	var YEARS = [
		'1991', '1995', '1996', '1997', '1998', '1999',
		'2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009',
		'2010', '2011'
	];

	var HEADERS = ['År', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Medelvärde', 'Median'];

	// This is data from SCB:
	// http://www.scb.se/Pages/TableAndChart____163544.aspx
	var dataArray = [
		//         Decile 1, Decile 2, Decile 3, Decile 4, Decile 5, Decile 6, Decile 7, Decile 8, Decile 9, Decile 10, Average, Median
		/* 1991 */ [72800,   104700,   118500,   131200,   143200,   156600,   172500,   192400,   220300,   328200,    164000,  149300],
		/* 1995 */ [58900,   95900,    108800,   119400,   130100,   142000,   155900,   174000,   200200,   290600,    147600,  135900],
		/* 1996 */ [61500,   94200,    107800,   118800,   130500,   143500,   157600,   177000,   204600,   309000,    150400,  137000],
		/* 1997 */ [65400,   96500,    109800,   121200,   133200,   146600,   162500,   182300,   211100,   351400,    158000,  139700],
		/* 1998 */ [59900,   99200,    112900,   124400,   136900,   150100,   166200,   186200,   216000,   332900,    158500,  143500],
		/* 1999 */ [64800,   103300,   117000,   129300,   142500,   156600,   173400,   196300,   229600,   384400,    169700,  149300],
		/* 2000 */ [69300,   106700,   121700,   135500,   149700,   165500,   184500,   208600,   246300,   483800,    187200,  157100],
		/* 2001 */ [65400,   108600,   124600,   139400,   154400,   169600,   187700,   211300,   247100,   414000,    182200,  161500],
		/* 2002 */ [72300,   110600,   127100,   142600,   158300,   174600,   194200,   218800,   254400,   408800,    186200,  166100],
		/* 2003 */ [73800,   112900,   129100,   144000,   159200,   175500,   195000,   220500,   255100,   404100,    186900,  167100],
		/* 2004 */ [76100,   116100,   133000,   148300,   163600,   180200,   199200,   224100,   261500,   432800,    193500,  171400],
		/* 2005 */ [78700,   117100,   134900,   151200,   167900,   185100,   205100,   230800,   268500,   476400,    201600,  176200],
		/* 2006 */ [82100,   120600,   139300,   157100,   174500,   193100,   214700,   242700,   286000,   538100,    214800,  183000],
		/* 2007 */ [83300,   124300,   145500,   166000,   186500,   207100,   231500,   264300,   313400,   616600,    233800,  196000],
		/* 2008 */ [75300,   122700,   145100,   167200,   187400,   208200,   232200,   263300,   307500,   543500,    225200,  197300],
		/* 2009 */ [76500,   124200,   146900,   169400,   190500,   212800,   238600,   271300,   321200,   551800,    230300,  201200],
		/* 2010 */ [77600,   124200,   147400,   171200,   193200,   215700,   241100,   274500,   321400,   577000,    234300,  204300],
		/* 2011 */ [78600,   127100,   151700,   175900,   198500,   221700,   247800,   281800,   332100,   594300,    240900,  210200]
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
