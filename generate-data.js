for (var i = 1; i <= 8*1e8; i++) {
    db.courses.insert( { title : i, description: `${i} - Desc` } )
}