module.exports =
    {
        Node: function (name) {
            this.adj = [];
            this.nodeName = name;
            this.nodeNumber;
            this.addArc = function (node) {
                this.adj.push(node);
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
            this.addIndArc = function (intNode1, intNode2) {
                this.addArc(this.getNode(intNode1), this.getNode(intNode2));
            }

            this.addIndArcDirect = function (intNode1, intNode2) {
                this.addArcDirect(this.getNode(intNode1), this.getNode(intNode2));
            }
            this.getNode = function (ind) {
                if (ind < this.allNodes.length) return this.allNodes[ind];
                else throw new Error("there aren't node");

            }
            this.counterTypeArc = function (ind)
            {
                if (ind >= this.allNodes.length) throw new Error("there aren't node");
                var VIS = new Array(this.allNodes.length);
                for (let i = 0; i < VIS.length; i++ ) VIS[i] = 0; // init VIS Array
                
                var father = new Array(this.allNodes.length); // init father Array
                father[ind] = ind;

                var T = new Array(this.allNodes.length);
                for (var i = 0; i < T.length ;i++) T[i] = 0;
                var c = 0;
                var forward = 0;
                var back = 0;
                var crossing = 0;
                var Gthis = this;
                var DFSCounter = function (ind)
                {
                    var node = Gthis.getNode(ind);
                    VIS[ind] ++;
                    T[ind] = ++c;

                    for (let adj of node.adj)
                    {
                        if (VIS[adj.nodeNumber] === 0){
                            father[adj.nodeNumber] = ind;
                            DFSCounter(adj.nodeNumber);
                        } 
                        
                        else if (T[ind] < T[adj.nodeNumber]) forward ++;
                        else if (VIS[adj.nodeNumber] === 1) back ++;
                        else crossing ++;
                    }
                    VIS[ind] ++;
                }
                DFSCounter(ind);

                return {F: forward, B: back, C: crossing, DFSTree: father};
            }
        }










    }