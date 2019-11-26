const _async = require('async')

const bucket = "my_bucket"

async function fetchIds(ids) {
    return _async.mapLimit(ids, 10, async (id) => {
        const { metaData } = await minioClient.statObject(bucket, id);
        const { jwt, ...file } = metaData;
        return { id, ...file };
    });
}

var minioClient = {
    statObject: function(bucket, id) {
        console.log("StatObject: "+ bucket+" - "+id);
        return new Promise(function (done) {
            // Pretend to go out and do work
            setTimeout(function() {
                done({metaData: {jwt:"_jwt_", meta:true, id:id}});
            }, 3000);
        })
    }
}

var ids = []
for (var i = 0; i < 15; i++) {
    ids.push("" + i)
}

async function test() {
    const files = await fetchIds(ids);
    console.log(files);
}

test()
