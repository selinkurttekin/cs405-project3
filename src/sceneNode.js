/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        // Compute the current node's transformation matrix
        const currentTransform = this.trs.getTransformationMatrix();
    
        // Update the model matrix for this node
        const updatedModelMatrix = MatrixMult(modelMatrix, currentTransform);
    
        // Calculate the updated MVP matrix
        const updatedMVP = MatrixMult(mvp, currentTransform);
    
        // Compute the updated modelView matrix
        const updatedModelView = MatrixMult(modelView, currentTransform);
    
        // Update the normal matrix
        const updatedNormalMatrix = MatrixMult(normalMatrix, currentTransform);
    
        // Draw the current node's mesh (if it has one)
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMVP, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
        }
    
        // Recursively draw all child nodes
        for (const child of this.children) {
            child.draw(updatedMVP, updatedModelView, updatedNormalMatrix, updatedModelMatrix);
        }
    }

    

}