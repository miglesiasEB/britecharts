define(['d3', 'legend', 'donutChartDataBuilder'], function(d3, legend, dataBuilder) {
    'use strict';

    function aTestDataSet() {
        return new dataBuilder.DonutDataBuilder();
    }

    describe('Legend Component', () =>{
        let legendChart, dataset, containerFixture, f;

        describe('when legend is stacked', () => {

            beforeEach(() =>{
                dataset = aTestDataSet()
                            .withFivePlusOther()
                            .build();
                legendChart = legend();

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            afterEach(() =>{
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a legend with minimal requirements', () => {
                expect(containerFixture.select('svg.britechart-legend').empty()).toBeFalsy();
            });

            it('should render container, chart and legend groups', () => {
                expect(containerFixture.select('g.legend-container-group').empty()).toBeFalsy();
                expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
            });

            it('should add a line group for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-line')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper data identifier to each entry', () => {
                let lines = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry'),
                    elements = lines.nodes();

                lines.each(function(d, index) {
                    expect(
                        parseInt(d3.select(elements[index]).attr('data-item'), 10)
                    ).toEqual(dataset[index].id);
                });
            });

            it('should add a circle for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-circle')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add a text element for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-entry-name')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper text to each text element', () => {
                let texts = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry-name text'),
                    elements = texts[0];

                texts.each(function(d, index) {
                    expect(elements[index]).toEqual(dataset[index].name);
                });
            });

            it('should add a value element for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-entry-value')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper value to each value element', () => {
                let texts = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry-value text'),
                    elements = texts[0];

                texts.each(function(d, index) {
                    expect(elements[index]).toEqual(dataset[index]['quantity']);
                });
            });

            describe('API', function() {

                it('should provide margin getter and setter', () =>{
                    let previous = legendChart.margin(),
                        expected = {top: 4, right: 4, bottom: 4, left: 4},
                        actual;

                    legendChart.margin(expected);
                    actual = legendChart.margin();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide width getter and setter', () =>{
                    let previous = legendChart.width(),
                        expected = 200,
                        actual;

                    legendChart.width(expected);
                    actual = legendChart.width();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide height getter and setter', () =>{
                    let previous = legendChart.height(),
                        expected = 200,
                        actual;

                    legendChart.height(expected);
                    actual = legendChart.height();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide an inline mode getter and setter', () =>{
                    let previous = legendChart.inline(),
                        expected = true,
                        actual;

                    legendChart.inline(expected);
                    actual = legendChart.inline();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide colorSchema getter and setter', () =>{
                    let previous = legendChart.colorSchema(),
                        expected = ['pink', 'red', 'magenta'],
                        actual;

                    legendChart.colorSchema(expected);
                    actual = legendChart.colorSchema();

                    expect(previous).not.toBe(expected);
                    expect(actual).toBe(expected);
                });

                it('should provide a highlight function', () => {
                    let lines = containerFixture
                            .select('.britechart-legend')
                            .selectAll('.legend-entry'),
                        elements = lines.nodes();

                    legendChart.highlight(dataset[0].id);

                    expect(d3.select(elements[0]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[1]).attr('class')).toEqual('legend-entry is-faded');
                    expect(d3.select(elements[2]).attr('class')).toEqual('legend-entry is-faded');
                    expect(d3.select(elements[3]).attr('class')).toEqual('legend-entry is-faded');
                    expect(d3.select(elements[4]).attr('class')).toEqual('legend-entry is-faded');
                });

                it('should provide a clear highlight function', () => {
                    let lines = containerFixture
                            .select('.britechart-legend')
                            .selectAll('.legend-entry'),
                        elements = lines.nodes();

                    legendChart.highlight(dataset[0].id);
                    legendChart.clearHighlight();

                    expect(d3.select(elements[0]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[1]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[2]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[3]).attr('class')).toEqual('legend-entry');
                    expect(d3.select(elements[4]).attr('class')).toEqual('legend-entry');
                });
            });
        });

        describe('when legend is inline', () => {

            beforeEach(() =>{
                dataset = aTestDataSet()
                            .withThreeCategories()
                            .build();
                legendChart = legend();

                legendChart.inline(true);

                // DOM Fixture Setup
                f = jasmine.getFixtures();
                f.fixturesPath = 'base/test/fixtures/';
                f.load('testContainer.html');

                containerFixture = d3.select('.test-container');
                containerFixture.datum(dataset).call(legendChart);
            });

            afterEach(() =>{
                containerFixture.remove();
                f = jasmine.getFixtures();
                f.cleanUp();
                f.clearCache();
            });

            it('should render a legend with minimal requirements', () => {
                expect(containerFixture.select('svg.britechart-legend').empty()).toBeFalsy();
            });

            it('should render container, chart and legend groups', () => {
                expect(containerFixture.select('g.legend-container-group').empty()).toBeFalsy();
                expect(containerFixture.select('g.legend-group').empty()).toBeFalsy();
            });

            it('should add only one line group', () => {
                let expected = 1,
                    actual = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-line')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add one entry per data', () => {
                let expected = dataset.length,
                    actual = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add the proper data identifier to each entry', () => {
                let lines = containerFixture
                        .select('.britechart-legend')
                        .selectAll('.legend-entry'),
                    elements = lines.nodes();

                lines.each(function(d, index) {
                    expect(
                        parseInt(d3.select(elements[index]).attr('data-item'), 10)
                    ).toEqual(dataset[index].id);
                });
            });

            it('should add a circle for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-circle')
                        .size();

                expect(actual).toEqual(expected);
            });

            it('should add a text element for each entry', () => {
                let expected = dataset.length,
                    actual = containerFixture.select('.britechart-legend')
                        .selectAll('.legend-entry-name')
                        .size();

                expect(actual).toEqual(expected);
            });
        });
    });
});
