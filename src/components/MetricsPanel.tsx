import { Card } from "@/components/ui/card";
import { Activity, ArrowLeftRight, Eye, Clock } from "lucide-react";

interface MetricsPanelProps {
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  currentStep: number;
  totalSteps: number;
  timeComplexity: string;
}

export const MetricsPanel = ({
  comparisons,
  swaps,
  arrayAccesses,
  currentStep,
  totalSteps,
  timeComplexity,
}: MetricsPanelProps) => {
  const metrics = [
    { label: "Comparisons", value: comparisons, icon: Activity, color: "text-yellow-600" },
    { label: "Swaps", value: swaps, icon: ArrowLeftRight, color: "text-orange-600" },
    { label: "Array Accesses", value: arrayAccesses, icon: Eye, color: "text-blue-600" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Real-Time Metrics</h3>
      
      <div className="space-y-4">
        {/* Step Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-mono font-medium text-foreground">
              {currentStep} / {totalSteps}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Operation Metrics */}
        <div className="grid grid-cols-1 gap-3">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                </div>
                <span className="text-lg font-mono font-semibold text-foreground">
                  {metric.value}
                </span>
              </div>
            );
          })}
        </div>

        {/* Time Complexity */}
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Time Complexity</span>
          </div>
          <div className="bg-primary/10 p-3 rounded-lg">
            <p className="text-2xl font-mono font-bold text-primary text-center">
              {timeComplexity}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
