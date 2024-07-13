create or replace view active_allotments as  
SELECT DISTINCT ON ("applicantId")
        "applicantId",
        "course",
        "quota",
        "allotment"
    FROM
        "admission"."Allotment"
    ORDER BY
        "applicantId", "allotment" DESC;

create or replace view
  allotmentCount as
select
  subquery.course , seats , subquery.quota , count
from
  (
    select
      a."course" ,
      a."quota" ,
      count(distinct a."applicantId")
    from
      active_allotments as a
    group by
      a."course",
      a."quota"
  ) as subquery
  join "admission"."Seats" as s on s."course" = subquery.course
  and s."quota" = subquery.quota;


