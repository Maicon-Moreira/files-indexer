const index = data.index
const size = data.size
const num_files = data.num_files

const button = document.getElementById('search-button')
const searchText = document.getElementById('search-text')
const filesDescription = document.getElementsByTagName('h5')[0]
const filesContainer = document.getElementById('container')

button.onclick = handleSearchButton


function handleSearchButton(e) {
    const regex = searchText.value.toLowerCase()

    const initialTime = new Date()
    let results = search(regex, index)
    const elapsedTime = new Date() - initialTime

    const numResults = results.length

    filesDescription.innerText = `${numResults} resultados em ${(elapsedTime / 1000).toFixed(2)} segundos.`
    if (numResults > 500) {
        filesDescription.innerText += " (mostrando apenas os 500 primeiros)"
        results = results.slice(0, 500)
    }

    filesContainer.innerHTML = null

    console.log(elapsedTime)
    console.log(results)

    for (result of results) {
        const element = makeElement(result)

        filesContainer.appendChild(element)
    }

}

function makeElement(file) {
    const element = `<div class="element ${file.type}">
  <div class="name">
    <strong>${file.name}</strong>
  </div>
  <div class="path">
    ${file.path}
  </div>
  <div class="bottom">
    <div class="size">
      ${convertSize(file.size)}
    </div>
    <div class="access_time">
      Último acesso: ${new Date(file.access_time / 1000000).toLocaleString()}
    </div>
    <div class="modification_time">
      Última modificação: ${new Date(file.modification_time / 1000000).toLocaleString()}
    </div>
    <div class="creation_time">
      Data criação: ${new Date(file.creation_time / 1000000).toLocaleString()}
    </div>
  </div>
</div>`
    const htmlElement = document.createElement('div')
    htmlElement.innerHTML = element
    return htmlElement
}

function search(regex, directory) {
    const results = []

    for (entry of directory) {
        if (entry.name.toLowerCase().includes(regex)) {
            results.push(entry)
        }

        if (entry.type == 'folder') {
            const folderResults = search(regex, entry.content)

            if (folderResults) {
                results.push(...folderResults)
            }
        }
    }

    return results
}

function convertSize(size) {
    if (size < 1024 ** 1) return `${(size / 1024 ** 0).toFixed(0)} bytes`
    if (size < 1024 ** 2) return `${(size / 1024 ** 1).toFixed(0)} KB`
    if (size < 1024 ** 3) return `${(size / 1024 ** 2).toFixed(0)} MB`
    if (size < 1024 ** 4) return `${(size / 1024 ** 3).toFixed(0)} GB`
}