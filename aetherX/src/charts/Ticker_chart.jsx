
import {
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
} from "recharts";

export default function TickerCharts({ ticker }) {
    const priceData = ticker.spark.map((price, index) => ({
        time: `T${index + 1}`,
        price,
    }));

    const isUp = ticker.change >= 0;

    return (
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-white font-semibold">
                        {ticker.symbol}/USDT
                    </h3>
                    <p className="text-sm text-slate-400">
                        {ticker.name}
                    </p>
                </div>

                <span
                    className={
                        isUp ? "text-green-400" : "text-red-400"
                    }
                >
                    {isUp ? "+" : ""}{ticker.change}%
                </span>
            </div>

            <p className="text-2xl font-bold text-white mt-4">
                ${ticker.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}
            </p>

            <p className="text-xs text-slate-400 mt-1">
                Volume: {ticker.volume}
            </p>

            <div className="h-32 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData}>
                        <Tooltip
                            formatter={(value) => [
                                `$${Number(value).toLocaleString()}`,
                                "Price",
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="price"
                            stroke={isUp ? "#22c55e" : "#ef4444"}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
