const express = require('express')
const app = express()
const data = require('./data')
const { index, num_files, size } = data
const cors = require('cors')

app.use(cors())

const seriaziedIndex = []

console.log('Data loaded')

function search(regex, directory, depth = 0) {
  const results = []

  for (entry of directory) {
    if (entry.name.toLowerCase().includes(regex)) {
      const serializedEntry = {
        name: entry.name,
        path: entry.path,
        type: entry.type,
        size: entry.size,
        accessTime: entry.access_time,
        modificationTime: entry.modification_time,
        creationTime: entry.creation_time,
        contentFiles: entry.content_files,
        depth
      }
      results.push(serializedEntry)
    }
    if (entry.type == 'folder') {
      const folderResults = search(regex, entry.content, depth + 1)

      if (folderResults) {
        results.push(...folderResults)
      }
    }
  }
  return results
}

app.use(express.json())

app.post('/search', (req, res) => {
  const { path, searchText } = req.body

  let searchDirectory = index

  while (path.length > 0) {
    let found = false
    const nextPath = path.shift()
    console.log(nextPath)

    for (const directory of searchDirectory) {
      if (directory.type == 'folder' && directory.name == nextPath) {
        searchDirectory = directory.content
        found = true
        break
      }
    }

    if (!found) {
      return res.status(400).json({ error: 'diretorio invalido' })
    }
  }

  const results = search(searchText, searchDirectory)

  res.json(results)
})


app.post('/entries', (req, res) => {
  const { path } = req.body

  let searchDirectory = index

  while (path.length > 0) {
    let found = false
    const nextPath = path.shift()
    console.log(nextPath)

    for (const directory of searchDirectory) {
      if (directory.type == 'folder' && directory.name == nextPath) {
        searchDirectory = directory.content
        found = true
        break
      }
    }

    if (!found) {
      return res.status(400).json({ error: 'diretorio invalido' })
    }
  }

  const entries = searchDirectory.map(entry => {
    const serializedEntry = {
      name: entry.name,
      path: entry.path,
      type: entry.type,
      size: entry.size,
      accessTime: entry.access_time,
      modificationTime: entry.modification_time,
      creationTime: entry.creation_time,
      contentFiles: entry.content_files,
    }

    return serializedEntry
  })

  res.json(entries)
})

app.listen(8000)