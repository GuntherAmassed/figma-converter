import { div, counter, bodyWidth, bodyHeight } from '../BuildHtml.js'

export function getFullHtml (css) {
    return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>codebluecontainer</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter&display=swap" rel="stylesheet">
      </head>
      <style>
        html {
          font-size: min(100vw,var(--Width));
        }
    ${css}
      </style>
      <body>
      ${div}
      <script>
      let currentWidth = window.innerWidth;
      let currentHeight = window.innerHeight;
      let targetWidth =${bodyWidth};
      let targetHeight = ${bodyHeight};
      document.documentElement.style.setProperty('--Width', (targetWidth / targetHeight) / (currentWidth / currentHeight) * 100 + 'vw');
      window.addEventListener('resize', e => {
         currentWidth = window.innerWidth;
         currentHeight =window.innerHeight;
         document.documentElement.style.setProperty('--Width', (targetWidth / targetHeight) / (currentWidth / currentHeight) * 100 + 'vw');
      })
   </script>
      
      </body>
    </html>`;
}
export function makeADivWithText (node, characterStyles) {
    let string = ``;

    let totalCount = 0;
    for (let i = 0; i < characterStyles.length; i++) {

        if (characterStyles[i].value === 0) {
            if (i === 0) {
                string += node.slice(i, characterStyles[i].Count);
            }
            else {
                string += node.slice(totalCount, characterStyles[i].Count + totalCount);
            }
        }
        else {
            if (i === 0) {
                string += `<span>${node.slice(i, characterStyles[i].Count)}</span>`;
            }
            else {
                string += `<span>${node.slice(totalCount, characterStyles[i].Count + totalCount)}</span>`;
            }
        }
        totalCount += characterStyles[i].Count;
    }
    if (totalCount !== node.length) {
        string += node.slice(totalCount, node.length);
    }
    return `\n <div class="div${counter}">${string}</div>`;
}
export function makeADiv () {
    return `\n <div class="div${counter}"></div>`;
}
export function makeADivImage (name) {
    return `\n <img class="img${counter}" src="/Html3/Images/${name}"></img>`;
}
