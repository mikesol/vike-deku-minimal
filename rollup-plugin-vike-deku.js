import fs from "fs";
import path from "path";
import chokidar from "chokidar";
import { globSync } from "glob";

const extractDirectoryPath = (filePath) => {
  // Use regex to capture the portion after `output/` and ending before `.Page`
  const regex = /output\/[^\/]*Pages\.(.*?)\.Page/;
  const match = filePath.match(regex);

  if (match && match[1]) {
    // Replace dots with slashes and convert to lowercase
    return "pages/" + match[1].replace(/\./g, "/").toLowerCase();
  } else {
    throw new Error("Invalid file path format");
  }
};
const outputDir = path.resolve(__dirname, "output/*.Page/index.js");

const createPageFiles = () => (path) => {
  const dir = `${extractDirectoryPath(path)}/psvike`
  const psFileName = path.split("/").slice(-2)[0]
  const dirlen = dir.split("/").length;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    `${dir}/+Page.js`,
    `import { page } from "${new Array(dirlen).fill('../').join('')}output/${psFileName}"

export default page;`
  );
  const route = dir.slice(5,-7);
  fs.writeFileSync(
    `${dir}/+route.js`,
    `export default '${route === '/index' ? '/' : route}';`
  );
};

const dekuPlugin = () => ({
  name: "rollup-plugin-vike-deku",
  buildStart() {
    const files = globSync(outputDir);
    files.forEach(createPageFiles("start"));

    const watcher = chokidar.watch(outputDir, { ignoreInitial: true });
    watcher.on("add", createPageFiles("add"));
    watcher.on("change", createPageFiles("change"));
    watcher.on("unlink", createPageFiles("unlink"));
    watcher.on("unlinkDir", createPageFiles("unlinkDir"));
  },
});

export default dekuPlugin;
