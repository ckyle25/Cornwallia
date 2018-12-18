SELECT
userid
,isadminflg
,wishesflg
,foodflg
,calendarflg
,firstnameval
,lastnameval
FROM users
WHERE userid = $1;
