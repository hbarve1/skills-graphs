import * as d3 from 'd3';

const container = document.createElement('div');
container.id = 'container';
container.style.width = '100%';
container.style.height = '100%';
document.body.appendChild(container);

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

type dataSchema = {
  State: string;
  condidance: number;
  [key: string]: number | string;
};

const dataList = [
  {
    State: 'HTML5',
    confidance: 95,
  },
  {
    State: 'CSS',
    confidance: 80,
  },
  {
    State: 'JavaScript',
    confidance: 95,
  },
  {
    State: 'TypeScript',
    confidance: 80,
  },
  {
    State: 'Dart',
    confidance: 70,
  },
  {
    State: 'Rust',
    confidance: 25,
  },
  {
    State: 'Python',
    confidance: 40,
  },
  {
    State: 'React.js',
    confidance: 95,
  },
  {
    State: 'Redux.js',
    confidance: 95,
  },
  {
    State: 'Node.js',
    confidance: 95,
  },
  {
    State: 'Flutter',
    confidance: 70,
  },
  {
    State: 'React Native',
    confidance: 60,
  },
  {
    State: 'Tailwind CSS',
    confidance: 100,
  },
  {
    State: 'Docker',
    confidance: 60,
  },
  {
    State: 'Bootstrap',
    confidance: 80,
  },
  {
    State: 'Jest',
    confidance: 75,
  },
  {
    State: 'Cypress',
    confidance: 70,
  },
  {
    State: 'GraphQL',
    confidance: 95,
  },
  {
    State: 'Git',
    confidance: 85,
  },
  {
    State: 'Github',
    confidance: 95,
  },
  {
    State: 'CI/CD',
    confidance: 86,
  },
  {
    State: 'Webpack',
    confidance: 95,
  },
  {
    State: 'Vite',
    confidance: 70,
  },
  {
    State: 'Babel',
    confidance: 90,
  },
  {
    State: 'HTML5 Canvas',
    confidance: 85,
  },
  {
    State: 'Angular.js',
    confidance: 80,
  },
  {
    State: 'Angular',
    confidance: 60,
  },
  {
    State: 'scss',
    confidance: 20,
  },
  {
    State: 'Deno',
    confidance: 10,
  },
  {
    State: 'SVG',
    confidance: 60,
  },
  {
    State: 'Next.js',
    confidance: 80,
  },
  {
    State: 'Tensorflow.js',
    confidance: 30,
  },
  {
    State: 'd3.js',
    confidance: 70,
  },
  {
    State: 'MySQL',
    confidance: 40,
  },
  {
    State: 'PostgreSQL',
    confidance: 50,
  },
  {
    State: 'SQLite',
    confidance: 50,
  },
  {
    State: 'MongoDB',
    confidance: 50,
  },
  {
    State: 'Firebase',
    confidance: 80,
  },
  {
    State: 'Google Cloud',
    confidance: 50,
  },
  {
    State: 'AWS',
    confidance: 50,
  },
  {
    State: 'Redis',
    confidance: 40,
  },
];

function DOMsvg(e: number, t: number) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  container.appendChild(svg);

  return (
    svg.setAttribute(
      'viewBox',
      [0, 0, e, t].map((e) => e.toString()).join(' ')
    ),
    svg.setAttribute('width', e.toString()),
    svg.setAttribute('height', t.toString()),
    svg
  );
}

async function define() {
  // const fetchedData = (await d3.csv('/data.csv')) as unknown as dataSchema[];
  const data: dataSchema[] = dataList;
  // .sort((a, b) => b.total - a.total);

  const columns = Object.keys(data[0]);

  console.log(data);

  const width = windowWidth;
  const height = windowHeight;
  const innerRadius = 120;
  const outerRadius = Math.min(width, height) * 0.5;
  const x = d3
    .scaleBand()
    .domain(data.map((d) => d.State))
    .range([0, 2 * Math.PI])
    .align(0);
  const y = d3
    .scaleRadial()
    .domain([0, d3.max(data, (d) => d.confidance)] as number[])
    .range([innerRadius, outerRadius]);
  const arc = d3
    .arc()
    .innerRadius((d) => y(d[0]))
    .outerRadius((d) => y(d[1]))
    .startAngle((d) => x(d.data.State))
    .endAngle((d) => (x(d.data.State) as number) + x.bandwidth())
    .padAngle(0.01)
    .padRadius(innerRadius);
  const z = d3
    .scaleOrdinal()
    .domain(columns.slice(1))
    .range(['#d0743c', '#ff8c00'].reverse());
  const xAxis = (g: any) =>
    g.attr('text-anchor', 'middle').call((g) =>
      g
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr(
          'transform',
          (d: any) => `
        rotate(${
          (((x(d.State) as number) + x.bandwidth() / 2) * 180) / Math.PI - 90
        })
        translate(${innerRadius}, 0)
      `
        )
        .call((g: any) =>
          g.append('line').attr('x2', -5).attr('stroke', '#000')
        )
        .call((g: any) =>
          g
            .append('text')
            .attr('text-anchor', (_, i) => {
              return 'start';
              return i < (data.length - 1) / 2 ? 'start' : 'end';
            })
            .attr('transform', (d: any, i) => {
              const length = data.length - 1;

              return 'rotate(0) translate(10,3)';

              if (i < length / 4) {
                return 'rotate(360) translate(10,3)';
              }
              if (i < length / 2) {
                return 'rotate(160) translate(10,3)';
              }
              if (i < (3 * length) / 4) {
                return 'rotate(240) translate(10,3)';
              }
              return 'rotate(160) translate(10,3)';

              const left =
                ((x(d.State) as number) + x.bandwidth() / 2 + Math.PI / 2) %
                (2 * Math.PI);
              const right = Math.PI;

              // console.log(left, right);

              console.log([
                i,
                x(d.State),
                x.bandwidth(),
                (x(d.State) as number) + x.bandwidth() / 2 + Math.PI / 2,
                ((x(d.State) as number) + x.bandwidth() / 2 + Math.PI / 2) %
                  (2 * Math.PI),
                Math.PI,
              ]);

              // return 'rotate(-170) translate(10,3)';

              return left < right
                ? 'rotate(160) translate(10,3)'
                : 'rotate(-160) translate(10,3)';
            })
            // .attr('transform', (d: any) => {
            //   const up = Math.PI * 1.5;
            //   const down = Math.PI * 0.5;

            //   const angle = (x(d.State) as number) + x.bandwidth() / 2;

            //   return angle < up && angle > down
            //     ? 'rotate(180) translate(10,3)'
            //     : 'rotate(-180) translate(10,3)';
            // })

            .text((d: any) => d.State)
        )
    );
  const yAxis = (g: any) =>
    g
      .attr('text-anchor', 'end')
      .call((g: any) =>
        g
          .append('text')
          .attr('text-anchor', 'middle')
          // .attr('x', 0)
          // .attr('y', (d: any) => -y(y.ticks(10).pop() as number))
          // .attr('dx', '1em')
          // .attr('dy', '1em')
          .text('Confidance')
      )
      .call(
        (g: any) =>
          g
            .selectAll('g')
            .data(y.ticks(10).slice(1))
            .join('g')
            .attr('fill', 'none')
            .call((g: any) =>
              g
                .append('circle')
                .attr('stroke', '#000')
                .attr('stroke-opacity', 0.5)
                .attr('r', y)
            )
        // .call((g: any) =>
        //   g
        //     .append('text')
        //     .attr('x', -6)
        //     .attr('y', (d: any) => -y(d))
        //     .attr('dy', '0.35em')
        //     .attr('stroke', '#fff')
        //     .attr('stroke-width', 5)
        //     .text(y.tickFormat(10, 's'))
        //     .clone(true)
        //     .attr('fill', '#000')
        //     .attr('stroke', 'none')
        // )
      );
  const legend = (g: any) =>
    g
      .append('g')
      .selectAll('g')
      .data(columns.slice(1).reverse())
      .join('g')
      .attr(
        'transform',
        (d: any, i: number) =>
          `translate(-40,${(i - (columns.length - 1) / 2) * 20})`
      )
      .call((g: any) =>
        g.append('rect').attr('width', 18).attr('height', 18).attr('fill', z)
      )
      .call((g: any) =>
        g
          .append('text')
          .attr('x', 24)
          .attr('y', 9)
          .attr('dy', '0.35em')
          .text((d: any) => d)
      );

  // _chart(d3, document, width, height, data, z, arc, xAxis, yAxis, legend);
  const svg = d3
    .select(DOMsvg(width, height))
    .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
    .style('width', windowWidth)
    .style('height', windowHeight)
    .style('font', '10px sans-serif');

  svg
    .append('g')
    .selectAll('g')
    .data(
      d3.stack().keys(columns.slice(1))(
        data as Iterable<{ [key: string]: number }>
      )
    )
    .join('g')
    .attr('fill', (d) => z(d.key) as unknown as string)
    .selectAll('path')
    .data((d) => d)
    .join('path')
    .attr('d', arc as any);

  svg.append('g').call(xAxis);

  svg.append('g').call(yAxis);

  // svg.append('g').call(legend);
}

define();
