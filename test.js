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




graph.addIndArcWDirect(0,1,4);
graph.addIndArcWDirect(1,5,1);
graph.addIndArcWDirect(0,2,17);
graph.addIndArcWDirect(1,2,6);
graph.addIndArcWDirect(2,3,5);
graph.addIndArcWDirect(5,3,4);
graph.addIndArcWDirect(5,4,12);
graph.addIndArcWDirect(3,4,10);






console.log(graph.Dijkstra(0));


