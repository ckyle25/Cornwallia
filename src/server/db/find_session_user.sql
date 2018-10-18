SELECT
userid
,isadminflg
,wishesflg
,lanpartyflg
,calendarflg
,firstnameval
,lastnameval
FROM users
WHERE userid = $1;
