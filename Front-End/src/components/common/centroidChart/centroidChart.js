import { useRef } from 'react';
import {properMinScaling, properMaxScaling} from '../../../helpers/dataVisualHelpers';
import * as d3 from 'd3';

export default function CentroidChart(props) {
    const chartArea = useRef(null);
    const xAxis = useRef(null);
    const yAxis = useRef(null);

    const CHART_PARAMS = {
        width: 800,
        height: 400,
        radius: 5,
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
        const allPoints = props.points.concat(props.centroids);
        
        const xMin = d3.min(allPoints, (d) => properMinScaling(+d.x));
        const xMax = d3.max(allPoints, (d) => properMaxScaling(+d.x));
        const yMin = d3.min(allPoints, (d) => properMinScaling(+d.y));
        const yMax = d3.max(allPoints, (d) => properMaxScaling(+d.y));

        const xScale = d3.scaleLinear().domain([xMin, xMax]).range([0, drawWidth])
        const yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, drawHeight])

        return [xScale, yScale];
    };
    
    const updatePoints = (xScale, yScale) => {
        const centroids = d3.select(chartArea.current).selectAll('rect').data(props.centroids);
        const r = CHART_PARAMS.radius;
        const colors = props.colors;

        centroids.enter().append('rect')
            .merge(centroids)
            .attr('width', r * 4)
            .attr('height', r * 4)
            .attr('fill-opacity', 0.6)
            .attr('fill', (d) => colors[d.label])
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('x', (d) => xScale(d.x) - 2*r)
            .attr('y', (d) => yScale(d.y) - 2*r)

        centroids.exit().remove();

        const circles = d3.select(chartArea.current).selectAll('circle').data(props.points);

        circles.enter().append('circle')
            .merge(circles)
            .attr('r', (d) => r)
            .attr('fill', (d) => colors[d.label])
            .attr('label', (d) => d.label)
            .transition().duration(500)
            .attr('cx', (d) => xScale(d.x))
            .attr('cy', (d) => yScale(d.y))

        circles.exit().remove();
    };
    
    const updateAxes = (xScale, yScale) => {
        let xAxisFunction = d3.axisBottom()
            .scale(xScale)
            .ticks(5, 's');

        let yAxisFunction = d3.axisLeft()
            .scale(yScale)
            .ticks(5, 's');

        d3.select(xAxis.current)
            .call(xAxisFunction);

        d3.select(yAxis.current)
            .call(yAxisFunction);
    }
    
    const [xScale, yScale] = updateScales();
    updateAxes(xScale, yScale);
    updatePoints(xScale, yScale);

    return (
        <div className={props.className}>
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