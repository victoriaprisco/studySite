let editor = document.querySelector("#editor");
// editor.session.setMode("ace/mode/javascript");

ace.edit(editor, {
  theme: "ace/theme/cobalt",
  mode: "ace/mode/javascript",
});
// create all the file contents along with their names
const files = {
    main: `let variable = 4;`,
    new_file: `print('hello');`
};

// add event listeners to the buttons


const files_elem = document.querySelector("#files");
const list_of_files = files_elem.childNodes;
console.log("all files:", list_of_files);
list_of_files.forEach(file => {
    if(file.innerHTML){
        file.addEventListener("click", change_contents.bind("click", file.getAttribute("file_name")));
    }
});

function change_contents(new_file_name){
    console.log("changing the file to", new_file_name);
    var contents = files[new_file_name] ? files[new_file_name] : "//file not found";
    console.log(contents);
    // editor.session.setSession(contents);
    // alert(ace.getValue());
    editor.innerHTML  =contents;

}
