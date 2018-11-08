WITH FamilyReference AS (
	SELECT
	wu.userid
	,wu.firstnameval
	,wu.birthdaydt
	,wu.edwuserid
	,u.emaildsc
	,wf.parent1wishesuserid
	,wf.parent2wishesuserid
	FROM wishes_users wu
		LEFT JOIN wishes_family wf
			ON wu.familyid = wf.familyid
		LEFT JOIN users u
			ON wu.edwuserid = u.userid
)

SELECT
fr.userid
,fr.firstnameval
,fr.birthdaydt
,fr.edwuserid
,fr.emaildsc as primaryemail
,wu.edwuserid AS parent1edwuserid
,u.emaildsc AS parent1email
,wu2.edwuserid AS parent2edwuserid
,u2.emaildsc AS parent2email
FROM FamilyReference fr
	LEFT JOIN wishes_users wu
		ON fr.parent1wishesuserid = wu.userid
	LEFT JOIN wishes_users wu2
		ON fr.parent2wishesuserid = wu2.userid
	LEFT JOIN users u
		ON wu.edwuserid = u.userid
	LEFT JOIN users u2
		ON wu2.edwuserid = u2.userid
