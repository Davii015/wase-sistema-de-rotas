import { useEffect, useMemo, useState } from "react";

const NODES = [
  { id: "Casa", x: 100, y: 300 },
  { id: "Praça", x: 250, y: 150 },
  { id: "Escola", x: 250, y: 400 },
  { id: "Shopping", x: 450, y: 150 },
  { id: "Hospital", x: 650, y: 300 },
  { id: "Universidade", x: 850, y: 150 },
];

const EDGES = [
  { from: "Casa", to: "Praça", weight: 2 },
  { from: "Casa", to: "Escola", weight: 4 },
  { from: "Praça", to: "Shopping", weight: 3 },
  { from: "Escola", to: "Hospital", weight: 5 },
  { from: "Shopping", to: "Hospital", weight: 2 },
  { from: "Hospital", to: "Universidade", weight: 4 },
];

const GRAPH = {
  Casa: { Praça: 2, Escola: 4 },
  Praça: { Casa: 2, Shopping: 3 },
  Escola: { Casa: 4, Hospital: 5 },
  Shopping: { Praça: 3, Hospital: 2 },
  Hospital: { Escola: 5, Shopping: 2, Universidade: 4 },
  Universidade: { Hospital: 4 },
};

const NODE_MAP = Object.fromEntries(NODES.map((node) => [node.id, node]));

function dijkstra(graph, start, end) {
  const distances = {};
  const previous = {};
  const visited = new Set();
  const queue = [];

  Object.keys(graph).forEach((vertex) => {
    distances[vertex] = Infinity;
    previous[vertex] = null;
  });

  distances[start] = 0;
  queue.push({ node: start, distance: 0 });

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance - b.distance);
    const current = queue.shift().node;

    if (visited.has(current)) continue;
    visited.add(current);

    if (current === end) break;

    for (const neighbor in graph[current]) {
      const newDistance = distances[current] + graph[current][neighbor];

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = current;
        queue.push({ node: neighbor, distance: newDistance });
      }
    }
  }

  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return { path, distance: distances[end] };
}

export default function App() {
  const [origin, setOrigin] = useState("Casa");
  const [destination, setDestination] = useState("Universidade");
  const [progress, setProgress] = useState(0);

  const result = useMemo(
    () => dijkstra(GRAPH, origin, destination),
    [origin, destination],
  );

  useEffect(() => {
    let animationFrameId;
    let startTime;

    function animate(timestamp) {
      startTime ??= timestamp;
      const nextProgress = Math.min((timestamp - startTime) / 1200, 1);

      setProgress(nextProgress);

      if (nextProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [origin, destination]);

  const segments = [];

  for (let index = 0; index < result.path.length - 1; index += 1) {
    segments.push([result.path[index], result.path[index + 1]]);
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ textAlign: "center", padding: 20 }}>
        Sistema de Rotas Urbanas
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        <select value={origin} onChange={(event) => setOrigin(event.target.value)}>
          {NODES.map((node) => (
            <option key={node.id}>{node.id}</option>
          ))}
        </select>

        <select
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        >
          {NODES.map((node) => (
            <option key={node.id}>{node.id}</option>
          ))}
        </select>
      </div>

      <p style={{ textAlign: "center" }}>
        Menor caminho: {result.path.join(" → ")} | Distância: {result.distance}
      </p>

      <svg width="100%" height="500">
        {EDGES.map((edge) => {
          const from = NODE_MAP[edge.from];
          const to = NODE_MAP[edge.to];
          const isOnPath = segments.some(
            (segment) =>
              (segment[0] === edge.from && segment[1] === edge.to) ||
              (segment[1] === edge.from && segment[0] === edge.to),
          );

          let x2 = to.x;
          let y2 = to.y;

          if (isOnPath) {
            x2 = from.x + (to.x - from.x) * progress;
            y2 = from.y + (to.y - from.y) * progress;
          }

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={from.x}
                y1={from.y}
                x2={x2}
                y2={y2}
                stroke={isOnPath ? "cyan" : "gray"}
                strokeWidth="6"
              />

              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2}
                fill="white"
              >
                {edge.weight}
              </text>
            </g>
          );
        })}

        {NODES.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={
                node.id === origin
                  ? "green"
                  : node.id === destination
                    ? "purple"
                    : "white"
              }
            />

            <text
              x={node.x}
              y={node.y + 40}
              fill="white"
              textAnchor="middle"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
