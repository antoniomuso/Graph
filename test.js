var graphModule = require("./graph.js");
var Node = graphModule.Node;
var Graph = graphModule.Graph;

var graph = new Graph();
graph.addNode(new Node("1"));
graph.addNode(new Node("2"));
graph.addNode(new Node("3"));
graph.addNode(new Node("4"));
graph.addNode(new Node("5"));
graph.addNode(new Node("6"));
graph.addNode(new Node("7"));
graph.addNode(new Node("8"));
graph.addNode(new Node("9"));
graph.addNode(new Node("10"));
graph.addNode(new Node("11"));
graph.addNode(new Node("12"));
graph.addNode(new Node("13"));
graph.addNode(new Node("14"));
graph.addNode(new Node("15"));




graph.addIndArc(0, 1);
graph.addIndArc(0, 12);
graph.addIndArc(0, 11);
graph.addIndArc(12, 11);
graph.addIndArc(11, 1);
graph.addIndArc(1, 2);
graph.addIndArc(1, 10);
graph.addIndArc(2, 13);
graph.addIndArc(2, 9);
graph.addIndArc(2, 3);
graph.addIndArc(10, 9);
graph.addIndArc(10, 8);
graph.addIndArc(10, 14);
graph.addIndArc(14, 8);
graph.addIndArc(8, 9);
graph.addIndArc(8, 4);
graph.addIndArc(8, 7);
graph.addIndArc(7, 5);
graph.addIndArc(5, 4);
graph.addIndArc(5, 6);
graph.addIndArc(6, 13);
graph.addIndArc(13, 4);
graph.addIndArc(3, 4);







//console.log(graph.Dijkstra(0));
//console.log(graph.tools.fatherDistance([2,3,2,4,2,3,4,0],0,2))
//console.log(graph.tools.nodeRooted([2,3,2,4,2,3,4,0],4));
var first = new Array(graph.allNodes.length)
for (let i = 0; i < first.length; i++) first[i] = 0; // init VIS Array
first[14] = 1
first[8] = 1
first[0] = 1

var first2 = new Array(graph.allNodes.length)
for (let i = 0; i < first2.length; i++) first2[i] = 0; // init VIS Array
first2[8] = 1
first2[1] = 1
console.log(graph.distanceINodes(first2,first))

