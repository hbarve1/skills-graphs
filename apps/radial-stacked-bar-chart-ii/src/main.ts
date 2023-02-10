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
  confidance: number;
  // [key: string]: number | string;
};

const skillSegments = {
  0: 'Beginner',
  25: 'Intermediate',
  50: 'Advanced',
  75: 'Expert',
  100: 'Master',
};

const categories = {
  0: 'Frontend',
  1: 'Backend',
  2: 'Fullstack',
  3: 'Mobile',
  4: 'Design',
  5: 'Soft Skills',
  6: 'DevOps',
  7: 'Cloud',
  8: 'Database',
  9: 'Testing',
  10: 'Other',
};

const skills = [
  ['HTML5', 95, 1],
  ['CSS', 80, 1],
  ['JavaScript', 95, 1],
  ['TypeScript', 80, 1],
  ['AssemblyScript', 80],
  ['Dart', 70, 3],
  ['Rust', 25, 2],
  ['Python', 40, 1],
  ['React.js', 95, 1],
  ['Redux.js', 95, 1],
  ['Node.js', 95, 2],
  ['Flutter', 70, 3],
  ['React Native', 60, 3],
  ['Tailwind CSS', 100, 1],
  ['Docker', 60, 6],
  ['Bootstrap', 80, 1],
  ['Jest', 75, 1],
  ['Cypress', 70, 1],
  ['GraphQL', 95, 1],
  ['Git', 85, 6],
  ['Github', 95, 6],
  ['CI/CD', 86, 6],
  ['Webpack', 95, 1],
  ['Vite', 70, 1],
  ['Babel', 90, 1],
  ['HTML5 Canvas', 85, 1],
  ['Angular.js', 80, 1],
  ['Angular', 60, 1],
  ['SCSS', 20, 1],
  ['Deno', 10, 2],
  ['SVG', 60, 1],
  ['Next.js', 80, 1],
  ['Tensorflow.js', 30, 1],
  ['d3.js', 70, 1],
  ['MySQL', 40, 8],
  ['PostgreSQL', 50, 8],
  ['SQLite', 50, 8],
  ['MongoDB', 50, 8],
  ['Firebase', 80, 7],
  ['Google Cloud', 50, 7],
  ['AWS', 50, 7],
  ['Redis', 40, 8],
  ['Kubernetes', 10, 6],
  ['Linux', 50, 6],
  ['Windows', 90, 6],
  ['MacOS', 90, 6],
  ['Ubuntu', 50, 6],
  ['JAMstack', 80, 1],
  ['PWA', 80, 1],
  ['WebAssembly', 80, 1],
  ['WebGL', 80, 1],
  ['nx', 80, 2],
  ['render.com', 80, 7],
  ['Vercel', 80, 7],
  ['Netlify', 80, 7],
  ['Heroku', 80, 7],
  ['DigitalOcean', 80, 7],
  ['Gatsby', 80, 1],
  ['Docusaurus.js', 80, 1],
  ['Storybook', 80, 1],
  ['Material UI', 80, 1],
  ['Ant UI', 80, 1],
  ['Svelte', 10, 1],
  ['SvelteKit', 10, 1],
  ['Vue.js', 10, 1],
  ['Strapi CMS', 10],
  ['Communication Skills', 90, 5],
  ['Teamwork', 90, 5],
  // ['Problem Solving', 90, 5],
  // ['Time Management', 90, 5],
  // ['Leadership', 90, 5],
  // ['Creativity', 90, 5],
  // ['Adaptability', 90, 5],
  ['Organization', 90, 5],
  // ['Attention to Detail', 90, 5],
  // ['Flexibility', 90, 5],
  // ['Self Motivation', 90, 5],
  // ['Critical Thinking', 90, 5],
  // ['Decision Making', 90, 5],
  // ['Analytical Skills', 90, 5],
  ['Data Structures', 70, 10],
  ['Algorithms', 70, 10],
  ['Figma', 60, 4],
  ['Adobe XD', 6, 4],
];

const dataList = skills.map(([State, confidance]) => ({
  State,
  confidance,
})) as dataSchema[];

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
  const data: dataSchema[] = dataList.sort(
    (a, b) => b.confidance - a.confidance
  );

  const columns = Object.keys(data[0]);

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
              // return 'start';
              // return i < (data.length - 1) / 2 ? 'start' : 'end';

              if (i >= length / 2) {
                return 'start';
              }
              return 'end';
            })
            .attr('transform', (d: any, i) => {
              const length = data.length - 1;

              // return 'rotate(0) translate(10,3)';

              // if (i < length / 4) {
              //   return 'rotate(0) translate(10,3)';
              // }
              if (i < length / 2) {
                return `rotate(0) translate(${outerRadius * 0.6},3)`;
              }
              // if (i < (3 * length) / 4) {
              return `rotate(-180) translate(-${outerRadius * 0.7},3)`;
              // }
              return `rotate(160) translate(10,3)`;

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
          .text('Skills & Confidance')
      )
      .call(
        (g: any) =>
          g
            .selectAll('g')
            .data(y.ticks(5).slice(1))
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
