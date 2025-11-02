import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

interface StepDescriptionProps {
  description?: string;
}

export const StepDescription = ({ description }: StepDescriptionProps) => {
  if (!description) return null;

  return (
    <Card className="p-4 bg-accent/10 border-accent/20">
      <div className="flex items-start gap-3">
        <Info className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
        <p className="text-sm text-foreground font-medium">{description}</p>
      </div>
    </Card>
  );
};
