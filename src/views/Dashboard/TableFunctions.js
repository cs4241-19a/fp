
const deleteRow = async function(cell, cb) {
    var answer = window.confirm("Are you sure you want to delete?")
    if (answer) {
        let data = cell._row.data;
        let id = data.id;
        console.log(id);
        const response = await fetch('/api/deleteBudget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id}),
        });
        const body = await response;
        if (body) {
            cb(true);
        } else {
            console.log('could not delete');
        }
    }
}

const modifyRow = async function(cell, cb){
    
    var answer = window.confirm("Are you sure you want to modify this cell?")
    if (answer) {
        let data = cell._row.data;

        console.log(data);
        const response = await fetch('/api/editBudget', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const body = await response;
        if (body) {
            cb(true);
        } else {
            console.log('could not edit');
        }
    }
}

export {deleteRow, modifyRow}