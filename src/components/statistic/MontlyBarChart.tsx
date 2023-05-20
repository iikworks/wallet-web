import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend, TooltipItem,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {MonthlyTransactionStatistic} from "../../models/transaction.ts";
import moment from "moment";
import {currencyFormat} from "../../functions.ts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type MonthlyBarChartProps = {
  statistics: MonthlyTransactionStatistic[],
};

export function MonthlyBarChart(props: MonthlyBarChartProps) {
  const options = {
    responsive: true,
    color: '#ffffff',
    scales: {
      x: {
        ticks: {
          color: '#ffffff',
          family: "Wix Madefor Display"
        },
      },
      y: {
        ticks: {
          color: '#ffffff',
          family: "Wix Madefor Display"
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            color: '#ffffff',
            family: "Wix Madefor Display"
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<"bar">) {
            let label = ' ' + context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (props.statistics[context.dataIndex]) {
                label += currencyFormat(props.statistics[context.dataIndex].currency, context.parsed.y);
              }
            }
            return label;
          }
        }
      }
    },
  };

  const labels = props.statistics.map(statistic => {
    const date = moment(statistic.month);

    let month = 'Январь';
    switch (date.format("MM")) {
      case "02":
        month = 'Февраль';
        break;
      case "03":
        month = 'Март';
        break;
      case "04":
        month = 'Апрель';
        break;
      case "05":
        month = 'Май';
        break;
      case "06":
        month = 'Июнь';
        break;
      case "07":
        month = 'Июль';
        break;
      case "08":
        month = 'Август';
        break;
      case "09":
        month = 'Сентябрь';
        break;
      case "10":
        month = 'Октябрь';
        break;
      case "11":
        month = 'Ноябрь';
        break;
      case "12":
        month = 'Декабрь';
        break;
    }

    return `${month}, ${date.format("YYYY")} г.`
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Списания',
        data: props.statistics.map(statistic => statistic.withdrawal_total),
        backgroundColor: 'rgba(248, 113, 113, 0.5)',
      },
      {
        label: 'Пополнения',
        data: props.statistics.map(statistic => statistic.topup_total),
        backgroundColor: 'rgb(74, 222, 128, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
