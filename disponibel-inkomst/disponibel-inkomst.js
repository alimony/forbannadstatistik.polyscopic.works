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
		'2010', '2011', '2012', '2013'
	];

	var HEADERS = ['År', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Medelvärde', 'Median'];

	var dataArray = [
		//         Decile 1, Decile 2, Decile 3, Decile 4, Decile 5, Decile 6, Decile 7, Decile 8, Decile 9, Decile 10, Average, Median
		/* 1991 */ [73300,   105400,   119300,   132100,   144100,   157700,   173600,   193700,   330400,   221800,    165100,  150300],
		/* 1995 */ [59300,   96600,    109600,   120200,   131000,   142900,   156900,   175100,   292500,   201500,    148600,  136800],
		/* 1996 */ [61900,   94800,    108600,   119600,   131400,   144400,   158700,   178200,   311100,   206000,    151500,  137900],
		/* 1997 */ [65800,   97100,    110600,   122000,   134100,   147600,   163600,   183500,   353800,   212500,    159100,  140600],
		/* 1998 */ [60300,   99900,    113600,   125200,   137800,   151100,   167300,   187500,   335100,   217500,    159500,  144500],
		/* 1999 */ [65200,   104000,   117800,   130200,   143500,   157700,   174600,   197700,   387000,   231200,    170900,  150400],
		/* 2000 */ [69800,   107400,   122500,   136400,   150700,   166600,   185800,   210000,   487100,   247900,    188400,  158100],
		/* 2001 */ [65900,   109400,   125400,   140400,   155400,   170800,   189000,   212800,   416700,   248800,    183400,  162600],
		/* 2002 */ [72800,   111300,   128000,   143500,   159400,   175800,   195500,   220300,   411600,   256100,    187400,  167200],
		/* 2003 */ [74300,   113600,   130000,   145000,   160200,   176700,   196300,   222000,   406800,   256800,    188200,  168200],
		/* 2004 */ [76600,   116900,   133900,   149300,   164700,   181400,   200500,   225600,   435700,   263200,    194800,  172600],
		/* 2005 */ [79200,   117900,   135800,   152200,   169000,   186300,   206500,   232400,   479700,   270300,    202900,  177300],
		/* 2006 */ [82600,   121400,   140200,   158100,   175700,   194400,   216100,   244300,   541800,   288000,    216200,  184200],
		/* 2007 */ [83800,   125100,   146500,   167100,   187700,   208500,   233100,   266100,   620700,   315500,    235400,  197400],
		/* 2008 */ [75800,   123500,   146100,   168300,   188600,   209600,   233700,   265100,   547100,   309500,    226700,  198600],
		/* 2009 */ [77000,   125000,   147900,   170500,   191800,   214200,   240200,   273100,   555500,   323400,    231900,  202600],
		/* 2010 */ [78100,   125000,   148400,   172300,   194500,   217200,   242700,   276300,   580900,   323600,    235900,  205600],
		/* 2011 */ [79100,   128000,   152700,   177100,   199800,   223200,   249500,   283700,   598300,   334400,    242600,  211600],
		/* 2012 */ [82600,   130100,   154300,   178500,   201900,   225100,   252800,   287500,   584400,   338300,    243500,  213200],
		/* 2013 */ [83600,   132100,   156400,   180700,   205000,   229400,   256900,   292200,   626300,   345500,    250800,  216800]
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
