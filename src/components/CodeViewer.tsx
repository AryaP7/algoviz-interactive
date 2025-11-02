import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, BookOpen, Info } from "lucide-react";

interface CodeViewerProps {
  code: string;
  description: string;
  algorithmName: string;
  timeComplexity: { best: string; average: string; worst: string };
  spaceComplexity: string;
  currentLine?: number;
}

export const CodeViewer = ({
  code,
  description,
  algorithmName,
  timeComplexity,
  spaceComplexity,
  currentLine,
}: CodeViewerProps) => {
  const codeLines = code.split("\n");

  return (
    <Card className="h-full flex flex-col">
      <Tabs defaultValue="code" className="flex-1 flex flex-col">
        <div className="border-b border-border px-4 py-2">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="code" className="gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="description" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Description
            </TabsTrigger>
            <TabsTrigger value="complexity" className="gap-2">
              <Info className="h-4 w-4" />
              Complexity
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="code" className="flex-1 p-4 mt-0 overflow-auto">
          <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm">
            {codeLines.map((line, index) => (
              <div
                key={index}
                className={`py-0.5 px-2 -mx-2 rounded ${
                  currentLine === index + 1
                    ? "bg-accent/20 border-l-2 border-accent"
                    : ""
                }`}
              >
                <span className="text-muted-foreground mr-4 select-none inline-block w-6 text-right">
                  {index + 1}
                </span>
                <span className="text-foreground">{line || " "}</span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="description" className="flex-1 p-6 mt-0 overflow-auto">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <h3 className="text-xl font-bold text-foreground mb-4">{algorithmName}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </TabsContent>

        <TabsContent value="complexity" className="flex-1 p-6 mt-0 overflow-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Time Complexity</h3>
              <div className="grid gap-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  <span className="text-sm text-muted-foreground">Best Case</span>
                  <span className="text-lg font-mono font-bold text-green-600 dark:text-green-400">
                    {timeComplexity.best}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <span className="text-sm text-muted-foreground">Average Case</span>
                  <span className="text-lg font-mono font-bold text-yellow-600 dark:text-yellow-400">
                    {timeComplexity.average}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  <span className="text-sm text-muted-foreground">Worst Case</span>
                  <span className="text-lg font-mono font-bold text-red-600 dark:text-red-400">
                    {timeComplexity.worst}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Space Complexity</h3>
              <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
                <span className="text-sm text-muted-foreground">Auxiliary Space</span>
                <span className="text-2xl font-mono font-bold text-primary">
                  {spaceComplexity}
                </span>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
