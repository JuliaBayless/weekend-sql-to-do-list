$(readyNow);

function readyNow() {
    console.log('In JQ');
    $('#submitBtn').on('click', submitThatInfo);
    getList();
}


function submitThatInfo() {
    let listItems = {};
    listItems.task = $(`#taskIn`).val();
    listItems.deadline = $(`#deadlineIn`).val();
    //POST GOES HERE
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


//Get that info on the DOM!
function renderToDOM(listItems) {
    //empty table
    $('#ListBody').empty();

    //loop through items
    for (let item of listItems) {
        let toDoList = $(`
        <tr class ="markdone">
            <th>${item.task}</th>
            <th>${item.deadline}</th>
            <button class="markComplete">Finished</button>
        </tr>
        `).data(item)

        if (item.complete === true ) {

        }
        $('#ListBody').append(toDoList);

    } //end loop
} //end renderToDOM