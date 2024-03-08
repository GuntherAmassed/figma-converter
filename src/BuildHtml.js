import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
import { makeFolder, traverseNode } from './Methods/nodeMethods.js'
import { getFullHtml } from './Methods/htmlMethods.js'

export let imageRequests = [];
export let css = ""; 
export let counter = 0;
export let div = "";
export let y = 0;
export let x = 0;
export let bodyWidth = 0;
export let bodyHeight = 0;
export let widthIsGreater = true; // was using previously to adjust html variable
export let isFrameOne = true;
export let shouldNodeReturn = false;
export let counterForFolders = 0;

export async function generate (fileKey, figmaToken) {
  try {
    const response = await fetch(
      `https://api.figma.com/v1/files/${fileKey}`, {
      method: "GET",
      headers: {
        'X-FIGMA-TOKEN': `${figmaToken}`
      }
    });
    const mainDataTree = await response.json();

    //single node
    // const mainData = mainDataTree.document.children[0].children[0]; 
    // MainBlock(mainData, "Folder Name");

    //multiple nodes
    mainDataTree.document.children[1].children;
    for (let i = 0; i < MainData.length; i++) {
      if (MainData[i].type === 'FRAME') {
        generateHtml(MainData[i], MainData[i].name);
      }
    }
  }
  catch (error) {
    console.error(error);

  }
  return imageRequests;
}

function generateHtml (node, NodeName) {
  let folderName = NodeName.replace(/[\/_]/g, '');
  counterForFolders++;
  folderName += counterForFolders;
  makeFolder(folderName);
  traverseNode(node);

  //reset values
  css = "";
  counter = 0;
  div = "";
  y = 0;
  x = 0;
  bodyWidth = 0;
  bodyHeight = 0;
  widthIsGreater = true;
  isFrameOne = true;
  shouldNodeReturn = false;

  ///writing to file
  const content = getFullHtml(css);
  const filePath = `${process.env.FILE_PATH}/html/indexes/${folderName}/index.html`;
  writeFileSync(filePath, content, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Successfully wrote to file.');
    }
  });
}

