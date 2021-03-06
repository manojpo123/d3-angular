import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

import { SENSEX } from '../data'

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {

  title = 'Line Chart';

  clickMessage = '';
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: any;
  private height: any;
  private x: any;
  private y: any;
  private g: any;
  private style: any;
  private svg: any;
  private focus: any;
  private line: d3.shape.Line<[number, number]>;


  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.drawSvg();
    this.svgAxis();
    this.drawAxis();
    this.drawLine();
  }

  private drawSvg() {
    this.svg = d3.select('svg').append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private svgAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(SENSEX, (d) => d.date));
    this.y.domain(d3Array.extent(SENSEX, (d) => d.open));
  }

  private drawAxis() {
    this.svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text("Opening (USD)");
  }

  private drawLine() {
    this.line = d3Shape.line()
      .x((d) => this.x(d.date))
      .y((d) => this.y(d.open));

    this.svg.append('path')
      .datum(SENSEX)
      .attr('class', 'line')
      .attr('d', this.line);
  }

}
