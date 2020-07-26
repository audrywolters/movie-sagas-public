const express = require( 'express' );
const router = express.Router();
const pool = require( '../modules/pool' );

// get all of the movies and their genres
// in a super cool object: id:1, genres:{fantasy, sci-fi}
// thanks to array_agg
router.get( '/', ( req, res ) => {

    pool.query( `SELECT m.id, array_agg(g.name)
                 FROM "movies" AS m
                 JOIN "movie_genres" AS mg on m.id = mg.movie_id
                 JOIN "genres" AS g on g.id = mg.genre_id
                 GROUP BY m.id
                 ORDER BY m.id ASC;` )
    .then( ( result ) => { 
        res.send( result.rows ) 
    })
    .catch( ( error ) => {
        console.log( 'Error GET details', error )
        res.sendStatus( 500 );  
    });
})

// save the user's changes to movie title and description
router.post('/', async (req, res) => {   




    
    const client = await pool.connect();

    try {
        const {
            title,
            description,
            movieID
        } = req.body;

        console.log('post ', req.body);


        await client.query('BEGIN');
        
        await client.query
        (`UPDATE movies
          SET title = $1,
              description = $2
          WHERE id = $3;`, [ title, description, movieID ] );

        await client.query('COMMIT')
        res.sendStatus(201);
    } catch (error) {
        await client.query('ROLLBACK')
        console.log('Error POST /api/order', error);
        res.sendStatus(500);
    } finally {
        client.release()
    }
});


module.exports = router;