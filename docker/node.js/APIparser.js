//function parameters have to be given from the request itself
//@Argument - API-url
//@type - Type of Request (get, put, post, delete)
//@auth - role of authority (admin, prof, stud)
//@user - userid 
function ParseRequest(/*Argument, type, auth, user*/){
    //Beispielwerte für Tests
    let Argument="/VarG/graph/id:1";
    let type = "GET";
    let auth = "stud";
    let user = "jdeo";
    if(Argument.startsWith("/VarG/")){
        //API-String identified
        let index= 6;
        Argument = Argument.substr(index, Argument.length);
        console.log(Argument);
        if(Argument.includes("/")){
            let arr= SliceAtSymbol(Argument, "/");
            console.log(arr[0]);
            console.log(arr[1]);
            let table= IdentifyTable(arr[0]);
            if(table == "ERROR"){
                console.log("Incorrect table")
            }
            else{
                let query_condition = ValidateCondition(arr[1], user);
                if (query_condition == "ERROR"){
                    console.log("Illegal Where Condition")
                }
                else {
                    let qtype=IdentifyQueryType(type, auth);
                    if (qtype == "ERROR") {
                        console.group("Wrong Request type")
                    }
                    else {
                        let Query = qtype + arr[0] + "Object FROM " + table + " WHERE " + query_condition;
                        console.log(Query);
                        return Query;
                    }
                }
            }
        }
        else console.log("Incorrect API Request"); //Request doesn't fit API-schema
    }
    else console.log("No API Request"); //Rejected
    return null;
}

function SliceAtSymbol(str, symbol){
    let str_arr = [];
    let index = str.indexOf(symbol);
    str_arr[0] = str.substr(0,index);
    str_arr[1] = str.substr(index+1, str.length);
    return str_arr;
}

function ValidateCondition(condition, user){
    let arr = SliceAtSymbol(condition, ":");
    switch(arr[0]){
        case "id":
            arr[0]="fileID";
            break;
        case "filename":
            arr[0]="filename";
            break;
        case "prodname":
            arr[0]="prodname";
            break;
        default:
            arr[0]="ERROR";
            break;
    }
    return arr[0]+ "=" + arr[1] + " AND user=" + user; 
}

function IdentifyTable(content){
    switch(content){
        case "graph":
            content="cytographs"
            break;
        default:
            content="ERROR";
            break;
    }
    return content;
}

function IdentifyQueryType(type, auth){
    switch(type){
        case "GET":
            type="SELECT ";
            break;
        case "POST":
            type="POST ";
            break;
        case "DELETE":
            if (auth == "admin") type="DELETE ";
            else type = "ERROR";
            break;
        case "PUT":
            type="PUT ";
            break;
        default:
            type = "ERROR";
            break;
    }
    return type;
}

exports.ParseRequest = ParseRequest;