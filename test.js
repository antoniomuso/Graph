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


graph.addIndArc(0,1);
graph.addIndArc(2,5);
graph.addIndArc(0,2);
graph.addIndArc(2,1);
graph.addIndArc(2,3);
graph.addIndArc(4,2);
graph.addIndArc(3,4);
graph.addIndArc(0,5);




console.log(graph.BFS(5));


