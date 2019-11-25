import { quote } from '../overmind/api/types';

enum operation {
  MULTIPLY,
  DIVIDE
}

type quoteOperation = {
  quote: string;
  op: operation;
  asset: string;
};

class Graph implements Graph {
  private nodes: string[] = [];
  private mappedQuotes: { [key: string]: quote } = {};
  private edges: { [key: string]: string[] } = {};
  private edgeWeights: { [key: string]: number } = {};
  private quotes: { [key: string]: quoteOperation } = {};

  init(data: quote[]) {
    data.forEach(({ asset, quote, startDate }) => {
      const [u, v] = asset.split('/');
      this.mappedQuotes[asset] = { asset, quote, startDate };
      this.addNode(u);
      this.addNode(v);
      this.addEdge(u, v);
      this.addEdge(v, u);
      this.addQuote(u, v, {
        quote,
        op: operation.MULTIPLY,
        asset: this.encodeEdge(u, v)
      });
      this.addQuote(v, u, {
        quote,
        op: operation.DIVIDE,
        asset: this.encodeEdge(v, u)
      });
    });
    return this;
  }

  addQuote(u: string, v: string, quoteOp: quoteOperation) {
    this.quotes[this.encodeEdge(u, v)] = quoteOp;
  }

  getQuote(u: string, v: string) {
    return this.quotes[this.encodeEdge(u, v)];
  }

  addNode(node: string) {
    if (this.nodes.indexOf(node) === -1) this.nodes.push(node);
    this.edges[node] = this.adjacent(node);
  }

  adjacent(node: string | null) {
    return node && this.edges[node] ? this.edges[node] : [];
  }

  encodeEdge(u: string, v: string) {
    return u + '|' + v;
  }

  setEdgeWeight(u: string, v: string, weight: number) {
    this.edgeWeights[this.encodeEdge(u, v)] = weight;
  }

  getEdgeWeight(u: string, v: string) {
    const weight = this.edgeWeights[this.encodeEdge(u, v)];
    return weight === undefined ? 1 : weight;
  }

  addEdge(u: string, v: string, weight = 1) {
    this.adjacent(u).push(v);

    if (weight !== undefined) {
      this.setEdgeWeight(u, v, weight);
    }
  }

  removeEdge(u: string, v: string) {
    if (this.edges[u]) {
      this.edges[u] = this.adjacent(u).filter(_v => _v !== v);
    }
  }

  removeNode(node: string) {
    // Remove incoming edges.
    Object.keys(this.edges).forEach(u => {
      this.edges[u].forEach(v => {
        if (v === node) {
          this.removeEdge(u, v);
        }
      });
    });

    // Remove outgoing edges (and signal that the node no longer exists).
    delete this.edges[node];
    this.nodes = this.nodes.filter(u => u === node);
  }

  getNodes() {
    return this.nodes;
  }

  getMappedQuotes() {
    return this.mappedQuotes;
  }

  shortestPath(source: string, destination: string) {
    // Upper bounds for shortest path weights from source.
    const d: { [key: string]: number } = {};

    // Predecessors.
    const p: { [key: string]: string } = {};

    // Poor man's priority queue, keyed on d.
    let q: { [key: string]: boolean } = {};

    const initializeSingleSource = () => {
      for (const node of this.nodes) {
        d[node] = Infinity;
      }
      if (d[source] !== Infinity) {
        throw new Error('Source node is not in the graph');
      }
      if (d[destination] !== Infinity) {
        throw new Error('Destination node is not in the graph');
      }
      d[source] = 0;
    };

    // Adds entries in q for all nodes.
    const initializePriorityQueue = () => {
      for (const node of this.nodes) {
        q[node] = true;
      }
    };

    // Returns true if q is empty.
    const priorityQueueEmpty = () => {
      return Object.keys(q).length === 0;
    };

    // Linear search to extract (find and remove) min from q.
    const extractMin = () => {
      let min = Infinity;
      let minNode: string | undefined;
      Object.keys(q).forEach(function(node) {
        if (d[node] < min) {
          min = d[node];
          minNode = node;
        }
      });
      if (minNode === undefined) {
        // If we reach here, there's a disconnected subgraph, and we're done.
        q = {};
        return '';
      }
      delete q[minNode];
      return minNode;
    };

    const relax = (u: string, v: string) => {
      const w = this.getEdgeWeight(u, v);
      if (d[v] > d[u] + w) {
        d[v] = d[u] + w;
        p[v] = u;
      }
    };

    const dijkstra = () => {
      initializeSingleSource();
      initializePriorityQueue();
      while (!priorityQueueEmpty()) {
        const u = extractMin();
        this.adjacent(u).forEach(v => {
          relax(u, v);
        });
      }
    };

    // Assembles the shortest path by traversing the
    // predecessor subgraph from destination to source.
    const path = () => {
      const nodeList = [];
      // let weight = 0;
      let node = destination;
      while (p[node]) {
        nodeList.push(node);
        // weight += this.getEdgeWeight(p[node], node);
        node = p[node];
      }
      if (node !== source) {
        throw new Error('No path found');
      }
      nodeList.push(node);
      nodeList.reverse();
      // nodeList.weight = weight;
      return nodeList;
    };

    dijkstra();

    return path();
  }

  getOperations(u: string, v: string) {
    const path = this.shortestPath(u, v);
    const operations = [];
    for (let i = 0; i <= path.length; i++) {
      const quote = this.getQuote(path[i], path[i + 1]);
      if (quote) operations.push(quote);
    }
    return operations;
  }

  calculate(amount: number, u: string, v: string) {
    const operations = this.getOperations(u, v);
    console.log('operations', operations);
    const result = operations.reduce((reducer, { quote, op }) => {
      if (op === operation.MULTIPLY) reducer *= Number(quote);
      if (op === operation.DIVIDE) reducer /= Number(quote);
      return reducer;
    }, amount);
    return String(Math.round(result * 100) / 100);
  }
}

export default Graph;
