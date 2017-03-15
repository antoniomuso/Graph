module.exports = {
    fatherDistance: function (fatherVector, node1, node2) { // this alghoritm count distance between two node in fathers Vector
        var tree = this.buildTreeFFatherV(fatherVector);
        //var dist = 0;
        var find = function (node, dist) { // find node2 in all tree radicate in node and return distance else 0
            dist++;
            if (node === node2)
                return dist;
            else {
                for (n of tree[node]) {
                    var l = find(n, dist);
                    if (l !== 0) return l;
                }
            }
            return 0;

        }
        var move = function (node, dist) {
            dist++;
            if (node === node2) return dist;
            for (nod of tree[node]) {
                if (nod === node) continue;
                var s = find(nod, 0);
                if (s !== 0) {
                    dist += s;
                    return dist;
                }
            }
            if (node !== fatherVector[node]) return move(fatherVector[node], dist);
            return 0;
        }
        return move(node1, 0) - 1; // -1 because this alghoritm count arch and not node
    },

    buildTreeFFatherV: function (fatherVector) { // get father to son from fatherVector tree O(n)
        var tree = new Array(fatherVector.length);
        for (let i = 0; i < tree.length; i++) {
            tree[i] = [];
        }
        for (let i = 0; i < fatherVector.length; i++) {
            if (fatherVector[i] !== i)
                tree[fatherVector[i]].push(i);
        }
        return tree;
    },
    nodeRooted: function (fatherVector, node) {
        var tree = this.buildTreeFFatherV(fatherVector); //O(n)
        var arrayOfNode = [];
        var add = function (nodo) { // O(n)
            arrayOfNode.push(nodo)
            for (n of tree[nodo]) {
                add(n);
            }
        }
        add(node);
        return arrayOfNode;
    }
}