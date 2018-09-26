/*Amount of revenue and number of products sold by the brand*/

/* ASUMPTION: the table holds hits only for one brand */
SELECT count(product_id), sum(amount) FROM hits 
where event_id = 1


/* Providing detail for each prod */
SELECT product_id, count(product_id), sum(amount) FROM hits 
where event_id = 1
group by 1
