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




graph.addIndArc(0,1,5);
graph.addIndArc(1,5,1);
graph.addIndArc(0,2,17);
graph.addIndArc(1,2,6);
graph.addIndArc(2,3,5);
graph.addIndArc(5,3,4);
graph.addIndArc(5,4,12);
graph.addIndArc(3,4,10);







//console.log(graph.Dijkstra(0));
//console.log(graph.tools.fatherDistance([2,3,2,4,2,3,4,0],0,2))
//console.log(graph.tools.nodeRooted([2,3,2,4,2,3,4,0],4));
console.log(graph.allNodeSameDistanceFrom(1,4))

