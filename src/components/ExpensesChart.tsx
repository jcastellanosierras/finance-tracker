import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface CategoryTotal {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function ExpensesChart({ data }: { data: CategoryTotal[] }) {
  return (
    <div className="h-fit">
      <h3 className="text-lg font-semibold mb-4">Distribución de Gastos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="40%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) =>
              new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
              }).format(value)
            }
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}