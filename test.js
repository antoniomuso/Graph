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


graph.addIndArcDirect(0,1);
graph.addIndArcDirect(2,5);
graph.addIndArcDirect(0,2);
graph.addIndArcDirect(2,1);
graph.addIndArcDirect(2,3);
graph.addIndArcDirect(4,2);
graph.addIndArcDirect(3,4);
graph.addIndArcDirect(0,5);




console.log(graph.counterTypeArc(0));


