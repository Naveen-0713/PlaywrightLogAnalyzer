import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Chart({ data }) {
  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="users" stroke="#4f46e5" />
    </LineChart>
  );
}