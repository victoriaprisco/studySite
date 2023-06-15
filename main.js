let editor = document.querySelector("#editor");
// editor.session.setMode("ace/mode/javascript");
var mode = "debug";
var file_objs = {};
var current_file = "";

create_file_object();
make_files();
let ace_editor = ace.edit(editor, {
  theme: "ace/theme/cobalt",
  mode: "ace/mode/javascript",
});
ace_editor.setReadOnly(true);
console.log(ace_editor.session);
// create all the file contents along with their names


// add event listeners to the buttons





function change_contents(new_file_name){
    console.log("changing the file to", new_file_name);
    var contents = file_objs[new_file_name] ? file_objs[new_file_name] : "//file not found";
    console.log(contents);
    ace_editor.setSession(contents.session);
    ace_editor.session.setMode(contents.mode);
    current_file = new_file_name;
    document.querySelector("#file-name").innerHTML = current_file + "." + contents.ext;
    // editor.session.setSession(contents);
    // alert(ace.getValue());
    // editor.innerHTML  =contents;

}

// put actual code bases in here!!!! TODO FIXME

function change_mode(new_mode){
    if(new_mode != "debug" && new_mode != "wordle" && new_mode != "mosaic"){
        console.error("invalid mode");
    }
    else {
        mode = new_mode;
        create_file_object();
        make_files();
    }
}

function clear_files(){
    var files_container = document.querySelector('#files');
    const list_of_files = files_container.childNodes;
    while(list_of_files.length != 0){
        files_container.removeChild(list_of_files[0]);
    }
}
function make_files(){
    clear_files();
// define button contents for file names
    var files_container = document.querySelector('#files');
    for(let file in file_objs){
        var newElement = document.createElement("span");
        newElement.innerHTML = file+"."+file_objs[file].ext;
        newElement.setAttribute("file_name", file);
        newElement.className = "file";
        files_container.appendChild(newElement);
    }
    add_listeners();
}

function add_listeners(){
    const files_elem = document.querySelector("#files");
    const list_of_files = files_elem.childNodes;
    console.log("all files:", list_of_files);
    list_of_files.forEach(file => {
        if(file.innerHTML){
            file.addEventListener("click", change_contents.bind("click", file.getAttribute("file_name")));
        }
    });
}

function create_file_object(){
    if(mode === "debug"){
        file_objs = {
            main: {
                session: ace.createEditSession(`let testing = 4;`),
                ext: 'js',
                mode: 'ace/mode/javascript'
            },
            new_file: {
                session: ace.createEditSession(`print('hello');`),
                ext: 'js',
                mode: 'ace/mode/javascript'
            },
            css_file: {
                session: ace.createEditSession(["something {", "\tcolor: red;", "}" ]),
                ext: 'css',
                mode: 'ace/mode/css'
            },
            python_file: {
                session: ace.createEditSession(`#python file time
    print("i dont like python")
    x = 4`),
                ext: 'py',
                mode: 'ace/mode/python'
            }
        };
    }
    else if(mode === "wordle"){
        file_objs = {
            index: {
                session: ace.createEditSession(`<h1>Hello World</h1>`),
                ext: 'html',
                mode: 'ace/mode/html'
            }
        }
    }
    else if(mode === "mosaic"){
        file_objs = {
            filename: {
                session: ace.createEditSession(`# some python code`),
                ext: 'py',
                mode: 'ace/mode/python'
            }
        }
    }    
} 