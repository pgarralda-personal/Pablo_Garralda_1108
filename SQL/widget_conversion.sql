/*Amount of revenue and number of products sold obtained from users that had 
previously visited a website page containing a widget (widget render event).*/

select count(*) as num_of_products ,sum(amount) as revenue from 
(SELECT DISTINCT 
    purchases.id as purchase_event_id, 
    purchases.amount as amount 
from hits as purchases 
JOIN hits as visits 
on purchases.user_id = visits.user_id 
where visits.event_id = 31 /* widget_view*/ 
and purchases.event_id = 1 /* purchase */ 
and visits.ts <= purchases.ts) as conversion_events;

/* Amount of revenue and number of products sold (in any device) obtained from users 
that had previously interacted on a mobile with a widget in some way. */

select count(*) as num_of_products ,sum(amount) as revenue from 
(SELECT DISTINCT 
    purchases.id as purchase_event_id, 
    purchases.amount as amount 
from hits as purchases 
JOIN hits as visits 
on purchases.user_id = visits.user_id 
where visits.device_type = 1 /* mobile */
and visits.event_id in (13, 15) /* interactions */
and purchases.event_id = 1 /* purchase */ 
and visits.ts <= purchases.ts) as conversion_events


/* Bonus: conversion (% of users) that made a purchase after a widget view */
select count(DISTINCT user_id)/(select count(DISTINCT user_id) from hits where event_id=31)  as coversion_rate
       ,sum(amount) 
       from (SELECT DISTINCT 
          purchases.user_id as user_id,
          purchases.id as purchase_event_id, 
          purchases.amount as amount 
          from hits as purchases 
          JOIN hits as visits 
          on purchases.user_id = visits.user_id 
          where visits.event_id = 31 /* widget_view*/ 
          and purchases.event_id = 1 /* purchase */ 
          and visits.ts <= purchases.ts) as conversion_events
