import path from "node:path"
import fs from "node:fs"
import { remark } from "remark";
import strip from "strip-markdown";
import matter from "gray-matter";
import algoliasearch from "algoliasearch";

const adminApiKey = process.env.SECRET_ALGOLIA_ADMIN_KEY;
const appId = process.env.PUBLIC_ALGOLIA_APP_ID;
const indexName = process.env.PUBLIC_ALGOLIA_INDEX_BLOG;
const POSTS_PATH = "src/content/blog";

/**
 * @param {string} str
 * @returns
 */
async function parseMarkdown(str) {
  if (!str) return;
  const result = await remark().use(strip).process(str)
  return result.toString()
}

/**
 * @param {string} dir
 * @returns string[]
 */
function getAllFiles(dir) {
  const result = fs.readdirSync(dir).reduce((files, file) => {
    const name = path.join(dir, file);
    const isDirectory = fs.statSync(name).isDirectory();
    // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
    return isDirectory ? [...files, ...getAllFiles(name)] : [...files, name];
  }, [])

  return result;
}

/**
 * @param localFilePath
 * ex: /home/oriverk/Codes/oriverk/blog/docs/2022/memo.md
 * @returns
 */
async function getPost(localFilePath) {
  const source = fs.readFileSync(localFilePath).toString()
  const { content, data } = matter(source);
  const {
    title,
    create = "",
    update = "",
    published = false,
    tags = [],
  } = data;
  const regexp = new RegExp(`${POSTS_PATH}\/|.mdx?$`, "g");
  // ex: 2022/20220505-ubuntu2204
  const id = localFilePath.replace(regexp, "");
  return {
    objectID: id,
    id,
    title,
    create,
    update,
    tags: tags.map((tag) => tag.toLowerCase()).sort() || "",
    content: await parseMarkdown(content),
    published,
  };
}

async function getPosts() {
  const fileNames = getAllFiles(POSTS_PATH)
    .filter((path) => /\.mdx?$/.test(path));
  const promise = fileNames.map(async (fileName) => await getPost(fileName));
  const posts = (await Promise.all(promise))
    .filter(({ published }) => published)
    .sort((a, b) => {
      return (
        new Date(b.update ?? b.create).getDate() -
        new Date(a.update ?? b.create).getDate()
      );
    });
  return posts;
}

async function updateAlgolia(appId, adminApiKey, data) {
  const client = algoliasearch(appId, adminApiKey);
  const index = client.initIndex(indexName);

  try {
    await index
      .saveObjects(data, {
        autoGenerateObjectIDIfNotExist: true,
      })
      .then(({ objectIDs }) => {
        console.log("post data for was successfull pushed to Algolia!");
        console.log(objectIDs);
      });
  } catch (error) {
    console.log("Error occurred!");
    console.error(error.message);
  }
}

const posts = await getPosts();
await updateAlgolia(appId, adminApiKey, posts);
