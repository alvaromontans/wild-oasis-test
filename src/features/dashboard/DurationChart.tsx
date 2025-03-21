import styled from "styled-components";
import { BookingInterface } from "../../interfaces/BookingInterface";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../hooks/useDarkMode";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 noche",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 noches",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 noches",
    value: 3,
    color: "#eab308",
  },
  {
    duration: "4-5 noches",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 noches",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 noches",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 noches",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ noches",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 noche",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 noches",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 noches",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 noches",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 noches",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 noches",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 noches",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ noches",
    value: 0,
    color: "#7e22ce",
  },
];

interface Data {
  duration: string;
  value: number;
  color: string;
}

function prepareData(startData: Data[], stays: BookingInterface[]) {
  function incArrayValue(arr: Data[], field: string) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr, cur) => {
      const num = cur.num_nights;
      if (num === 1) return incArrayValue(arr, "1 noche");
      if (num === 2) return incArrayValue(arr, "2 noches");
      if (num === 3) return incArrayValue(arr, "3 noches");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 noches");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 noches");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 noches");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 noches");
      if (num >= 21) return incArrayValue(arr, "21+ noches");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

interface DurationChartProps {
  confirmedStays: BookingInterface[];
}

function DurationChart({ confirmedStays }: DurationChartProps) {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);

  return (
    <ChartBox>
      <Heading as="h2">Duración de estancia</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}
          >
            {startDataLight.map((entry) => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
