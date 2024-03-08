import { div, isFrameOne, counter, bodyWidth, bodyHeight, x, y, widthIsGreater } from '../BuildHtml.js'

export function getCssRulesFrame2 (node) {
  let mixBlendMode = node.blendMode;
  let absoluteBoundingBox = node.absoluteBoundingBox;
  let Color = node.fills;
  let id = node.id;
  let effects = node.effects;
  id += ` ${node.type}`;
  let background = '';
  let effect = ``;
  let stroke = node.strokes;
  let individualStrokeWeights = node.individualStrokeWeights;
  let borderBottom = ``;
  if (Color.length > 0) {
    background += `background-color: rgba( ${Math.round(Color[0].color.r * 255)}, ${Math.round(Color[0].color.g * 255)}, ${Math.round(Color[0].color.b * 255)}, ${Color[0].color.a});`;
    if ("opacity" in Color[0]) {
      background += `\n opacity: ${Color[0].opacity};`
    }
  }
  if (stroke.length > 0 && typeof individualStrokeWeights !== "undefined") {
    if ("bottom" in individualStrokeWeights) {
      borderBottom += `border-bottom: ${individualStrokeWeights.bottom / bodyWidth}rem ${stroke[0].type} rgba( ${Math.round(stroke[0].color.r * 255)}, ${Math.round(stroke[0].color.g * 255)}, ${Math.round(stroke[0].color.b * 255)}, ${stroke[0].color.a});`;

    }
  }

  if (effects.length > 0) {
    if (effects[0].type === 'INNER_SHADOW') {
      console.log("add More Code");
    }
    if (effects[0].type === 'DROP_SHADOW') {
      effect += `box-shadow: ${(effects[0].offset.x / bodyWidth) * 100}vw ${(effects[0].offset.y / bodyWidth) * 100}vw ${((effects[0].radius / bodyWidth) * 100) + 2}vw rgba(${Math.round(effects[0].color.r * 255)}, ${Math.round(effects[0].color.g * 255)}, ${Math.round(effects[0].color.b * 255)}, ${effects[0].color.a});`;
    }
    if (effects[0].type === 'LAYER_BLUR') {
      console.log("add More Code");
    }
    if (effects[0].type === 'BACKGROUND_BLUR') {
      console.log("add More Code");
    }
  }

  return `\n .div${counter}/* ${id} */ {
    position: absolute;
    top: ${(absoluteBoundingBox.y - y) / bodyWidth}rem;
    left: ${(absoluteBoundingBox.x - x) / bodyWidth * 100}vw;
      width: ${(absoluteBoundingBox.width / bodyWidth) * 100}vw;
    height: ${(absoluteBoundingBox.height / bodyWidth)}rem;
    ${background}
    mix-blend-mode: ${mixBlendMode};
    ${effect}
    ${borderBottom}
  
    }`;
}
export function getCssRulesFrame (node) {
  isFrameOne = false;
  let backgroundColor = ``;
  if (node.fills.length > 0) {
    backgroundColor = node.fills[0].color;
  }
  x = node.absoluteBoundingBox.x;
  y = node.absoluteBoundingBox.y;

  bodyWidth = node.absoluteBoundingBox.width;
  bodyHeight = node.absoluteBoundingBox.height;
  if (bodyHeight > bodyWidth) {
    widthIsGreater = false;
  }
  return ` \n body {
    background-color: rgba(${Math.round(backgroundColor.r * 255)},
    ${Math.round(backgroundColor.g * 255)}, ${Math.round(backgroundColor.b * 255)}, 
    ${backgroundColor.a});
    margin:0;
    padding:0;
  }`;

}
export function getCssRulesRectangle (node) {
  let mixBlendMode = node.blendMode;
  let absoluteBoundingBox = node.absoluteBoundingBox;
  let Color = node.fills;
  let id = node.id;
  id += ` ${node.type}`;
  let background = '';
  let stroke = node.strokes;
  let StrokeWeights = node.strokeWeight;
  let borderBottom = ``;
  if (stroke.length > 0) {
    borderBottom += `border-bottom: ${StrokeWeights / bodyWidth}rem ${stroke[0].type} rgba( ${Math.round(stroke[0].color.r * 255)}, ${Math.round(stroke[0].color.g * 255)}, ${Math.round(stroke[0].color.b * 255)}, ${stroke[0].color.a});`;
  }
  for (let i = 0; i < Color.length; i++) {

    if (Color[i].type === 'GRADIENT_LINEAR') {
      //background+= getGradientPositionAndColor(ContainerOfImage) +`url("${imagelink}");` ;
      // TODO
    }
    try {
      background = `background-color: rgba( ${Math.round(Color[i].color.r * 255)}, ${Math.round(Color[i].color.g * 255)}, ${Math.round(Color[i].color.b * 255)}, ${Color[i].color.a});`;

    } catch (error) {
      console.log(node);
      console.log(Color[0].color);
      console.log(Color[0]);
    }
    if ("opacity" in Color[i]) {
      background += `\n opacity: ${Color[i].opacity};`
    }
  }

  return `\n .div${counter}/* ${id} */ {
      position: absolute;
      top: ${(absoluteBoundingBox.y - y) / bodyWidth}rem;
      left: ${(absoluteBoundingBox.x - x) / bodyWidth * 100}vw;
      width: ${(absoluteBoundingBox.width / bodyWidth) * 100}vw;
      height: ${(absoluteBoundingBox.height / bodyWidth)}rem;
      ${background}
      ${borderBottom}
      ${node.opacity !== 'undefined' ? `opacity: ${node.opacity};` : ``};
      mix-blend-mode:${mixBlendMode};
    }`;
}
export function getCssRulesEllipse (node) {
  let absoluteBoundingBox = node.absoluteBoundingBox;
  let color = ``;
  let background = ``;
  if (node.fills.length > 0) {
    color = node.fills[0].color;
    background += `background: rgba(${Math.round(color.r * 255)},${Math.round(color.g * 255)}, ${Math.round(color.b * 255)},  ${color.a});`;
  }
  let id = node.id;
  let radius = ``;
  id += ` ${node.type}`;
  if (node.effects.length > 0) {
    radius += ` filter: blur(${((node.effects[0].radius / bodyWidth)) / 2}rem);`

  }
  return `\n .div${counter}/* ${id} */ {
      position: absolute;
      top: ${(absoluteBoundingBox.y - y) / bodyWidth}rem;
      left: ${(absoluteBoundingBox.x - x) / bodyWidth * 100}vw;
      width: ${(absoluteBoundingBox.width / bodyWidth) * 100}vw;
      height: ${(absoluteBoundingBox.height / bodyWidth)}rem;
      ${background}
      ${radius}
    
    }
      `;
}
export function getCssRulesText (node) {
  let absoluteBoundingBox = node.absoluteBoundingBox;
  let color = node.fills[0].color;
  let theSpan = getStylingForText(node);
  let id = node.id;
  id += ` ${node.type}`;
  let style = node.style;
  return `\n.div${counter}/* ${id} */ {
              position: absolute;
              top: ${(absoluteBoundingBox.y - y) / bodyWidth}rem;
              left: ${(absoluteBoundingBox.x - x) / bodyWidth * 100}vw;
              width: ${((absoluteBoundingBox.width / bodyWidth) + (style.fontSize / bodyWidth)) * 100}vw;
              height: ${(absoluteBoundingBox.height / bodyWidth)}rem;
              color: rgba(${Math.round(color.r * 255)},
              ${Math.round(color.g * 255)}, ${Math.round(color.b * 255)}, 
              ${color.a});
              font-family: '${style.fontFamily}';
              font-weight: ${style.fontWeight};
              font-size: ${(style.fontSize / bodyWidth) * 100}vw;
              line-height: ${(style.lineHeightPx / bodyWidth) * 100}vw;
              letter-spacing: ${(style.letterSpacing / bodyWidth) * 100}vw;
              ${"textCase" in style ? "text-transform: uppercase;" : ""} 
          }
        ${theSpan} `;
}
export function getCssRulesForAnInstanceEitherSvgOrStyling (node) {
  let absoluteBoundingBox = node.absoluteBoundingBox;
  let id = node.id;
  id += ` ${node.type}`;
  return `\n .img${counter}/* ${id} */ {
      position: absolute;
      top: ${(absoluteBoundingBox.y - y) / bodyWidth}rem;
      left: ${(absoluteBoundingBox.x - x) / bodyWidth * 100}vw;
      width: ${(absoluteBoundingBox.width / bodyWidth) * 100}vw;
      height: ${(absoluteBoundingBox.height / bodyWidth)}rem;
      
      }\n`;
}
export function getStylingForText (node) {
  let span = ``;
  let characterStyles = [];
  let colorofgradient = ``;
  let count = 0;
  for (let i = 0; i < node.characterStyleOverrides.length; i++) {
    if (node.characterStyleOverrides[i] === node.characterStyleOverrides[i + 1]) {
      count++;
    }
    else {
      characterStyles.push({
        Count: count + 1,
        value: node.characterStyleOverrides[i],

      });
      count = 0;
    }
  }
  div += makeADivWithText(node.characters, characterStyles);
  for (let i = 0; i < characterStyles.length; i++) {
    if (`${characterStyles[i].value}` in node.styleOverrideTable) {

    }
    else {
      characterStyles.splice(i, 1);
    }
  }
  if (characterStyles.length > 0) {
    let countOfSpans = 0;


    for (let i = 0; i < characterStyles.length; i++) {

      "fills" in node.styleOverrideTable[characterStyles[i].value] ? colorofgradient = node.styleOverrideTable[characterStyles[i].value].fills[0].color : ``;
      if ("fills" in node.styleOverrideTable[characterStyles[i].value]) {
        countOfSpans++;
        span += `.div${counter} span:nth-child(${countOfSpans}) {`;
        span += `color: rgba(${Math.round(colorofgradient.r * 255)},
                  ${Math.round(colorofgradient.g * 255)}, ${Math.round(colorofgradient.b * 255)}, 
                  ${Math.round(colorofgradient.a)});}`
      }
    }
  }
  return span;
}
