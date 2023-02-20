import { getDataFromGoogleSheet } from '../lib/googleSheet';
import styles from './index.module.css';
import React, { useEffect } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useWindowSize } from '../lib/hook';

function Graph({ data }) {
  const { width, height } = useWindowSize();

  return (
    <ResponsiveContainer width={width} height={height}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="confidance" name="Confidance" unit="%" />
        <YAxis type="number" dataKey="years" name="Year(s)" unit="" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function BarChart({ skills, categories }) {
  return (
    <div className={styles.barChartContainer}>
      {skills.map(({ skill, confidance, field }) => {
        return (
          <div key={skill} className={styles.barContainer}>
            <div
              className={styles.bar}
              style={{
                width: `${confidance}%`,
              }}
            >
              <span>{skill}</span>
              <span>{confidance}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Index({ skills, categories }) {
  // console.table(skills);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Skills vs Confidance</h2>
      {/* {skills.map(({ skill, confidance, field }) => {
        console.log({ skill });
        return <div key={skill}>{skill}</div>;
      })} */}
      {/* <Graph data={skills} /> */}
      {/* <Example /> */}
      <BarChart skills={skills} categories={categories} />
    </div>
  );
}

export async function getStaticProps() {
  const { skills, categories } = await getDataFromGoogleSheet();

  return {
    props: {
      title: 'Welcome to nextjs-with-nx!',
      skills,
      categories,
    },
  };
}

export default Index;
