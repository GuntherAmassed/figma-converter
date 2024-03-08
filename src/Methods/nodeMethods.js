import { imageRequests, css, counter, div, isFrameOne, shouldNodeReturn } from '../BuildHtml.js'
import {
    getCssRulesFrame,
    getCssRulesFrame2,
    getCssRulesRectangle,
    getCssRulesText,
    getCssRulesEllipse,
    getCssRulesForAnInstanceEitherSvgOrStyling
} from './cssMethods.js'
import { makeADiv, makeADivImage, makeADivImage } from './htmlMethods.js'
import { mkdir } from 'fs';
let uniqueIdForSvg = 0;


export function makeFolder (folderName) {
    let folderPath = `C:/Users/Moshe Stern/Desktop/Figma Api/Html3/indexes/${folderName}`;
    mkdir(folderPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err);
        }
    });
}

export function traverseNode (node) {
    if (node.fills.length > 0 && "imageRef" in node.fills[0]) {
        counter++;
        let name = ``;
        name = getNameAndPushImageRequestToArray(node);
        div += makeADivImage(name);
        css += getCssRulesForAnInstanceEitherSvgOrStyling(node);
    }
    else {
        makeCss(node);
    }
    if (shouldNodeReturn === true) {
        shouldNodeReturn = false;
        return;
    }
    if ("children" in node) {
        node.children.forEach(async function (child) {
            traverseNode(child);
        });
    }
}

export function makeCss (node) {
    switch (node.type) {
        case 'FRAME':
        case 'GROUP':
            counter++;
            div += makeADiv();
            isFrameOne === true ? css += getCssRulesFrame(node) : css += getCssRulesFrame2(node);
            break;
        case 'RECTANGLE':
        case 'VECTOR':
            counter++;
            div += makeADiv();
            css += getCssRulesRectangle(node);
            break;
        case 'TEXT':
            counter++;
            css += getCssRulesText(node);
            break;
        case 'ELLIPSE':
            counter++;
            div += makeADiv();
            css += getCssRulesEllipse(node);
            break;
        case 'INSTANCE':
            counter++;
            let name = ``;
            name = getNameAndPushImageRequestToArray(node);
            div += makeADivImage(name);
            shouldNodeReturn = true;
            css += getCssRulesForAnInstanceEitherSvgOrStyling(node);
            break;
        default:
            break;
    }
}

function getNameAndPushImageRequestToArray (node) {
    let fileName = node.name.replace(/[\/_:]/g, '');
    uniqueIdForSvg++;
    fileName += uniqueIdForSvg + `.svg`;
    let filePath = `${process.env.FILE_PATH}/html/Images/${fileName}`;
    imageRequests.push({
        id: node.id,
        filePath: filePath
    });
    return fileName;
}
