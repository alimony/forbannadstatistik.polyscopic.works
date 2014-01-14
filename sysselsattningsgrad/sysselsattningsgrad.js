(function () {
	'use strict';

	// Set to true to replace the static HTML with live data from the SCB
	// database through their API. For more information, see:
	// http://www.scb.se/Pages/List____354082.aspx
	var FETCH_LIVE_RESULTS = false;

	if (FETCH_LIVE_RESULTS) {
		// This will replace the table contents with a simple message string.
		var setMessage = function (message) {
			$('#tbody').html('<tr><td colspan="4" class="message">' + message + '</td></tr>');
		};

		var API_URL_1 = '//api.scb.se/OV0104/v1/doris/sv/ssd/AM/AM0401/AM0401A/NAKUBefolkningAr';
		var POST_DATA_1 = {
			'query': [
				{
					'code': 'Alder',
					'selection': {
						'filter': 'item',
						'values': ['tot16-64']
					}
				},
				{
					'code': 'Arbetskraftstillh',
					'selection': {
						'filter': 'item',
						'values': ['TOTALT', 'SYS']
					}
				},
				{
					'code': 'ContentsCode',
					'selection': {
						'filter': 'item',
						'values': ['AM0401GB']
					}
				},
				{
					'code': 'Tid',
					'selection': {
						'filter': 'item',
						'values': ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012']
					}
				}
			],
			'response': { 'format': 'json' }
		};

		var API_URL_2 = '//api.scb.se/OV0104/v1/doris/sv/ssd/AM/AM0401/AM0401B_OLD/AKUABefolkning';
		var POST_DATA_2 = {
			'query': [
				{
					'code': 'Arbetskraftstillh',
					'selection': {
						'filter': 'item',
						'values': ['SYS', 'ALÖS', 'EIAKR']
					}
				},
				{
					'code': 'ContentsCode',
					'selection': {
						'filter': 'item',
						'values': ['AM0401H1']
					}
				},
				{
					'code': 'Tid',
					'selection': {
						'filter': 'item',
						'values': [
							'1976', '1977', '1978', '1979',
							'1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989',
							'1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999',
							'2000', '2001', '2002', '2003', '2004'
						]
					}
				}
			],
			'response': { 'format': 'json' }
		};

		var results = {};

		setMessage(FORBANNAD.texts.fetchingData);

		$.when(
			$.post(API_URL_1, JSON.stringify(POST_DATA_1), function (data) {
				$.each(data.data, function (index, element) {
					// The first half of the returned data array will be the population
					// values and the second half will be the employed values.
					var year = parseInt(element['key'][2], 10);
					results[year] = results[year] || { population: 0, employed: 0 };
					if (element['key'][1] === 'totalt') {
						results[year].population = parseInt(element['values'][0] * 1000, 10);
					}
					else if (element['key'][1] === 'sysselsatta') {
						results[year].employed = parseInt(element['values'][0] * 1000, 10);
					}
					else {
						console.log('Received unknown key %s', element['key'][1]);
					}
				});
			}),
			$.post(API_URL_2, JSON.stringify(POST_DATA_2), function (data) {
				$.each(data.data, function (index, element) {
					var year = element['key'][1];
					results[year] = results[year] || { population: 0, employed: 0 };
					if (element['key'][0] === 'sysselsatta') {
						results[year].employed = parseInt(element['values'][0] * 100, 10);
					}
					results[year].population += parseInt(element['values'][0] * 100, 10);
				});
			})
		)
		.done(function () {
			var resultString = '<tr>';
			$.each(results, function (year, data) {
				resultString += '<td>' + year + '</td>';
				resultString += '<td>' + FORBANNAD.millionStringForValue(data.population) + '</td>';
				resultString += '<td>' + FORBANNAD.millionStringForValue(data.employed) + '</td>';
				resultString += '<td>' + FORBANNAD.percentStringForValue(data.employed / data.population) + '</td>';
				resultString += '</tr>';
			});
			$('#tbody').html(resultString);
			FORBANNAD.loadChart(drawChart);
		})
		.fail(function () {
			setMessage(FORBANNAD.texts.couldNotFetchData);
		});
	}
	else {
		FORBANNAD.loadChart(drawChart);
	}

	// This will draw the chart based on the current HTML content in the table.
	// By extracting the data from the table, this will work even when no live
	// data has been fetched and is available in, maybe, a more convenient
	// JavaScript object.
	function drawChart() {
		var tableData = $.map($('#tbody tr'), function (tr) {
			var tds = $(tr).find('td');
			return [[tds.eq(0).text(), parseFloat(tds.eq(3).text().replace(',', '.'), 10)]];
		});

		tableData.unshift(['År', 'Sysselsättningsgrad']);

		var chartData = google.visualization.arrayToDataTable(tableData);

		var formatter = new google.visualization.NumberFormat(FORBANNAD.numberFormats.twoDigitPercentage);

		formatter.format(chartData, 1);

		var additionalChartOptions = {
			colors: FORBANNAD.defaultColors,
			vAxis: { format: FORBANNAD.vAxisFormats.roundedPercentage },
			lineWidth: FORBANNAD.lineWidths.medium
		};

		var chart = new google.visualization.LineChart(document.getElementById('chart'));

		chart.draw(chartData, $.extend({}, FORBANNAD.defaultChartOptions, additionalChartOptions));
	}
}());
