import React, { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function TaxonomyTree() {
    const [treeData, setTreeData] = useState([]);

    // Crear un objeto de nodo
    function createTreeNode(id, name, children, level) {
        return { id, name, children, level };
    }

    // Cargar hijos de un nodo
    async function loadNodeChildren(node, level) {
        let url = '';
        let data = [];

        switch (level) {
            case 'reino':
                url = `/filos/${node.id}`;
                break;
            case 'filo':
                url = `/clases/${node.id}`;
                break;
            case 'clase':
                url = `/ordenes/${node.id}`;
                break;
            case 'orden':
                url = `/familias/${node.id}`;
                break;
            case 'familia':
                url = `/generos/${node.id}`;
                break;
            case 'genero':
                url = `/especies/${node.id}`;
                break;
            default:
                break;
        }

        const response = await fetch(url);
        data = await response.json();

        const childNodes = data.map((item) => {
            const newNode = createTreeNode(item.id, item.nombre, [], level);
            node.children.push(newNode);
            return newNode;
        });

        return childNodes;
    }

    // Manejar evento de expansión de nodo
    const handleNodeToggle = async (nodeId, nodeState) => {
        if (nodeState.expanded && !treeData[nodeId].children.length) {
            const nodeLevel = treeData[nodeId].level;
            await loadNodeChildren(treeData[nodeId], nodeLevel);
            setTreeData({ ...treeData });
        }
    };

    // Obtener datos iniciales
    async function fetchData() {
        const response = await fetch('/reinos');
        const data = await response.json();
        const nodes = data.map((item) => createTreeNode(item.id, item.nombre, [], 'reino'));
        setTreeData(nodes);
    }

    useEffect(() => {
        fetchData();
    }, []);

    // Renderizar los nodos del árbol de forma recursiva
    const renderTree = (nodes) => {
        return nodes.map((node) => (
            <TreeItem key={node.id} nodeId={node.id} label={node.name} onToggle={handleNodeToggle}>
                {Array.isArray(node.children) ? renderTree(node.children) : null}
            </TreeItem>
        ));
    };

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {renderTree(treeData)}
        </TreeView>
    );
}

export default TaxonomyTree;
