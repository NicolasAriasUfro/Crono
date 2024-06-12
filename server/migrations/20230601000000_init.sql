DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS timer_group_id;

CREATE TABLE IF NOT EXISTS public.user_account
(
    user_account_id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    mail character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    PRIMARY KEY (user_account_id)
);

CREATE TABLE IF NOT EXISTS public.timer_group
(
    timer_group_id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    name character varying(100) NOT NULL,
    actual_seconds character varying(100) NOT NULL,
    PRIMARY KEY (timer_group_id)
);