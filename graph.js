module.exports =
    {
        Node: function (name) {
            this.adj = [];
            this.nodeName = name;
            this.nodeNumber;
            this.addArc = function (node) {
                this.adj.push(node);
            }
            this.addWeightedArc = function (node, weight) {
                this.adj.push({
                    n: node,
                    w: weight
                });
            }
            this.removeArc = function (node) {
                for (let i = 0; i < adj.length; i++) if (adj[i].nodeName === node.nodeName) this.adj = adj.splice(i, i);
            }

        },
        Graph: function () {
            this.allNodes = [];
            this.counter = 0;
            this.addNode = function (node) {
                node.nodeNumber = this.counter;
                this.allNodes[node.nodeNumber] = node;
                this.counter++;
            }
            this.addArcDirect = function (node1, node2) {
                if (node1.nodeNumber != undefined
                    && node2.nodeNumber != undefined
                    && this.allNodes[node1.nodeNumber] != undefined
                    && this.allNodes[node2.nodeNumber] != undefined) this.allNodes[node1.nodeNumber].addArc(this.allNodes[node2.nodeNumber]);
                else throw new Error("Nodes are not been added in Graph");
            }
            this.addArc = function (node1, node2) {
                if (node1.nodeNumber != undefined
                    && node2.nodeNumber != undefined
                    && this.allNodes[node1.nodeNumber] != undefined
                    && this.allNodes[node2.nodeNumber] != undefined) {
                    this.allNodes[node1.nodeNumber].addArc(this.allNodes[node2.nodeNumber]);
                    this.allNodes[node2.nodeNumber].addArc(this.allNodes[node1.nodeNumber]);
                }
                else throw new Error("Nodes are not been added in Graph");

            }
            this.addWArc = function (node1, node2, weight) {
                if (node1.nodeNumber != undefined
                    && node2.nodeNumber != undefined
                    && this.allNodes[node1.nodeNumber] != undefined
                    && this.allNodes[node2.nodeNumber] != undefined) {
                    this.allNodes[node1.nodeNumber].addWeightedArc(this.allNodes[node2.nodeNumber],weight);
                    this.allNodes[node2.nodeNumber].addWeightedArc(this.allNodes[node1.nodeNumber],weight);
                }
                else throw new Error("Nodes are not been added in Graph");

            }
            this.addIndArc = function (intNode1, intNode2) {
                this.addArc(this.getNode(intNode1), this.getNode(intNode2));
            }

            this.addIndArcDirect = function (intNode1, intNode2) {
                this.addArcDirect(this.getNode(intNode1), this.getNode(intNode2));
            }

            this.addArcWDirect = function (node1, node2, weight) {
                if (node1.nodeNumber != undefined
                    && node2.nodeNumber != undefined
                    && this.allNodes[node1.nodeNumber] != undefined
                    && this.allNodes[node2.nodeNumber] != undefined) this.allNodes[node1.nodeNumber].addWeightedArc(this.allNodes[node2.nodeNumber], weight);
                else throw new Error("Nodes are not been added in Graph");
            }
            this.addIndWArc = function (intNode1, intNode2, weight) {
                this.addWArc(this.getNode(intNode1), this.getNode(intNode2), weight);
            }

            this.addIndArcWDirect = function (intNode1, intNode2, weight) {
                this.addArcWDirect(this.getNode(intNode1), this.getNode(intNode2), weight);
            }

            this.getNode = function (ind) {
                if (ind < this.allNodes.length) return this.allNodes[ind];
                else throw new Error("there aren't node");

            }
            this.counterTypeArc = function (ind) {
                if (ind >= this.allNodes.length) throw new Error("there aren't node");
                var VIS = new Array(this.allNodes.length);
                for (let i = 0; i < VIS.length; i++) VIS[i] = 0; // init VIS Array

                var father = new Array(this.allNodes.length); // init father Array
                father[ind] = ind;

                var T = new Array(this.allNodes.length);
                for (var i = 0; i < T.length; i++) T[i] = 0;
                var c = 0;
                var forward = 0;
                var back = 0;
                var crossing = 0;
                var Gthis = this;
                var DFSCounter = function (ind) {
                    var node = Gthis.getNode(ind);
                    VIS[ind]++;
                    T[ind] = ++c;

                    for (let adj of node.adj) {
                        if (VIS[adj.nodeNumber] === 0) {
                            father[adj.nodeNumber] = ind;
                            DFSCounter(adj.nodeNumber);
                        }

                        else if (T[ind] < T[adj.nodeNumber]) forward++;
                        else if (VIS[adj.nodeNumber] === 1) back++;
                        else crossing++;
                    }
                    VIS[ind]++;
                }
                DFSCounter(ind);

                return { F: forward, B: back, C: crossing, DFSTree: father };
            }
            this.thereAreLoopDirect = function (ind) { // I don't use counterTypeArc only for learning
                if (ind >= this.allNodes.length) throw new Error("there aren't node");
                var VIS = new Array(this.allNodes.length);
                for (let i = 0; i < VIS.length; i++) VIS[i] = 0; // init VIS Array

                var father = new Array(this.allNodes.length); // init father Array
                father[ind] = ind;

                var T = new Array(this.allNodes.length);
                for (var i = 0; i < T.length; i++) T[i] = 0;

                var count = 0;
                var Gthis = this;

                var thereAreLoop = function (ind) {
                    VIS[ind] = 1;
                    T[ind] = ++count;
                    for (let node of Gthis.getNode(ind).adj) {
                        if (VIS[node.nodeNumber] === 0) {
                            father[node.nodeNumber] = ind;
                            var loop = thereAreLoop(node.nodeNumber);
                            if (loop) return true;
                        } else if (T[ind] > T[node.nodeNumber] && VIS[node.nodeNumber] === 1) return true;

                    }
                    VIS[ind] = 2;
                    return false;

                }
                return thereAreLoop(ind);
            }

            this.BFS = function (ind) {
                var queue = [];
                queue.push(this.getNode(ind));
                var VIS = new Array(this.allNodes.length);
                for (let i = 0; i < VIS.length; i++) VIS[i] = -1; // init VIS Array
                VIS[ind] = ind;
                while (queue.length !== 0) {
                    var node = queue.pop();
                    for (nod of node.adj) {
                        if (VIS[nod.nodeNumber] === -1) {
                            VIS[nod.nodeNumber] = node.nodeNumber;
                            queue.push(nod);
                        }
                    }
                }
                return { fatherVector: VIS };
            }



            this.CFC = function () {
                var VIS = new Array(this.allNodes.length);
                for (let i = 0; i < VIS.length; i++) VIS[i] = 0; // init VIS Array
                var visit = 0;
                var ncc = 0;
                var CC = new Array(this.allNodes.length);
                for (let i = 0; i < CC.length; i++) CC[i] = 0; // init CC Array
                var gThis = this;
                var stack = [];
                var DFS_CFC = function (ind) {
                    VIS[ind] = ++visit;
                    var node = gThis.getNode(ind)
                    stack.push(node);
                    var back = VIS[ind];
                    for (let nod of node.adj) {
                        if (VIS[nod.nodeNumber] === 0) {
                            var backFunk = DFS_CFC(nod.nodeNumber);
                            back = Math.min(back, backFunk);
                        } else if (CC[nod.nodeNumber] === 0) {
                            back = Math.min(back, VIS[nod.nodeNumber]);
                        }
                    }
                    if (back === VIS[ind]) {
                        ncc++;
                        do {
                            var node = stack.pop();
                            CC[node.nodeNumber] = ncc;
                        } while (node.nodeNumber !== ind);
                    }
                    return back;
                }
                for (let i = 0; i < VIS.length; i++) {
                    if (VIS[i] === 0) {
                        DFS_CFC(i);
                    }
                }
                return { ConnessComponent: CC, numCC: ncc };

            }

            this.Dijkstra = function (ind) { //O(2n) + O(n*2n + m) = O(n^2)
                var dist = new Array(this.allNodes.length);
                for (let i = 0; i < dist.length; i++) dist[i] = Number.POSITIVE_INFINITY; // init VIS Array || O(n)
                dist[ind] = 0;

                var father = new Array(this.allNodes.length); // init father Array
                for (let i = 0; i < father.length; i++) father[i] = -1; // init VIS Array || O(n)
                father[ind] = ind;

                var A = this.allNodes.slice();
                while (A.length !== 0) {
                    // find min DIST node in O(n)
                    var min = (function () {
                        var nodeMin = A[0];
                        for (node of A) {
                            if (dist[node.nodeNumber] < dist[nodeMin.nodeNumber]) {
                                nodeMin = node;
                            }
                        }
                        return nodeMin;
                    })(); 
                    for (let i = 0; i < A.length; i++) if (A[i].nodeNumber === min.nodeNumber) {
                        A.splice(i, 1); // remove node from A || O(1)
                    } // O(n)
                    for (arc of min.adj) { // O(adj of min)
                        if (dist[min.nodeNumber] + arc.w < dist[arc.n.nodeNumber]) {
                            dist[arc.n.nodeNumber] = dist[min.nodeNumber] + arc.w;
                            father[arc.n.nodeNumber] = min.nodeNumber;
                        }
                    }
                }
                return father;
            }

            this.tools = require("./other_graph_script/fathers_script.js");

            this.PrimAlgorithm = function () {

                var fatherTree = new Array(this.allNodes.length)
                for (let i = 0; i < fatherTree.length;i++) fatherTree[i] = -1
                var node = this.allNodes[0]
                fatherTree[node.nodeNumber] = node.nodeNumber
                var costo = new Array(this.allNodes.length)
                for (let i = 0; i < costo.length; i++) costo[i] = Number.POSITIVE_INFINITY; // init VIS Array || O(n)
                var A = this.allNodes.slice()
                costo[0] = 0
                while (A.length !== 0) {
                    let nodeMin = (function () {
                        min = A[0]
                        for (let i = 0; i < A.length; i++) {
                            if (costo[A[i].nodeNumber] <= costo[min.nodeNumber]) {
                                min = costo[A[i].nodeNumber]
                                node = A[i]
                            }
                        }
                        return node
                    })()
                    console.log(nodeMin)
                    for (let i = 0; i < A.length; i++) {
                        if (nodeMin.nodeNumber === A[i].nodeNumber) {
                            A.splice(i,1)
                            break
                        }
                    }
                    for (let a of nodeMin.adj) {
                        if (a.w < costo[a.n.nodeNumber] && fatherTree[nodeMin.nodeNumber] !== a.n.nodeNumber) {
                            costo[a.n.nodeNumber] = a.w
                            fatherTree[a.n.nodeNumber] = nodeMin.nodeNumber
                        }
                    }
                }
                return [fatherTree,costo]
            }
            this.BFSDist = function (u) {
                var VIS = new Array(this.allNodes.length);
                for (let i = 0; i < VIS.length; i++) VIS[i] = 0; // init VIS Array

                var DIST = new Array(this.allNodes.length);
                for (let i = 0; i < DIST.length; i++) DIST[i] = -1; // init DIST Array

                var PHAD = new Array(this.allNodes.length);
                for (let i = 0; i < PHAD.length; i++) PHAD[i] = -1; // init PHAD Array
                var queue = []
                var nod = this.getNode(u)
                queue.push(nod)
                VIS[nod.nodeNumber] = 1
                PHAD[nod.nodeNumber] = nod.nodeNumber
                while (queue.length !== 0) {
                    let s = queue.shift()
                    DIST[s.nodeNumber] = DIST[PHAD[s.nodeNumber]] + 1
                    for (node of s.adj) {
                        if (VIS[node.nodeNumber] === 0) {
                            VIS[node.nodeNumber] = 1
                            PHAD[node.nodeNumber] = s.nodeNumber
                            queue.push(node)
                        }
                    }

                }
                return DIST
            }
            this.allNodeSameDistanceFrom = function (u,v) {
                var uDist = this.BFSDist(u)
                var vDist = this.BFSDist(v)
                var result = []
                for (let i = 0; i < uDist.length; i++) {
                    if (uDist[i] === vDist[i]) {
                        result.push(this.getNode(i))
                    }
                }
                return result
            }
            /**
             * @param array1
             * @param array2
             */
            this.distanceINodes = function (array1, array2) {
                var queue = []
                var DIST = new Array(this.allNodes.length);
                var VIS = new Array(this.allNodes.length);
                var FATH = new Array(this.allNodes.length);

                for (let i = 0; i < VIS.length; i++) VIS[i] = 0; // init VIS Array
                for (let i = 0; i < DIST.length; i++) DIST[i] = -1; // init DIST Array
                for (let i = 0; i < FATH.length; i++) FATH[i] = -1; // init FATH Array

                for (let i = 0; i < array1.length; i++) {
                    if (array1[i] === 1) {
                        if (array2[i] === 1) return 0
                        queue.push(this.getNode(i))
                        VIS[i] = 1
                        FATH[i] = i
                    }
                }
                while (queue.length !== 0) {
                    let node = queue.shift()
                    DIST[node.nodeNumber] = DIST[FATH[node.nodeNumber]] + 1
                    if (array2[node.nodeNumber] === 1) return DIST[node.nodeNumber]
                    for (nod of node.adj) {
                        if (VIS[nod.nodeNumber] === 0) {
                            VIS[nod.nodeNumber] = 1
                            FATH[nod.nodeNumber] = node.nodeNumber
                            queue.push(nod)
                        }
                    }


                }

            }

        }
        







    }