$(readyNow);

function readyNow() {
    console.log('In JQ');
    $('#submitBtn').on('click', submitThatInfo);
    $('#ListBody').on('click', '.markCompleteBtn', markComplete);
    getList();
}


function submitThatInfo() {
    let listItems = {};
    listItems.task = $(`#taskIn`).val();
    listItems.deadline = $(`#deadlineIn`).val();
    postList(listItems);
}


//connecting with GET on the server to grab the DB
function getList() {
    $.ajax({
        type: 'GET',
        url: '/toDoRouter'
    }).then(function (response) {
        console.log(response);
        renderToDOM(response);
    }).catch(function (error) {
        console.log('Alert! error in GET', error);
    });
} //end getList - ajax GET


//Post function to send input data to DB
function postList(listItems) {
    $.ajax({
        method: 'POST',
        url: '/toDoRouter',
        //passing through listItems from submitThatInfo
        data: listItems,
    }).then(function (response) {
        console.log(response);
        getList(response);
    }).catch(function (error) {
        console.log('Alert! error in POST', error);
    });
} //end POSTList


function markComplete() {
    //make variables for the id text off buttung
    let complete = $(this).text();
    let id = $(this).closest('tr').data('id')
    console.log('in markComplete', complete, id);

    //what's up ajax PUT
    $.ajax({
        method: 'PUT',
        url: `/toDoRouter/${id}`,
        data: {
            completed: complete
        }
    }).then(function (response) {
        console.log('SUCCESS PUT request', response);
        getList();
    }).catch(function (error) {
        console.log('Error in PUT', error);
    });//end Ajax
}//end markComplete


function deleteTask() {
    
}


//Get that info on the DOM!
function renderToDOM(listItems) {
    //empty table
    $('#ListBody').empty();

    //loop through items
    for (let item of listItems) {
        let toDoList = $(`
        <tr class ="markDone">
            <th>${item.task}</th>
            <th>${item.deadline}</th>
            <th><button class="markCompleteBtn">Finished</button></th>
            <th><button class="deleteBtn">Delete Me</button></th>
        </tr>
        `).data(item)

        if (item.completed === true) {
            $(`.markDone`).addClass("highlight");
        }
        $('#ListBody').append(toDoList);

    } //end loop
} //end renderToDOM