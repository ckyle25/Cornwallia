WITH FamilyReference AS (
	SELECT
	wu.userid
	,wf.parent1wishesuserid
	,wf.parent2wishesuserid
	FROM wishes_users wu
		LEFT JOIN wishes_family wf
			ON wu.familyid = wf.familyid
)

SELECT
wu.firstnameval
,wu.lastnameval
,u.emaildsc
,wu.birthdaydt
,fr.parent1wishesuserid
,fr.parent2wishesuserid
FROM wishes_users wu
LEFT JOIN users u
	ON wu.edwuserid = u.userid
LEFT JOIN FamilyReference fr
	ON fr.userid = wu.userid