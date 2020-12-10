<template>
  <svg width="400" height="400" font-family="Arial, Helvetica, sans-serif" font-size="14" text-anchor="middle"></svg>
</template>

<script>
/* eslint-disable */
import * as d3 from "d3"

export default {
  data () {
    return {
    }
  },
  mounted () {

    this.$nextTick(() => {

      let data = [
        { name: '总磷', count: 3, id: 3 },
        { name: '气温', count: 30, id: 1 },
        { name: '日照', count: 10, id: 4 },
        { name: '入湖流量', count: 5, id: 2 },
        // { name: '', count: 10, id: -1 },
        // { name: '', count: 10, id: -1 },
        // { name: '', count: 10, id: -1 },
        { name: '出湖流量', count: 5, id: 6 },
        { name: '总氮', count: 3, id: 5 }
      ]
    
      let svg = d3.select('svg')
      let width = +svg.attr('width')
      let height = +svg.attr('height')
      let fillStyle = '#0080ff'
      let strokeStyle = '#67d6ff'
      let strokeWidth = '4px'

      svg.selectAll("g").remove()

      let pack = d3.pack().size([width, height]).padding(1.5)
      let num
      let pid

      let root = d3.hierarchy({ children: data })
                   .sum(d => d.count)
                   .each(d => {
                     d.name = d.data.name
                     d.id = d.data.id
                   })

      let node = svg.selectAll('.node')
                    .data(pack(root).leaves())
                    .enter().append('g')
                    .attr('class', 'node')
                    .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')')
                    .style('font-size', d => d.r / 2.6)

      node.append('circle')
          .attr('id', d => d.id)
          .attr('r', d => d.id == -1 ? 0 : Math.max(d.r - 5, 0))
          .style('fill', fillStyle)
          .style('stroke', strokeStyle)
          .style('stroke-width', strokeWidth)

      node.append('clipPath')
          .attr('id', d => 'clip-' + d.id)
          .append('use')
          .attr('xlink:href', d => '#' + d.id)

      node.append('text')
          .attr('clip-path', d => 'url(#clip-' + d.id + ')')
          .selectAll('tspan')
          .data(d => {
            let len = d.name.length
            let half = (len / 2) >> 0
            return len > 3 ? [d.name.substr(0, half), d.name.substr(half)] : [d.name]
          })
          .enter()
          .append('tspan')
          .attr('x', 0)
          .attr('y', (d, i, nodes) => nodes.length > 1 ? (i ? '1em' : '-0.25em') : '0.25em')
          .style('fill', d => strokeStyle)
          .text(d => d)

      node.on('click', d => console.log(d))

    })

  },
  methods: {}
}
</script>

<style type='text/less' lang='less' >
.buuble {
  height: 800px;
  width: 800px;
  border: 1px solid #ccc;
  margin: 50px;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
