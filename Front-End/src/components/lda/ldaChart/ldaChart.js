import {useRef} from 'react';
import * as d3 from 'd3';
import {properMinScaling, properMaxScaling} from '../../../helpers/dataVisualHelpers';

const COLORS = [
    'red',
    'green',
    'blue',
    'orange',
    'green',
    'sienna',
    'peachpuff',
    'purple',
    'pink',
    'turquoise'
];

export default function LDAChart(props) {
    const chartArea = useRef(null);
    const xAxis = useRef(null);
    const yAxis = useRef(null);

    const CHART_PARAMS = {
        width: 800,
        height: 400,
        radius: 3,
        margin: {
            left: 50,
            right: 10,
            top: 20,
            bottom: 50
        }
    };

    const drawWidth = CHART_PARAMS.width - CHART_PARAMS.margin.left - CHART_PARAMS.margin.right;
    const drawHeight = CHART_PARAMS.height - CHART_PARAMS.margin.top - CHART_PARAMS.margin.bottom;

    const updateScales = () => {
        const allPoints = props.points.concat(props.line);
        
        const xMin = d3.min(allPoints, (d) => properMinScaling(+d.x));
        const xMax = d3.max(allPoints, (d) => properMaxScaling(+d.x));
        const yMin = d3.min(allPoints, (d) => properMinScaling(+d.y));
        const yMax = d3.max(allPoints, (d) => properMaxScaling(+d.y));

        const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, drawWidth]);
        const yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, drawHeight]);

        return [xScale, yScale];
    };
    
    const updatePoints = (xScale, yScale) => {
        const circles = d3.select(chartArea.current).selectAll('circle').data(props.points);

        circles.enter().append('circle')
            .merge(circles)
            .attr('r', (d) => CHART_PARAMS.radius)
            .attr('fill', (d) => {
                return COLORS[d.label % COLORS.length];
            })
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y))

        circles.exit().remove();
    };

    const updateLines = (xScale, yScale) => {
        const allPoints = [props.line];

        const line = d3.line()
            .x((d) => xScale(+d.x))
            .y((d) => yScale(+d.y))
            .curve(d3.curveMonotoneX);

        const ldaLine = d3.select(chartArea.current)
            .selectAll('path')
            .data(allPoints);
        
        ldaLine.enter().append('path')
            .merge(ldaLine)
            .attr('fill', 'none')
            .attr('stroke', (_, i) => {
                return 'black';
            })
            .attr('stroke-width', 3)
            .transition().duration(500)
            .attr('d', (d) => line(d))
    };
    
    const updateAxes = (xScale, yScale) => {
        const xAxisFunction = d3.axisBottom()
            .scale(xScale)
            .ticks(5, 's');

        const yAxisFunction = d3.axisLeft()
            .scale(yScale)
            .ticks(5, 's');

        d3.select(xAxis.current)
            .call(xAxisFunction);

        d3.select(yAxis.current)
            .call(yAxisFunction);
    };
    
    const [xScale, yScale] = updateScales();
    updateAxes(xScale, yScale);
    updatePoints(xScale, yScale);
    updateLines(xScale, yScale);

    return (
        <div className="lda__chart">
            <svg className="chart" width={CHART_PARAMS.width} height={CHART_PARAMS.height}>
                <g ref={chartArea}
                    transform={`translate(${CHART_PARAMS.margin.left}, ${CHART_PARAMS.margin.top})`} />

                {/* Axes */}
                <g ref={xAxis}
                    transform={`translate(${CHART_PARAMS.margin.left}, ${CHART_PARAMS.height - CHART_PARAMS.margin.bottom})`}></g>
                <g ref={yAxis}
                    transform={`translate(${CHART_PARAMS.margin.left}, ${CHART_PARAMS.margin.top})`}></g>
            </svg>
        </div>
    );
};