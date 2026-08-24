Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objShell = CreateObject ("Shell.Application")
Set objFolder = objShell.BrowseForFolder (0, "Select Target Folder", (0))

'Max number of times to replace string
strCount = 999
'Comparison type: 0 = case sensitive, 1 = case insensitive
strCompare = 1


targetPath = objFolder.Items.Item.Path

If targetPath = "" Then
Wscript.Quit
End If

find = InputBox("Add string to find.","Find", "")

If find = "" Then
Wscript.Quit
End If

strReplace = InputBox("Add string to replace '" & find & "' with.","Replace", "")

Wscript.Echo "Replace '" & find & "' with '" & strReplace & "' in all files  in '" & targetPath & "'?"


fileReplace objFSO.GetFolder(targetPath)


Sub fileReplace(folder)

  'Loop through the files in the folder
  For Each objFile In folder.Files

Set objTxtFile = objFSO.OpenTextFile(objFile, 1)
strCont = objTxtFile.ReadAll
strOldCont = strCont
objTxtFile.Close

'While inStr(strCont, find)
strStart = 1
strCont = Replace(strCont, find,strReplace,strStart,strCount,strCompare)
'Wend

strPath = objFile.Path

'Only edit if new content is different to original content
If strOldCont <> strCont Then
'Wscript.Echo "Replacing"

objFile.Delete

'Wscript.Echo "Writing " & strPath & " with: " & strCont

Set objNewTxtFile = objFSO.OpenTextFile(strPath, 8,True)

objNewTxtFile.Write(strCont)

End If

If Err.Number <> 0 Then
'WScript.Echo "Error editing: " & objFile.path & "Error: " & Err.Description
Err.Clear
End If

Next

'Uncomment lines below to act on files in all subfolders
'For Each Subfolder In folder.SubFolders
'fileReplace Subfolder
'Next

End Sub

Wscript.echo "Done"