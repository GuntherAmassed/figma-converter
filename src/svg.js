import { writeFileSync } from 'fs';
import fetch from 'node-fetch';
export async function ExcuteForSvgs (imageRequests, fileKey, figmaToken) {
    for (let i = 0; i < imageRequests.length; i++) {
        console.log(`svg Download, ${i + 1} out ${imageRequests.length}`);
        try {
            let svgImageResponse = await fetch(`https://api.figma.com/v1/images/${fileKey}?ids=${imageRequests[i].id}&format=svg&use_absolute_bounds=true`, {
                method: "GET",
                headers: {
                    'X-FIGMA-TOKEN': `${figmaToken}`
                }
            });
            let svgImageData = await svgImageResponse.json();
            if (svgImageData.status === 429) {
                ///retrying code
                console.log(svgImageData.err + " ," + svgImageData.status + `, svg number ${i}`);
                i--;
                await sleep(100000);
                continue;
            }
            let bufferResponse = await fetch(svgImageData.images[imageRequests[i].id]);
            let bufferData = await bufferResponse.buffer();
            writeFileSync(imageRequests[i].filePath, bufferData);
        }
        catch (err) {
            console.error(err);
        }
    }
}

function sleep (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
