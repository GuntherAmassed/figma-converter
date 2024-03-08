import { generate } from "./BuildHtml.js";
import { ExcuteForSvgs } from "./svg.js";

generate(process.env.FILE_KEY, process.env.FIGMA_TOKEN)
    .then((data) => ExcuteForSvgs(data, process.env.FILE_KEY, process.env.FIGMA_TOKEN));

