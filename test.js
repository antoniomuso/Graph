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



graph.addIndArcDirect(0,2);
graph.addIndArcDirect(0,1);
graph.addIndArcDirect(1,6);
graph.addIndArcDirect(1,3);
graph.addIndArcDirect(1,4);
graph.addIndArcDirect(2,0);
graph.addIndArcDirect(3,2);
graph.addIndArcDirect(3,6);
graph.addIndArcDirect(4,5);
graph.addIndArcDirect(4,7);
graph.addIndArcDirect(5,7);
graph.addIndArcDirect(7,6);
graph.addIndArcDirect(7,1);





console.log(graph.CFC());


