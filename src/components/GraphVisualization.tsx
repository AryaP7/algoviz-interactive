import { Card } from "@/components/ui/card";
import { GraphData } from "@/types/algorithms";

interface GraphVisualizationProps {
  graph: GraphData;
  visited?: number[];
  current?: number;
  path?: number[];
}

export const GraphVisualization = ({ graph, visited = [], current, path = [] }: GraphVisualizationProps) => {
  const getNodeColor = (nodeId: number) => {
    if (current === nodeId) return "hsl(var(--algo-swapping))";
    if (path.includes(nodeId)) return "hsl(var(--algo-pivot))";
    if (visited.includes(nodeId)) return "hsl(var(--algo-sorted))";
    return "hsl(var(--primary))";
  };

  const getNodeStroke = (nodeId: number) => {
    if (current === nodeId) return "4";
    return "2";
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-background border-border">
      <svg width="100%" height="400" viewBox="0 0 800 400" className="w-full">
        {/* Draw edges */}
        {graph.edges.map((edge, index) => {
          const fromNode = graph.nodes.find((n) => n.id === edge.from);
          const toNode = graph.nodes.find((n) => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const isInPath = path.includes(edge.from) && path.includes(edge.to);

          return (
            <g key={`edge-${index}`}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isInPath ? "hsl(var(--algo-pivot))" : "hsl(var(--border))"}
                strokeWidth={isInPath ? "3" : "2"}
                className="transition-all duration-300"
              />
              {edge.weight !== undefined && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2}
                  fill="hsl(var(--muted-foreground))"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="select-none"
                >
                  {edge.weight}
                </text>
              )}
            </g>
          );
        })}

        {/* Draw nodes */}
        {graph.nodes.map((node) => (
          <g key={node.id} className="transition-all duration-300">
            <circle
              cx={node.x}
              cy={node.y}
              r="25"
              fill={getNodeColor(node.id)}
              stroke="hsl(var(--foreground))"
              strokeWidth={getNodeStroke(node.id)}
              className="transition-all duration-300"
              style={{
                filter: current === node.id ? "drop-shadow(0 0 10px hsl(var(--algo-swapping)))" : "none"
              }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              fill="white"
              fontSize="16"
              fontWeight="bold"
              textAnchor="middle"
              className="select-none"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--primary))" }} />
          <span className="text-muted-foreground">Unvisited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--algo-swapping))" }} />
          <span className="text-muted-foreground">Current</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--algo-sorted))" }} />
          <span className="text-muted-foreground">Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(var(--algo-pivot))" }} />
          <span className="text-muted-foreground">Path</span>
        </div>
      </div>
    </Card>
  );
};
