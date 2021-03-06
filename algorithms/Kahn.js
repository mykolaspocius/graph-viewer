import {Algorithm} from "./Algorithm.js";
import {Queue} from "../data_structures/Queue.js";

class Kahn extends Algorithm {
    constructor(name) {
        super(name)
        this.output.visited_nodes = []
        this.removedEdges = []
    }

    run(graph) {
        this.output.visited_nodes.length = 0
        this.removedEdges.length = 0
        this.graph = graph
        this.kahnAlgorithm(graph)
        this.removedEdges.forEach(edge => {
            graph.addEdge(edge.u, edge.v, edge.w)
        })
    }

    kahnAlgorithm(graph) {
        let queue = new Queue()

        graph.nodes.forEach(node => {
            if (this.hasNoPredecesor(node, graph)) {
                queue.enqueue(node)
            }
        })

        while (!queue.isEmpty()) {
            let u = queue.dequeue()
            this.output.visited_nodes.push(u)
            graph.getAdjacentTo(u).forEach(v => {
                let w = graph.getWeight(u,v)
                this.removedEdges.push({u, v, w})
                graph.removeEdge(u, v)

                if (this.hasNoPredecesor(v, graph)) queue.enqueue(v)
            })
        }
    }

    hasNoPredecesor(node, graph) {
        let nodeIndex = graph.nodes.indexOf(node)
        let matrix = graph.insMatrix
        for (let i=0; i<matrix.size; i++) {
            if (matrix.rows[i][nodeIndex] !== 0) return false
        }
        return true
    }

    showSource() {
        return this.kahnAlgorithm.toString()
    }
}

export {Kahn}
