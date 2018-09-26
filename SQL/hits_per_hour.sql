/*Number of events per hour per type of event. */
select  event_id, date(ts), hour(ts), count(*) as hit_count 
from hits
group by 1, 2, 3
order by 1, 2 asc,3 asc


/*a more report friendly version.*/
select  widget_events.name, date(ts), hour(ts), count(*) as hit_count 
from hits
join widget_events on hits.event_id = widget_events.id
group by 1, 2, 3
order by 1, 2 asc,3 asc