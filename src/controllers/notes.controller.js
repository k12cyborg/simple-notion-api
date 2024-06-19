import { open, readdir, writeFile, rm } from "node:fs/promises";

export const getNotes = async (req, res) => {
  const fileNames = [];
  try {
    const files = await readdir("./src/data");
    for (const file of files) fileNames.push(file.slice(0, -4));
    res.json(fileNames);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNote = async (req, res) => {
  const { title } = req.params;
  let file;
  try {
    file = await open(`./src/data/${title}`);
    const data = await file.readFile({ encoding: "utf-8" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error)
    if (error.code === "ENOENT") {
      res.status(404).json({ message: "File not found", file: title });
    } else {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } finally {
    await file?.close();
  }
};

export const updateNote = async (req, res) => {
  const { title } = req.params;
  const { content } = req.body;
  
  if (title === undefined || content === undefined) res.status(400).json({ message: "Title or content not provided" });

  let file;
  try {
    file = await open(`./src/data/${title.trim().replaceAll(" ", "_")}`, "w");
    await file.writeFile(content, { encoding: "utf-8" });
    res.status(200).json({ message: "Note updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await file?.close();
  }
};

export const newNote = async (req, res) => {
  const title = req.body.title;

  if (title === undefined) {
    return res.status(400).json({ message: "Title not provided" });
  }

  try {
    await writeFile(`./src/data/${title.trim().replaceAll(" ","_")}`, "", {
      encoding: "utf-8",
    });
    res.status(201).json({ message: "Note created" });
  } catch (error) { 
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req,res) => {
  const title = req.params.title;
  const path = `./src/data/${title.trim().replaceAll(" ","_")}`
  if (title === undefined) {
    return res.status(400).json({ message: "Title not provided" });
  }
  try {
    await rm(path, {
      force: true,
    });
    res.status(200).json({ message: "Note deleted" });
  } catch (error) { 
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
}