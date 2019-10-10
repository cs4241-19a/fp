var Client = require('pg').Client;

exports.handler = function(event, context, callback) {
    const client = new Client({
        user: 'careAdmin',
        host: 'care-compare-1.cta1qe4u8vcp.us-east-1.rds.amazonaws.com',
        database: 'postgres',
        password: '20Car3Compare19$',
        port: 5432,
    });
    var response;
    const body = event;
    if (body.type !== undefined) {
        if (event.type === 'get') {
            //const data = getDrg(client, body.id);
            //console.log(data);
            //const results = JSON.stringify();
            //console.log(results);
            client.connect();
            const string = 'SELECT * from public.procedures WHERE drg= $1';
            const values = [body.id];
            client.query(string, values)
                .then(res => {
                    console.log(res);
                    console.log(res.rows);
                    response = {
                        "isBase64Encoded": true,
                        "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                        "statusCode": 200,
                        "body": JSON.stringify({"results": res.rows})
                    };
                })
                .then(() => {
                    client.end()
                    callback(null, response);
                });
        }
        else if (body.type === 'post') {
            insertUserSurvey(client, body);
            response = {
                "isBase64Encoded": true,
                "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                "statusCode": 200,
                "body": JSON.stringify({ "result": "success" })
            };
            callback(null, response);
        }
    }
    else {
        response = {
            "isBase64Encoded": true,
            "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            "statusCode": 400,
            "body": JSON.stringify({ "result": "bad request" })
        };
        callback(null, response);
    }
};


const getAll = async function(client) {
    client.connect();
    try {
        const res = await client.query('SELECT * from public.procedures;');
        console.log(res.rows[0]);
    }
    catch (err) {
        console.log(err.stack);
    }
    client.end();
};

const getDrg = function(client, id) {
    client.connect();
    const string = 'SELECT * from public.procedures WHERE drg= $1';
    const values = [id];
    /*try {
        const res = client.query(string, values);
        client.end();
        return res.rows;
    }
    catch (err) {
        console.log(err.stack);
    }*/
    var bucket;
    client.query(string, values)
        .then(result => {
            console.log('results!!: ' + result.rows);
            bucket = result.rows;
        })
        .then(() => client.end())
    console.log(bucket);
    return bucket;
};


const insertUserSurvey = async function(client, surveydata) {
    client.connect();
    const insert = 'INSERT into public.procedures (name, drg, location, cost, insurance) VALUES($1, $2, $3, $4, $5) RETURNING *';

    const values = [String(surveydata.name), String(surveydata.drg), String(surveydata.location), parseInt(surveydata.cost), String(surveydata.insurance)];
    const query = insert + values;
    console.log(query);
    try {
        const res = await client.query(insert, values);
        console.log('works!');
    }
    catch (err) {
        console.log(err.stack);
    }
    client.end();
};
