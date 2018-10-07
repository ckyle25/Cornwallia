INSERT INTO users
(userid, emaildsc, isadminflg, wishesflg, lanpartyflg, calendarflg, firstnameval, lastnameval, auth0id)
VALUES
( $1, $2, 0, 0, 0, 0, $4, $5, $6 )
RETURNING *;