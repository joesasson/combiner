function combineSheets(){
  // Get the values of each one of the sheets in the folder and append them to a master list, then create a combined file and set values there
  let folders = DriveApp.getFoldersByName("Tester Hard Count") // FolderIterator
  // get all file ids
  let folder = folders.next() // first folder with that name
  let files = folder.getFiles()
  let fileIds = []
  while(files.hasNext()){
    let file = files.next()
    fileIds.push(file.getId())
  }
  // for each id, get the values contained in the first sheet
  let newData = fileIds.reduce((previous, current) => {
    // append them to an array that contains combined values
    let ss = SpreadsheetApp.openById(current)
    let sheet = ss.getSheets()[0] // first sheet, there should only be one sheet
    let data = sheet.getDataRange().getValues()
    return previous.concat(data)
  }, [])
  // create a new spreadsheet and set values on first sheet
  let newSs = SpreadsheetApp.create("Combined")

  createNewSheetWithData(newSs, [newData], "Combined scans")
  let fileId = newSs.getId()
  let file = DriveApp.getFileById(fileId)
  folder.addFile(file)
  DriveApp.getRootFolder().removeFile(file)

}

